import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { TrendingUp, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const OpportunityScoring: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#6A4FD9]" />
              Opportunity Scoring & Intent Engine
            </h1>
            <Badge variant="purple" size="sm">
              Real-time Intent Signal Processing
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Predictive deal velocity, intent spike detection, and win probability modeling powered by Aura AI.
          </p>
        </div>

        <Button variant="primary" size="sm" glow leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#040B14]" />}>
          Recalculate Intent Scores
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Intent Spike Detection Matrix</CardTitle>
            <CardDescription>Accounts showing 85%+ score spikes in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3.5 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">DatadogHQ</span>
                <Badge variant="cyan" size="sm">Score: 94 / 100</Badge>
              </div>
              <p className="text-xs text-slate-400">
                Downloaded Enterprise Security Whitepaper 4 times & visited pricing page twice.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">Stripe Inc.</span>
                <Badge variant="purple" size="sm">Score: 98 / 100</Badge>
              </div>
              <p className="text-xs text-slate-400">
                Hired 3 VP Sales executives in last 14 days and expanded EMEA headquarters.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Predictive Win Probability</CardTitle>
            <CardDescription>Machine learning model probability estimates by pipeline stage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#040B14] border border-[#1E3452]">
              <span>Stage 3: Security & Procurement</span>
              <span className="text-[#16C5D8] font-bold">92.4% Win Rate</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#040B14] border border-[#1E3452]">
              <span>Stage 2: Technical Demo & Sandbox</span>
              <span className="text-emerald-400 font-bold">84.1% Win Rate</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#040B14] border border-[#1E3452]">
              <span>Stage 1: Discovery & Executive Fit</span>
              <span className="text-amber-400 font-bold">68.5% Win Rate</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
