import React from 'react';
import { Modal } from './Modal';
import { Badge } from './Badge';
import { Button } from './Button';
import { AIReasoningStep } from '../../types';
import { Cpu, CheckCircle2, AlertTriangle, ShieldCheck, Database, ArrowRight, ExternalLink } from 'lucide-react';

interface ReasoningLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  companyName: string;
  confidenceScore: number;
  reasoningSteps: AIReasoningStep[];
  aiReasoning: string;
  onApprove?: () => void;
  onReject?: () => void;
}

export const ReasoningLogModal: React.FC<ReasoningLogModalProps> = ({
  isOpen,
  onClose,
  title,
  companyName,
  confidenceScore,
  reasoningSteps,
  aiReasoning,
  onApprove,
  onReject,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Aura Reasoning Trail — ${companyName}`} maxWidth="max-w-2xl">
      <div className="space-y-6">
        {/* Header Summary */}
        <div className="p-4 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Target Action</span>
            <Badge variant="cyan" size="sm">
              AI Confidence {confidenceScore}%
            </Badge>
          </div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-[#0B1524] p-3 rounded-lg border border-[#1E3452]/60">
            "{aiReasoning}"
          </p>
        </div>

        {/* Step-by-Step Reasoning Trail */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#16C5D8]" />
            Autonomous Decision Logic Trail ({reasoningSteps.length} Steps)
          </h4>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#1E3452]">
            {reasoningSteps.map((step, idx) => (
              <div key={step.id || idx} className="relative group">
                {/* Node Icon */}
                <div
                  className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${
                    step.status === 'passed'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-500/50'
                      : step.status === 'flagged'
                      ? 'bg-amber-950 text-amber-400 border-amber-500/50'
                      : 'bg-cyan-950 text-cyan-400 border-cyan-500/50'
                  }`}
                >
                  {step.status === 'passed' ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                </div>

                <div className="p-3.5 rounded-lg bg-[#0E1E38]/50 border border-[#1E3452]/60 hover:border-[#16C5D8]/40 transition-colors space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white font-mono">{step.stepName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{step.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300">{step.description}</p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#1E3452]/40 text-[10px]">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Database className="w-3 h-3 text-[#16C5D8]" />
                      <span>Data Sources: {step.dataSources.join(', ')}</span>
                    </div>
                    <span className="text-emerald-400 font-mono">
                      Confidence: {step.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#1E3452]/60">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Human Governance Verified</span>
          </div>

          <div className="flex items-center gap-2">
            {onReject && (
              <Button variant="outline" size="sm" onClick={onReject}>
                Reject Action
              </Button>
            )}
            {onApprove ? (
              <Button variant="primary" size="sm" onClick={onApprove} glow>
                Approve Execution
              </Button>
            ) : (
              <Button variant="secondary" size="sm" onClick={onClose}>
                Close Audit Log
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
