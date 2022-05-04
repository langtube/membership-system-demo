import { Request as ExpressRequest } from 'express';
import { SigninDto } from './auth.dto';
export declare class AuthController {
    signin(dto: SigninDto, req: ExpressRequest): Promise<import("../user/user.modal").User>;
    testAccessTags(req: ExpressRequest): string;
    testIsSignin(req: ExpressRequest): string;
}
