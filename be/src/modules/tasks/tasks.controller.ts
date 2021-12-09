import { Router } from 'express';
import Controller from '../../interfaces/controller.interface';

class TasksController implements Controller {
  path: '/tasks';
  router: Router;

  constructor() {}

  private initRoutes() {}
}

export default TasksController;
