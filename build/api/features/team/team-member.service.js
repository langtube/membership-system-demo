"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../../common");
const database_exception_1 = require("../../common/exceptions/database.exception");
const team_member_repository_1 = require("./team-member.repository");
let TeamMemberService = class TeamMemberService {
    constructor(repo) {
        this.repo = repo;
    }
    list(ownerId) {
        try {
            return this.repo.list(ownerId);
        }
        catch (e) {
            throw new database_exception_1.DatabaseException(e);
        }
    }
    add(ownerId, email) {
        try {
            return this.repo.add(ownerId, email);
        }
        catch (e) {
            if (e instanceof common_2.ValidationException) {
                throw e;
            }
            throw new database_exception_1.DatabaseException(e);
        }
    }
    remove(ownerId, id) {
        try {
            return this.repo.remove(ownerId, id);
        }
        catch (e) {
            throw new database_exception_1.DatabaseException(e);
        }
    }
};
TeamMemberService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [team_member_repository_1.TeamMemberRepository])
], TeamMemberService);
exports.TeamMemberService = TeamMemberService;
//# sourceMappingURL=team-member.service.js.map