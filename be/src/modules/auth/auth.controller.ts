import { NextFunction, Router, Request, Response } from 'express';
import { RequestTypes } from '../../enums/request.enum';
import Controller from '../../interfaces/controller.interface';
import authMiddleware from '../../middlewares/auth.middleware';
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

  private initRoutes() {
    this.router.post('/login', validationMiddleware(LoginDto, RequestTypes.BODY), this.login);
    this.router.post('/logout', authMiddleware, this.logout);
  }

  private login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const loginData: LoginDto = req.body;
      const response = await this.authService.login(loginData);
      res.cookie('access_token', response.token.token, {
        httpOnly: true,
        maxAge: response.token.expiresIn * 1000,
      });
      res.send(response.user);
    } catch (error) {
      next(error);
    }
  };

  private logout = (_: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie('access_token');
      res.send({ message: 'Logout Success' });
    } catch (error) {
      next(error);
    }
  };
}
export default AuthController;
