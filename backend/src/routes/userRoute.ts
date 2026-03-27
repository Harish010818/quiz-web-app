import express from "express";
import { login, logout, myProfile, register } from "../controller/user.js";
import { isAuth } from "../middleware/isAuth.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/me", isAuth, myProfile);
userRouter.get("/logout", logout);  

export default userRouter;