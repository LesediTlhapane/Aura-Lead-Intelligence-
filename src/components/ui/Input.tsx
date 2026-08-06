import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  shortcutKey?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, shortcutKey, type, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
            <span>{label}</span>
            {shortcutKey && (
              <span className="text-[10px] font-mono text-slate-500 bg-[#081426] px-1.5 py-0.5 rounded border border-[#1E3452]">
                {shortcutKey}
              </span>
            )}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center shrink-0">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'w-full bg-[#040B14] border border-[#1E3452] rounded-[10px] text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-150',
              'focus:outline-none focus:border-[#16C5D8] focus:ring-1 focus:ring-[#16C5D8]/40',
              'disabled:cursor-not-allowed disabled:opacity-50',
              leftIcon ? 'pl-9' : 'pl-3.5',
              rightIcon || shortcutKey ? 'pr-12' : 'pr-3.5',
              'py-2',
              error && 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/30',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && !shortcutKey && (
            <div className="absolute right-3 text-slate-400 flex items-center shrink-0">
              {rightIcon}
            </div>
          )}
          {shortcutKey && !rightIcon && (
            <div className="absolute right-3 pointer-events-none text-[10px] font-mono text-slate-500 bg-[#081426] px-1.5 py-0.5 rounded border border-[#1E3452]">
              {shortcutKey}
            </div>
          )}
        </div>
        {error ? (
          <span className="text-xs text-rose-400">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-slate-500">{helperText}</span>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';
