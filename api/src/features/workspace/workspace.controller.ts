import {
  Controller,
  Get,
  UseGuards,
  Body,
  Request,
  Delete,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

import { AccessTags, RequireAccessTagsGuard } from '../auth/decorators';
import { AddWorkspaceDto, DeleteWorkspaceDto } from './workspace.dto';
import { WorkspaceService } from './workspace.service';

@ApiTags('workspaces')
@Controller('workspaces')
export class WorkspacesController {
  constructor(private service: WorkspaceService) {}

  @Get()
  @UseGuards(RequireAccessTagsGuard)
  @AccessTags('access-workspace')
  list(@Request() req: ExpressRequest) {
    const ownerId = req.user.id;
    return this.service.list(ownerId);
  }

  @Post()
  @UseGuards(RequireAccessTagsGuard)
  @AccessTags('access-workspace')
  add(@Body() dto: AddWorkspaceDto, @Request() req: ExpressRequest) {
    const ownerId = req.user.id;
    return this.service.add(ownerId, dto.name);
  }

  @Delete()
  @UseGuards(RequireAccessTagsGuard)
  @AccessTags('access-workspace')
  remove(@Body() dto: DeleteWorkspaceDto, @Request() req: ExpressRequest) {
    const ownerId = req.user.id;
    return this.service.remove(ownerId, dto.id);
  }
}
