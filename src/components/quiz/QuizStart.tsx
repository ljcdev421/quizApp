import { Play, Clock, Target, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizStartProps {
  onStart: () => void;
  totalQuestions: number;
}

const QuizStart = ({ onStart, totalQuestions }: QuizStartProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center scale-in">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <HelpCircle className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Quiz Challenge
          </h1>
          <p className="text-muted-foreground text-lg">
            Testez vos connaissances !
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4">
            <Target className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{totalQuestions}</p>
            <p className="text-sm text-muted-foreground">Questions</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold">20s</p>
            <p className="text-sm text-muted-foreground">Par question</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-8">
          <h3 className="font-semibold mb-2">Règles du jeu</h3>
          <ul className="text-sm text-muted-foreground text-left space-y-2">
            <li>• Chaque bonne réponse vaut 1 point</li>
            <li>• Vous avez 20 secondes par question</li>
            <li>• Pas de réponse = 0 point</li>
          </ul>
        </div>

        <Button 
          onClick={onStart}
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          <Play className="w-5 h-5 mr-2" />
          Commencer le Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizStart;
