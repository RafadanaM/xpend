import { Router, Request, Response, NextFunction } from 'express';
import { RequestTypes } from '../../enums/request.enum';
import Controller from '../../interfaces/controller.interface';
import validationMiddleware from '../../middlewares/validation.middleware';
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
    this.router.get('', this.getUsers);
    this.router.post('', validationMiddleware(createUserDto, RequestTypes.BODY), this.createUser);
  }

  private createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: createUserDto = req.body;
      res.send({ message: await this.usersService.createUser(userData) });
    } catch (error) {
      next(error);
    }
  };

  private getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.send(await this.usersService.getUsers());
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
