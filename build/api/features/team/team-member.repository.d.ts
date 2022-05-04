import { LowRepositoryHelper } from 'src/common/db/repository';
import { TeamMember } from './team-member.modal';
declare type DataType = {
    'team-members': TeamMember[];
};
export declare class TeamMemberRepository {
    repoHelper: LowRepositoryHelper<DataType>;
    constructor();
    list(ownerId: string): TeamMember[];
    add(ownerId: string, email: string): TeamMember;
    remove(ownerId: string, id: string): boolean;
}
export {};
