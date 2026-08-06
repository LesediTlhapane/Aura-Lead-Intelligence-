import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ShieldAlert, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const ApprovalBanner: React.FC = () => {
  const { pendingApprovals, setActiveModule, approveAction, rejectAction } = useAppStore();

  if (pendingApprovals.length === 0) return null;

  const topItem = pendingApprovals[0];

  return (
    <div className="bg-gradient-to-r from-amber-500/15 via-[#081426] to-[#081426] border-b border-amber-500/30 px-4 lg:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs z-30 shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-amber-400 font-semibold shrink-0">
          <ShieldAlert className="w-4 h-4 animate-pulse" />
          <span>Human-in-the-Loop AI Governance:</span>
        </div>

        <Badge variant="warning" size="sm" dot>
          {pendingApprovals.length} Actions Pending Approval
        </Badge>

        <div className="hidden md:flex items-center gap-2 text-slate-300 truncate max-w-xl">
          <span className="text-slate-500 font-mono">Top Item:</span>
          <span className="font-medium text-white">{topItem.title}</span>
          <span className="text-slate-400 font-mono">({topItem.companyName} • ${topItem.opportunityValue.toLocaleString()})</span>
          <span className="text-[#16C5D8] font-mono text-[11px]">AI Confidence: {topItem.confidenceScore}%</span>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto shrink-0">
        <button
          onClick={() => approveAction(topItem.id)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors font-medium text-[11px]"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Quick Approve
        </button>
        <button
          onClick={() => rejectAction(topItem.id)}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-colors font-medium text-[11px]"
        >
          <XCircle className="w-3.5 h-3.5" />
          Reject
        </button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setActiveModule('approvals')}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          className="text-amber-300 border-amber-500/40 hover:bg-amber-500/10 h-7 text-xs"
        >
          View All ({pendingApprovals.length})
        </Button>
      </div>
    </div>
  );
};
