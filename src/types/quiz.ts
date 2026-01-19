export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface QuizAnswer {
  questionId: number;
  selectedIndex: number | null;
  isCorrect: boolean;
  timeSpent: number;
}

export type QuizState = 'start' | 'playing' | 'results';
