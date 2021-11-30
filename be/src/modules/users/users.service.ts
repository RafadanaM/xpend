import { getRepository } from 'typeorm';
import EmailAlreadyExistException from '../../exceptions/EmailAlreadyExistsException';
import createUserDto from './users.dto';
import Users from './users.entity';
import bcrypt from 'bcrypt';
import PasswordDoesNotMatchException from '../../exceptions/PasswordDoesNotMatchException';

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

  public async getUsers(): Promise<Users[]> {
    return await this.usersRepository.find();
  }
}

export default UsersService;
