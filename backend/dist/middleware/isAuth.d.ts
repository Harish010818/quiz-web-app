import { type User } from "../db/schema.js";
import type { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    user?: User | null;
}
export declare const isAuth: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=isAuth.d.ts.map