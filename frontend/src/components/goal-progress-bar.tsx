import React from 'react';

interface GoalProgressBarProps {
  current: number;
  target: number;
  label?: string;
  className?: string;
}

export const GoalProgressBar: React.FC<GoalProgressBarProps> = ({
  current,
  target,
  label,
  className = ''
}) => {
  const percentage = Math.min((current / target) * 100, 100);
  const isComplete = current >= target;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">{label}</span>
          <span className={isComplete ? 'text-green-600' : 'text-gray-600'}>
            {current.toLocaleString()} / {target.toLocaleString()} STX
          </span>
        </div>
      )}
      
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-300 ${
            isComplete 
              ? 'bg-green-500' 
              : percentage > 75 
                ? 'bg-blue-500' 
                : percentage > 50 
                  ? 'bg-yellow-500' 
                  : 'bg-gray-400'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs mt-1 text-gray-500">
        <span>{percentage.toFixed(1)}% complete</span>
        {isComplete && <span className="text-green-600 font-medium">🎉 Goal achieved!</span>}
      </div>
    </div>
  );
};
