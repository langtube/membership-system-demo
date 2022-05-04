import { Injectable } from '@nestjs/common';

import { DatabaseException } from 'src/common/exceptions/database.exception';
import { Workspace } from './workspace.modal';
import { WorkspaceRepository } from './workspace.repository';

@Injectable()
export class WorkspaceService {
  constructor(private repo: WorkspaceRepository) {}

  list(ownerId: string): Workspace[] | undefined {
    try {
      return this.repo.list(ownerId);
    } catch (e) {
      throw new DatabaseException(e);
    }
  }

  add(ownerId: string, name: string): Workspace | undefined {
    try {
      return this.repo.add(ownerId, name);
    } catch (e) {
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
