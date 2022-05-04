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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../auth/decorators");
const team_member_dto_1 = require("./team-member.dto");
const team_member_service_1 = require("./team-member.service");
let TeamMemberController = class TeamMemberController {
    constructor(service) {
        this.service = service;
    }
    list(req) {
        const ownerId = req.user.id;
        return this.service.list(ownerId);
    }
    add(dto, req) {
        const ownerId = req.user.id;
        return this.service.add(ownerId, dto.email);
    }
    remove(dto, req) {
        const ownerId = req.user.id;
        return this.service.remove(ownerId, dto.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(decorators_1.RequireAccessTagsGuard),
    (0, decorators_1.AccessTags)('access-team-member'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeamMemberController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(decorators_1.RequireAccessTagsGuard),
    (0, decorators_1.AccessTags)('access-team-member'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_member_dto_1.AddTeamMemberDto, Object]),
    __metadata("design:returntype", void 0)
], TeamMemberController.prototype, "add", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(decorators_1.RequireAccessTagsGuard),
    (0, decorators_1.AccessTags)('access-team-member'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_member_dto_1.DeleteTeamMemberDto, Object]),
    __metadata("design:returntype", void 0)
], TeamMemberController.prototype, "remove", null);
TeamMemberController = __decorate([
    (0, swagger_1.ApiTags)('team-members'),
    (0, common_1.Controller)('team-members'),
    __metadata("design:paramtypes", [team_member_service_1.TeamMemberService])
], TeamMemberController);
exports.TeamMemberController = TeamMemberController;
//# sourceMappingURL=team-member.controller.js.map