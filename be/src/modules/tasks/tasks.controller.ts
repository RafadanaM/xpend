import { NextFunction, Request, Response, Router } from 'express';
import { RequestTypes } from '../../enums/request.enum';
import Controller from '../../interfaces/controller.interface';
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

  private createTask = async (req: Request<{}, {}, taskDto>, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.send(await this.taskService.createTask(req.body, req.user));
    } catch (error) {
      next(error);
    }
  };

  private deleteTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      res.send(await this.taskService.deleteTask(+id, req.user));
    } catch (error) {
      next(error);
    }
  };

  private updateTask = async (
    req: Request<{ id: string }, {}, Partial<taskDto>>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const taskData = req.body;

      const { id } = req.params;
      res.send(await this.taskService.editTask(+id, taskData, req.user));
    } catch (error) {
      next(error);
    }
  };

  private completeTask = async (
    req: Request<{ id: string }, {}, createTransactionDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const transactionData = req.body;
      const { id } = req.params;
      res.send(await this.taskService.completeTask(+id, req.user, transactionData));
    } catch (error) {
      next(error);
    }
  };

  private undoTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      res.send(await this.taskService.undoTask(+id, req.user));
    } catch (error) {
      next(error);
    }
  };
}

export default TasksController;
