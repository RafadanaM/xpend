import { Request } from 'express';
import Users from '../modules/users/users.entity';

interface RequestWithUser extends Request {
  user?: Users;
}

export default RequestWithUser;
