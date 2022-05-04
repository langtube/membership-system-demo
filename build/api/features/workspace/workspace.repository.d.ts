import { LowRepositoryHelper } from 'src/common/db/repository';
import { Workspace } from './workspace.modal';
declare type DataType = {
    workspaces: Workspace[];
};
export declare class WorkspaceRepository {
    repoHelper: LowRepositoryHelper<DataType>;
    constructor();
    list(ownerId: string): Workspace[];
    add(ownerId: string, name: string): Workspace;
    remove(ownerId: string, id: string): boolean;
}
export {};
