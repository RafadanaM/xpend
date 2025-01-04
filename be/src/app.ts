import express from 'express';
import morgan from 'morgan';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middlewares/error.middleware';
import NotFoundMiddleware from './middlewares/notfound.middleware';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import cron from 'node-cron';
import { getRepository } from 'typeorm';
import Tasks from './modules/tasks/tasks.entity';

class App {
  public app: express.Application;

  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.initMiddlewares();
    this.initHealthcheck();
    this.initControllers(controllers);
    this.initErrorHandling();
    this.initRouteNotFound();
    this.initCron();
  }

  private initMiddlewares() {
    this.app.use(
      cors({
        origin: [process.env.ORIGIN || 'http://localhost:3000'],

        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(morgan(process.env.NODE_ENV === 'dev' ? 'dev' : 'short'));
  }

  private initCron() {
    cron.schedule('0 0 1 * *', async () => {
      await getRepository(Tasks).createQueryBuilder().update(Tasks).set({ isComplete: false }).execute();
    });
  }

  private initControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(`/api${controller.path}`, controller.router);
    });
  }

  private initHealthcheck() {
    this.app.get('/healthcheck', (_req, res) => {
      res.send({
        status: 'OK',
        version: process.env.APP_VERSION || 'Version Not Specified',
      });
    });
  }

  private initErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initRouteNotFound() {
    this.app.use(NotFoundMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`app is listening on port ${this.port}`);
    });
  }
}

export default App;
