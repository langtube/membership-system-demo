"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport = require("passport");
const session = require("express-session");
const app_module_1 = require("./app.module");
const common_2 = require("./common");
async function bootstrap() {
    const logger = new common_1.Logger('api:bootstrap');
    (0, dotenv_1.config)();
    const apiGlobalPrefix = process.env.API_GLOBAL_PREFIX;
    if (!apiGlobalPrefix) {
        throw new Error('请设置环境变量 API_GLOBAL_PREFIX');
    }
    const sessionCookieName = process.env.SESSION_COOKIE_NAME;
    if (!sessionCookieName) {
        throw new Error('请设置环境变量 SESSION_COOKIE_NAME');
    }
    const sessionSecret = process.env.SESSION_SECRET;
    if (!sessionSecret) {
        throw new Error('请设置环境变量 SESSION_SECRET');
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix(apiGlobalPrefix);
    app.use(session({
        cookie: {
            path: '/',
            httpOnly: true,
            signed: false,
        },
        name: sessionCookieName,
        resave: false,
        secret: sessionSecret,
        saveUninitialized: true,
        proxy: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.useGlobalPipes(new common_1.ValidationPipe({
        stopAtFirstError: true,
        whitelist: true,
        transform: true,
        exceptionFactory: common_2.validationExceptionFactory,
    }));
    const { httpAdapter } = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new common_2.GlobalExceptionsFilter(httpAdapter));
    (0, common_2.setupSwagger)(app);
    if (process.env.NODE_ENV === 'development') {
        app.enableCors({
            credentials: true,
            origin: ['http://localhost:3000'],
        });
    }
    await app.listen(3003, '0.0.0.0');
    logger.log('http server listen on : http://localhost:3003');
}
bootstrap();
//# sourceMappingURL=main.js.map