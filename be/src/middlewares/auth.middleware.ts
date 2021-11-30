import { NextFunction, Response } from 'express';
import { getRepository } from 'typeorm';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import Users from '../modules/users/users.entity';
import jwt from 'jsonwebtoken';
import DataTokenStored from '../interfaces/datatokenstored.interface';
import InvalidTokenException from '../exceptions/InvalidTokenException';
import MissingTokenException from '../exceptions/MissingTokenException';

async function authMiddleware(request: RequestWithUser, _: Response, next: NextFunction) {
  const cookies = request.cookies;
  const userRepository = getRepository(Users);
  if (cookies && cookies.access_token) {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    try {
      const verificationResponse = jwt.verify(cookies.access_token, secret) as DataTokenStored;
      const id = verificationResponse._id;
      const user = await userRepository.findOne(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new InvalidTokenException());
      }
    } catch (error) {
      next(new InvalidTokenException());
    }
  } else {
    next(new MissingTokenException());
  }
}

export default authMiddleware;
