import { useState, useCallback } from 'react';
import { Question, QuizAnswer, QuizState } from '@/types/quiz';
import QuizStart from '@/components/quiz/QuizStart';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import QuizResults from '@/components/quiz/QuizResults';
import questionsData from '@/data/questions.json';

const questions: Question[] = questionsData.questions;

const Index = () => {
  const [quizState, setQuizState] = useState<QuizState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  const handleStart = useCallback(() => {
    setQuizState('playing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  }, []);

  const handleAnswer = useCallback((selectedIndex: number | null, timeSpent: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctIndex;

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedIndex,
      isCorrect,
      timeSpent,
    };

    setAnswers((prev) => [...prev, newAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizState('results');
    }
  }, [currentQuestionIndex]);

  const handleRestart = useCallback(() => {
    setQuizState('start');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {quizState === 'start' && (
        <QuizStart onStart={handleStart} totalQuestions={questions.length} />
      )}
      
      {quizState === 'playing' && (
        <QuizQuestion
          key={questions[currentQuestionIndex].id}
          question={questions[currentQuestionIndex]}
          questionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      )}
      
      {quizState === 'results' && (
        <QuizResults
          questions={questions}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;
