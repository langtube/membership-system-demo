import { Injectable } from '@nestjs/common';

import { ValidationException } from 'src/common';
import { LowRepositoryHelper } from 'src/common/db/repository';
import { generateId } from 'src/common/generate-id';
import { TeamMember } from './team-member.modal';

type DataType = { 'team-members': TeamMember[] };

@Injectable()
export class TeamMemberRepository {
  repoHelper: LowRepositoryHelper<DataType>;

  constructor() {
    this.repoHelper = new LowRepositoryHelper<DataType>();
  }

  list(ownerId: string): TeamMember[] {
    const members = this.repoHelper.db
      .get('team-members')
      .filter({ ownerId })
      .value();
    return members;
  }

  add(ownerId: string, email: string): TeamMember {
    const alreadyExists = this.repoHelper.db
      .get('team-members')
      .find({ ownerId, email })
      .value();

    if (alreadyExists) {
      throw new ValidationException([
        {
          name: 'email',
          errors: ['Email already exists'],
        },
      ]);
    }

    const member = this.repoHelper.db
      .get('team-members')
      .push({ id: generateId(), ownerId, email, createdAt: new Date() })
      .write()[0];
    return member;
  }

  remove(ownerId: string, id: string): boolean {
    this.repoHelper.db.get('team-members').remove({ ownerId, id }).write();
    return true;
  }
}
