import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TryCatch } from "../utils/TryCatch.js";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const register = TryCatch(async (req, res) => {
  const { username, email, password } = req.body;

  // 1. Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Username, email and password are required",
    });
  }

  // 2. Check if user already exists
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User already exists with this email",
    });
  }

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Create user
  const [newUser] = await db
    .insert(users)
    .values({
      username,
      email,
      password: hashedPassword
    })
    .returning();

  // 5. Generate JWT
  const token = jwt.sign(
    { id: newUser!.id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    user: {
      id: newUser!.id,
      username: newUser!.username,
      email: newUser!.email
    },
  });
});


export const login = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  // 2. Find user
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid email or password",         // ✅ don't expose which one is wrong
    });
  }

  // 3. Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // 4. Generate JWT
  const token = jwt.sign(
    { id: user.id},
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    },
  });
});