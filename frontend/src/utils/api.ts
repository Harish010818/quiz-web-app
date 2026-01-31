// import { apiRequest } from "@/lib/queryClient";
// import { QuizWithQuestions, CreateQuiz, Attempt } from "@shared/schema";
// import { localStorageService } from "./storage";

// export class ApiService {
//   private static fallbackToLocalStorage = false;

//   static async getQuizzes(): Promise<QuizWithQuestions[]> {
//     try {
//       const response = await apiRequest("GET", "/api/quizzes");
//       return await response.json();
//     } catch (error) {
//       console.warn("API failed, falling back to localStorage:", error);
//       this.fallbackToLocalStorage = true;
//       return localStorageService.getQuizzes();
//     }
//   }

//   static async getQuiz(id: string): Promise<QuizWithQuestions | null> {
//     try {
//       if (this.fallbackToLocalStorage) {
//         return localStorageService.getQuiz(id);
//       }
      
//       const response = await apiRequest("GET", `/api/quizzes/${id}`);
//       return await response.json();
//     } catch (error) {
//       console.warn("API failed, falling back to localStorage:", error);
//       this.fallbackToLocalStorage = true;
//       return localStorageService.getQuiz(id);
//     }
//   }

//   static async createQuiz(quiz: CreateQuiz): Promise<QuizWithQuestions> {
//     try {
//       if (this.fallbackToLocalStorage) {
//         // Generate a quiz with questions from the create data
//         const newQuiz: QuizWithQuestions = {
//           id: crypto.randomUUID(),
//           title: quiz.title,
//           category: quiz.category,
//           difficulty: quiz.difficulty,
//           createdAt: new Date(),
//           questions: quiz.questions.map((q, qIndex) => ({
//             id: crypto.randomUUID(),
//             quizId: '', // Will be set after quiz creation
//             text: q.text,
//             correctOption: q.correctOption,
//             orderIndex: qIndex,
//             options: q.options.map((optionText, oIndex) => ({
//               id: crypto.randomUUID(),
//               questionId: '', // Will be set after question creation
//               text: optionText,
//               orderIndex: oIndex,
//             })),
//           })),
//         };

//         // Set the quiz ID for questions and question IDs for options
//         newQuiz.questions.forEach(question => {
//           question.quizId = newQuiz.id;
//           question.options.forEach(option => {
//             option.questionId = question.id;
//           });
//         });

//         localStorageService.saveQuiz(newQuiz);
//         return newQuiz;
//       }
      
//       const response = await apiRequest("POST", "/api/quizzes", quiz);
//       return await response.json();
//     } catch (error) {
//       console.warn("API failed, falling back to localStorage:", error);
//       this.fallbackToLocalStorage = true;
//       return this.createQuiz(quiz); // Retry with localStorage
//     }
//   }

//   static async deleteQuiz(id: string): Promise<void> {
//     try {
//       if (this.fallbackToLocalStorage) {
//         localStorageService.deleteQuiz(id);
//         return;
//       }
      
//       await apiRequest("DELETE", `/api/quizzes/${id}`);
//     } catch (error) {
//       console.warn("API failed, falling back to localStorage:", error);
//       this.fallbackToLocalStorage = true;
//       localStorageService.deleteQuiz(id);
//     }
//   }

//   static async saveAttempt(attempt: Omit<Attempt, 'id' | 'createdAt'>): Promise<void> {
//     try {
//       if (this.fallbackToLocalStorage) {
//         const fullAttempt: Attempt = {
//           ...attempt,
//           id: crypto.randomUUID(),
//           createdAt: new Date(),
//         };
//         localStorageService.saveAttempt(fullAttempt);
//         return;
//       }
      
//       await apiRequest("POST", `/api/quizzes/${attempt.quizId}/attempts`, attempt);
//     } catch (error) {
//       console.warn("API failed, falling back to localStorage:", error);
//       this.fallbackToLocalStorage = true;
//       const fullAttempt: Attempt = {
//         ...attempt,
//         id: crypto.randomUUID(),
//         createdAt: new Date(),
//       };
//       localStorageService.saveAttempt(fullAttempt);
//     }
//   }

//   static async getLeaderboard(): Promise<Attempt[]> {
//     try {
//       if (this.fallbackToLocalStorage) {
//         const attempts = localStorageService.getAttempts();
//         return attempts.sort((a, b) => b.score - a.score).slice(0, 10);
//       }
      
//       const response = await apiRequest("GET", "/api/leaderboard");
//       return await response.json();
//     } catch (error) {
//       console.warn("API failed, falling back to localStorage:", error);
//       this.fallbackToLocalStorage = true;
//       const attempts = localStorageService.getAttempts();
//       return attempts.sort((a, b) => b.score - a.score).slice(0, 10);
//     }
//   }
// }
