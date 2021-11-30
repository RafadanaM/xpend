import HttpException from './HttpException';

class InvalidTokenException extends HttpException {
  constructor() {
    super(401, 'Invalid Token');
  }
}

export default InvalidTokenException;
