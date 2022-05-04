import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { serveReactAppMiddleware } from './common/serve-react-app.middleware';
import { AuthModule } from './features/auth/auth.module';
import { TeamModule } from './features/team/team.module';
import { UserModule } from './features/user/user.module';
import { WorkspaceModule } from './features/workspace/workspace.module';

@Module({
  imports: [UserModule, AuthModule, TeamModule, WorkspaceModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    if (process.env.NODE_ENV === 'production') {
      consumer
        .apply(serveReactAppMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
  }
}
