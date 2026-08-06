import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'purple' | 'magenta' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  glow?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      glow = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#16C5D8]/50 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-[10px] whitespace-nowrap active:scale-[0.98]';

    const variants = {
      primary:
        'bg-[#16C5D8] text-[#040B14] font-semibold hover:bg-[#16C5D8]/90 hover:shadow-[0_0_20px_rgba(22,197,216,0.35)]',
      secondary:
        'bg-[#081426] text-slate-200 border border-[#1E3452] hover:bg-[#0E1E38] hover:border-[#16C5D8]/40 hover:text-white',
      purple:
        'bg-[#6A4FD9] text-white font-semibold hover:bg-[#6A4FD9]/90 hover:shadow-[0_0_20px_rgba(106,79,217,0.35)]',
      magenta:
        'bg-[#E94E97] text-white font-semibold hover:bg-[#E94E97]/90 hover:shadow-[0_0_20px_rgba(233,78,151,0.35)]',
      outline:
        'bg-transparent border border-[#1E3452] text-slate-300 hover:border-[#16C5D8] hover:text-[#16C5D8] hover:bg-[#16C5D8]/5',
      ghost:
        'bg-transparent text-slate-400 hover:text-white hover:bg-[#081426]',
      danger:
        'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
      md: 'text-sm px-4 py-2 gap-2 h-10',
      lg: 'text-base px-6 py-2.5 gap-2.5 h-12',
      icon: 'p-2 h-9 w-9 text-slate-300',
    };

    const glowStyles = glow ? 'aura-glow-cyan' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], glowStyles, className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
