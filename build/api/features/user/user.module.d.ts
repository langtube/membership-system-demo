import { OnModuleInit } from '@nestjs/common';
import { UserRepository } from './user.repository';
export declare class UserModule implements OnModuleInit {
    private userRepo;
    constructor(userRepo: UserRepository);
    onModuleInit(): void;
}
