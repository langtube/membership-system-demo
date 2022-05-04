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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../../common/db/repository");
let UserRepository = class UserRepository {
    constructor() {
        this.repoHelper = new repository_1.LowRepositoryHelper();
    }
    findOne(id) {
        const user = this.repoHelper.db
            .get('users')
            .find((user) => user.id === id)
            .value();
        if (!user) {
            return undefined;
        }
        const userRole = this.repoHelper.db
            .get('roles')
            .find((x) => x.name === user.role)
            .value();
        user.accessTags = Object.assign(Object.assign({}, user.accessTags), userRole === null || userRole === void 0 ? void 0 : userRole.accessTags);
        return user;
    }
    async seed() {
        if (this.repoHelper.db.get('users').size().value() < 1) {
            const users = [
                {
                    id: 'free',
                    email: 'free-user@example.com',
                    role: 'free',
                },
                {
                    id: 'basic',
                    email: 'basic-user@example.com',
                    role: 'basic',
                },
                {
                    id: 'pro',
                    email: 'pro-user@example.com',
                    role: 'pro',
                },
            ];
            this.repoHelper.db
                .get('users')
                .push(...users)
                .write();
        }
        if (this.repoHelper.db.get('roles').size().value() < 1) {
            const roles = [
                {
                    name: 'free',
                },
                {
                    name: 'basic',
                    accessTags: { 'access-team-member': 5 },
                },
                {
                    name: 'pro',
                    accessTags: { 'access-team-member': 10, 'access-workspace': 10 },
                },
            ];
            this.repoHelper.db
                .get('roles')
                .push(...roles)
                .write();
        }
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map