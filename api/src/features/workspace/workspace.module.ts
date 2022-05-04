import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { WorkspacesController } from './workspace.controller';
import { WorkspaceRepository } from './workspace.repository';
import { WorkspaceService } from './workspace.service';

@Module({
  imports: [AuthModule],
  providers: [WorkspaceRepository, WorkspaceService],
  controllers: [WorkspacesController],
})
export class WorkspaceModule {}
