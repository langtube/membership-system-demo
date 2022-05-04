import { PassportSerializer } from '@nestjs/passport';
export declare class SessionSerializer extends PassportSerializer {
    serializeUser(user: any, done: (err: any, id?: any) => void): void;
    deserializeUser(payload: any, done: (err: any, id?: any) => void): void;
}
