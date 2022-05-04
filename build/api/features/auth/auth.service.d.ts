import { User } from 'src/features/user/user.modal';
import { UserService } from 'src/features/user/user.service';
export declare class AuthService {
    private usersService;
    constructor(usersService: UserService);
    validateUser(userId: string, _: string): User | null;
}
