import { Injectable } from '@nestjs/common';

import { User } from 'src/features/user/user.modal';
import { UserService } from 'src/features/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validateUser(userId: string, _: string): User | null {
    const user = this.usersService.findOne(userId);
    if (user) {
      return user;
    }
    return null;
  }
}
