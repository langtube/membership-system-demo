import { TeamMember } from './team-member.modal';
import { TeamMemberRepository } from './team-member.repository';
export declare class TeamMemberService {
    private repo;
    constructor(repo: TeamMemberRepository);
    list(ownerId: string): TeamMember[] | undefined;
    add(ownerId: string, email: string): TeamMember | undefined;
    remove(ownerId: string, id: string): boolean;
}
