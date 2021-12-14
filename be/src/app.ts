import express, { Response } from 'express';
import morgan from 'morgan';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middlewares/error.middleware';
import NotFoundMiddleware from './middlewares/notfound.middleware';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
class App {
  public app: express.Application;

  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.initMiddlewares();
    this.initControllers(controllers);
    this.initErrorHandling();
    this.initReact();
    this.initRouteNotFound();
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

  private initReact() {
    if (process.env.NODE_ENV === 'prod') {
      console.log(__dirname)
      this.app.use(express.static(path.join(__dirname, '../../fe/build')));
      this.app.get('*', (_, res: Response) => {
        res.sendFile(path.join(__dirname + '../../fe/build/index.html'));
      });
    }
  }

  private initControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      console.log(controller.path);

      this.app.use(`/api${controller.path}`, controller.router);
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
