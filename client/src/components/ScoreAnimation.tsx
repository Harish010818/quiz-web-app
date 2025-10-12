import { motion } from "framer-motion";

interface ScoreAnimationProps {
  points: number;
  correct: boolean;
}

export default function ScoreAnimation({ points, correct }: ScoreAnimationProps) {
  return (
    <motion.div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
      initial={{ opacity: 1, scale: 0.8, y: 0 }}
      animate={{ 
        opacity: 0, 
        scale: 1.2, 
        y: -50,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      data-testid="score-animation"
    >
      <div className={`text-6xl font-bold ${correct ? 'text-green-500' : 'text-red-600'}`}>
        {points > 0 ? '+' : ''}{points}
      </div>
    </motion.div>
  );
}
