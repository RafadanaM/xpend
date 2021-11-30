import 'dotenv/config';
import { createConnection } from 'typeorm';
import App from './app';
import config from './ormconfig';
import UsersController from './modules/users/users.controller';
import validateEnv from './utils/validateEnv';
import AuthController from './modules/auth/auth.controller';

validateEnv();
(async () => {
  try {
    await createConnection(config);
    //await connection.runMigrations();
  } catch (error) {
    console.log('Error connecting to the database', error);
    return error;
  }

  const app = new App([new UsersController(), new AuthController()], parseInt(process.env.PORT || '5000'));

  app.listen();
})();
