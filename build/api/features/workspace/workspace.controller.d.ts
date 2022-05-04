import { Request as ExpressRequest } from 'express';
import { AddWorkspaceDto, DeleteWorkspaceDto } from './workspace.dto';
import { WorkspaceService } from './workspace.service';
export declare class WorkspacesController {
    private service;
    constructor(service: WorkspaceService);
    list(req: ExpressRequest): import("./workspace.modal").Workspace[];
    add(dto: AddWorkspaceDto, req: ExpressRequest): import("./workspace.modal").Workspace;
    remove(dto: DeleteWorkspaceDto, req: ExpressRequest): boolean;
}
