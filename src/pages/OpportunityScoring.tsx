import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ConfidenceMeter } from '../components/ui/ConfidenceMeter';
import { Modal } from '../components/ui/Modal';
import { formatCurrency } from '../lib/utils';
import {
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  AlertTriangle,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  DollarSign,
  Clock,
} from 'lucide-react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';

const scatterData = [
  { name: 'Stripe Technologies', dealSize: 185000, intentScore: 98, winProb: 94, category: 'Tier 1' },
  { name: 'Datadog Systems', dealSize: 240000, intentScore: 92, winProb: 89, category: 'Tier 1' },
  { name: 'Snowflake Analytics', dealSize: 310000, intentScore: 96, winProb: 92, category: 'Tier 1' },
  { name: 'Figma Cloud', dealSize: 150000, intentScore: 88, winProb: 82, category: 'Growth' },
  { name: 'Vercel Inc.', dealSize: 120000, intentScore: 84, winProb: 78, category: 'Growth' },
  { name: 'Notion Labs', dealSize: 210000, intentScore: 91, winProb: 88, category: 'Tier 1' },
  { name: 'Linear Systems', dealSize: 180000, intentScore: 96, winProb: 95, category: 'Tier 1' },
];

export const OpportunityScoring: React.FC = () => {
  const [selectedOpp, setSelectedOpp] = useState<any | null>(null);

  const intentSpikes = [
    {
      company: 'DatadogHQ',
      domain: 'datadoghq.com',
      score: 94,
      dealValue: 240000,
      reason: 'Downloaded Enterprise Security Whitepaper 4 times & visited pricing page twice in 2 hours.',
      urgency: 'Immediate AE Assignment Required',
      assignedRep: 'Sarah Jenkins (Enterprise AE)',
    },
    {
      company: 'Stripe Inc.',
      domain: 'stripe.com',
      score: 98,
      dealValue: 185000,
      reason: 'Hired 3 VP Sales executives in last 14 days and expanded EMEA headquarters.',
      urgency: 'C-Level Email Sequence Ready',
      assignedRep: 'Alex Mercer (VP RevOps)',
    },
    {
      company: 'Snowflake Cloud',
      domain: 'snowflake.com',
      score: 96,
      dealValue: 310000,
      reason: '45 Decision maker emails enriched and verified. Active tech stack search detected.',
      urgency: 'Technical Sandbox Demo Requested',
      assignedRep: 'Michael Chang (Solutions Architect)',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#6A4FD9]" />
              Opportunity Scoring & Intent Vector Matrix
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
          Recalculate Intent Vectors
        </Button>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">AVG DEAL WIN PROBABILITY</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">87.4%</div>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">Across 7 Active Tier-1 Deals</p>
            </div>
            <Badge variant="cyan" size="sm">+3.8%</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">PIPELINE VELOCITY</div>
              <div className="text-2xl font-bold text-white mt-1">14.2 Days</div>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">-4.5 days faster than benchmark</p>
            </div>
            <Badge variant="purple" size="sm">High Velocity</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">HIGH INTENT ACCOUNTS</div>
              <div className="text-2xl font-bold text-white mt-1">18 Accounts</div>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">$2.85M combined deal potential</p>
            </div>
            <Badge variant="magenta" size="sm">Spike Alert</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Interactive AI Scatter Plot: Deal Size vs Intent Score */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#16C5D8]" />
              Opportunity Matrix — Deal Value vs. AI Intent Index
            </CardTitle>
            <CardDescription>
              Bubble position reflects ARR value vs. intent score (higher right quadrant indicates highest priority closing opportunities)
            </CardDescription>
          </div>
          <Badge variant="cyan" size="sm">
            Live AI Scatter Plot
          </Badge>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3452" opacity={0.4} />
                <XAxis
                  type="number"
                  dataKey="intentScore"
                  name="AI Intent Score"
                  unit="/100"
                  domain={[70, 100]}
                  stroke="#64748B"
                  fontSize={11}
                />
                <YAxis
                  type="number"
                  dataKey="dealSize"
                  name="ARR Value"
                  unit="$"
                  stroke="#64748B"
                  fontSize={11}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <ZAxis type="number" dataKey="winProb" range={[100, 400]} name="Win Probability %" />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{
                    backgroundColor: '#081426',
                    borderColor: '#1E3452',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val: any, name: any) => [
                    name === 'ARR Value' ? formatCurrency(Number(val)) : `${val}`,
                    name,
                  ]}
                />
                <Scatter name="Opportunities" data={scatterData} onClick={(node) => setSelectedOpp(node.payload)}>
                  {scatterData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.intentScore > 90 ? '#16C5D8' : entry.intentScore > 85 ? '#6A4FD9' : '#E94E97'}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-[#1E3452]/50">
            <span>Click any opportunity data point to inspect score breakdown</span>
            <span className="text-[#16C5D8] font-semibold">Quadrant 1: High Intent / High Value</span>
          </div>
        </CardContent>
      </Card>

      {/* Live Intent Spike Alerts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Real-time Intent Spike Alerts (24 Hour Window)
            </CardTitle>
            <CardDescription>
              High velocity activity spikes detected across sales intelligence channels
            </CardDescription>
          </div>
          <Badge variant="warning" size="sm" dot>
            3 Urgent Escalations
          </Badge>
        </CardHeader>

        <CardContent className="space-y-3">
          {intentSpikes.map((spike, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#040B14] border border-[#1E3452] hover:border-[#16C5D8]/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{spike.company}</span>
                  <span className="text-xs font-mono text-slate-400">({spike.domain})</span>
                  <Badge variant="cyan" size="sm">
                    Score: {spike.score} / 100
                  </Badge>
                  <span className="text-xs font-mono text-emerald-400 font-bold">{formatCurrency(spike.dealValue)}</span>
                </div>
                <p className="text-xs text-slate-300 font-mono bg-[#081426] p-2 rounded border border-[#1E3452]/60">
                  "{spike.reason}"
                </p>
                <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2 pt-0.5">
                  <UserCheck className="w-3 h-3 text-[#16C5D8]" />
                  <span>Assigned Rep: {spike.assignedRep}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button variant="primary" size="sm" glow leftIcon={<Zap className="w-3.5 h-3.5 text-[#040B14]" />}>
                  Dispatch Action
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Selected Opportunity Modal */}
      {selectedOpp && (
        <Modal
          isOpen={!!selectedOpp}
          onClose={() => setSelectedOpp(null)}
          title={`Opportunity Inspection — ${selectedOpp.name}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="cyan" size="sm">{selectedOpp.category}</Badge>
                <span className="text-sm font-bold font-mono text-emerald-400">{formatCurrency(selectedOpp.dealSize)} ARR</span>
              </div>
              <h3 className="text-base font-bold text-white">{selectedOpp.name}</h3>
            </div>

            <ConfidenceMeter score={selectedOpp.intentScore} label="AI Intent Vector" size="md" />
            <ConfidenceMeter score={selectedOpp.winProb} label="Win Probability Model" size="md" />

            <div className="flex items-center justify-between pt-4 border-t border-[#1E3452]/60">
              <Button variant="secondary" size="sm" onClick={() => setSelectedOpp(null)}>
                Close
              </Button>
              <Button variant="primary" size="sm" glow>
                Escalate Deal Stage
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
