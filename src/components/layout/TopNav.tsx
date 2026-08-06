import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { StatusIndicator } from '../ui/StatusIndicator';
import { Avatar } from '../ui/Avatar';
import {
  Search,
  Bell,
  PanelLeftClose,
  PanelLeft,
  ChevronRight,
  Building,
  Sparkles,
  ShieldCheck,
  Command,
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const TopNav: React.FC = () => {
  const {
    activeModule,
    isSidebarCollapsed,
    toggleSidebar,
    setCommandMenuOpen,
    toggleNotifications,
    notifications,
    pendingApprovals,
    aiEmployee,
    currentWorkspace,
  } = useAppStore();

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const moduleTitles: Record<string, string> = {
    overview: 'Executive Summary',
    leads: 'Lead Qualification',
    enrichment: 'Company Enrichment',
    scoring: 'Opportunity Scoring',
    outreach: 'Outreach Studio',
    revenue: 'Revenue Prediction',
    recommendations: 'Action Recommendations',
    approvals: 'Human Approval Hub',
    workflows: 'Executed Workflows',
    settings: 'Settings & Integrations',
  };

  return (
    <header className="sticky top-0 z-40 h-14 bg-[#040B14]/90 backdrop-blur-md border-b border-[#1E3452] px-4 lg:px-6 flex items-center justify-between gap-4">
      {/* Left: Sidebar Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#081426] border border-transparent hover:border-[#1E3452] transition-colors"
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isSidebarCollapsed ? (
            <PanelLeft className="w-5 h-5" />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>

        <div className="h-4 w-[1px] bg-[#1E3452]" />

        {/* Breadcrumb path */}
        <div className="flex items-center gap-2 text-xs font-medium">
          <div className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors">
            <Building className="w-3.5 h-3.5 text-[#16C5D8]" />
            <span className="font-mono text-slate-300 truncate max-w-[140px]">
              {currentWorkspace.name}
            </span>
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />

          <span className="text-white font-semibold font-sans">
            {moduleTitles[activeModule] || 'Dashboard'}
          </span>
        </div>
      </div>

      {/* Middle: Global Search Launcher */}
      <div className="hidden md:flex flex-1 max-w-md mx-auto">
        <button
          onClick={() => setCommandMenuOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-[10px] bg-[#081426] border border-[#1E3452] text-xs text-slate-400 hover:border-[#16C5D8]/50 hover:text-slate-200 transition-all shadow-inner group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#16C5D8]" />
            <span>Search leads, enriched entities, workflows...</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] bg-[#040B14] px-1.5 py-0.5 rounded border border-[#1E3452] text-slate-500 group-hover:text-slate-400">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right Actions: AI Employee status, Approval Hub count, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* AI Employee Live Status Indicator */}
        <div className="hidden lg:flex items-center">
          <StatusIndicator status={aiEmployee.status} pendingCount={pendingApprovals.length} size="sm" />
        </div>

        {/* Human Approval Counter Button */}
        {pendingApprovals.length > 0 && (
          <button
            onClick={() => useAppStore.getState().setActiveModule('approvals')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-medium transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-mono">{pendingApprovals.length}</span>
            <span className="hidden xl:inline text-[11px]">Approvals</span>
          </button>
        )}

        {/* Search button for mobile */}
        <button
          onClick={() => setCommandMenuOpen(true)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#081426]"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications Drawer Toggle */}
        <button
          onClick={toggleNotifications}
          className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#081426] border border-transparent hover:border-[#1E3452] transition-colors cursor-pointer"
          title="System Notifications & AI Logs"
        >
          <Bell className="w-5 h-5" />
          {unreadNotifications > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#16C5D8] ring-2 ring-[#040B14] animate-pulse" />
          )}
        </button>

        <div className="h-4 w-[1px] bg-[#1E3452]" />

        {/* User Profile Summary */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            name="Alex Mercer"
            size="sm"
            status="online"
          />
          <div className="hidden xl:flex flex-col text-left text-xs">
            <span className="font-semibold text-slate-200 leading-tight">Alex Mercer</span>
            <span className="text-[10px] text-slate-400 font-mono">VP Revenue Operations</span>
          </div>
        </div>
      </div>
    </header>
  );
};
