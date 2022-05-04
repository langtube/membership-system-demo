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
exports.WorkspaceRepository = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../../common/db/repository");
const generate_id_1 = require("../../common/generate-id");
let WorkspaceRepository = class WorkspaceRepository {
    constructor() {
        this.repoHelper = new repository_1.LowRepositoryHelper();
    }
    list(ownerId) {
        const data = this.repoHelper.db
            .get('workspaces')
            .filter({ ownerId })
            .value();
        return data;
    }
    add(ownerId, name) {
        const data = this.repoHelper.db
            .get('workspaces')
            .push({ id: (0, generate_id_1.generateId)(), ownerId, name, createdAt: new Date() })
            .write()[0];
        return data;
    }
    remove(ownerId, id) {
        this.repoHelper.db.get('workspaces').remove({ ownerId, id }).write();
        return true;
    }
};
WorkspaceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WorkspaceRepository);
exports.WorkspaceRepository = WorkspaceRepository;
//# sourceMappingURL=workspace.repository.js.map