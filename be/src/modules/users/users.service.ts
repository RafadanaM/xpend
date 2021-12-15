import { getRepository } from 'typeorm';
import EmailAlreadyExistException from '../../exceptions/EmailAlreadyExistsException';
import createUserDto from './users.dto';
import Users from './users.entity';
import bcrypt from 'bcrypt';
import PasswordDoesNotMatchException from '../../exceptions/PasswordDoesNotMatchException';
import NotFoundException from '../../exceptions/NotFoundException';
import editUserDto from './editUser.dto';
import WrongCredentialsException from '../../exceptions/WrongCredentialsException';
import PreviousPasswordDoesNotMatchException from '../../exceptions/PreviousPasswordDoesNotMatch';

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

  private async getUserWithpassword(email: string) {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email = :email', { email })
      .getOne();
    if (user) {
      return user;
    }
    throw new WrongCredentialsException();
  }

  public async editProfile(data: editUserDto, user: Users): Promise<Users> {
    let currentUser = await this.getUserWithpassword(user.email);
    const updatedProfile: Partial<editUserDto> = { ...data };
    const userUsingNewEmail = await this.usersRepository.findOne({ email: data.email });
    if (userUsingNewEmail && userUsingNewEmail.id !== currentUser?.id) {
      throw new EmailAlreadyExistException(data.email);
    }
    if (data.new_password) {
      const isPasswordMatch = await bcrypt.compare(data.previous_password, currentUser.password);
      if (!isPasswordMatch) {
        throw new PreviousPasswordDoesNotMatchException();
      }
      const hashedPassword: string = await bcrypt.hash(data.new_password, 10);
      delete updatedProfile.confirm_password;
      delete updatedProfile.previous_password;
      delete updatedProfile.new_password;
      await this.usersRepository.update({ id: currentUser?.id }, { ...updatedProfile, password: hashedPassword });
    } else {
      await this.usersRepository.update({ id: currentUser?.id }, { ...updatedProfile });
    }
    currentUser = await this.usersRepository.findOneOrFail({ where: { id: currentUser?.id } });

    return currentUser;
  }
}

export default UsersService;
