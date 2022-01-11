import HttpException from '../exceptions/HttpException';
import { Request, Response, NextFunction } from 'express';

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status: number = error.status || 500;
  const message = error.message || 'something went wrong';
  console.log(error.message);
  response.status(status).send({ status, message });
}

export default errorMiddleware;
