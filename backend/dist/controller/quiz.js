import { db } from "../db/index.js";
import { quizzes } from "../db/schema.js";
import { TryCatch } from "../utils/TryCatch.js";
export const createQuiz = TryCatch(async (req, res) => {
    import { db } from "../db";
    import { quizzes, questions } from "../schema";
    import { createQuizSchema } from "../validators";
    import { TryCatch } from "../utils/TryCatch";
    export const createQuizController = TryCatch(async (req, res) => {
        // 1️⃣ Validate
        const parsed = createQuizSchema.parse(req.body);
        const { title, category, difficulty, questions: questionData } = parsed;
        // 2️⃣ Insert quiz
        const [newQuiz] = await db.insert(quizzes)
            .values({
            title,
            category,
            difficulty,
        })
            .returning(); // important
        // 3️⃣ Insert questions
        const formattedQuestions = questionData.map((q) => ({
            quizId: newQuiz.id,
            text: q.text,
            options: JSON.stringify(q.options), // store as JSON
            correctOption: q.correctOption,
        }));
        await db.insert(questions).values(formattedQuestions);
        res.status(201).json({
            success: true,
            message: "Quiz created successfully",
            quizId: newQuiz.id,
        });
    });
});
export const getAllQuiz = TryCatch(async (req, res) => {
    let result = await db.select().from(quizzes);
    res.status(200).json({
        success: true,
        count: result.length,
        data: result
    });
});
//# sourceMappingURL=quiz.js.map