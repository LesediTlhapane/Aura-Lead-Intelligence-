import React from 'react';

interface ConfidenceMeterProps {
  score: number; // 0 to 100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  score,
  label = 'AI Confidence',
  size = 'md',
  showPercentage = true,
}) => {
  const normalizedScore = Math.min(100, Math.max(0, score));

  // Determine color scheme based on confidence
  let strokeGradient = 'from-emerald-500 to-teal-400';
  let badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  
  if (normalizedScore < 70) {
    strokeGradient = 'from-rose-500 to-amber-500';
    badgeColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  } else if (normalizedScore < 85) {
    strokeGradient = 'from-amber-400 to-cyan-400';
    badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  }

  const heightClass = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2';

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16C5D8] animate-pulse"></span>
          {label}
        </span>
        {showPercentage && (
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${badgeColor}`}>
            {normalizedScore.toFixed(1)}%
          </span>
        )}
      </div>
      
      <div className={`w-full bg-[#040B14] rounded-full overflow-hidden border border-[#1E3452]/50 ${heightClass}`}>
        <div
          className={`h-full bg-gradient-to-r ${strokeGradient} transition-all duration-700 ease-out rounded-full`}
          style={{ width: `${normalizedScore}%` }}
        />
      </div>
    </div>
  );
};
