import { useEffect, useState } from 'react';

interface TimerCircleProps {
  timeLeft: number;
  totalTime: number;
}

const TimerCircle = ({ timeLeft, totalTime }: TimerCircleProps) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / totalTime) * circumference;
  
  const getColor = () => {
    if (timeLeft <= 5) return 'hsl(0, 72%, 55%)';
    if (timeLeft <= 10) return 'hsl(45, 95%, 55%)';
    return 'hsl(250, 85%, 65%)';
  };

  return (
    <div className="relative w-24 h-24 md:w-24 md:h-24">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke="hsl(230, 15%, 25%)"
          strokeWidth="6"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          className="timer-ring"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span 
          className="text-2xl md:text-3xl font-bold transition-colors duration-200"
          style={{ color: getColor() }}
        >
          {timeLeft}
        </span>
      </div>
    </div>
  );
};

export default TimerCircle;
