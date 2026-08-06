import React from 'react';
import { cn } from '../../lib/utils';
import { AIStatusState } from '../../types';
import { Bot, ShieldCheck, Zap, PauseCircle } from 'lucide-react';

export interface StatusIndicatorProps {
  status: AIStatusState;
  showIcon?: boolean;
  showText?: boolean;
  pendingCount?: number;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  showIcon = true,
  showText = true,
  pendingCount = 0,
  className,
  size = 'md',
}) => {
  const config = {
    autonomous: {
      label: 'Autonomous Active',
      bgColor: 'bg-[#16C5D8]/10',
      borderColor: 'border-[#16C5D8]/40',
      textColor: 'text-[#16C5D8]',
      dotColor: 'bg-[#16C5D8]',
      glow: 'shadow-[0_0_12px_rgba(22,197,216,0.4)]',
      icon: <Bot className="w-3.5 h-3.5 text-[#16C5D8]" />,
    },
    waiting_approval: {
      label: pendingCount > 0 ? `Waiting Approval (${pendingCount})` : 'Waiting Approval',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/40',
      textColor: 'text-amber-400',
      dotColor: 'bg-amber-400',
      glow: 'shadow-[0_0_12px_rgba(245,158,11,0.4)]',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />,
    },
    executing: {
      label: 'Executing Workflow',
      bgColor: 'bg-[#6A4FD9]/10',
      borderColor: 'border-[#6A4FD9]/40',
      textColor: 'text-[#a391f7]',
      dotColor: 'bg-[#6A4FD9]',
      glow: 'shadow-[0_0_12px_rgba(106,79,217,0.4)]',
      icon: <Zap className="w-3.5 h-3.5 text-[#a391f7]" />,
    },
    idle: {
      label: 'Standby / Idle',
      bgColor: 'bg-slate-800/40',
      borderColor: 'border-slate-700',
      textColor: 'text-slate-400',
      dotColor: 'bg-slate-500',
      glow: '',
      icon: <PauseCircle className="w-3.5 h-3.5 text-slate-400" />,
    },
  };

  const current = config[status] || config.idle;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-medium transition-all select-none',
        current.bgColor,
        current.borderColor,
        current.textColor,
        current.glow,
        size === 'sm' && 'px-2 py-0.5 text-[11px]',
        className
      )}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className={cn(
            'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
            current.dotColor
          )}
        />
        <span className={cn('relative inline-flex rounded-full h-2 w-2', current.dotColor)} />
      </span>

      {showIcon && current.icon}
      {showText && <span>{current.label}</span>}
    </div>
  );
};
