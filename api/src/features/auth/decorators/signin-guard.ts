import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

/**
 * 使用这个注解的 controller 方法 将作为登陆入口，有点费解，nestjs的非常规做法。
 */
@Injectable()
export class SigninGuard
  extends PassportAuthGuard('local')
  implements CanActivate
{
  public async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const result = (await super.canActivate(context)) as boolean;
    await super.logIn(request);
    return result;
  }
}
