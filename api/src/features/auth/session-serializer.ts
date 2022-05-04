import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * 将这个类防到容器后，@nestjs/passord 会自动获取使用
 */
@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: any, id?: any) => void): void {
    done(null, user);
  }

  deserializeUser(payload: any, done: (err: any, id?: any) => void): void {
    done(null, payload);
  }
}
