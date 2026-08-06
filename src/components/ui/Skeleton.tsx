import React from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'card' | 'avatar' | 'button' | 'table-row';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'text',
  ...props
}) => {
  if (variant === 'card') {
    return (
      <div
        className={cn(
          'rounded-[12px] border border-[#1E3452] bg-[#081426] p-5 space-y-4 animate-pulse',
          className
        )}
        {...props}
      >
        <div className="h-4 bg-[#1E3452]/60 rounded w-1/3" />
        <div className="h-8 bg-[#1E3452]/80 rounded w-2/3" />
        <div className="h-3 bg-[#1E3452]/40 rounded w-full" />
      </div>
    );
  }

  if (variant === 'table-row') {
    return (
      <div className={cn('flex items-center gap-4 py-3 px-4 animate-pulse border-b border-[#1E3452]/40', className)} {...props}>
        <div className="w-8 h-8 bg-[#1E3452]/80 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-[#1E3452]/80 rounded w-1/4" />
          <div className="h-2.5 bg-[#1E3452]/40 rounded w-1/2" />
        </div>
        <div className="h-6 bg-[#1E3452]/60 rounded w-16" />
        <div className="h-6 bg-[#1E3452]/60 rounded w-20" />
      </div>
    );
  }

  if (variant === 'avatar') {
    return (
      <div
        className={cn('rounded-full bg-[#1E3452]/80 animate-pulse shrink-0', className)}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn('bg-[#1E3452]/70 rounded animate-pulse h-4 w-full', className)}
      {...props}
    />
  );
};
