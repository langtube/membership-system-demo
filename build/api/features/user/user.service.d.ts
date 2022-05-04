import { User } from './user.modal';
import { UserRepository } from './user.repository';
export declare class UserService {
    private repo;
    constructor(repo: UserRepository);
    findOne(id: string): User | undefined;
}
