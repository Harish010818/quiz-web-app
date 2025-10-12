import { createContext, useContext, useState } from "react";
import type {ReactNode} from "react";
import type { QuizWithQuestions, Attempt } from "../../../shared/schema";

interface QuizState {
  currentQuiz: QuizWithQuestions | null;
  currentQuestionIndex: number;
  userAnswers: Array<{ questionId: string; selectedOption: number }>;
  score: number;
  timeRemaining: number;
  showResult: boolean;
}

interface QuizContextType {
  quizState: QuizState;
  startQuiz: (quiz: QuizWithQuestions) => void;
  selectAnswer: (questionId: string, optionIndex: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  finishQuiz: () => Attempt | null;
  resetQuiz: () => void;
  setTimeRemaining: (time: number) => void;
}

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuiz: null,
    currentQuestionIndex: 0,
    userAnswers: [],
    score: 0,
    timeRemaining: 0,
    showResult: false,
  });

  const startQuiz = (quiz: QuizWithQuestions) => {
    setQuizState({
      currentQuiz: quiz,
      currentQuestionIndex: 0,
      userAnswers: [],
      score: 0,
      timeRemaining: 20, // 20 seconds per question
      showResult: false,
    });
  };

  const selectAnswer = (questionId: string, optionIndex: number) => {
    setQuizState(prev => {
      const existingAnswerIndex = prev.userAnswers.findIndex(
        answer => answer.questionId === questionId
      );

      let newAnswers;
      if (existingAnswerIndex >= 0) {
        newAnswers = [...prev.userAnswers];
        newAnswers[existingAnswerIndex] = { questionId, selectedOption: optionIndex };
      } else {
        newAnswers = [...prev.userAnswers, { questionId, selectedOption: optionIndex }];
      }

      // Calculate score based on correct answers
      let newScore = 0;
      if (prev.currentQuiz) {
        newAnswers.forEach(answer => {
          const question = prev.currentQuiz!.questions.find(q => q.id === answer.questionId);
          if (question && question.correctOption === answer.selectedOption) {
              newScore += 10;
            } else {
              if(newScore !== 0){
                 newScore -= 5;
             }
          } 
        });
      }

      return {
        ...prev,
        userAnswers: newAnswers,
        score: newScore,
      };
    });
  };

  const nextQuestion = () => {
    setQuizState(prev => {
      if (!prev.currentQuiz) return prev;
      
      const nextIndex = prev.currentQuestionIndex + 1;
      if (nextIndex >= prev.currentQuiz.questions.length) {
        return { ...prev, showResult: true };
      }
      
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        timeRemaining: 20, // Reset timer for next question
      };
    });
  };

  const previousQuestion = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1),
      timeRemaining: 20,
    }));
  };

  const finishQuiz = (): Attempt | null => {
    if (!quizState.currentQuiz) return null;

    const answers = quizState.userAnswers.map(answer => {
      const question = quizState.currentQuiz!.questions.find(q => q.id === answer.questionId);
      return {
        questionId: answer.questionId,
        selectedOption: answer.selectedOption,
        isCorrect: question ? question.correctOption === answer.selectedOption : false,
      };
    });

    const correctAnswers = answers.filter(a => a.isCorrect).length;
    
    const attempt: Partial<Attempt> = {
      quizId: quizState.currentQuiz.id,
      playerName: "Anonymous", // In a real app, this would come from user auth
      score: quizState.score,
      totalQuestions: quizState.currentQuiz.questions.length,
      correctAnswers,
      answers,
    };

    setQuizState(prev => ({ ...prev, showResult: true }));
    return attempt as Attempt;
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuiz: null,
      currentQuestionIndex: 0,
      userAnswers: [],
      score: 0,
      timeRemaining: 0,
      showResult: false,
    });
  };

  const setTimeRemaining = (time: number) => {
    setQuizState(prev => ({ ...prev, timeRemaining: time }));
  };

  return (
    <QuizContext.Provider value={{
      quizState,
      startQuiz,
      selectAnswer,
      nextQuestion,
      previousQuestion,
      finishQuiz,
      resetQuiz,
      setTimeRemaining,
    }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
