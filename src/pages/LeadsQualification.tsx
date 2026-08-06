import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { Avatar } from '../components/ui/Avatar';
import { UserCheck, Search, Filter, Sparkles, CheckCircle, ArrowUpDown } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export const LeadsQualification: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const mockLeads = [
    {
      id: 'lead-1',
      name: 'Sarah Lin',
      title: 'VP of Revenue Operations',
      company: 'Linear Systems Inc.',
      email: 's.lin@linear.app',
      intentScore: 96,
      budget: 180000,
      fitCategory: 'Tier 1 Enterprise',
      status: 'Qualified by AI',
      timestamp: '10 mins ago',
    },
    {
      id: 'lead-2',
      name: 'Marcus Vance',
      title: 'Head of Sales Development',
      company: 'DatadogHQ',
      email: 'm.vance@datadoghq.com',
      intentScore: 92,
      budget: 240000,
      fitCategory: 'Tier 1 Enterprise',
      status: 'Awaiting Sign-off',
      timestamp: '25 mins ago',
    },
    {
      id: 'lead-3',
      name: 'Elena Rostova',
      title: 'Chief Revenue Officer',
      company: 'Figma Cloud',
      email: 'elena@figma.com',
      intentScore: 88,
      budget: 150000,
      fitCategory: 'Growth Enterprise',
      status: 'Qualified by AI',
      timestamp: '1 hour ago',
    },
    {
      id: 'lead-4',
      name: 'David Chen',
      title: 'Director of Growth Marketing',
      company: 'Vercel Inc.',
      email: 'david.c@vercel.com',
      intentScore: 84,
      budget: 120000,
      fitCategory: 'Growth Enterprise',
      status: 'Enriched',
      timestamp: '2 hours ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-[#16C5D8]" />
              Lead Qualification Engine
            </h1>
            <Badge variant="cyan" size="sm">
              142 Active Leads
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous qualification model continuously analyzing inbound leads against ICP vectors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" leftIcon={<Filter className="w-3.5 h-3.5" />}>
            Filter ICP
          </Button>
          <Button variant="primary" size="sm" glow leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
            Run Auto-Qualification
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">AVG INTENT SCORE</div>
              <div className="text-2xl font-bold text-white mt-1">91.4 / 100</div>
            </div>
            <Badge variant="cyan" size="sm">+4.2%</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">QUALIFIED THIS WEEK</div>
              <div className="text-2xl font-bold text-white mt-1">84 Leads</div>
            </div>
            <Badge variant="purple" size="sm">High ICP Fit</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">QUALIFIED PIPELINE</div>
              <div className="text-2xl font-bold text-white mt-1">$3.82M ARR</div>
            </div>
            <Badge variant="magenta" size="sm">Enterprise</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Tabs
            tabs={[
              { id: 'all', label: 'All Scored Leads', badge: 142 },
              { id: 'tier1', label: 'Tier 1 Enterprise', badge: 38 },
              { id: 'pending', label: 'Awaiting Sign-off', badge: 12 },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          <div className="w-full sm:w-64">
            <Input
              placeholder="Filter by name or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-[#16C5D8]" />}
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#040B14] text-slate-400 uppercase font-mono text-[10px] border-b border-[#1E3452]">
                <tr>
                  <th className="py-3 px-4">Contact & Company</th>
                  <th className="py-3 px-4">ICP Segment</th>
                  <th className="py-3 px-4">Intent Score</th>
                  <th className="py-3 px-4">Estimated Value</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E3452]/40">
                {mockLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#0E1E38]/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={lead.name} size="sm" />
                        <div>
                          <div className="font-semibold text-white">{lead.name}</div>
                          <div className="text-[11px] text-slate-400">
                            {lead.title} • <span className="text-[#16C5D8]">{lead.company}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <Badge variant="purple" size="sm">
                        {lead.fitCategory}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-[#16C5D8]">
                      {lead.intentScore} / 100
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-emerald-400">
                      {formatCurrency(lead.budget)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={lead.status === 'Qualified by AI' ? 'cyan' : 'warning'}
                        size="sm"
                        dot
                      >
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="outline" size="sm">
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
