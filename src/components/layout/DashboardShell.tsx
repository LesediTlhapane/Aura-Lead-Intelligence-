import React from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { ApprovalBanner } from './ApprovalBanner';
import { NotificationsDrawer } from './NotificationsDrawer';
import { CommandMenu } from '../ui/CommandMenu';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';

export interface DashboardShellProps {
  children: React.ReactNode;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  const { isSidebarCollapsed } = useAppStore();

  return (
    <div className="min-h-screen bg-[#040B14] text-slate-100 flex font-sans selection:bg-[#16C5D8]/30 selection:text-[#16C5D8]">
      {/* Collapsible Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Container Area */}
      <div
        className={cn(
          'flex-1 flex flex-col min-w-0 transition-all duration-300',
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        )}
      >
        {/* Human-in-the-Loop Governance Alert Banner */}
        <ApprovalBanner />

        {/* Sticky Header Navigation */}
        <TopNav />

        {/* Dynamic Page Outlet Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>

      {/* Global Slide-over Drawers & Dialogs */}
      <NotificationsDrawer />
      <CommandMenu />
    </div>
  );
};
