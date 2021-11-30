import { NextFunction, Router, Request, Response } from 'express';
import { RequestTypes } from '../../enums/request.enum';
import Controller from '../../interfaces/controller.interface';
import TokenData from '../../interfaces/tokendata.interface';
import validationMiddleware from '../../middlewares/validation.middleware';
import AuthService from './auth.service';
import LoginDto from './login.dto';

class AuthController implements Controller {
  public path: string = '/auth';
  public router: Router = Router();
  public authService: AuthService;
  constructor() {
    this.authService = new AuthService();
    this.initRoutes();
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  private initRoutes() {
    this.router.post('/login', validationMiddleware(LoginDto, RequestTypes.BODY), this.login);
  }

  private login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const loginData: LoginDto = req.body;
      const tokenData = await this.authService.login(loginData);
      res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
      res.send({ message: 'Login Succes' });
    } catch (error) {
      next(error);
    }
  };
}
export default AuthController;
