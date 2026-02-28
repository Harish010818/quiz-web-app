import express from "express";
import { createQuiz, getAllQuiz } from "../controller/quiz.js";
const quizRouter = express.Router();
quizRouter.post("/create-quiz", createQuiz);
quizRouter.get("/quizzes", getAllQuiz);
export default quizRouter;
//# sourceMappingURL=quizRoute.js.map