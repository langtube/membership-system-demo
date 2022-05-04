import { User } from './features/user/user.modal';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
