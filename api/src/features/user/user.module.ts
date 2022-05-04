import { Module, OnModuleInit } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserRepository],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule implements OnModuleInit {
  constructor(private userRepo: UserRepository) {}
  onModuleInit() {
    this.userRepo.seed();
  }
}
