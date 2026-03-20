import express from "express";
import { login, register } from "../controller/user.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/login", myProfile);

export default userRouter;