import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Badge } from './Badge';
import { Button } from './Button';
import { ReasoningLogModal } from './ReasoningLogModal';
import { Cpu, Zap, Activity, ShieldCheck, ChevronRight, RefreshCw, Eye } from 'lucide-react';

export const AIWorkforceWidget: React.FC = () => {
  const { aiEmployee } = useAppStore();
  const [isLogOpen, setIsLogOpen] = useState(false);

  return (
    <>
      <div className="p-4 rounded-xl aura-glass-card border border-[#1E3452] space-y-3 relative overflow-hidden">
        {/* Background Subtle Gradient Animation */}
        <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-[#16C5D8]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E3452]/60 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={aiEmployee.avatar}
                alt={aiEmployee.name}
                className="w-8 h-8 rounded-full border border-[#16C5D8] object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#020617] animate-ping" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#020617]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-wide">{aiEmployee.name}</span>
                <Badge variant="cyan" size="sm">
                  Autonomous Agent
                </Badge>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">{aiEmployee.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <div className="text-right hidden sm:block">
              <div className="text-slate-400">Processing Speed</div>
              <div className="text-[#16C5D8] font-bold">{aiEmployee.tokensProcessedPerSec} tok/sec</div>
            </div>
            <div className="text-right">
              <div className="text-slate-400">Active Agents</div>
              <div className="text-emerald-400 font-bold">{aiEmployee.activeAgentsCount} Sub-agents</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-[11px] h-7 px-2.5"
              leftIcon={<Eye className="w-3 h-3 text-[#16C5D8]" />}
              onClick={() => setIsLogOpen(true)}
            >
              View Reasoning
            </Button>
          </div>
        </div>

        {/* Live Action Stream Ticker */}
        <div className="flex items-center justify-between gap-2 bg-[#040B14] p-2.5 rounded-lg border border-[#1E3452]/80 text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <Cpu className="w-4 h-4 text-[#E94E97] shrink-0 animate-pulse" />
            <span className="text-slate-300 font-mono text-[11px] truncate">
              <span className="text-[#16C5D8] font-semibold">Active reasoning: </span>
              {aiEmployee.currentAction}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0 text-[10px] text-slate-400 font-mono">
            <Activity className="w-3 h-3 text-emerald-400 animate-spin" />
            <span>98.4% Confidence</span>
          </div>
        </div>
      </div>

      <ReasoningLogModal
        isOpen={isLogOpen}
        onClose={() => setIsLogOpen(false)}
        title="Active Autonomous Reasoning Trail"
        companyName="Stripe / Datadog / Vercel Ingestion"
        confidenceScore={aiEmployee.confidenceScore}
        reasoningSteps={aiEmployee.reasoningSteps}
        aiReasoning={aiEmployee.currentAction}
      />
    </>
  );
};
