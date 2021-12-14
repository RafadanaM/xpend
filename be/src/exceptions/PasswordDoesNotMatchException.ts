import HttpException from './HttpException';

class PasswordDoesNotMatchException extends HttpException {
  constructor() {
    super(400, 'Password does not match');
  }
}

export default PasswordDoesNotMatchException;
