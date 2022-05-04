import { Injectable } from '@nestjs/common';

import { LowRepositoryHelper } from 'src/common/db/repository';
import { Role, User } from './user.modal';

type UserDataType = { users: User[]; roles: Role[] };

@Injectable()
export class UserRepository {
  repoHelper: LowRepositoryHelper<UserDataType>;

  constructor() {
    this.repoHelper = new LowRepositoryHelper<UserDataType>();
  }

  findOne(id: string): User | undefined {
    const user = this.repoHelper.db
      .get('users')
      .find((user) => user.id === id)
      .value();

    if (!user) {
      return undefined;
    }
    const userRole = this.repoHelper.db
      .get('roles')
      .find((x) => x.name === user.role)
      .value();
    user.accessTags = { ...user.accessTags, ...userRole?.accessTags };
    return user;
  }

  async seed() {
    if (this.repoHelper.db.get('users').size().value() < 1) {
      const users = [
        {
          id: 'free',
          email: 'free-user@example.com',
          role: 'free',
        },
        {
          id: 'basic',
          email: 'basic-user@example.com',
          role: 'basic',
        },
        {
          id: 'pro',
          email: 'pro-user@example.com',
          role: 'pro',
        },
      ];

      this.repoHelper.db
        .get('users')
        .push(...users)
        .write();
    }

    if (this.repoHelper.db.get('roles').size().value() < 1) {
      const roles = [
        {
          name: 'free',
        },
        {
          name: 'basic',
          accessTags: { 'access-team-member': 5 },
        },
        {
          name: 'pro',
          accessTags: { 'access-team-member': 10, 'access-workspace': 10 },
        },
      ];
      this.repoHelper.db
        .get('roles')
        .push(...roles)
        .write();
    }
  }
}
