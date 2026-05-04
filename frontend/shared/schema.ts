
import { z } from 'zod';

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
export type QuizWithQuestions = Quiz & {questions: (Question & { options: Option[] })[]};

export const createQuizSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
  questions: z.array(z.object({
    text: z.string().min(1, "Question text is required"),
    options: z.array(z.string().min(1, "Option text is required")).length(4, "Must have exactly 4 options"),
    correctOption: z.number().min(0).max(3, "Correct option must be between 0-3"),
  })).min(1, "At least one question is required"),
});