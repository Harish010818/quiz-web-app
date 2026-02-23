import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import  type { Quiz } from "../../shared/schema";
import { Clock, Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { sampleQuizData } from "../data/sampleData";

const categoryIcons = {
  Science: "🧪",
  History: "📚", 
  Geography: "🌍",
  Astronomy: "🌟",
  Technology: "💻",
};

const categoryColors = {
  Science: "from-blue-500 to-blue-600",
  History: "from-amber-500 to-amber-600", 
  Geography: "from-green-500 to-green-600",
  Astronomy: "from-purple-500 to-purple-600",
  Technology: "from-cyan-500 to-cyan-600",
};

interface QuizListProps {
  onEdit?: (quiz: Quiz) => void;
  onDelete?: (quizId: string) => void;
  showAdminActions?: boolean;
}

export default function QuizList({ onEdit, onDelete, showAdminActions = false }: QuizListProps) {
  const { data: fetchedQuizzes, isLoading, error } = useQuery<Quiz[]>({
    queryKey: ["/api/quizzes"],
  }); 

  const quizzes: Quiz[] = fetchedQuizzes ?? sampleQuizData;

  if (isLoading) {
    return (
      <section id="quizzes" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="skeleton w-12 h-12 rounded-lg mb-4" />
                <div className="skeleton w-3/4 h-6 rounded mb-2" />
                <div className="skeleton w-full h-4 rounded mb-4" />
                <div className="skeleton w-1/2 h-4 rounded mb-4" />
                <div className="skeleton w-full h-10 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && !quizzes) {
    return (
      <section id="quizzes" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-destructive" data-testid="error-message">Failed to load quizzes. Please try again.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="quizzes" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Available Quizzes</h2>
            <p className="text-muted-foreground">Choose a quiz to test your knowledge</p>
          </div>
          {showAdminActions && (
            <Link href="/admin">
              <Button className="flex items-center gap-2" data-testid="create-quiz-button">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Create Quiz
              </Button>
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes?.map((quiz) => (
            <div key={quiz.id} className="quiz-card  bg-card border border-border rounded-xl p-7 shadow-sm hover:shadow-md cursor-pointer view-enter" data-testid={`quiz-card-${quiz.id}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${categoryColors[quiz.category as keyof typeof categoryColors] || 'from-gray-500 to-gray-600'} flex items-center justify-center text-white text-2xl`}>
                  {categoryIcons[quiz.category as keyof typeof categoryIcons] || '❓'}
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full" data-testid={`quiz-question-count-${quiz.id}`}>
                  Questions Available
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2" data-testid={`quiz-title-${quiz.id}`}>
                {quiz.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                Test your knowledge in {quiz.category.toLowerCase()}
              </p>
              
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>~15 min</span>
                <span className="mx-2">•</span>
                <span className={`${quiz.difficulty=== 'hard' ? "text-red-600" 
                     : quiz.difficulty === 'medium' ? "text-yellow-600" 
                     : "text-green-600"} font-semibold`}>{quiz.difficulty}</span>
              </div>
              
              <div className="flex gap-2">
                <Link href={`/quiz/${quiz.id}`} className="flex-1">
                  <Button className="w-full" data-testid={`play-quiz-${quiz.id}`}>
                    Play Quiz
                  </Button>
                </Link>
                
                {showAdminActions && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit?.(quiz)}
                      aria-label="Edit quiz"
                      data-testid={`edit-quiz-${quiz.id}`}
                    >
                      <Edit className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDelete?.(quiz.id)}
                      className="hover:bg-destructive/10 hover:border-destructive"
                      aria-label="Delete quiz"
                      data-testid={`delete-quiz-${quiz.id}`}
                    >
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {quizzes?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg" data-testid="no-quizzes-message">
              No quizzes available yet. 
              {showAdminActions && (
                <Link href="/admin" className="text-primary hover:underline ml-1">
                  Create your first quiz!
                </Link>
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
