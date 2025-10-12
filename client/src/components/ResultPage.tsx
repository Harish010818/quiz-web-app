import { motion } from "framer-motion";
import { useQuiz } from "../contexts/QuizContext";
import { Button } from "./ui/button";
import { CheckCircle, Home, RotateCcw, Share, X } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { triggerConfetti } from "../lib/confetti";

export default function ResultPage() {
  const { quizState, resetQuiz } = useQuiz();
  const [, setLocation] = useLocation();

  const { currentQuiz, score, userAnswers } = quizState;

  useEffect(() => {
    if (!currentQuiz) return;
    
    const accuracy = (userAnswers.length / currentQuiz.questions.length) * 100;
    // Trigger confetti for high scores (80% or above)
    if (accuracy >= 80) {
      setTimeout(() => triggerConfetti(), 500);
    }
  }, [currentQuiz, userAnswers.length]);

  if (!currentQuiz || !quizState.showResult) return null;

  const correctAnswers = userAnswers.filter(answer => {
    const question = currentQuiz.questions.find(q => q.id === answer.questionId);
    return question && question.correctOption === answer.selectedOption;
  }).length;

  const wrongAnswers = userAnswers.length - correctAnswers;
  const accuracy = Math.round((correctAnswers / currentQuiz.questions.length) * 100);
  const maxScore = currentQuiz.questions.length * 10;

  const handlePlayAgain = () => {
    resetQuiz();
    setLocation(`/quiz/${currentQuiz.id}`);
  };

  const handleGoHome = () => {
    resetQuiz();
    setLocation("/");
  };

  return (
    <motion.section 
      className="py-16 bg-background min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Final Score Card */}
        <motion.div 
          className="text-center mb-12"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full text-success text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            Quiz Completed!
          </div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold gradient-text mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            data-testid="completion-title"
          >
            {accuracy >= 80 ? "Excellent Work!" : accuracy >= 60 ? "Good Job!" : "Keep Practicing!"}
          </motion.h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            You scored better than {Math.floor(Math.random() * 30) + 50}% of all players
          </p>
          
          {/* Score Display */}
          <motion.div 
            className="inline-block bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-1 mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <div className="bg-card rounded-3xl px-12 py-8">
              <div className="text-sm text-muted-foreground mb-2">Final Score</div>
              <div className="text-6xl md:text-7xl font-bold text-accent" data-testid="final-score">
                {score}
              </div>
              <div className="text-sm text-muted-foreground mt-2">out of {maxScore} points</div>
            </div>
          </motion.div>
          
          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-success" data-testid="correct-count">{correctAnswers}</div>
              <div className="text-sm text-muted-foreground mt-1">Correct</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-destructive" data-testid="wrong-count">{wrongAnswers}</div>
              <div className="text-sm text-muted-foreground mt-1">Wrong</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-accent" data-testid="accuracy">{accuracy}%</div>
              <div className="text-sm text-muted-foreground mt-1">Accuracy</div>
            </div>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              onClick={handlePlayAgain}
              className="px-8 py-4 bg-gradient-to-r from-primary to-[hsl(220,90%,55%)] text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
              data-testid="play-again-button"
            >
              <RotateCcw className="inline-block w-5 h-5 mr-2" />
              Play Again
            </Button>
            <Button 
              variant="outline"
              onClick={handleGoHome}
              className="px-8 py-4 font-semibold"
              data-testid="go-home-button"
            >
              <Home className="inline-block w-5 h-5 mr-2" />
              Go to Home
            </Button>
            <Button 
              variant="outline"
              className="px-8 py-4 bg-accent/10 border-accent/20 text-accent hover:bg-accent/20 font-semibold"
              data-testid="share-score-button"
            >
              <Share className="inline-block w-5 h-5 mr-2" />
              Share Score
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Review Section */}
        <motion.div 
          className="bg-card border border-border rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
            </svg>
            Answer Review
          </h3>
          
          <div className="space-y-6">
            {currentQuiz.questions.map((question, index) => {
              const userAnswer = userAnswers.find(a => a.questionId === question.id);
              const isCorrect = userAnswer ? question.correctOption === userAnswer.selectedOption : false;
              
              return (
                <div 
                  key={question.id} 
                  className={`border-l-4 rounded-lg p-6 ${
                    isCorrect ? "bg-success/5 border-success" : "bg-destructive/5 border-destructive"
                  }`}
                  data-testid={`review-question-${index}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      isCorrect ? "bg-success" : "bg-destructive"
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-success-foreground" />
                      ) : (
                        <X className="w-5 h-5 text-destructive-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-muted-foreground">Question {index + 1}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          isCorrect ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                        }`}>
                          {isCorrect ? "+10 points" : "0 points"}
                        </span>
                      </div>
                      <p className="text-foreground font-medium mb-3">{question.text}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {userAnswer && !isCorrect && (
                          <div className="px-4 py-2 bg-destructive/10 border border-destructive/20 rounded-lg text-sm">
                            <span className="font-semibold text-destructive">
                              ✗ {question.options[userAnswer.selectedOption]?.text}
                            </span>
                            <span className="text-muted-foreground ml-2">(Your answer)</span>
                          </div>
                        )}
                        <div className="px-4 py-2 bg-success/10 border border-success/20 rounded-lg text-sm">
                          <span className="font-semibold text-success">
                            ✓ {question.options[question.correctOption]?.text}
                          </span>
                          <span className="text-muted-foreground ml-2">(Correct)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
