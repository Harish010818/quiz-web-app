import { useEffect } from "react" ;
import { useQuery } from "@tanstack/react-query" ;
import { useParams } from "wouter" ;
import type { QuizWithQuestions } from "../../shared/schema" ;
import { useQuiz } from "../contexts/QuizContext" ;
import Navbar from "../components/Navbar" ;
import QuizPlayer from "../components/QuizPlayer" ;
import ResultPage from "../components/ResultPage" ;
import { sampleQuizQus } from "../data/sampleDataWithQus" ;

export default function Quiz() {

  const { id } = useParams<{ id: string }>();
  const { quizState, startQuiz } = useQuiz();

  const { data: fetchQuiz, isLoading, error } = useQuery<QuizWithQuestions>({
    queryKey: ["/api/quizzes", id],
    enabled: !!id,
  });
  
  const quiz: QuizWithQuestions = fetchQuiz ?? sampleQuizQus.find((q) => q.id === id) as QuizWithQuestions;  
  console.log(quiz);
  
  useEffect(() => {
    if (quiz && !quizState.currentQuiz) {
      startQuiz(quiz);
    }
  }, [quiz, quizState.currentQuiz, startQuiz]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center space-y-4">
            <div className="skeleton w-64 h-8 rounded mx-auto" />
            <div className="skeleton w-48 h-6 rounded mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (error && !quiz) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Quiz Not Found</h1>
            <p className="text-muted-foreground">The quiz you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {quizState.showResult ? (
        <ResultPage />
      ) : (
        <QuizPlayer />
      )}
    </div>
  );
}