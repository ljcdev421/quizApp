import { cn } from '@/lib/utils';

interface OptionButtonProps {
  label: string;
  index: number;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
}

const labels = ['A', 'B', 'C', 'D'];

const OptionButton = ({ label, index, onClick, disabled, selected }: OptionButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "option-card w-full p-4 md:p-5 rounded-xl border-2 text-left",
        "flex items-center gap-4 transition-all duration-200",
        "active:scale-[0.98]",
        disabled && "opacity-50 cursor-not-allowed",
        selected 
          ? "border-primary bg-primary/20" 
          : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
      )}
    >
      <span className={cn(
        "flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center",
        "font-bold text-lg transition-colors duration-200",
        selected 
          ? "bg-primary text-primary-foreground" 
          : "bg-secondary text-muted-foreground"
      )}>
        {labels[index]}
      </span>
      <span className="text-base md:text-lg font-medium text-foreground leading-snug">
        {label}
      </span>
    </button>
  );
};

export default OptionButton;
