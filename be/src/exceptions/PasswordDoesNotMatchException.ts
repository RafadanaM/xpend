import HttpException from './HttpException';

class PasswordDoesNotMatchException extends HttpException {
  constructor() {
    super(400, 'Passsword does not match');
  }
}

export default PasswordDoesNotMatchException;
