import Users from '../../src/modules/users/users.entity';

declare global {
  namespace Express {
    export interface Request {
      user: Users;
    }
  }
}
