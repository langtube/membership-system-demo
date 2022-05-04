import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export class RequireSigninGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request: Request = httpContext.getRequest();

    try {
      if (request.isAuthenticated()) {
        return true;
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
