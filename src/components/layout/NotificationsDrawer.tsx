import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ModuleId } from '../../types';
import { X, Bell, Check, ExternalLink, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { motion, AnimatePresence } from 'motion/react';

export const NotificationsDrawer: React.FC = () => {
  const {
    isNotificationsOpen,
    setNotificationsOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setActiveModule,
  } = useAppStore();

  const handleNavigate = (id: string, moduleLink?: ModuleId) => {
    markNotificationRead(id);
    if (moduleLink) {
      setActiveModule(moduleLink);
      setNotificationsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setNotificationsOpen(false)}
            className="fixed inset-0 bg-[#040B14]/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-[#081426] border-l border-[#1E3452] h-full shadow-2xl z-10 flex flex-col text-slate-100"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#1E3452] flex items-center justify-between bg-[#040B14]/60">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#16C5D8]" />
                <h3 className="font-semibold text-white text-sm">System Notifications</h3>
                <Badge variant="cyan" size="sm">
                  {notifications.filter((n) => !n.read).length} New
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs text-slate-400 hover:text-[#16C5D8] flex items-center gap-1 transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  Mark all read
                </button>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#1E3452]/40">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleNavigate(n.id, n.linkId)}
                    className={`pt-3 first:pt-0 group cursor-pointer p-3 rounded-lg border transition-all ${
                      n.read
                        ? 'bg-[#040B14]/30 border-[#1E3452]/40 opacity-75'
                        : 'bg-[#040B14] border-[#16C5D8]/30 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {n.type === 'approval_required' && (
                          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                        {n.type === 'ai_insight' && (
                          <Sparkles className="w-4 h-4 text-[#16C5D8] shrink-0" />
                        )}
                        {n.type === 'workflow_complete' && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        <h4 className="text-xs font-semibold text-white group-hover:text-[#16C5D8] transition-colors">
                          {n.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{n.timestamp}</span>
                    </div>

                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{n.message}</p>

                    {n.linkId && (
                      <div className="mt-2.5 flex items-center gap-1 text-[11px] font-mono text-[#16C5D8]">
                        <span>Go to module</span>
                        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-xs text-slate-500">
                  No notifications recorded.
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-[#1E3452] bg-[#040B14]/80 text-[11px] text-slate-500 font-mono text-center">
              Aura Lead Intelligence Engine • Real-time Event Stream
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
