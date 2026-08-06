import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { AIWorkforceWidget } from '../components/ui/AIWorkforceWidget';
import { ConfidenceMeter } from '../components/ui/ConfidenceMeter';
import { formatCurrency } from '../lib/utils';
import {
  DollarSign,
  UserCheck,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Bot,
  Zap,
  CheckCircle2,
  XCircle,
  Building2,
  Activity,
  RefreshCw,
  Eye,
  Sliders,
  Filter,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const pipelineChartData = [
  { month: 'Jan', pipeline: 1200000, aiQualified: 950000, forecastUpper: 1350000 },
  { month: 'Feb', pipeline: 1650000, aiQualified: 1400000, forecastUpper: 1800000 },
  { month: 'Mar', pipeline: 2100000, aiQualified: 1850000, forecastUpper: 2300000 },
  { month: 'Apr', pipeline: 2800000, aiQualified: 2450000, forecastUpper: 3000000 },
  { month: 'May', pipeline: 3400000, aiQualified: 3100000, forecastUpper: 3700000 },
  { month: 'Jun', pipeline: 4200000, aiQualified: 3900000, forecastUpper: 4500000 },
  { month: 'Jul', pipeline: 4850000, aiQualified: 4500000, forecastUpper: 5200000 },
];

const intentDistribution = [
  { name: 'Tier 1 Enterprise ($100k+)', value: 45, color: '#16C5D8' },
  { name: 'Growth Enterprise ($50k-$100k)', value: 30, color: '#6A4FD9' },
  { name: 'Mid-Market ($20k-$50k)', value: 25, color: '#E94E97' },
];

export const DashboardOverview: React.FC = () => {
  const {
    aiEmployee,
    pendingApprovals,
    activities,
    approveAction,
    rejectAction,
    setActiveModule,
    currentWorkspace,
  } = useAppStore();

  const [timeRange, setTimeRange] = useState<'30d' | '90d' | 'ytd'>('30d');

  return (
    <div className="space-y-6">
      {/* Executive Welcome & Actions Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#16C5D8] animate-pulse" />
              Executive Intelligence Command Center
            </h1>
            <Badge variant="cyan" size="sm" dot>
              Autonomous Engine Active
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time revenue orchestration, lead qualification & human-in-the-loop governance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-[#040B14] p-1 rounded-lg border border-[#1E3452] text-xs font-mono">
            {(['30d', '90d', 'ytd'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-md uppercase transition-all ${
                  timeRange === range
                    ? 'bg-[#081426] text-[#16C5D8] font-bold border border-[#16C5D8]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<RefreshCw className="w-3.5 h-3.5 text-[#16C5D8]" />}
            onClick={() => {}}
          >
            Sync CRM
          </Button>

          <Button
            variant="primary"
            size="sm"
            glow
            leftIcon={<ShieldCheck className="w-3.5 h-3.5 text-[#040B14]" />}
            onClick={() => setActiveModule('approvals')}
          >
            Review {pendingApprovals.length} Approvals
          </Button>
        </div>
      </div>

      {/* AI Workforce Autonomous Agent Banner */}
      <AIWorkforceWidget />

      {/* Top 4 Enterprise Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="ARR Opportunity Scored"
          value={formatCurrency(4850000)}
          change={18.4}
          changePeriod="vs last month"
          icon={<DollarSign className="w-4 h-4" />}
          iconColor="cyan"
          glow="cyan"
        />
        <StatCard
          title="Qualified Inbound Leads"
          value="142 Leads"
          change={24.1}
          changePeriod="vs last month"
          icon={<UserCheck className="w-4 h-4" />}
          iconColor="purple"
          glow="none"
        />
        <StatCard
          title="AI Agent Precision"
          value="98.4%"
          change={2.1}
          changePeriod="confidence score"
          icon={<Sparkles className="w-4 h-4" />}
          iconColor="magenta"
          glow="none"
        />
        <StatCard
          title="Human Sign-off Win Rate"
          value="89.2%"
          change={5.3}
          changePeriod="approval conversion"
          icon={<ShieldCheck className="w-4 h-4" />}
          iconColor="orange"
          glow="none"
        />
      </div>

      {/* Main Grid: Pipeline Chart & Pending Approvals Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2 cols): Deal Velocity & AI Pipeline Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#16C5D8]" />
                Qualified Pipeline Growth & AI Accuracy Band
              </CardTitle>
              <CardDescription>
                Historical vs AI-qualified enterprise pipeline ($4.85M total opportunity)
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="cyan" size="sm">
                Q3 Monte Carlo Forecast
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pipelineChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPipeline" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16C5D8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#16C5D8" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6A4FD9" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6A4FD9" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E3452" opacity={0.4} />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#64748B"
                    fontSize={11}
                    tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`}
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
                    formatter={(value: any) => [formatCurrency(Number(value)), 'Amount']}
                  />
                  <Area
                    type="monotone"
                    dataKey="pipeline"
                    name="Total Pipeline"
                    stroke="#16C5D8"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPipeline)"
                  />
                  <Area
                    type="monotone"
                    dataKey="aiQualified"
                    name="AI Qualified"
                    stroke="#6A4FD9"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorAI)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 pt-3 border-t border-[#1E3452]/50">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16C5D8]" />
                  Total Pipeline ($4.85M)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6A4FD9]" />
                  AI Qualified ($4.5M)
                </span>
              </div>
              <span className="text-[#16C5D8] font-semibold">Gemini Enterprise Server Engine</span>
            </div>
          </CardContent>
        </Card>

        {/* Right (1 col): High-Value Approval Queue Preview */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Human Approval Sign-off
              </CardTitle>
              <CardDescription>
                High value actions requiring human signoff
              </CardDescription>
            </div>
            <Badge variant="warning" size="sm" dot>
              {pendingApprovals.length} Pending
            </Badge>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col justify-between space-y-3">
            {pendingApprovals.length > 0 ? (
              <div className="space-y-3">
                {pendingApprovals.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-2 hover:border-[#16C5D8]/40 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-[#16C5D8] font-bold">
                        {item.confidenceScore}% Conf
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-white leading-snug">{item.title}</h4>

                    <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono">
                      <span>{item.companyName}</span>
                      <span className="text-emerald-400 font-semibold">{formatCurrency(item.opportunityValue)}</span>
                    </div>

                    <p className="text-[11px] text-slate-300 line-clamp-2 bg-[#081426] p-2 rounded border border-[#1E3452]/40">
                      "{item.aiReasoning}"
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full h-7 text-[11px] py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                        leftIcon={<CheckCircle2 className="w-3 h-3" />}
                        onClick={() => approveAction(item.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="h-7 text-[11px] px-2.5"
                        onClick={() => rejectAction(item.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-500 font-mono">
                All AI employee actions reviewed & approved.
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => setActiveModule('approvals')}
            >
              Open Approval Hub ({pendingApprovals.length})
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Account Tier Intent Breakdown & Live Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (1 col): Lead Tier Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#E94E97]" />
              Account Tier & Value Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of scored leads by ARR opportunity brackets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={intentDistribution}
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {intentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#081426',
                      borderColor: '#1E3452',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              {intentDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#040B14] border border-[#1E3452]/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-300 font-medium">{item.name}</span>
                  </div>
                  <span className="text-white font-mono font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right (2 cols): Real-time Execution Log Stream */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#16C5D8]" />
                Live Execution & Activity Stream
              </CardTitle>
              <CardDescription>
                Audited activity log of lead scoring, technographic enrichment & AI outreach
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveModule('workflows')}
            >
              View Full Audit Trail
            </Button>
          </CardHeader>

          <CardContent>
            <div className="divide-y divide-[#1E3452]/40">
              {activities.map((act) => (
                <div key={act.id} className="py-3.5 first:pt-0 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#040B14] border border-[#1E3452] text-[#16C5D8] shrink-0">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{act.action}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {act.target} • <span className="text-slate-500">{act.actor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 font-mono">
                    {act.latencyMs && (
                      <span className="text-[10px] text-slate-500 hidden sm:inline">{act.latencyMs}ms</span>
                    )}
                    <Badge variant="cyan" size="sm">
                      {act.type}
                    </Badge>
                    <span className="text-[10px] text-slate-500">{act.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
