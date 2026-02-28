import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import cors from "cors";
import quizRouter from "./routes/quizRoute.js";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use("/api/v1/quiz", quizRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map