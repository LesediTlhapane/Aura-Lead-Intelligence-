import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { Avatar } from '../components/ui/Avatar';
import { ConfidenceMeter } from '../components/ui/ConfidenceMeter';
import { Modal } from '../components/ui/Modal';
import { UserCheck, Search, Filter, Sparkles, CheckCircle, ArrowUpDown, Eye, ExternalLink, Zap, ShieldCheck, Cpu } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

interface LeadItem {
  id: string;
  name: string;
  title: string;
  company: string;
  domain: string;
  email: string;
  intentScore: number;
  icpFitScore: number;
  budget: number;
  fitCategory: 'Tier 1 Enterprise' | 'Growth Enterprise' | 'Mid-Market';
  status: 'Qualified by AI' | 'Awaiting Sign-off' | 'Enriched' | 'Outreach Dispatched';
  timestamp: string;
  signals: string[];
  techStack: string[];
  location: string;
}

export const LeadsQualification: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  const mockLeads: LeadItem[] = [
    {
      id: 'lead-1',
      name: 'Sarah Lin',
      title: 'VP of Revenue Operations',
      company: 'Linear Systems Inc.',
      domain: 'linear.app',
      email: 's.lin@linear.app',
      intentScore: 96,
      icpFitScore: 98,
      budget: 180000,
      fitCategory: 'Tier 1 Enterprise',
      status: 'Qualified by AI',
      timestamp: '10 mins ago',
      signals: ['Downloaded Security Whitepaper', 'Visited Pricing Page 4x', '45 Decision Maker Emails Found'],
      techStack: ['Salesforce Enterprise', 'HubSpot', 'Snowflake', 'Gong'],
      location: 'San Francisco, CA',
    },
    {
      id: 'lead-2',
      name: 'Marcus Vance',
      title: 'Head of Sales Development',
      company: 'Datadog Systems',
      domain: 'datadoghq.com',
      email: 'm.vance@datadoghq.com',
      intentScore: 92,
      icpFitScore: 94,
      budget: 240000,
      fitCategory: 'Tier 1 Enterprise',
      status: 'Awaiting Sign-off',
      timestamp: '25 mins ago',
      signals: ['3 VP Hires Last Month', 'G2 Intent High Surge', 'Series D Funding Announced'],
      techStack: ['Marketo', 'Salesforce', 'Outreach.io', 'Datadog'],
      location: 'New York, NY',
    },
    {
      id: 'lead-3',
      name: 'Elena Rostova',
      title: 'Chief Revenue Officer',
      company: 'Figma Cloud Platform',
      domain: 'figma.com',
      email: 'elena@figma.com',
      intentScore: 88,
      icpFitScore: 91,
      budget: 150000,
      fitCategory: 'Growth Enterprise',
      status: 'Qualified by AI',
      timestamp: '1 hour ago',
      signals: ['Expanding EMEA Sales Office', 'Evaluated Competitor Contract'],
      techStack: ['HubSpot CRM', 'Zendesk', 'Stripe API'],
      location: 'San Francisco, CA',
    },
    {
      id: 'lead-4',
      name: 'David Chen',
      title: 'Director of Growth Marketing',
      company: 'Vercel Inc.',
      domain: 'vercel.com',
      email: 'david.c@vercel.com',
      intentScore: 84,
      icpFitScore: 87,
      budget: 120000,
      fitCategory: 'Growth Enterprise',
      status: 'Enriched',
      timestamp: '2 hours ago',
      signals: ['Active Tech Stack Crawl', 'Visited API Documentation'],
      techStack: ['Next.js', 'Vercel Analytics', 'Segment', 'HubSpot'],
      location: 'San Francisco, CA',
    },
  ];

  const filteredLeads = mockLeads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.title.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'tier1') return matchesSearch && l.fitCategory === 'Tier 1 Enterprise';
    if (activeTab === 'pending') return matchesSearch && l.status === 'Awaiting Sign-off';
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-[#16C5D8]" />
              Lead Qualification & ICP Scoring Engine
            </h1>
            <Badge variant="cyan" size="sm">
              142 Inbound Queue
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous AI qualification model continuously scoring inbound lead signals against custom ICP vectors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" leftIcon={<Filter className="w-3.5 h-3.5" />}>
            Configure ICP Rules
          </Button>
          <Button variant="primary" size="sm" glow leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#040B14]" />}>
            Run Auto-Qualification
          </Button>
        </div>
      </div>

      {/* Metric Highlights Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">AVG INTENT SCORE</div>
              <div className="text-2xl font-bold text-white mt-1">91.4 / 100</div>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">Top 15% ICP Alignment</p>
            </div>
            <Badge variant="cyan" size="sm">+4.2%</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">QUALIFIED THIS WEEK</div>
              <div className="text-2xl font-bold text-white mt-1">84 Leads</div>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">Zero manual SDR touchpoints</p>
            </div>
            <Badge variant="purple" size="sm">High ICP Fit</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">QUALIFIED PIPELINE</div>
              <div className="text-2xl font-bold text-white mt-1">$3.82M ARR</div>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">Ready for AE dispatch</p>
            </div>
            <Badge variant="magenta" size="sm">Enterprise</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3">
          <Tabs
            tabs={[
              { id: 'all', label: 'All Scored Leads', badge: 142 },
              { id: 'tier1', label: 'Tier 1 Enterprise ($100k+)', badge: 38 },
              { id: 'pending', label: 'Awaiting Sign-off', badge: 12 },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          <div className="w-full sm:w-72">
            <Input
              placeholder="Search by contact, title, company..."
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
                  <th className="py-3 px-4">Contact & Executive Title</th>
                  <th className="py-3 px-4">ICP Segment</th>
                  <th className="py-3 px-4 min-w-[140px]">AI Intent Score</th>
                  <th className="py-3 px-4">Estimated ARR</th>
                  <th className="py-3 px-4">Primary Signal</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E3452]/40">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#0E1E38]/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={lead.name} size="sm" />
                        <div>
                          <div className="font-semibold text-white flex items-center gap-1.5">
                            {lead.name}
                            <span className="text-[10px] text-slate-500 font-mono">({lead.email})</span>
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {lead.title} • <span className="text-[#16C5D8] font-semibold">{lead.company}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <Badge variant={lead.fitCategory === 'Tier 1 Enterprise' ? 'purple' : 'cyan'} size="sm">
                        {lead.fitCategory}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <ConfidenceMeter score={lead.intentScore} label="" size="sm" />
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-emerald-400">
                      {formatCurrency(lead.budget)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 max-w-[180px]">
                      <span className="truncate block font-mono text-[11px] text-[#16C5D8] bg-[#040B14] p-1 rounded border border-[#1E3452]/60">
                        ⚡ {lead.signals[0]}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={lead.status === 'Qualified by AI' ? 'cyan' : lead.status === 'Awaiting Sign-off' ? 'warning' : 'success'}
                        size="sm"
                        dot
                      >
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Eye className="w-3 h-3 text-[#16C5D8]" />}
                        onClick={() => setSelectedLead(lead)}
                      >
                        Inspect Dossier
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Inspection Modal */}
      {selectedLead && (
        <Modal
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          title={`Executive Dossier — ${selectedLead.name} (${selectedLead.company})`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#040B14] border border-[#1E3452]">
              <div className="flex items-center gap-3">
                <Avatar name={selectedLead.name} size="lg" />
                <div>
                  <h3 className="text-base font-bold text-white">{selectedLead.name}</h3>
                  <p className="text-xs text-slate-400">{selectedLead.title} @ <span className="text-[#16C5D8]">{selectedLead.company}</span></p>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5">{selectedLead.location} • {selectedLead.email}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400 font-mono">ARR Opportunity</div>
                <div className="text-xl font-bold text-emerald-400 font-mono">{formatCurrency(selectedLead.budget)}</div>
              </div>
            </div>

            {/* ICP Fit & Intent Scores */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-[#081426] border border-[#1E3452] space-y-2">
                <div className="text-xs font-mono text-slate-400">AI Buying Intent Index</div>
                <ConfidenceMeter score={selectedLead.intentScore} label="Intent Score" size="md" />
              </div>

              <div className="p-3.5 rounded-xl bg-[#081426] border border-[#1E3452] space-y-2">
                <div className="text-xs font-mono text-slate-400">Firmographic ICP Fit</div>
                <ConfidenceMeter score={selectedLead.icpFitScore} label="ICP Alignment" size="md" />
              </div>
            </div>

            {/* Signals & Technographic Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400">Detected Buying Signals</h4>
              <div className="flex flex-wrap gap-2">
                {selectedLead.signals.map((sig, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#040B14] border border-[#1E3452] text-xs font-mono text-[#16C5D8]">
                    ⚡ {sig}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400">Technographic Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedLead.techStack.map((tech, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#081426] border border-[#1E3452] text-xs font-mono text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1E3452]/60">
              <span className="text-xs text-slate-400 font-mono">Enriched by Aura Agent • 10 mins ago</span>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => setSelectedLead(null)}>
                  Close
                </Button>
                <Button variant="primary" size="sm" glow leftIcon={<Zap className="w-3.5 h-3.5 text-[#040B14]" />}>
                  Dispatch C-Level Outreach
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
