import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Users from '../modules/users/users.entity';
import jwt, { VerifyOptions } from 'jsonwebtoken';
import DataTokenStored from '../interfaces/datatokenstored.interface';
import InvalidTokenException from '../exceptions/InvalidTokenException';
import MissingTokenException from '../exceptions/MissingTokenException';

async function authMiddleware(request: Request, _: Response, next: NextFunction) {
  const cookies = request.cookies;
  const userRepository = getRepository(Users);
  if (cookies && cookies.access_token) {
    try {
      const iss = 'Xpend Team';
      const aud = 'http://localhost:5000';
      const expiresIn = 60 * 60;
      const verifyOptions: VerifyOptions = {
        issuer: iss,
        audience: aud,
        maxAge: expiresIn,
        algorithms: ['RS256'],
      };
      const publicKey = process.env.JWT_SECRET_PUBLIC as string;
      const verificationResponse = jwt.verify(
        cookies.access_token,
        publicKey.replace(/\\n/gm, '\n') || 'jwt_secret',
        verifyOptions
      ) as DataTokenStored;

      const id = verificationResponse._id;
      const user = await userRepository.findOne(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new InvalidTokenException());
      }
    } catch (error) {
      console.log('masuk error');
      next(new InvalidTokenException());
    }
  } else {
    next(new MissingTokenException());
  }
}

export default authMiddleware;
