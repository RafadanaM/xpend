import HttpException from './HttpException';
class MissingTokenException extends HttpException {
  constructor() {
    super(401, 'Missing Token');
  }
}
export default MissingTokenException;
