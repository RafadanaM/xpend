import { NextFunction, Request, Response, Router } from 'express';
import { RequestTypes } from '../../enums/request.enum';
import NotFoundException from '../../exceptions/NotFoundException';
import Controller from '../../interfaces/controller.interface';
import RequestWithUser from '../../interfaces/requestWithUser.interface';
import authMiddleware from '../../middlewares/auth.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import ParamDto from '../../shared/param.dto';
import createTransactionDto from '../transactions/transactions.dto';
import taskDto from './task.dto';
import TasksService from './tasks.service';

class TasksController implements Controller {
  path: string = '/tasks';
  router: Router = Router();
  public taskService: TasksService;

  constructor() {
    this.taskService = new TasksService();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('', authMiddleware, this.getTask);
    this.router.post('', authMiddleware, validationMiddleware(taskDto, RequestTypes.BODY), this.createTask);
    this.router.delete('/:id', authMiddleware, validationMiddleware(ParamDto, RequestTypes.PARAMS), this.deleteTask);
    this.router.patch(
      '/:id',
      authMiddleware,
      validationMiddleware(ParamDto, RequestTypes.PARAMS),
      validationMiddleware(taskDto, RequestTypes.BODY, true),
      this.updateTask
    );
    this.router.post(
      '/:id/complete',
      authMiddleware,
      validationMiddleware(ParamDto, RequestTypes.PARAMS),
      validationMiddleware(createTransactionDto, RequestTypes.BODY),
      this.completeTask
    );
    this.router.post('/:id/undo', authMiddleware, validationMiddleware(ParamDto, RequestTypes.PARAMS), this.undoTask);
  }

  private getTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.send(await this.taskService.getTasksByUserId(req.user));
    } catch (error) {
      next(error);
    }
  };

  private createTask = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskData: taskDto = req.body;
      if (!req.user) {
        throw new NotFoundException();
      }
      res.send(await this.taskService.createTask(taskData, req.user));
    } catch (error) {
      next(error);
    }
  };

  private deleteTask = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new NotFoundException();
      }
      const { id } = req.params;
      res.send(await this.taskService.deleteTask(+id, req.user));
    } catch (error) {
      next(error);
    }
  };

  private updateTask = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskData: Partial<taskDto> = req.body;
      if (!req.user) {
        throw new NotFoundException();
      }
      const { id } = req.params;
      res.send(await this.taskService.editTask(+id, taskData, req.user));
    } catch (error) {
      next(error);
    }
  };

  private completeTask = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const transactionData: createTransactionDto = req.body;
      const { id } = req.params;
      if (!req.user) {
        throw new NotFoundException();
      }
      res.send(await this.taskService.completeTask(+id, req.user, transactionData));
    } catch (error) {
      next(error);
    }
  };

  private undoTask = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      if (!req.user) {
        throw new NotFoundException();
      }
      res.send(await this.taskService.undoTask(+id, req.user));
    } catch (error) {
      next(error);
    }
  };
}

export default TasksController;
