import { db } from "../db/index.js";
import { createQuizSchema, options, questions, quizzes } from "../db/schema.js";
import { TryCatch } from "../utils/TryCatch.js";
import { eq } from "drizzle-orm";
export const createQuiz = TryCatch(async (req, res) => {
    const quizData = createQuizSchema.parse(req.body);
    const [newQuiz] = await db
        .insert(quizzes)
        .values({
        title: quizData.title,
        category: quizData.category,
        difficulty: quizData.difficulty,
    })
        .returning();
    const quiz = newQuiz;
    const questionsWithOptions = [];
    for (const [i, questionData] of quizData.questions.entries()) {
        const [newQuestion] = await db
            .insert(questions)
            .values({
            quizId: quiz.id,
            text: questionData.text,
            correctOption: questionData.correctOption,
            orderIndex: i,
        })
            .returning();
        const question = newQuestion;
        const optionsData = questionData.options.map((opt, index) => ({
            questionId: question.id,
            text: opt,
            orderIndex: index,
        }));
        const newOptions = await db.insert(options).values(optionsData).returning();
        questionsWithOptions.push({ ...question, options: newOptions });
    }
    res.status(201).json({
        success: true,
        data: {
            ...quiz,
            questions: questionsWithOptions,
        },
    });
});
export const deleteQuiz = TryCatch(async (req, res) => {
    const quizId = req.params.id;
    await db.delete(quizzes).where(eq(quizzes.id, quizId));
    res.status(200).json({
        success: true,
        message: "Quiz deleted successfully..."
    });
});
export const editQuiz = TryCatch(async (req, res) => {
    const quizId = req.params.id;
    res.status(200).json({
        success: true
    });
});
export const getAllQuiz = TryCatch(async (req, res) => {
    const allQuizzes = await db.select().from(quizzes);
    const result = [];
    for (const quiz of allQuizzes) {
        const questionResult = [];
        const allQuestions = await db
            .select()
            .from(questions)
            .where(eq(questions.quizId, quiz.id))
            .orderBy(questions.orderIndex); // ✅ use orderIndex from your schema
        for (const question of allQuestions) {
            const allOptions = await db
                .select()
                .from(options)
                .where(eq(options.questionId, question.id))
                .orderBy(options.orderIndex); // ✅ use orderIndex from your schema
            questionResult.push({
                text: question.text, // ✅ maps to text col
                options: allOptions.map(o => o.text), // ✅ string[] sorted by orderIndex
                correctOption: question.correctOption, // ✅ maps to correct_option col
            });
        }
        result.push({
            id: quiz.id,
            title: quiz.title,
            category: quiz.category,
            difficulty: quiz.difficulty,
            questions: questionResult,
        });
    }
    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
});
//# sourceMappingURL=quiz.js.map