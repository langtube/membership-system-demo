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
import { AddTeamMemberDto, DeleteTeamMemberDto } from './team-member.dto';
import { TeamMemberService } from './team-member.service';

@ApiTags('team-members')
@Controller('team-members')
export class TeamMemberController {
  constructor(private service: TeamMemberService) {}

  @Get()
  @UseGuards(RequireAccessTagsGuard)
  @AccessTags('access-team-member')
  list(@Request() req: ExpressRequest) {
    const ownerId = req.user.id;
    return this.service.list(ownerId);
  }

  @Post()
  @UseGuards(RequireAccessTagsGuard)
  @AccessTags('access-team-member')
  add(@Body() dto: AddTeamMemberDto, @Request() req: ExpressRequest) {
    const ownerId = req.user.id;
    return this.service.add(ownerId, dto.email);
  }

  @Delete()
  @UseGuards(RequireAccessTagsGuard)
  @AccessTags('access-team-member')
  remove(@Body() dto: DeleteTeamMemberDto, @Request() req: ExpressRequest) {
    const ownerId = req.user.id;
    return this.service.remove(ownerId, dto.id);
  }
}
