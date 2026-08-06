import React from 'react';
import { Card, CardContent } from './Card';
import { Badge } from './Badge';
import { cn, formatPercentage } from '../../lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changePeriod?: string;
  icon?: React.ReactNode;
  iconColor?: 'cyan' | 'purple' | 'magenta' | 'orange';
  subtitle?: string;
  glow?: 'none' | 'cyan' | 'purple' | 'magenta';
  badgeLabel?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changePeriod = 'vs last period',
  icon,
  iconColor = 'cyan',
  subtitle,
  glow = 'none',
  badgeLabel,
  className,
}) => {
  const iconBgClasses = {
    cyan: 'bg-[#16C5D8]/10 text-[#16C5D8] border-[#16C5D8]/30',
    purple: 'bg-[#6A4FD9]/10 text-[#6A4FD9] border-[#6A4FD9]/30',
    magenta: 'bg-[#E94E97]/10 text-[#E94E97] border-[#E94E97]/30',
    orange: 'bg-[#F68B3C]/10 text-[#F68B3C] border-[#F68B3C]/30',
  };

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <Card hoverEffect glow={glow} className={cn('relative overflow-hidden', className)}>
      <CardContent className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">
            {title}
          </span>
          {icon && (
            <div
              className={cn(
                'p-2 rounded-lg border flex items-center justify-center shrink-0',
                iconBgClasses[iconColor]
              )}
            >
              {icon}
            </div>
          )}
        </div>

        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-sans">
            {value}
          </h2>
          {badgeLabel && (
            <Badge variant={iconColor} size="sm">
              {badgeLabel}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-[#1E3452]/40 text-xs">
          {change !== undefined ? (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  'inline-flex items-center font-semibold text-xs gap-0.5 px-1.5 py-0.5 rounded',
                  isPositive && 'text-emerald-400 bg-emerald-500/10',
                  isNegative && 'text-rose-400 bg-rose-500/10',
                  !isPositive && !isNegative && 'text-slate-400 bg-slate-800'
                )}
              >
                {isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : isNegative ? (
                  <TrendingDown className="w-3.5 h-3.5" />
                ) : (
                  <Minus className="w-3.5 h-3.5" />
                )}
                {formatPercentage(change)}
              </span>
              <span className="text-slate-500 text-[11px]">{changePeriod}</span>
            </div>
          ) : (
            <span className="text-slate-500 text-[11px]">{subtitle || 'Updated live by Aura AI'}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
