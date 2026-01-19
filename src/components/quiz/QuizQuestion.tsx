import { useEffect, useState, useCallback } from 'react';
import { Question } from '@/types/quiz';
import TimerCircle from './TimerCircle';
import ProgressBar from './ProgressBar';
import OptionButton from './OptionButton';

interface QuizQuestionProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (selectedIndex: number | null, timeSpent: number) => void;
}

const QUESTION_TIME = 20;

const QuizQuestion = ({ question, questionIndex, totalQuestions, onAnswer }: QuizQuestionProps) => {
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = useCallback((index: number | null) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedIndex(index);
    const timeSpent = QUESTION_TIME - timeLeft;
    
    setTimeout(() => {
      onAnswer(index, timeSpent);
    }, 300);
  }, [isAnswered, timeLeft, onAnswer]);

  useEffect(() => {
    setTimeLeft(QUESTION_TIME);
    setSelectedIndex(null);
    setIsAnswered(false);
  }, [question.id]);

  useEffect(() => {
    if (isAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAnswered, handleAnswer]);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 slide-in">
      <div className="max-w-2xl w-full mx-auto flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <ProgressBar current={questionIndex} total={totalQuestions} />
        </div>

        {/* Timer and Question */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <TimerCircle timeLeft={timeLeft} totalTime={QUESTION_TIME} />
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-center leading-relaxed">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="grid gap-3">
            {question.options.map((option, index) => (
              <OptionButton
                key={index}
                label={option}
                index={index}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
                selected={selectedIndex === index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
