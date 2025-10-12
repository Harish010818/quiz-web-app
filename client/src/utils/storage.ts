// import { QuizWithQuestions, Attempt } from "@shared/schema";

// const STORAGE_KEYS = {
//   QUIZZES: 'quizmaster_quizzes',
//   ATTEMPTS: 'quizmaster_attempts',
// } as const;

// export interface LocalStorageService {
//   getQuizzes(): QuizWithQuestions[];
//   getQuiz(id: string): QuizWithQuestions | null;
//   saveQuiz(quiz: QuizWithQuestions): void;
//   deleteQuiz(id: string): void;
//   getAttempts(): Attempt[];
//   saveAttempt(attempt: Attempt): void;
//   clear(): void;
// }

// class LocalStorageServiceImpl implements LocalStorageService {
//   getQuizzes(): QuizWithQuestions[] {
//     try {
//       const data = localStorage.getItem(STORAGE_KEYS.QUIZZES);
//       return data ? JSON.parse(data) : [];
//     } catch (error) {
//       console.error('Error loading quizzes from localStorage:', error);
//       return [];
//     }
//   }

//   getQuiz(id: string): QuizWithQuestions | null {
//     const quizzes = this.getQuizzes();
//     return quizzes.find(quiz => quiz.id === id) || null;
//   }

//   saveQuiz(quiz: QuizWithQuestions): void {
//     try {
//       const quizzes = this.getQuizzes();
//       const existingIndex = quizzes.findIndex(q => q.id === quiz.id);
      
//       if (existingIndex >= 0) {
//         quizzes[existingIndex] = quiz;
//       } else {
//         quizzes.push(quiz);
//       }
      
//       localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
//     } catch (error) {
//       console.error('Error saving quiz to localStorage:', error);
//     }
//   }

//   deleteQuiz(id: string): void {
//     try {
//       const quizzes = this.getQuizzes();
//       const filtered = quizzes.filter(quiz => quiz.id !== id);
//       localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(filtered));
//     } catch (error) {
//       console.error('Error deleting quiz from localStorage:', error);
//     }
//   }

//   getAttempts(): Attempt[] {
//     try {
//       const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
//       return data ? JSON.parse(data) : [];
//     } catch (error) {
//       console.error('Error loading attempts from localStorage:', error);
//       return [];
//     }
//   }

//   saveAttempt(attempt: Attempt): void {
//     try {
//       const attempts = this.getAttempts();
//       attempts.push(attempt);
//       localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
//     } catch (error) {
//       console.error('Error saving attempt to localStorage:', error);
//     }
//   }

//   clear(): void {
//     try {
//       localStorage.removeItem(STORAGE_KEYS.QUIZZES);
//       localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
//     } catch (error) {
//       console.error('Error clearing localStorage:', error);
//     }
//   }
// }

// export const localStorageService: LocalStorageService = new LocalStorageServiceImpl();
