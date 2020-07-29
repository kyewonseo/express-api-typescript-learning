import 'dotenv/config';
import App from './app';
import UserController from './controllers/user.controller';
import validateEnv from '../src/utils/validateEnv';

// validateEnv();

const app = new App(
  [
    new UserController()
  ],
);

app.listen();
