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
exports.TeamMemberRepository = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../../common");
const repository_1 = require("../../common/db/repository");
const generate_id_1 = require("../../common/generate-id");
let TeamMemberRepository = class TeamMemberRepository {
    constructor() {
        this.repoHelper = new repository_1.LowRepositoryHelper();
    }
    list(ownerId) {
        const members = this.repoHelper.db
            .get('team-members')
            .filter({ ownerId })
            .value();
        return members;
    }
    add(ownerId, email) {
        const alreadyExists = this.repoHelper.db
            .get('team-members')
            .find({ ownerId, email })
            .value();
        if (alreadyExists) {
            throw new common_2.ValidationException([
                {
                    name: 'email',
                    errors: ['Email already exists'],
                },
            ]);
        }
        const member = this.repoHelper.db
            .get('team-members')
            .push({ id: (0, generate_id_1.generateId)(), ownerId, email, createdAt: new Date() })
            .write()[0];
        return member;
    }
    remove(ownerId, id) {
        this.repoHelper.db.get('team-members').remove({ ownerId, id }).write();
        return true;
    }
};
TeamMemberRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TeamMemberRepository);
exports.TeamMemberRepository = TeamMemberRepository;
//# sourceMappingURL=team-member.repository.js.map