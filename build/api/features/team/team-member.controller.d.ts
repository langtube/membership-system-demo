import { Request as ExpressRequest } from 'express';
import { AddTeamMemberDto, DeleteTeamMemberDto } from './team-member.dto';
import { TeamMemberService } from './team-member.service';
export declare class TeamMemberController {
    private service;
    constructor(service: TeamMemberService);
    list(req: ExpressRequest): import("./team-member.modal").TeamMember[];
    add(dto: AddTeamMemberDto, req: ExpressRequest): import("./team-member.modal").TeamMember;
    remove(dto: DeleteTeamMemberDto, req: ExpressRequest): boolean;
}
