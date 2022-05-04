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
exports.RequireAccessTagsGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const access_tags_1 = require("./access-tags");
let RequireAccessTagsGuard = class RequireAccessTagsGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        var _a;
        const requiredAccessTags = this.reflector.get(access_tags_1.ACCESS_TAGS_KEY, context.getHandler()) || [];
        if (requiredAccessTags.length < 1) {
            throw new Error('AccessTags decorator must have at least one tag');
        }
        const req = context.switchToHttp().getRequest();
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.accessTags)) {
            return false;
        }
        return requiredAccessTags.every((t) => {
            return Object.keys(req.user.accessTags).includes(t);
        });
    }
};
RequireAccessTagsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RequireAccessTagsGuard);
exports.RequireAccessTagsGuard = RequireAccessTagsGuard;
//# sourceMappingURL=require-access-tags-guard.js.map