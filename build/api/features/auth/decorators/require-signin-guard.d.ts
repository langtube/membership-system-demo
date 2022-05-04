import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RequireSigninGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}
