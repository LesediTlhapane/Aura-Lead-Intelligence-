import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ModuleId, NavItem } from '../../types';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  UserCheck,
  Building2,
  TrendingUp,
  Send,
  PieChart,
  Lightbulb,
  ShieldAlert,
  Zap,
  Settings,
  Sparkles,
  Bot,
  Activity,
  Layers,
  ChevronDown,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    isSidebarCollapsed,
    pendingApprovals,
    aiEmployee,
    currentWorkspace,
  } = useAppStore();

  const navCategories: { title: string; items: NavItem[] }[] = [
    {
      title: 'CORE MODULES',
      items: [
        {
          id: 'overview',
          label: 'Executive Summary',
          iconName: 'LayoutDashboard',
          description: 'Platform status & revenue metrics',
          category: 'core',
        },
        {
          id: 'leads',
          label: 'Lead Qualification',
          iconName: 'UserCheck',
          badgeCount: 142,
          description: 'Autonomous lead scoring & intent',
          category: 'core',
        },
        {
          id: 'enrichment',
          label: 'Company Enrichment',
          iconName: 'Building2',
          description: 'Firmographic & technographic profiles',
          category: 'core',
        },
      ],
    },
    {
      title: 'INTELLIGENCE',
      items: [
        {
          id: 'scoring',
          label: 'Opportunity Scoring',
          iconName: 'TrendingUp',
          description: 'Deal velocity & win probability',
          category: 'intelligence',
        },
        {
          id: 'outreach',
          label: 'Outreach Studio',
          iconName: 'Send',
          badgeCount: 8,
          description: 'AI email drafts & cadence engine',
          category: 'intelligence',
        },
        {
          id: 'revenue',
          label: 'Revenue Prediction',
          iconName: 'PieChart',
          description: 'AI pipeline forecasting models',
          category: 'intelligence',
        },
      ],
    },
    {
      title: 'GOVERNANCE & EXECUTION',
      items: [
        {
          id: 'recommendations',
          label: 'Action Recommendations',
          iconName: 'Lightbulb',
          description: 'Next best action for reps',
          category: 'governance',
        },
        {
          id: 'approvals',
          label: 'Human Approval Hub',
          iconName: 'ShieldAlert',
          badgeCount: pendingApprovals.length,
          description: 'Human-in-the-loop signoff queue',
          category: 'governance',
        },
        {
          id: 'workflows',
          label: 'Executed Workflows',
          iconName: 'Zap',
          description: 'Completed automated actions & logs',
          category: 'governance',
        },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        {
          id: 'settings',
          label: 'Settings & Integrations',
          iconName: 'Settings',
          description: 'API keys, CRM sync & tenants',
          category: 'system',
        },
      ],
    },
  ];

  const getIcon = (iconName: string, active: boolean) => {
    const props = { className: cn('w-4 h-4 shrink-0 transition-colors', active ? 'text-[#16C5D8]' : 'text-slate-400') };
    switch (iconName) {
      case 'LayoutDashboard':
        return <LayoutDashboard {...props} />;
      case 'UserCheck':
        return <UserCheck {...props} />;
      case 'Building2':
        return <Building2 {...props} />;
      case 'TrendingUp':
        return <TrendingUp {...props} />;
      case 'Send':
        return <Send {...props} />;
      case 'PieChart':
        return <PieChart {...props} />;
      case 'Lightbulb':
        return <Lightbulb {...props} />;
      case 'ShieldAlert':
        return <ShieldAlert {...props} className={cn(props.className, active ? 'text-amber-400' : 'text-amber-500/80')} />;
      case 'Zap':
        return <Zap {...props} />;
      case 'Settings':
        return <Settings {...props} />;
      default:
        return <Layers {...props} />;
    }
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-50 h-screen bg-[#040B14] border-r border-[#1E3452] flex flex-col transition-all duration-300 select-none overflow-hidden',
        isSidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="h-14 border-b border-[#1E3452] flex items-center justify-between px-4 shrink-0 bg-[#081426]/50">
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => setActiveModule('overview')}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#16C5D8] via-[#6A4FD9] to-[#E94E97] p-[1.5px] shadow-[0_0_15px_rgba(22,197,216,0.3)] shrink-0 flex items-center justify-center">
            <div className="w-full h-full bg-[#040B14] rounded-[10.5px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#16C5D8]" />
            </div>
          </div>

          {!isSidebarCollapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-base tracking-wider font-sans leading-none flex items-center gap-1">
                AURA
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#16C5D8]/20 text-[#16C5D8] border border-[#16C5D8]/30 font-semibold">
                  v2.4
                </span>
              </span>
              <span className="text-[9px] text-slate-400 tracking-widest font-mono font-medium mt-0.5">
                LEAD INTELLIGENCE
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
        {navCategories.map((category, idx) => (
          <div key={idx} className="space-y-1">
            {!isSidebarCollapsed && (
              <div className="px-3 text-[10px] font-mono font-semibold text-slate-500 tracking-wider">
                {category.title}
              </div>
            )}

            {category.items.map((item) => {
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  title={isSidebarCollapsed ? `${item.label}: ${item.description}` : undefined}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-[10px] text-xs font-medium transition-all duration-150 cursor-pointer group text-left relative',
                    isActive
                      ? 'bg-[#081426] text-white border border-[#16C5D8]/40 shadow-sm aura-glow-cyan'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-[#081426]/60 border border-transparent'
                  )}
                >
                  {getIcon(item.iconName, isActive)}

                  {!isSidebarCollapsed && (
                    <span className="flex-1 truncate font-sans">{item.label}</span>
                  )}

                  {!isSidebarCollapsed && item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <span
                      className={cn(
                        'px-1.5 py-0.5 rounded-full text-[10px] font-mono font-semibold shrink-0',
                        item.id === 'approvals'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse'
                          : 'bg-[#16C5D8]/15 text-[#16C5D8] border border-[#16C5D8]/30'
                      )}
                    >
                      {item.badgeCount}
                    </span>
                  )}

                  {isSidebarCollapsed && item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#16C5D8]" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer: AI Employee Agent Status Card */}
      <div className="p-3 border-t border-[#1E3452] bg-[#081426]/80 shrink-0">
        {!isSidebarCollapsed ? (
          <div className="p-3 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#6A4FD9]/20 border border-[#6A4FD9]/40 flex items-center justify-center text-[#a391f7]">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white leading-tight">
                    {aiEmployee.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {aiEmployee.role}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#16C5D8] font-semibold">
                {aiEmployee.confidenceScore}% Acc
              </span>
            </div>

            <div className="text-[11px] text-slate-300 leading-snug line-clamp-2 bg-[#081426] p-2 rounded-lg border border-[#1E3452]/50">
              <span className="text-[#16C5D8] font-mono">Current Task:</span>{' '}
              {aiEmployee.currentAction}
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-[#1E3452]/40">
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-[#16C5D8] animate-pulse" />
                {aiEmployee.activeTasksCount} Tasks Active
              </span>
              <span className="text-emerald-400 font-medium">HITL Ready</span>
            </div>
          </div>
        ) : (
          <div
            className="w-10 h-10 mx-auto rounded-xl bg-[#040B14] border border-[#1E3452] flex items-center justify-center text-[#16C5D8] relative cursor-pointer"
            title={`${aiEmployee.name}: ${aiEmployee.currentAction}`}
          >
            <Bot className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#16C5D8] ring-2 ring-[#040B14] animate-ping" />
          </div>
        )}
      </div>
    </aside>
  );
};
