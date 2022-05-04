import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/auth/auth.module';
import { TeamModule } from './features/team/team.module';
import { UserModule } from './features/user/user.module';
import { WorkspaceModule } from './features/workspace/workspace.module';

@Module({
  imports: [UserModule, AuthModule, TeamModule, WorkspaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
