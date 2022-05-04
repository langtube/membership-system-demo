"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const serve_react_app_middleware_1 = require("./common/serve-react-app.middleware");
const auth_module_1 = require("./features/auth/auth.module");
const team_module_1 = require("./features/team/team.module");
const user_module_1 = require("./features/user/user.module");
const workspace_module_1 = require("./features/workspace/workspace.module");
let AppModule = class AppModule {
    configure(consumer) {
        if (process.env.NODE_ENV === 'production') {
            consumer
                .apply(serve_react_app_middleware_1.serveReactAppMiddleware)
                .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
        }
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, auth_module_1.AuthModule, team_module_1.TeamModule, workspace_module_1.WorkspaceModule],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map