import { getRepository } from 'typeorm';
import WrongCredentialsException from '../../exceptions/WrongCredentialsException';
import Users from '../users/users.entity';
import LoginDto from './login.dto';
import bcrypt from 'bcrypt';
import TokenData from '../../interfaces/tokendata.interface';
import DataTokenStored from '../../interfaces/datatokenstored.interface';
import jwt, { SignOptions } from 'jsonwebtoken';

class AuthService {
  private userRepository = getRepository(Users);

  private createToken(user: Users): TokenData {
    const iss = 'Xpend Team';
    const aud = 'http://localhost:5000';
    const expiresIn = 60 * 60;
    const signOptions: SignOptions = {
      issuer: iss,
      audience: aud,
      expiresIn: expiresIn,
      algorithm: 'RS256',
    };
    const dataStoredInToken: DataTokenStored = {
      _id: user.id,
    };

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, process.env.JWT_SECRET_PRIVATE || 'jwt_secret', signOptions),
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
    throw new WrongCredentialsException();
  }

  public async login(loginData: LoginDto): Promise<{ user: Users; token: TokenData }> {
    const user = await this.getUserWithpassword(loginData.email);

    const isPasswordMatch = await bcrypt.compare(loginData.password, user.password);
    if (isPasswordMatch) {
      const userWithoutPassword = await this.userRepository.findOneOrFail({ where: { email: loginData.email } });
      return { user: userWithoutPassword, token: this.createToken(user) };
    }
    throw new WrongCredentialsException();
  }
}

export default AuthService;
