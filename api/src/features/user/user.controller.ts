import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

import { RequireSigninGuard } from '../auth/decorators';

@ApiTags('user')
@Controller('user')
export class UserController {
  @UseGuards(RequireSigninGuard)
  @Get('profile')
  async prifile(@Request() req: ExpressRequest) {
    return req.user;
  }
}
