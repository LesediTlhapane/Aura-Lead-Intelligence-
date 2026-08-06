import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { StatusIndicator } from '../components/ui/StatusIndicator';
import { formatCurrency, formatRelativeTime } from '../lib/utils';
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
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const pipelineChartData = [
  { month: 'Jan', pipeline: 1200000, aiQualified: 950000 },
  { month: 'Feb', pipeline: 1650000, aiQualified: 1400000 },
  { month: 'Mar', pipeline: 2100000, aiQualified: 1850000 },
  { month: 'Apr', pipeline: 2800000, aiQualified: 2450000 },
  { month: 'May', pipeline: 3400000, aiQualified: 3100000 },
  { month: 'Jun', pipeline: 4200000, aiQualified: 3900000 },
  { month: 'Jul', pipeline: 4850000, aiQualified: 4500000 },
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

  return (
    <div className="space-y-6">
      {/* Executive Welcome & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Executive Intelligence Overview
            </h1>
            <Badge variant="cyan" size="sm" dot>
              LIVE
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous AI Employee actively qualifying leads, enriching firmographics & preparing C-level outreach.
          </p>
        </div>

        <div className="flex items-center gap-3">
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
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#040B14]" />}
            onClick={() => setActiveModule('approvals')}
          >
            Review {pendingApprovals.length} Approvals
          </Button>
        </div>
      </div>

      {/* Top 4 Enterprise Metric Cards */}
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
          title="AI Employee Accuracy"
          value="98.4%"
          change={2.1}
          changePeriod="confidence rating"
          icon={<Sparkles className="w-4 h-4" />}
          iconColor="magenta"
          glow="none"
        />
        <StatCard
          title="Human Sign-Off Win Rate"
          value="89.2%"
          change={5.3}
          changePeriod="approval conversion"
          icon={<ShieldCheck className="w-4 h-4" />}
          iconColor="orange"
          glow="none"
        />
      </div>

      {/* Main Grid: Pipeline Chart & Pending Approval Queue Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2 cols): Deal Velocity & AI Qualification Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#16C5D8]" />
                Qualified Pipeline Growth & Velocity
              </CardTitle>
              <CardDescription>
                Comparison of total pipeline vs AI-qualified high intent opportunities ($4.85M total)
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="cyan" size="sm">
                Q3 Forecast
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

            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-[#1E3452]/50">
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
              <span className="text-[#16C5D8]">Model: Aura Intelligence v2.4</span>
            </div>
          </CardContent>
        </Card>

        {/* Right (1 col): Human-in-the-Loop Sign-off Hub Preview */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Human Approval Queue
              </CardTitle>
              <CardDescription>
                AI employee actions waiting for executive sign-off
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
                    className="p-3 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-2 hover:border-[#16C5D8]/40 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-mono text-amber-400 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-[#16C5D8]">
                        {item.confidenceScore}% AI Conf
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-white leading-snug">{item.title}</h4>

                    <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono">
                      <span>{item.companyName}</span>
                      <span className="text-emerald-400 font-semibold">{formatCurrency(item.opportunityValue)}</span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 bg-[#081426] p-2 rounded border border-[#1E3452]/40">
                      {item.aiReasoning}
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
              <div className="py-8 text-center text-xs text-slate-500">
                All AI employee actions approved.
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

      {/* Bottom Grid: Live AI Employee Stream & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2 cols): Autonomous AI Employee Action Stream */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#16C5D8]" />
                Autonomous AI Execution Log
              </CardTitle>
              <CardDescription>
                Real-time activity stream of background enrichment, scoring & workflow executions
              </CardDescription>
            </div>
            <StatusIndicator status={aiEmployee.status} size="sm" />
          </CardHeader>

          <CardContent>
            <div className="divide-y divide-[#1E3452]/40">
              {activities.map((act) => (
                <div key={act.id} className="py-3 first:pt-0 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#040B14] border border-[#1E3452] text-[#16C5D8] shrink-0">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-100">{act.action}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {act.target} • <span className="text-slate-500">{act.actor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant="cyan" size="sm">
                      {act.type}
                    </Badge>
                    <span className="text-[10px] font-mono text-slate-500">{act.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right (1 col): Tenant Credit Usage & Platform Specs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#6A4FD9]" />
              Enterprise Workspace Health
            </CardTitle>
            <CardDescription>
              Tenant plan, monthly credit usage & active seats
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="p-3 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Plan Level</span>
                <Badge variant="purple" size="sm">
                  {currentWorkspace.plan}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Domain</span>
                <span className="text-white font-mono text-[11px]">{currentWorkspace.domain}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Active Seats</span>
                <span className="text-white font-mono">{currentWorkspace.activeUsers} Users</span>
              </div>
            </div>

            {/* Credit usage progress bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Monthly Intelligence Credits</span>
                <span className="text-[#16C5D8] font-semibold">
                  {currentWorkspace.monthlyCreditsUsed.toLocaleString()} / {currentWorkspace.monthlyCreditsLimit.toLocaleString()}
                </span>
              </div>

              <div className="h-2 w-full bg-[#040B14] rounded-full border border-[#1E3452] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#16C5D8] to-[#6A4FD9] rounded-full"
                  style={{
                    width: `${(currentWorkspace.monthlyCreditsUsed / currentWorkspace.monthlyCreditsLimit) * 100}%`,
                  }}
                />
              </div>

              <p className="text-[10px] text-slate-500 font-mono text-right">
                Resets on 1st of next month (84.2% consumed)
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              className="w-full text-xs"
              onClick={() => setActiveModule('settings')}
            >
              Manage Workspace Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
