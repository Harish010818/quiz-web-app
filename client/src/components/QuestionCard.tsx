import { motion } from "framer-motion";
import type { Question, Option } from "../../../shared/schema";
import { useQuiz } from "../contexts/QuizContext";
import { useEffect } from "react";

interface QuestionCardProps {
  question: Question & { options: Option[] };
  selectedOption?: number;
  onAnswerSelect: (optionIndex: number) => void;
  handleNextQuestion: () => void;
}

const optionLabels = ["A", "B", "C", "D"];

export default function QuestionCard({
  question,
  selectedOption,
  onAnswerSelect,
  handleNextQuestion,
}: QuestionCardProps) {
  const { selectAnswer } = useQuiz();

  useEffect(() => {
    if (selectedOption !== undefined) {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 2200);

      // cleanup in case component unmounts before timeout
      return () => clearTimeout(timer);
    }
  }, [selectedOption, handleNextQuestion]);

 

  const handleOptionClick = (optionIndex: number) => {
    selectAnswer(question.id, optionIndex);
    onAnswerSelect(optionIndex);
  };
    
  

  return (
    <motion.div 
      className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      data-testid="question-card"
    >
      {/* Question Text */}
      <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10" data-testid="question-text">
        {question.text}
      </h3>
      
      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {question.options.map((option, index) => (
          <motion.button
            key={option.id}
            className={`option-btn group relative p-6 border-2 rounded-xl text-left transition-all duration-200 hover:scale-[1.02] ${
              selectedOption === index 
                ? "bg-primary/10 border-primary" 
                : "bg-muted hover:bg-primary/10 border-border hover:border-primary"
            }`}
            onClick={() => handleOptionClick(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-testid={`option-${index}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-all ${
                selectedOption === index 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary"
              }`}>
                {optionLabels[index]}
              </div>
              <span className="font-medium text-foreground text-lg">{option.text}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
