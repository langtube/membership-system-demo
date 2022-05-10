import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  Request,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

import {
  AccessTags,
  RequireAccessTagsGuard,
  RequireSigninGuard,
} from './decorators';
import { SigninGuard } from './decorators/signin-guard';
import { SigninDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  /**
   * @nestjs/passport 使用 SigninGuard 在合适的时候调用 passport.authenticate()
   * 最终的验证逻辑在 LocalStrategy 中实现
   */
  @UseGuards(SigninGuard)
  @Post('signin')
  @HttpCode(200)
  async signin(@Body() dto: SigninDto, @Request() req: ExpressRequest) {
    return req.user;
  }

  @Get('test-access-tags-guard')
  @UseGuards(RequireAccessTagsGuard)
  @AccessTags('access-team-member')
  testAccessTags(@Request() req: ExpressRequest) {
    console.log(req.user);
    return 'ok';
  }

  @Get('test-signin-guard')
  @UseGuards(RequireSigninGuard)
  testIsSignin(@Request() req: ExpressRequest) {
    console.log(req.user);
    return 'ok';
  }
}
