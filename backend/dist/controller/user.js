import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TryCatch } from "../utils/TryCatch.js";
import { db } from "../db/index.js";
import { insertUserLoginSchema, insertUserRegisterSchema, users, } from "../db/schema.js";
import { eq } from "drizzle-orm";
export const register = TryCatch(async (req, res) => {
    console.log("registering....");
    const parsed = insertUserRegisterSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            message: parsed.error, // ✅ zod validation error
        });
    }
    console.log("user name and sometinig");
    const { username, email, password } = parsed.data;
    console.log(email);
    const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
    console.log(existingUser);
    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "User already exists with this email",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // ✅ fixed
    const [newUser] = await db
        .insert(users)
        .values({
        username,
        email,
        password: hashedPassword,
    })
        .returning();
    console.log(newUser);
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res
        .status(201)
        .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
    })
        .json({
        success: true,
        message: "User registered successfully",
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        },
    });
});
export const login = TryCatch(async (req, res) => {
    const parsed = insertUserLoginSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            message: parsed.error,
        });
    }
    const { email, password } = parsed.data; // ✅ clean destructure
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "Invalid email or password",
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password",
        });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res
        .status(200)
        .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
    })
        .json({
        success: true,
        message: "Login successfull",
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    });
});
export const myProfile = TryCatch(async (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});
export const logout = TryCatch(async (_, res) => {
    return res
        .status(200)
        .cookie("token", " ", { maxAge: 0 })
        .json({ message: "logged out successfully" });
});
//# sourceMappingURL=user.js.map