import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'pills' | 'underline';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'pills',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 overflow-x-auto no-scrollbar',
        variant === 'pills' && 'p-1 bg-[#040B14] border border-[#1E3452] rounded-[10px]',
        variant === 'underline' && 'border-b border-[#1E3452]',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex items-center gap-2 px-3.5 py-2 text-xs font-medium transition-all duration-150 rounded-lg whitespace-nowrap cursor-pointer select-none',
              variant === 'pills' && [
                isActive
                  ? 'text-[#16C5D8] font-semibold bg-[#081426] border border-[#16C5D8]/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#081426]/50',
              ],
              variant === 'underline' && [
                isActive
                  ? 'text-[#16C5D8] font-semibold'
                  : 'text-slate-400 hover:text-slate-200',
                'rounded-b-none py-2.5',
              ]
            )}
          >
            {tab.icon && <span className="w-4 h-4 text-current">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.2 rounded-full text-[10px] font-mono leading-none',
                  isActive
                    ? 'bg-[#16C5D8]/20 text-[#16C5D8]'
                    : 'bg-[#1E3452] text-slate-400'
                )}
              >
                {tab.badge}
              </span>
            )}

            {variant === 'underline' && isActive && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#16C5D8] rounded-t-full shadow-[0_-2px_8px_rgba(22,197,216,0.6)]"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
