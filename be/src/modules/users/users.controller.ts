import { Router, Request, Response, NextFunction } from 'express';
import { RequestTypes } from '../../enums/request.enum';
import Controller from '../../interfaces/controller.interface';
import authMiddleware from '../../middlewares/auth.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import editUserDto from './editUser.dto';
import createUserDto from './users.dto';
import UsersService from './users.service';

class UsersController implements Controller {
  public path: string = '/users';
  public router: Router = Router();
  public usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('', authMiddleware, this.getUsers);
    this.router.post('', validationMiddleware(createUserDto, RequestTypes.BODY), this.createUser);
    this.router.patch('', authMiddleware, validationMiddleware(editUserDto, RequestTypes.BODY, true), this.editProfile);
  }

  private createUser = async (
    req: Request<{}, {}, createUserDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData = req.body;
      res.send({ message: await this.usersService.createUser(userData) });
    } catch (error) {
      next(error);
    }
  };

  private getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.send(await this.usersService.getUsers(req.user));
    } catch (error) {
      next(error);
    }
  };

  private editProfile = async (req: Request<{}, {}, editUserDto>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body;
      res.send(await this.usersService.editProfile(data, req.user));
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
