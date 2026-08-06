import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'cyan' | 'purple' | 'magenta' | 'orange' | 'success' | 'warning' | 'danger' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'cyan', size = 'md', dot = false, children, ...props }, ref) => {
    const variants = {
      cyan: 'bg-[#16C5D8]/10 text-[#16C5D8] border-[#16C5D8]/30',
      purple: 'bg-[#6A4FD9]/10 text-[#a391f7] border-[#6A4FD9]/30',
      magenta: 'bg-[#E94E97]/10 text-[#E94E97] border-[#E94E97]/30',
      orange: 'bg-[#F68B3C]/10 text-[#F68B3C] border-[#F68B3C]/30',
      success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      danger: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      neutral: 'bg-[#1E3452]/40 text-slate-300 border-[#1E3452]',
      outline: 'bg-transparent text-slate-400 border-[#1E3452]',
    };

    const dotColors = {
      cyan: 'bg-[#16C5D8]',
      purple: 'bg-[#6A4FD9]',
      magenta: 'bg-[#E94E97]',
      orange: 'bg-[#F68B3C]',
      success: 'bg-emerald-400',
      warning: 'bg-amber-400',
      danger: 'bg-rose-400',
      neutral: 'bg-slate-400',
      outline: 'bg-slate-400',
    };

    const sizes = {
      sm: 'text-[10px] px-2 py-0.5 gap-1 font-mono tracking-wide',
      md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border whitespace-nowrap leading-none select-none transition-all',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0 animate-pulse', dotColors[variant])} />}
        <span>{children}</span>
      </div>
    );
  }
);
Badge.displayName = 'Badge';
