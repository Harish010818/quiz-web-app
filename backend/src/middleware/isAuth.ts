import jwt from "jsonwebtoken";
import { users, type User } from "../db/schema.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import type { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  user?: User | null;
}
 
export const isAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  //const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  const token = req.cookies.token as string; 

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "User is Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

    if (!decoded) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }
    
    const user = await db.select().from(users).where(eq(users.id, decoded.id));
    req.user = user[0] || null;
    
    next();

  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
