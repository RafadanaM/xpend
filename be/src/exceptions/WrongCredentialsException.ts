import HttpException from './HttpException';

class WrongCredentialsException extends HttpException {
  constructor() {
    super(400, 'Email & Password does not match');
  }
}

export default WrongCredentialsException;
