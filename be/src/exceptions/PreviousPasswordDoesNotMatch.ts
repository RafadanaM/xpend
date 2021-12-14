import HttpException from './HttpException';

class PreviousPasswordDoesNotMatchException extends HttpException {
  constructor() {
    super(400, 'The previous password you input does not match your current password!');
  }
}

export default PreviousPasswordDoesNotMatchException;