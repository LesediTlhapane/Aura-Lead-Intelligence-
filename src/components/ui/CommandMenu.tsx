import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ModuleId } from '../../types';
import {
  Search,
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
  X,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CommandMenu: React.FC = () => {
  const { isCommandMenuOpen, setCommandMenuOpen, setActiveModule, pendingApprovals } = useAppStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandMenuOpen(!isCommandMenuOpen);
      }
      if (e.key === 'Escape' && isCommandMenuOpen) {
        setCommandMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandMenuOpen, setCommandMenuOpen]);

  const commandItems: {
    id: ModuleId;
    title: string;
    category: string;
    icon: React.ReactNode;
    shortcut?: string;
  }[] = [
    {
      id: 'overview',
      title: 'Executive Intelligence Summary',
      category: 'Core Modules',
      icon: <LayoutDashboard className="w-4 h-4 text-[#16C5D8]" />,
      shortcut: 'G O',
    },
    {
      id: 'leads',
      title: 'Autonomous Lead Qualification',
      category: 'Core Modules',
      icon: <UserCheck className="w-4 h-4 text-[#16C5D8]" />,
      shortcut: 'G L',
    },
    {
      id: 'enrichment',
      title: 'Company & Firmographic Enrichment',
      category: 'Core Modules',
      icon: <Building2 className="w-4 h-4 text-[#16C5D8]" />,
      shortcut: 'G E',
    },
    {
      id: 'scoring',
      title: 'Opportunity Scoring & Intent Engine',
      category: 'Intelligence',
      icon: <TrendingUp className="w-4 h-4 text-[#6A4FD9]" />,
      shortcut: 'G S',
    },
    {
      id: 'outreach',
      title: 'Outreach & Sequence Studio',
      category: 'Intelligence',
      icon: <Send className="w-4 h-4 text-[#6A4FD9]" />,
      shortcut: 'G C',
    },
    {
      id: 'revenue',
      title: 'Revenue & Forecast Predictions',
      category: 'Intelligence',
      icon: <PieChart className="w-4 h-4 text-[#6A4FD9]" />,
      shortcut: 'G R',
    },
    {
      id: 'recommendations',
      title: 'AI Action Recommendations',
      category: 'Governance',
      icon: <Lightbulb className="w-4 h-4 text-[#E94E97]" />,
      shortcut: 'G A',
    },
    {
      id: 'approvals',
      title: `Human Approval Hub (${pendingApprovals.length})`,
      category: 'Governance',
      icon: <ShieldAlert className="w-4 h-4 text-amber-400" />,
      shortcut: 'G H',
    },
    {
      id: 'workflows',
      title: 'Executed Workflows & Audit Trail',
      category: 'Governance',
      icon: <Zap className="w-4 h-4 text-[#E94E97]" />,
      shortcut: 'G W',
    },
    {
      id: 'settings',
      title: 'Workspace Settings & API Integrations',
      category: 'System',
      icon: <Settings className="w-4 h-4 text-slate-400" />,
      shortcut: 'G S',
    },
  ];

  const filtered = commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (id: ModuleId) => {
    setActiveModule(id);
    setCommandMenuOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isCommandMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandMenuOpen(false)}
            className="fixed inset-0 bg-[#040B14]/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl rounded-[12px] border border-[#1E3452] bg-[#081426] shadow-2xl z-10 overflow-hidden aura-glow-cyan"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1E3452]">
              <Search className="w-5 h-5 text-[#16C5D8] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search modules..."
                className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setCommandMenuOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Command Results */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#1E3452]/40">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs hover:bg-[#0E1E38] hover:text-white transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-[#040B14] border border-[#1E3452] shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-medium text-slate-200 group-hover:text-[#16C5D8] transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-slate-500">{item.category}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.shortcut && (
                        <span className="text-[10px] font-mono text-slate-500 bg-[#040B14] px-1.5 py-0.5 rounded border border-[#1E3452]">
                          {item.shortcut}
                        </span>
                      )}
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#16C5D8] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-slate-500">
                  No matching commands found.
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="px-4 py-2 bg-[#040B14] border-t border-[#1E3452] text-[11px] text-slate-500 flex items-center justify-between font-mono">
              <span>Use ↑↓ to navigate</span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
