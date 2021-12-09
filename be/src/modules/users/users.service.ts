import { getRepository } from 'typeorm';
import EmailAlreadyExistException from '../../exceptions/EmailAlreadyExistsException';
import createUserDto from './users.dto';
import Users from './users.entity';
import bcrypt from 'bcrypt';
import PasswordDoesNotMatchException from '../../exceptions/PasswordDoesNotMatchException';
import NotFoundException from '../../exceptions/NotFoundException';

class UsersService {
  private usersRepository = getRepository(Users);

  public async createUser(userData: createUserDto): Promise<string> {
    if (userData.password !== userData.confirm_password) {
      throw new PasswordDoesNotMatchException();
    }
    if (await this.usersRepository.findOne({ email: userData.email })) {
      throw new EmailAlreadyExistException(userData.email);
    } else {
      const hashedPassword: string = await bcrypt.hash(userData.password, 10);
      const newUser = this.usersRepository.create({ ...userData, password: hashedPassword });
      await this.usersRepository.save(newUser);
      return 'Register Success';
    }
  }

  public async getUsers(user: Users): Promise<Users> {
    const currentUser = await this.usersRepository.findOne({ where: { id: user.id } });
    if (!currentUser) {
      throw new NotFoundException();
    }
    return currentUser;
  }

  public async editProfile(data: Partial<createUserDto>, user: Users): Promise<Users> {
    let currentUser = await this.getUsers(user);
    const updatedProfile: Partial<createUserDto> = { ...data };
    
    const userUsingNewEmail = await this.usersRepository.findOne({ email: data.email })
    if (userUsingNewEmail && userUsingNewEmail.id !== currentUser.id) {
      throw new EmailAlreadyExistException(data.email);
    }
    if (data.password) {
      if (data.password !== data.confirm_password) {
        throw new PasswordDoesNotMatchException();
      }
      const hashedPassword: string = await bcrypt.hash(data.password, 10);
      delete updatedProfile.confirm_password;
      await this.usersRepository.update({ id: currentUser.id }, { ...updatedProfile, password: hashedPassword });
    } else {
      await this.usersRepository.update({ id: currentUser.id }, { ...updatedProfile });
    }
    currentUser = await this.usersRepository.findOneOrFail({ where: { id: currentUser.id } });
    return currentUser;
  }
}

export default UsersService;
