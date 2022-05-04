import { Injectable } from '@nestjs/common';

import { DatabaseException } from 'src/common/exceptions/database.exception';
import { User } from './user.modal';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private repo: UserRepository) {}

  findOne(id: string): User | undefined {
    try {
      return this.repo.findOne(id);
    } catch (e) {
      throw new DatabaseException(e);
    }
  }
}
