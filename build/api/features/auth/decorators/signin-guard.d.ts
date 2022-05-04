import { CanActivate, ExecutionContext } from '@nestjs/common';
declare const SigninGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class SigninGuard extends SigninGuard_base implements CanActivate {
    canActivate(context: ExecutionContext): Promise<any>;
}
export {};
