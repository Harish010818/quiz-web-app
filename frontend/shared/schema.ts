

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date | string | null;
}


export interface InsertUser {
  username?: string;
  email: string;
  password?: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  createdAt: Date | string | null;
}

export interface CreateQuiz {
  id?: string;
  title: string;
  category: string;
  difficulty: string;
  questions: {
    text: string;
    options: string[];
    correctOption: number;
  }[];
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
  answers: any; 
  createdAt: Date | string | null;
}

// Relations/Joined Types
export interface QuizWithQuestions extends Quiz {
  questions: (Question & {
    options: Option[];
  })[];
}


export const createQuizSchema = {};