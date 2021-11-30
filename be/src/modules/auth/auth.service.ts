import { getRepository } from 'typeorm';
import WrongCredentialsException from '../../exceptions/WrongCredentialsException';
import Users from '../users/users.entity';
import LoginDto from './login.dto';
import bcrypt from 'bcrypt';
import TokenData from '../../interfaces/tokendata.interface';
import DataTokenStored from '../../interfaces/datatokenstored.interface';
import jwt from 'jsonwebtoken';

class AuthService {
  private userRepository = getRepository(Users);

  private createToken(user: Users): TokenData {
    const expiresIn = 60 * 60;
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const dataStoredInToken: DataTokenStored = {
      _id: user.id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  private async getUserWithpassword(email: string) {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email = :email', { email })
      .getOne();
    if (user) {
      return user;
    }
    console.log('else');
    throw new WrongCredentialsException();
  }

  public async login(loginData: LoginDto): Promise<TokenData> {
    const user = await this.getUserWithpassword(loginData.email);

    const isPasswordMatch = await bcrypt.compare(loginData.password, user.password);
    if (isPasswordMatch) {
      return this.createToken(user);
    }
    throw new WrongCredentialsException();
  }
}

export default AuthService;
