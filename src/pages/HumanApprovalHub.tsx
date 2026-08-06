import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { StatusIndicator } from '../components/ui/StatusIndicator';
import { formatCurrency, formatRelativeTime } from '../lib/utils';
import { ShieldCheck, CheckCircle2, XCircle, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export const HumanApprovalHub: React.FC = () => {
  const { pendingApprovals, approveAction, rejectAction, aiEmployee } = useAppStore();

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              Human-in-the-Loop Approval Hub
            </h1>
            <Badge variant="warning" size="sm" dot>
              {pendingApprovals.length} Pending Sign-offs
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise governance center. Aura AI autonomously prepares actions and waits for explicit executive sign-off before dispatching.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <StatusIndicator status="waiting_approval" pendingCount={pendingApprovals.length} />
        </div>
      </div>

      {/* Main Approval Queue Cards */}
      {pendingApprovals.length > 0 ? (
        <div className="space-y-4">
          {pendingApprovals.map((item) => (
            <Card key={item.id} hoverEffect glow="none" className="border-[#1E3452] bg-[#081426]">
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E3452]/50 pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="warning" size="sm">
                      {item.category}
                    </Badge>
                    <span className="text-xs font-mono text-slate-400">ID: {item.id}</span>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-slate-400">AI Confidence:</span>
                    <span className="text-[#16C5D8] font-bold text-sm">{item.confidenceScore}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <div className="text-xs text-slate-400 flex items-center gap-3 font-mono">
                      <span>Target: <strong className="text-white">{item.companyName}</strong> ({item.companyDomain})</span>
                      <span>Value: <strong className="text-emerald-400">{formatCurrency(item.opportunityValue)}</strong></span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-1.5 mt-3">
                      <div className="text-[11px] font-mono text-[#16C5D8] flex items-center gap-1 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Employee Reasoning & Context Synthesis:
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.aiReasoning}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#0E1E38]/80 border border-[#16C5D8]/30 space-y-1">
                      <div className="text-[11px] font-mono text-amber-400 font-semibold">
                        Proposed Autonomous Execution:
                      </div>
                      <p className="text-xs text-white font-mono">{item.proposedAction}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-4 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Governance Standard</span>
                      <p className="text-xs text-slate-400">
                        Approving this action will trigger downstream API workflows (CRM update / Email dispatch).
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <Button
                        variant="primary"
                        className="w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-semibold"
                        leftIcon={<CheckCircle2 className="w-4 h-4" />}
                        onClick={() => approveAction(item.id)}
                      >
                        Approve Action
                      </Button>
                      <Button
                        variant="danger"
                        className="w-full"
                        leftIcon={<XCircle className="w-4 h-4" />}
                        onClick={() => rejectAction(item.id)}
                      >
                        Reject Action
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white">Approval Queue Empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
            All AI-generated actions have been reviewed and approved by human operators.
          </p>
        </Card>
      )}
    </div>
  );
};
