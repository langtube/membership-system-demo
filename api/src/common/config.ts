import { config as envSetup } from 'dotenv';

export function setupConfig() {
  envSetup();

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

  return { apiGlobalPrefix, sessionCookieName, sessionSecret };
}
