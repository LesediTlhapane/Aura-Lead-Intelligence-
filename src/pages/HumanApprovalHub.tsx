import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { StatusIndicator } from '../components/ui/StatusIndicator';
import { ConfidenceMeter } from '../components/ui/ConfidenceMeter';
import { ReasoningLogModal } from '../components/ui/ReasoningLogModal';
import { formatCurrency } from '../lib/utils';
import { ShieldCheck, CheckCircle2, XCircle, Sparkles, HelpCircle, ArrowRight, Eye, Mail, AlertTriangle, FileText } from 'lucide-react';
import { PendingApprovalItem } from '../types';

export const HumanApprovalHub: React.FC = () => {
  const { pendingApprovals, approveAction, rejectAction, aiEmployee } = useAppStore();
  const [selectedItemForAudit, setSelectedItemForAudit] = useState<PendingApprovalItem | null>(null);
  const [expandedPreviewId, setExpandedPreviewId] = useState<string | null>('appr-101');

  const handleApproveAll = () => {
    pendingApprovals.forEach((item) => approveAction(item.id));
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              Human-in-the-Loop Governance & Approval Center
            </h1>
            <Badge variant="warning" size="sm" dot>
              {pendingApprovals.length} Pending Sign-offs
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise governance policy gate. Aura AI prepares actions and holds execution pending human sign-off.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {pendingApprovals.length > 0 && (
            <Button
              variant="primary"
              size="sm"
              glow
              className="bg-emerald-500 text-slate-950 hover:bg-emerald-400"
              leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
              onClick={handleApproveAll}
            >
              Approve All ({pendingApprovals.length}) Actions
            </Button>
          )}
        </div>
      </div>

      {/* Main Approval Queue */}
      {pendingApprovals.length > 0 ? (
        <div className="space-y-4">
          {pendingApprovals.map((item) => (
            <Card key={item.id} hoverEffect className="border-[#1E3452] bg-[#081426]">
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E3452]/50 pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="warning" size="sm">
                      {item.category}
                    </Badge>
                    <Badge variant={item.riskScore === 'Low' ? 'success' : 'warning'} size="sm">
                      Risk: {item.riskScore || 'Low'}
                    </Badge>
                    <span className="text-xs font-mono text-slate-400">Ref ID: {item.id}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      leftIcon={<Eye className="w-3 h-3 text-[#16C5D8]" />}
                      onClick={() => setSelectedItemForAudit(item)}
                    >
                      Audit AI Reasoning Trail
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left 2 cols: Action details & reasoning */}
                  <div className="lg:col-span-2 space-y-3">
                    <h3 className="text-base font-bold text-white">{item.title}</h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
                      <span>Target: <strong className="text-white">{item.companyName}</strong> ({item.companyDomain})</span>
                      <span>ARR Value: <strong className="text-emerald-400">{formatCurrency(item.opportunityValue)}</strong></span>
                      {item.targetContact && (
                        <span>Contact: <strong className="text-[#16C5D8]">{item.targetContact.name} ({item.targetContact.title})</strong></span>
                      )}
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-1.5">
                      <div className="text-[11px] font-mono text-[#16C5D8] flex items-center gap-1.5 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Agent Context & Reasoning:
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-mono">{item.aiReasoning}</p>
                    </div>

                    {/* Email Preview Accordion if present */}
                    {item.emailPreview && (
                      <div className="space-y-2">
                        <button
                          onClick={() => setExpandedPreviewId(expandedPreviewId === item.id ? null : item.id)}
                          className="flex items-center gap-2 text-xs font-mono text-[#16C5D8] hover:underline cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{expandedPreviewId === item.id ? 'Hide Email Draft Preview' : 'Show Email Draft Preview'}</span>
                        </button>

                        {expandedPreviewId === item.id && (
                          <div className="p-4 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-2 text-xs font-sans">
                            <div className="text-slate-400 font-mono text-[11px]">
                              Subject: <span className="text-white font-semibold">{item.emailPreview.subject}</span>
                            </div>
                            <div className="text-slate-300 whitespace-pre-line leading-relaxed border-t border-[#1E3452]/60 pt-2">
                              {item.emailPreview.body}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Col: Confidence & Approval Buttons */}
                  <div className="flex flex-col justify-between p-4 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-4">
                    <ConfidenceMeter score={item.confidenceScore} label="AI Action Confidence" size="md" />

                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Human Governance Check</span>
                      <p className="text-[11px] text-slate-400">
                        Approving executes API webhook and commits changes to CRM.
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
        <Card className="p-12 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white">All Actions Approved</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto font-mono">
            All AI employee actions have been reviewed and signed off by human operators.
          </p>
        </Card>
      )}

      {/* Reasoning Trail Modal */}
      {selectedItemForAudit && (
        <ReasoningLogModal
          isOpen={!!selectedItemForAudit}
          onClose={() => setSelectedItemForAudit(null)}
          title={selectedItemForAudit.title}
          companyName={selectedItemForAudit.companyName}
          confidenceScore={selectedItemForAudit.confidenceScore}
          reasoningSteps={selectedItemForAudit.reasoningSteps || []}
          aiReasoning={selectedItemForAudit.aiReasoning}
          onApprove={() => {
            approveAction(selectedItemForAudit.id);
            setSelectedItemForAudit(null);
          }}
          onReject={() => {
            rejectAction(selectedItemForAudit.id);
            setSelectedItemForAudit(null);
          }}
        />
      )}
    </div>
  );
};
