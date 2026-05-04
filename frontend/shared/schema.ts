// Shared Types for Frontend (React + TypeScript)

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string; // Optional because you might not want to send password to frontend
  createdAt: Date | string | null;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  createdAt: Date | string | null;
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  correctOption: number;
  orderIndex: number;
}

export interface Option {
  id: string;
  questionId: string;
  text: string;
  orderIndex: number;
}

export interface Attempt {
  id: string;
  quizId: string;
  playerName: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number | null;
  answers: {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
  }[];
  createdAt: Date | string | null;
}

// Complex/Joined Types
export interface QuizWithQuestions extends Quiz {
  questions: (Question & {
    options: Option[];
  })[];
}

// Request Body Types (Zod based)
export interface CreateQuizRequest {
  id?: string;
  title: string;
  category: string;
  difficulty: string;
  questions: {
    text: string;
    options: string[]; // Array of strings as per your Zod schema
    correctOption: number;
  }[];
}

export interface UserRegisterRequest {
  username: string;
  email: string;
  password?: string;
}

export interface UserLoginRequest {
  email: string;
  password?: string;
}

// Re-exporting them so your frontend components can use them
// export type { 
//   User, 
//   InsertUser, 
//   Quiz, 
//   InsertQuiz, 
//   Question, 
//   InsertQuestion, 
//   Option, 
//   InsertOption, 
//   Attempt, 
//   InsertAttempt, 
//   CreateQuiz, 
//   QuizWithQuestions 
// };

// export { createQuizSchema };