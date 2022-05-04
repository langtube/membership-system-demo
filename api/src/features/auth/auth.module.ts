import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './session-serializer';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { RequireAccessTagsGuard, RequireSigninGuard } from './decorators';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ session: true, defaultStrategy: 'local' }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer,
    RequireAccessTagsGuard,
    RequireSigninGuard,
  ],
  controllers: [AuthController],
  exports: [RequireAccessTagsGuard, RequireSigninGuard],
})
export class AuthModule {}
