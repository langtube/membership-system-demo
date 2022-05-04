import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { TeamMemberController } from './team-member.controller';
import { TeamMemberRepository } from './team-member.repository';
import { TeamMemberService } from './team-member.service';

@Module({
  imports: [AuthModule],
  providers: [TeamMemberRepository, TeamMemberService],
  controllers: [TeamMemberController],
})
export class TeamModule {}
