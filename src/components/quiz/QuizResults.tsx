import { useState } from 'react';
import { Question, QuizAnswer } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { RotateCcw, Check, X, Clock, ChevronDown, ChevronUp, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizResultsProps {
  questions: Question[];
  answers: QuizAnswer[];
  onRestart: () => void;
}

const QuizResults = ({ questions, answers, onRestart }: QuizResultsProps) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  const score = answers.filter(a => a.isCorrect).length;
  const percentage = Math.round((score / questions.length) * 100);
  
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return 'Excellent ! 🎉';
    if (percentage >= 60) return 'Bien joué ! 👏';
    if (percentage >= 40) return 'Pas mal ! 💪';
    return 'Continuez à pratiquer ! 📚';
  };

  const correct = answers.filter(a => a.isCorrect).length;
  const incorrect = answers.filter(a => a.selectedIndex !== null && !a.isCorrect).length;
  const unanswered = answers.filter(a => a.selectedIndex === null).length;

  return (
    <div className="min-h-screen p-4 md:p-6 scale-in">
      <div className="max-w-2xl mx-auto">
        {/* Score Card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Quiz Terminé !</h1>
          <p className="text-muted-foreground mb-6">{getScoreMessage()}</p>
          
          <div className={cn("text-6xl md:text-7xl font-bold mb-2", getScoreColor())}>
            {score}/{questions.length}
          </div>
          <p className="text-muted-foreground">{percentage}% de bonnes réponses</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-success/10 border border-success/30 rounded-xl p-4 text-center">
            <Check className="w-6 h-6 text-success mx-auto mb-1" />
            <p className="text-2xl font-bold text-success">{correct}</p>
            <p className="text-xs text-muted-foreground">Correctes</p>
          </div>
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-center">
            <X className="w-6 h-6 text-destructive mx-auto mb-1" />
            <p className="text-2xl font-bold text-destructive">{incorrect}</p>
            <p className="text-xs text-muted-foreground">Incorrectes</p>
          </div>
          <div className="bg-muted border border-border rounded-xl p-4 text-center">
            <Clock className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
            <p className="text-2xl font-bold text-muted-foreground">{unanswered}</p>
            <p className="text-xs text-muted-foreground">Sans réponse</p>
          </div>
        </div>

        {/* Questions Review */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Revue des questions</h2>
          <div className="space-y-3">
            {questions.map((question, index) => {
              const answer = answers[index];
              const isExpanded = expandedId === question.id;
              
              return (
                <div 
                  key={question.id}
                  className="bg-card border border-border rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : question.id)}
                    className="w-full p-4 flex items-center gap-3 text-left hover:bg-secondary/50 transition-colors"
                  >
                    <div className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                      answer.isCorrect 
                        ? "bg-success/20 text-success" 
                        : answer.selectedIndex === null 
                          ? "bg-muted text-muted-foreground"
                          : "bg-destructive/20 text-destructive"
                    )}>
                      {answer.isCorrect ? (
                        <Check className="w-4 h-4" />
                      ) : answer.selectedIndex === null ? (
                        <Clock className="w-4 h-4" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                    </div>
                    <span className="flex-1 font-medium text-sm md:text-base line-clamp-1">
                      Q{index + 1}. {question.question}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-border">
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={cn(
                              "p-3 rounded-lg text-sm",
                              optIndex === question.correctIndex 
                                ? "bg-success/20 border border-success/40"
                                : answer.selectedIndex === optIndex 
                                  ? "bg-destructive/20 border border-destructive/40"
                                  : "bg-secondary"
                            )}
                          >
                            <div className="flex items-center gap-2">
                              {optIndex === question.correctIndex && (
                                <Check className="w-4 h-4 text-success flex-shrink-0" />
                              )}
                              {answer.selectedIndex === optIndex && optIndex !== question.correctIndex && (
                                <X className="w-4 h-4 text-destructive flex-shrink-0" />
                              )}
                              <span>{option}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {answer.selectedIndex === null && (
                        <p className="mt-3 text-sm text-muted-foreground italic">
                          Temps écoulé - Aucune réponse sélectionnée
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Restart Button */}
        <Button 
          onClick={onRestart}
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Rejouer
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
