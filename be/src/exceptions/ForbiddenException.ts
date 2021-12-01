import HttpException from './HttpException';

class ForbiddenException extends HttpException {
  constructor() {
    super(403, `Not Authorized`);
  }
}

export default ForbiddenException;