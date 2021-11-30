import { getRepository } from 'typeorm';
import createUserDto from './users.dto';
import Users from './users.entity';

class UsersService {
  private usersRepository = getRepository(Users);

  public async createUser(userData: createUserDto): Promise<Users> {
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  public async getUsers(): Promise<Users[]> {
    return await this.usersRepository.find();
  }
}

export default UsersService;
