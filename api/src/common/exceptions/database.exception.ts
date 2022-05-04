import { Exception } from './base.exception';

export class DatabaseException extends Exception {
  name = 'DatabaseException';
  status = 500;

  constructor(cause: Error) {
    super('Database Exception', { cause });
  }
}
