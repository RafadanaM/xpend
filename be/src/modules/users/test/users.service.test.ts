import createUserDto from '../users.dto';
import UsersService from '../users.service';
import bcrypt from 'bcrypt';
import Users from '../users.entity';
import * as typeorm from 'typeorm';
import PasswordDoesNotMatchException from '../../../exceptions/PasswordDoesNotMatchException';
import EmailAlreadyExistException from '../../../exceptions/EmailAlreadyExistsException';
import NotFoundException from '../../../exceptions/NotFoundException';
import editUserDto from '../editUser.dto';
import WrongCredentialsException from '../../../exceptions/WrongCredentialsException';
import PreviousPasswordDoesNotMatchException from '../../../exceptions/PreviousPasswordDoesNotMatch';
let createUserData: createUserDto;
let userResult: Users;

beforeEach(() => {
  createUserData = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'email@email.com',
    password: 'testpassword123',
    confirm_password: 'testpassword123',
  };

  userResult = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'email@email.com',
    password: 'testpassword123',
    created: new Date(),
    updated: new Date(),
    transactions: [],
    tasks: [],
  };
});

jest.mock('typeorm', () => ({
  PrimaryGeneratedColumn: jest.fn(),
  Column: jest.fn(),
  CreateDateColumn: jest.fn(),
  UpdateDateColumn: jest.fn(),
  Entity: jest.fn(),
  ManyToOne: jest.fn(),
  OneToMany: jest.fn(),
  getRepository: jest.fn(),
  createConnection: jest.fn(),
}));
describe('The UsersService', () => {
  describe('when creating a user', () => {
    describe('if password and confirm password does not match', () => {
      it('should throw PasswordDoesNotMatchException', async () => {
        createUserData.confirm_password = 'testpassword234';
        const usersService = new UsersService();
        await expect(usersService.createUser(createUserData)).rejects.toMatchObject(
          new PasswordDoesNotMatchException()
        );
      });
    });
    describe('if email is already taken', () => {
      it('should throw EmailAlreadyExistException', async () => {
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOne: jest.fn().mockResolvedValueOnce(userResult),
          };
        });
        const usersService = new UsersService();
        await expect(usersService.createUser(createUserData)).rejects.toMatchObject(
          new EmailAlreadyExistException(createUserData.email)
        );
      });
    });
    describe('if everything is correct', () => {
      it('should create a new user', async () => {
        const bcryptHash = jest.fn().mockResolvedValue('testpassword123');
        (bcrypt.hash as jest.Mock) = bcryptHash;

        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOne: jest.fn().mockResolvedValueOnce(undefined),
            create: jest.fn().mockResolvedValueOnce(userResult),
            save: () => jest.fn().mockResolvedValueOnce(userResult),
          };
        });
        const usersService = new UsersService();
        await expect(usersService.createUser(createUserData)).resolves.toBe('Register Success');
      });
    });
  });

  describe('when getting a user', () => {
    describe('if user does not exist', () => {
      it('should throw NotFoundError', async () => {
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOne: jest.fn().mockResolvedValueOnce(undefined),
          };
        });
        const usersService = new UsersService();

        await expect(usersService.getUsers(userResult)).rejects.toMatchObject(new NotFoundException());
      });
    });

    describe('if user exist', () => {
      it('should return user', async () => {
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOne: jest.fn().mockResolvedValueOnce(userResult),
          };
        });
        const usersService = new UsersService();
        await expect(usersService.getUsers(userResult)).resolves.toBe(userResult);
      });
    });
  });

  describe('when edit user profile', () => {
    const editUserData: editUserDto = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'email@email.com',
      previous_password: 'testpassword123',
      new_password: 'testpassword123',
      confirm_password: 'testpassword123',
    };
    describe('if user does not exist', () => {
      it('should throw WrongCredentialsException', async () => {
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            createQueryBuilder: jest.fn().mockImplementation(() => ({
              addSelect: jest.fn().mockReturnThis() as unknown,
              where: jest.fn().mockReturnThis() as unknown,
              getOne: jest.fn().mockResolvedValueOnce(undefined) as unknown,
            })),
          };
        });

        const usersService = new UsersService();
        await expect(usersService.editProfile(editUserData, userResult)).rejects.toMatchObject(
          new WrongCredentialsException()
        );
      });
    });

    describe('if new email already taken by another user', () => {
      it('should throw EmailAlreadyExistException', async () => {
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOne: jest.fn().mockResolvedValueOnce({ ...userResult, id: 2 }),
            createQueryBuilder: jest.fn().mockImplementation(() => ({
              addSelect: jest.fn().mockReturnThis() as unknown,
              where: jest.fn().mockReturnThis() as unknown,
              getOne: jest.fn().mockResolvedValueOnce(userResult) as unknown,
            })),
          };
        });

        const usersService = new UsersService();
        await expect(usersService.editProfile(editUserData, userResult)).rejects.toMatchObject(
          new EmailAlreadyExistException(editUserData.email)
        );
      });
    });

    describe('if password is not changed', () => {
      it('should return udpdated user', async () => {
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
          const original = jest.requireActual('typeorm');
          return {
            ...original,
            findOne: jest.fn().mockResolvedValueOnce(userResult),
            update: jest.fn().mockReturnValueOnce(userResult),
            findOneOrFail: jest.fn().mockReturnValueOnce(userResult),
            createQueryBuilder: jest.fn().mockImplementation(() => ({
              addSelect: jest.fn().mockReturnThis() as unknown,
              where: jest.fn().mockReturnThis() as unknown,
              getOne: jest.fn().mockResolvedValueOnce(userResult) as unknown,
            })),
          };
        });

        const usersService = new UsersService();
        await expect(usersService.editProfile({ ...editUserData, new_password: undefined }, userResult)).resolves.toBe(
          userResult
        );
      });
    });

    describe('if password is changed', () => {
      describe('if current password does not match previous input password', () => {
        it('should throw PreviousPasswordDoesNotMatchException', async () => {
          const bcryptCompare = jest.fn().mockReturnValue(false);
          (bcrypt.compare as jest.Mock) = bcryptCompare;

          jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
            const original = jest.requireActual('typeorm');
            return {
              ...original,
              findOne: jest.fn().mockResolvedValueOnce(userResult),
              createQueryBuilder: jest.fn().mockImplementation(() => ({
                addSelect: jest.fn().mockReturnThis() as unknown,
                where: jest.fn().mockReturnThis() as unknown,
                getOne: jest.fn().mockResolvedValueOnce(userResult) as unknown,
              })),
            };
          });

          const usersService = new UsersService();
          await expect(usersService.editProfile(editUserData, userResult)).rejects.toMatchObject(
            new PreviousPasswordDoesNotMatchException()
          );
        });
      });
      describe('if password matches', () => {
        it('should return updated user value', async () => {
          const bcryptCompare = jest.fn().mockReturnValue(true);
          (bcrypt.compare as jest.Mock) = bcryptCompare;

          const bcryptHash = jest.fn().mockReturnValue('newpassword');
          (bcrypt.hash as jest.Mock) = bcryptHash;

          jest.spyOn(typeorm, 'getRepository').mockImplementation(() => {
            const original = jest.requireActual('typeorm');
            return {
              ...original,
              findOne: jest.fn().mockResolvedValueOnce(userResult),
              update: jest.fn().mockReturnValueOnce(userResult),
              findOneOrFail: jest.fn().mockReturnValueOnce(userResult),
              createQueryBuilder: jest.fn().mockImplementation(() => ({
                addSelect: jest.fn().mockReturnThis() as unknown,
                where: jest.fn().mockReturnThis() as unknown,
                getOne: jest.fn().mockResolvedValueOnce(userResult) as unknown,
              })),
            };
          });

          const usersService = new UsersService();
          await expect(usersService.editProfile(editUserData, userResult)).resolves.toBe(userResult);
        });
      });
    });
  });
});
