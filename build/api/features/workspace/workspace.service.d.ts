import { Workspace } from './workspace.modal';
import { WorkspaceRepository } from './workspace.repository';
export declare class WorkspaceService {
    private repo;
    constructor(repo: WorkspaceRepository);
    list(ownerId: string): Workspace[] | undefined;
    add(ownerId: string, name: string): Workspace | undefined;
    remove(ownerId: string, id: string): boolean;
}
