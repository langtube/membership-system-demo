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
exports.WorkspacesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../auth/decorators");
const workspace_dto_1 = require("./workspace.dto");
const workspace_service_1 = require("./workspace.service");
let WorkspacesController = class WorkspacesController {
    constructor(service) {
        this.service = service;
    }
    list(req) {
        const ownerId = req.user.id;
        return this.service.list(ownerId);
    }
    add(dto, req) {
        const ownerId = req.user.id;
        return this.service.add(ownerId, dto.name);
    }
    remove(dto, req) {
        const ownerId = req.user.id;
        return this.service.remove(ownerId, dto.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(decorators_1.RequireAccessTagsGuard),
    (0, decorators_1.AccessTags)('access-workspace'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkspacesController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(decorators_1.RequireAccessTagsGuard),
    (0, decorators_1.AccessTags)('access-workspace'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [workspace_dto_1.AddWorkspaceDto, Object]),
    __metadata("design:returntype", void 0)
], WorkspacesController.prototype, "add", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(decorators_1.RequireAccessTagsGuard),
    (0, decorators_1.AccessTags)('access-workspace'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [workspace_dto_1.DeleteWorkspaceDto, Object]),
    __metadata("design:returntype", void 0)
], WorkspacesController.prototype, "remove", null);
WorkspacesController = __decorate([
    (0, swagger_1.ApiTags)('workspaces'),
    (0, common_1.Controller)('workspaces'),
    __metadata("design:paramtypes", [workspace_service_1.WorkspaceService])
], WorkspacesController);
exports.WorkspacesController = WorkspacesController;
//# sourceMappingURL=workspace.controller.js.map