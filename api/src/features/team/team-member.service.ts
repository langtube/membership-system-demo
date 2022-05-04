import { Injectable } from '@nestjs/common';

import { ValidationException } from 'src/common';
import { DatabaseException } from 'src/common/exceptions/database.exception';
import { TeamMember } from './team-member.modal';
import { TeamMemberRepository } from './team-member.repository';

@Injectable()
export class TeamMemberService {
  constructor(private repo: TeamMemberRepository) {}

  list(ownerId: string): TeamMember[] | undefined {
    try {
      return this.repo.list(ownerId);
    } catch (e) {
      throw new DatabaseException(e);
    }
  }

  add(ownerId: string, email: string): TeamMember | undefined {
    try {
      return this.repo.add(ownerId, email);
    } catch (e) {
      if (e instanceof ValidationException) {
        throw e;
      }
      throw new DatabaseException(e);
    }
  }

  remove(ownerId: string, id: string): boolean {
    try {
      return this.repo.remove(ownerId, id);
    } catch (e) {
      throw new DatabaseException(e);
    }
  }
}
