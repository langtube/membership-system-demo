"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireSigninGuard = void 0;
const common_1 = require("@nestjs/common");
class RequireSigninGuard {
    canActivate(context) {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        try {
            if (request.isAuthenticated()) {
                return true;
            }
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
}
exports.RequireSigninGuard = RequireSigninGuard;
//# sourceMappingURL=require-signin-guard.js.map