import express from "express";
import { createQuiz, deleteQuiz, getAllQuiz } from "../controller/quiz.js";

const quizRouter = express.Router();

quizRouter.get("/quizzes", getAllQuiz);
quizRouter.post("/create-quiz", createQuiz);
quizRouter.delete("/delete-quiz/:id", deleteQuiz);

export default quizRouter;