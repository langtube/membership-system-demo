import { LowRepositoryHelper } from 'src/common/db/repository';
import { Role, User } from './user.modal';
declare type UserDataType = {
    users: User[];
    roles: Role[];
};
export declare class UserRepository {
    repoHelper: LowRepositoryHelper<UserDataType>;
    constructor();
    findOne(id: string): User | undefined;
    seed(): Promise<void>;
}
export {};
