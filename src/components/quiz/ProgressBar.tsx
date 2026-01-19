interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const progress = ((current) / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">Question {current + 1} sur {total}</span>
        <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
