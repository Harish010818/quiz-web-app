import { db } from "../db/index.js";
import { quizzes } from "../db/schema.js";
import { TryCatch } from "../utils/TryCatch.js";


export const createQuiz = TryCatch(  async(req, res) => {
        console.log(req.body);  
});


export const getAllQuiz = TryCatch(async (req, res) => {

   let result = await db.select().from(quizzes);
   res.status(200).json({
      success: true,
      count: result.length,
      data: result
   });
});