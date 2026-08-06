import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ConfidenceMeter } from '../components/ui/ConfidenceMeter';
import { formatCurrency } from '../lib/utils';
import {
  PieChart,
  TrendingUp,
  DollarSign,
  Calendar,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

const forecastData = [
  { month: 'Jul', conservative: 1200000, expected: 1450000, aggressive: 1800000 },
  { month: 'Aug', conservative: 1800000, expected: 2100000, aggressive: 2600000 },
  { month: 'Sep', conservative: 2400000, expected: 2840000, aggressive: 3400000 },
  { month: 'Oct', conservative: 3100000, expected: 3600000, aggressive: 4200000 },
  { month: 'Nov', conservative: 3800000, expected: 4400000, aggressive: 5100000 },
  { month: 'Dec', conservative: 4500000, expected: 5200000, aggressive: 6200000 },
];

const funnelData = [
  { stage: '1. Inbound Leads', volume: '142 Leads', value: '$8.4M ARR', conversion: '100%' },
  { stage: '2. Enriched & ICP Qualified', volume: '84 Leads', value: '$6.2M ARR', conversion: '59.1%' },
  { stage: '3. Technical Demo & Sandbox', volume: '38 Leads', value: '$4.1M ARR', conversion: '45.2%' },
  { stage: '4. Security & C-Level Sign-off', volume: '18 Deals', value: '$2.84M ARR', conversion: '47.3%' },
  { stage: '5. Closed Won Committed', volume: '14 Deals', value: '$2.15M ARR', conversion: '77.7%' },
];

export const RevenuePrediction: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'expected' | 'aggressive'>('expected');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <PieChart className="w-6 h-6 text-[#16C5D8]" />
              Monte Carlo Revenue Forecast & Scenario Engine
            </h1>
            <Badge variant="cyan" size="sm">
              97.8% Model Precision
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Predictive revenue modeling calculating win probabilities, sales cycle length & ARR expansion vectors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" leftIcon={<Calendar className="w-3.5 h-3.5 text-[#16C5D8]" />}>
            Export Forecast Report
          </Button>
          <Button variant="primary" size="sm" glow leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#040B14]" />}>
            Run Monte Carlo Simulation
          </Button>
        </div>
      </div>

      {/* Top 3 Scenario Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setSelectedScenario('conservative')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            selectedScenario === 'conservative'
              ? 'bg-[#081426] border-[#16C5D8] aura-glow-cyan'
              : 'bg-[#0F172A]/70 border-[#1E3452] hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>CONSERVATIVE FLOOR (95% CI)</span>
            <Badge variant="cyan" size="sm">Low Risk</Badge>
          </div>
          <div className="text-2xl font-bold text-white mt-1.5">$2.40M ARR</div>
          <p className="text-[10px] text-slate-400 font-mono mt-1">100% committed deals in security review</p>
        </div>

        <div
          onClick={() => setSelectedScenario('expected')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            selectedScenario === 'expected'
              ? 'bg-[#081426] border-[#6A4FD9] aura-glow-purple'
              : 'bg-[#0F172A]/70 border-[#1E3452] hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>BASE EXPECTED FORECAST</span>
            <Badge variant="purple" size="sm">Recommended</Badge>
          </div>
          <div className="text-2xl font-bold text-[#16C5D8] mt-1.5">$2.84M ARR</div>
          <p className="text-[10px] text-emerald-400 font-mono mt-1">+14.2% ahead of Q3 quota target</p>
        </div>

        <div
          onClick={() => setSelectedScenario('aggressive')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            selectedScenario === 'aggressive'
              ? 'bg-[#081426] border-[#E94E97] aura-glow-pink'
              : 'bg-[#0F172A]/70 border-[#1E3452] hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>AGGRESSIVE UPSIDE</span>
            <Badge variant="magenta" size="sm">Max Expansion</Badge>
          </div>
          <div className="text-2xl font-bold text-[#E94E97] mt-1.5">$3.40M ARR</div>
          <p className="text-[10px] text-[#E94E97] font-mono mt-1">Assumes 85% win rate on Stripe & Datadog</p>
        </div>
      </div>

      {/* Main Bar Chart: Scenario Comparison */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#16C5D8]" />
              Multi-Quarter Revenue Trajectory Comparison
            </CardTitle>
            <CardDescription>
              Comparing Conservative vs Base Expected vs Aggressive Upside ($M ARR)
            </CardDescription>
          </div>
          <Badge variant="cyan" size="sm">
            10,000 Iteration Model
          </Badge>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3452" opacity={0.4} />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#64748B"
                  fontSize={11}
                  tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#081426',
                    borderColor: '#1E3452',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [formatCurrency(Number(val)), 'Amount']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="conservative" name="Conservative Floor" fill="#64748B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expected" name="Base Expected" fill="#16C5D8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="aggressive" name="Aggressive Upside" fill="#E94E97" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Funnel Conversion Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#6A4FD9]" />
            Pipeline Stage Conversion Velocity Funnel
          </CardTitle>
          <CardDescription>
            Conversion efficiency and dropoff rates from lead ingestion to closed deal
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {funnelData.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#040B14] border border-[#1E3452] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#081426] border border-[#16C5D8]/40 flex items-center justify-center text-[#16C5D8] font-bold text-[11px]">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-white font-semibold">{item.stage}</span>
                    <span className="text-slate-500 text-[10px] block">{item.volume}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-400 text-[10px] block">Stage Value</span>
                    <span className="text-emerald-400 font-bold">{item.value}</span>
                  </div>

                  <div className="text-right min-w-[90px]">
                    <span className="text-slate-400 text-[10px] block">Conversion Rate</span>
                    <Badge variant="cyan" size="sm">{item.conversion}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
