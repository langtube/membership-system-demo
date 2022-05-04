import { Injectable } from '@nestjs/common';

import { LowRepositoryHelper } from 'src/common/db/repository';
import { generateId } from 'src/common/generate-id';
import { Workspace } from './workspace.modal';

type DataType = { workspaces: Workspace[] };

@Injectable()
export class WorkspaceRepository {
  repoHelper: LowRepositoryHelper<DataType>;

  constructor() {
    this.repoHelper = new LowRepositoryHelper<DataType>();
  }

  list(ownerId: string): Workspace[] {
    const data = this.repoHelper.db
      .get('workspaces')
      .filter({ ownerId })
      .value();
    return data;
  }

  add(ownerId: string, name: string): Workspace {
    const data = this.repoHelper.db
      .get('workspaces')
      .push({ id: generateId(), ownerId, name, createdAt: new Date() })
      .write()[0];
    return data;
  }

  remove(ownerId: string, id: string): boolean {
    this.repoHelper.db.get('workspaces').remove({ ownerId, id }).write();
    return true;
  }
}
