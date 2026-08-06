import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ConfidenceMeter } from '../components/ui/ConfidenceMeter';
import { useAppStore } from '../store/useAppStore';
import { Send, Sparkles, ShieldCheck, Mail, CheckCircle2, Edit3, RefreshCw, Sliders, Zap, Check } from 'lucide-react';

export const OutreachStudio: React.FC = () => {
  const { setActiveModule } = useAppStore();
  const [selectedTone, setSelectedTone] = useState<'executive' | 'consultative' | 'technical'>('executive');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailTemplates = {
    executive: {
      subject: "Accelerating Stripe's Q3 revenue velocity with autonomous AI agents",
      body: `Hi Claire,\n\nI noticed Stripe recently expanded its EMEA sales leadership team. As you scale revenue operations across new regions, traditional lead qualification often creates latency between intent spikes and AE follow-up.\n\nAura Lead Intelligence operates as an autonomous AI SDR, enriching 100% of incoming lead vectors and generating C-level sequences in real-time.\n\nWould you be open to a 10-minute preview of how we helped comparable hyper-growth teams reduce lead response times from 4 hours to 45 seconds?\n\nBest regards,\nAlex Mercer | Aura Sales Intelligence`,
    },
    consultative: {
      subject: "Benchmarking Stripe's lead qualification latency vs enterprise peers",
      body: `Hi Claire,\n\nIn hyper-growth fintech, every hour of qualification delay reduces lead conversion by up to 34%. Our research into Stripe's technographic stack indicates strong inbound interest from EMEA enterprise buyers.\n\nAura AI bridges CRM data gaps automatically, providing your AEs with real-time intent scores and firmographic dossiers before their first outreach.\n\nLet's schedule a brief 10-minute briefing next week to review benchmark data.`,
    },
    technical: {
      subject: "Automating Stripe's Salesforce & Snowflake lead scoring pipelines",
      body: `Hi Claire,\n\nWe built an autonomous API model that integrates directly with Salesforce Enterprise and Snowflake data lakes to score, enrich, and route inbound leads in under 500ms.\n\nBy leveraging Gemini 1.5 Pro server-side agents, Aura synthesizes technographic signals and triggers personalized outreach sequences with 98%+ precision.\n\nWould you like to review our technical architecture blueprint?`,
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Send className="w-6 h-6 text-[#6A4FD9]" />
              AI Outreach Studio & Sequence Generator
            </h1>
            <Badge variant="purple" size="sm">
              Autonomous C-Level Drafting
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous multi-channel outreach drafting with strict human sign-off governance before delivery.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          glow
          leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#040B14]" />}
        >
          Generate Batch Sequences
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Email Studio & Live Editor */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#16C5D8]" />
                Live Sequence Draft — Stripe Technologies Inc.
              </CardTitle>
              <CardDescription>Target: Claire Hughes (Chief Revenue Officer)</CardDescription>
            </div>

            {/* Tone Selector */}
            <div className="flex items-center bg-[#040B14] p-1 rounded-lg border border-[#1E3452] text-xs font-mono">
              {(['executive', 'consultative', 'technical'] as const).map((tone) => (
                <button
                  key={tone}
                  onClick={() => setSelectedTone(tone)}
                  className={`px-2.5 py-1 rounded capitalize transition-all cursor-pointer ${
                    selectedTone === tone
                      ? 'bg-[#081426] text-[#16C5D8] font-bold border border-[#16C5D8]/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Subject & Recipient Box */}
            <div className="space-y-2 bg-[#040B14] p-3.5 rounded-xl border border-[#1E3452] font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#16C5D8] font-semibold">Recipient:</span>
                <span className="text-slate-300">Claire Hughes (c.hughes@stripe.com)</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[#1E3452]/60">
                <span className="text-[#16C5D8] font-semibold">Subject:</span>
                <span className="text-white font-semibold">{emailTemplates[selectedTone].subject}</span>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-4 rounded-xl bg-[#040B14] border border-[#1E3452] text-slate-200 text-xs font-sans whitespace-pre-line leading-relaxed">
              {emailTemplates[selectedTone].body}
            </div>

            {/* AI Confidence Meter */}
            <ConfidenceMeter score={98.2} label="AI Brand Tone & Relevance Score" size="md" />

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#1E3452]/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Governance Rule: Requires Human Sign-off</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  glow
                  leftIcon={isSubmitted ? <Check className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                  onClick={() => {
                    setIsSubmitted(true);
                    setTimeout(() => setActiveModule('approvals'), 800);
                  }}
                >
                  {isSubmitted ? 'Submitted to Approval Hub!' : 'Submit to Approval Queue'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Col: Sequence Performance Stats */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Sequence Performance & Open Rates</CardTitle>
            <CardDescription>Analytics across AI-generated C-level email campaigns</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3.5 rounded-xl bg-[#040B14] border border-[#1E3452]">
                <div className="text-2xl font-bold text-[#16C5D8]">74.8%</div>
                <div className="text-xs text-slate-400 font-mono mt-1">Open Rate</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#040B14] border border-[#1E3452]">
                <div className="text-2xl font-bold text-[#6A4FD9]">42.1%</div>
                <div className="text-xs text-slate-400 font-mono mt-1">Positive Reply Rate</div>
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#040B14] border border-[#1E3452]">
                <span className="text-slate-300">C-Suite Hyper-Personalized</span>
                <span className="text-emerald-400 font-bold">48 Meetings Booked</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#040B14] border border-[#1E3452]">
                <span className="text-slate-300">Tech Stack Trigger Cadence</span>
                <span className="text-[#16C5D8] font-bold">34 Meetings Booked</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#040B14] border border-[#1E3452]">
                <span className="text-slate-300">Funding Spike Sequence</span>
                <span className="text-purple-400 font-bold">29 Meetings Booked</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#081426] border border-[#1E3452] space-y-1">
              <div className="text-[11px] font-mono text-slate-400">AI Optimization Model</div>
              <div className="text-xs font-semibold text-white">Gemini 1.5 Pro Server Synthesis</div>
              <p className="text-[10px] text-slate-500">Auto-tuned based on Gong call transcripts & CRM deal closes.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
