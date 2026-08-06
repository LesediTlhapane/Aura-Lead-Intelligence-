import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Send, Sparkles, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';

export const OutreachStudio: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Send className="w-6 h-6 text-[#6A4FD9]" />
              Outreach & Sequence Studio
            </h1>
            <Badge variant="purple" size="sm">
              AI Personalized Drafting
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous multi-channel outreach drafting with strict human sign-off governance before delivery.
          </p>
        </div>

        <Button variant="primary" size="sm" glow leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#040B14]" />}>
          Draft Next Batch
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#16C5D8]" />
              Draft Preview: C-Level Strategic Sequence
            </CardTitle>
            <CardDescription>Prepared for Sarah Lin (VP RevOps @ Linear Systems)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="space-y-1 bg-[#040B14] p-3 rounded-lg border border-[#1E3452] font-mono">
              <div className="text-slate-400"><span className="text-[#16C5D8]">Subject:</span> Scaling Linear's Q3 revenue operations with autonomous lead scoring</div>
              <div className="text-slate-400"><span className="text-[#16C5D8]">To:</span> s.lin@linear.app</div>
            </div>

            <div className="p-4 rounded-lg bg-[#040B14] border border-[#1E3452] text-slate-200 leading-relaxed font-sans space-y-3">
              <p>Hi Sarah,</p>
              <p>
                Noticed Linear recently added 3 VP Sales leaders to drive your enterprise expansion. With incoming lead volume surging, managing qualification latency becomes critical.
              </p>
              <p>
                Aura AI automatically enriches firmographics and predicts deal velocity before your team schedules the first demo call—reducing manual SDR triage by 74%.
              </p>
              <p>Would you be open to a 10-minute briefing next Tuesday?</p>
              <p className="text-slate-400">Best regards,<br />Alex Mercer | Aura Sales Intelligence</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Badge variant="cyan" size="sm" dot>AI Confidence: 98.2%</Badge>
              <Button variant="primary" size="sm" leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}>
                Submit for Sign-off
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sequence Performance & Open Rates</CardTitle>
            <CardDescription>Metrics across AI-generated outreach campaigns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-[#040B14] border border-[#1E3452]">
                <div className="text-2xl font-bold text-[#16C5D8]">74.8%</div>
                <div className="text-xs text-slate-400 font-mono mt-1">Open Rate</div>
              </div>
              <div className="p-3 rounded-xl bg-[#040B14] border border-[#1E3452]">
                <div className="text-2xl font-bold text-[#6A4FD9]">42.1%</div>
                <div className="text-xs text-slate-400 font-mono mt-1">Positive Reply Rate</div>
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#040B14] border border-[#1E3452]">
                <span>C-Suite Hyper-Personalized</span>
                <span className="text-emerald-400">48 Meetings Booked</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#040B14] border border-[#1E3452]">
                <span>Tech Stack Trigger Cadence</span>
                <span className="text-[#16C5D8]">34 Meetings Booked</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
