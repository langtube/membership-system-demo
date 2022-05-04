import { Request as ExpressRequest } from 'express';
export declare class UserController {
    prifile(req: ExpressRequest): Promise<import("./user.modal").User>;
}
