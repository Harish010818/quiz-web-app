import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuiz } from "../contexts/QuizContext";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import QuestionCard from "./QuestionCard";
import ScoreAnimation from "./ScoreAnimation";

export default function QuizPlayer() {
  const { quizState, nextQuestion, previousQuestion, setTimeRemaining } = useQuiz();
  const [showScoreAnimation, setShowScoreAnimation] = useState<{show: boolean, points: number, correct: boolean} | null>(null);
  
  const { currentQuiz, currentQuestionIndex, timeRemaining, userAnswers } = quizState;

  useEffect(() => {
    if (!currentQuiz || quizState.showResult) return;

    const timer = setInterval(() => {
      setTimeRemaining(Math.max(0, timeRemaining - 1));
      
      if (timeRemaining <= 1) {
        nextQuestion();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, currentQuiz, quizState.showResult, setTimeRemaining, nextQuestion]);

  const handleAnswerSelect = (optionIndex: number) => {
    if (!currentQuiz) return;
    
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const isCorrect = currentQuestion.correctOption === optionIndex;
    const points = isCorrect ? 10 : -5;
    
    // Show score animation
    setShowScoreAnimation({
      show: true,
      points,
      correct: isCorrect
    });

    setTimeout(() => {
      setShowScoreAnimation(null);
    }, 2000);
  };

  const handleNextQuestion = () => {nextQuestion()};

  if (!currentQuiz || quizState.showResult) return null;

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
  const selectedAnswer = userAnswers.find(a => a.questionId === currentQuestion.id);

  return (
    <motion.section 
      className="py-16 bg-muted/30 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Fixed Score Badge */}
        <motion.div 
          className="fixed top-24 right-6 z-40"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div className="bg-card border-2 border-primary rounded-2xl px-6 py-4 shadow-lg">
            <div className="text-sm text-muted-foreground mb-1">Score</div>
            <div className="text-3xl font-bold text-accent pulse-animate" data-testid="current-score">
              {quizState.score}
            </div>
          </div>
        </motion.div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-muted-foreground" data-testid="question-counter">
              Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" data-testid="progress-bar" />
        </div>

        {/* Timer */}
        <div className="flex justify-center mb-6">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full"
            animate={{ scale: timeRemaining <= 5 ? [1, 1.05, 1] : 1 }}
            transition={{ repeat: timeRemaining <= 5 ? Infinity : 0, duration: 0.5 }}
          >
            <Clock className="w-5 h-5 text-accent" />
            <span className="font-semibold text-accent" data-testid="time-remaining">
              {timeRemaining}s
            </span>
          </motion.div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <QuestionCard 
            key={currentQuestion.id}
            question={currentQuestion}
            selectedOption={selectedAnswer?.selectedOption}
            onAnswerSelect={handleAnswerSelect}
            handleNextQuestion = {handleNextQuestion}
          />
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2"
            data-testid="previous-question"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </Button>
          
          <Button
            onClick={handleNextQuestion}
            className="flex items-center gap-2"
            data-testid="next-question"
          >
            {currentQuestionIndex === currentQuiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Score Animation */}
        <AnimatePresence>
          {showScoreAnimation && (
            <ScoreAnimation
              points={showScoreAnimation.points}
              correct={showScoreAnimation.correct}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
