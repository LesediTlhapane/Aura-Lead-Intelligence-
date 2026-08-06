import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { ConfidenceMeter } from '../components/ui/ConfidenceMeter';
import { Modal } from '../components/ui/Modal';
import {
  Building2,
  Search,
  Sparkles,
  Globe,
  Users,
  Cpu,
  ExternalLink,
  Zap,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  Activity,
  Layers,
} from 'lucide-react';
import { CompanyRecord } from '../types';

export const CompanyEnrichment: React.FC = () => {
  const [searchDomain, setSearchDomain] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<CompanyRecord | null>(null);

  const mockCompanies: CompanyRecord[] = [
    {
      id: 'comp-1',
      name: 'Stripe Technologies Inc.',
      domain: 'stripe.com',
      industry: 'Financial Infrastructure & Payments',
      employees: '8,000+',
      revenue: '$14.2B ARR',
      fundingRound: 'Public / Series I',
      location: 'San Francisco & Dublin',
      techStack: ['Salesforce CRM Enterprise', 'Marketo', 'Snowflake', 'Gong.io', 'HubSpot Cloud', 'Segment'],
      intentLevel: 'Extreme',
      intentScore: 98,
      decisionMakersCount: 45,
      status: 'Enriched by Aura AI',
      recentHires: ['Claire Hughes (CRO)', 'David Miller (VP Sales EMEA)', 'Anita Roy (Head of RevOps)'],
      buyingTriggers: [
        'Added 3 VP Sales hires in EMEA',
        'Series I expansion funding',
        'Evaluated Salesforce Einstein competitor',
      ],
    },
    {
      id: 'comp-2',
      name: 'Datadog Systems',
      domain: 'datadoghq.com',
      industry: 'Cloud Monitoring & Observability',
      employees: '4,500+',
      revenue: '$2.1B ARR',
      fundingRound: 'Public (NASDAQ: DDOG)',
      location: 'New York, NY',
      techStack: ['HubSpot Enterprise', 'Outreach.io', 'ZoomInfo', 'BigQuery', 'Salesforce'],
      intentLevel: 'High',
      intentScore: 92,
      decisionMakersCount: 32,
      status: 'Enriched by Aura AI',
      recentHires: ['Marcus Vance (VP Eng)', 'Sarah Jenkins (Enterprise AE Lead)'],
      buyingTriggers: [
        '4 downloads of Enterprise Security Whitepaper',
        'Spike in G2 Crowd Cloud Security intent',
      ],
    },
    {
      id: 'comp-3',
      name: 'Figma Cloud Platform',
      domain: 'figma.com',
      industry: 'Collaborative Design Software',
      employees: '1,800+',
      revenue: '$600M ARR',
      fundingRound: 'Series E',
      location: 'San Francisco, CA',
      techStack: ['Salesforce', 'Marketo', 'Apollo.io', 'Mixpanel'],
      intentLevel: 'Moderate',
      intentScore: 84,
      decisionMakersCount: 22,
      status: 'Enriching Technographics...',
      recentHires: ['Elena Rostova (CRO)'],
      buyingTriggers: ['EMEA office expansion in London', 'Hiring 12 Enterprise AEs'],
    },
    {
      id: 'comp-4',
      name: 'Snowflake Analytics',
      domain: 'snowflake.com',
      industry: 'Cloud Data Platform',
      employees: '7,000+',
      revenue: '$2.8B ARR',
      fundingRound: 'Public (NYSE: SNOW)',
      location: 'Bozeman, MT',
      techStack: ['Salesforce', 'Marketo', 'Gong', '6sense', 'Clearbit'],
      intentLevel: 'Extreme',
      intentScore: 96,
      decisionMakersCount: 58,
      status: 'Enriched by Aura AI',
      recentHires: ['Sridhar Ramaswamy (CEO)'],
      buyingTriggers: ['New Generative AI product launch', 'Expanding RevOps automation stack'],
    },
  ];

  const filtered = mockCompanies.filter((c) =>
    c.name.toLowerCase().includes(searchDomain.toLowerCase()) ||
    c.domain.toLowerCase().includes(searchDomain.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Building2 className="w-6 h-6 text-[#16C5D8]" />
              Company Firmographic & Technographic Enrichment
            </h1>
            <Badge variant="cyan" size="sm">
              Autonomous Web Crawler
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time web crawling, technographic detection, leadership tracking & buying signal synthesis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-64">
            <Input
              placeholder="Enter domain (e.g. stripe.com)..."
              value={searchDomain}
              onChange={(e) => setSearchDomain(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-[#16C5D8]" />}
            />
          </div>
          <Button variant="primary" size="sm" glow leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#040B14]" />}>
            Crawl New Domain
          </Button>
        </div>
      </div>

      {/* Grid of Enriched Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filtered.map((company) => (
          <Card key={company.id} hoverEffect className="flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge
                  variant={company.status.includes('Enriched') ? 'cyan' : 'warning'}
                  size="sm"
                  dot
                >
                  {company.status}
                </Badge>
                <span className="text-xs font-mono text-[#16C5D8] flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" />
                  {company.domain}
                </span>
              </div>

              <div className="pt-2">
                <CardTitle className="text-lg text-white">{company.name}</CardTitle>
                <CardDescription className="text-xs text-slate-400 mt-0.5 font-mono">
                  {company.industry} • {company.location}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Firmographic Metric Strip */}
              <div className="grid grid-cols-3 gap-2 text-xs font-mono p-3 rounded-xl bg-[#040B14] border border-[#1E3452]">
                <div>
                  <span className="text-slate-500 block text-[10px]">Headcount</span>
                  <span className="text-slate-200 font-semibold">{company.employees}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Est. Revenue</span>
                  <span className="text-emerald-400 font-semibold">{company.revenue}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Decision Makers</span>
                  <span className="text-[#16C5D8] font-semibold">{company.decisionMakersCount} Enriched</span>
                </div>
              </div>

              {/* Intent Score Bar */}
              <ConfidenceMeter score={company.intentScore} label={`Buying Intent Vector (${company.intentLevel})`} size="sm" />

              {/* Detected Tech Stack */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-[#6A4FD9]" />
                  Technographic Stack Detected ({company.techStack.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {company.techStack.slice(0, 5).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#081426] border border-[#1E3452] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {company.techStack.length > 5 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#040B14] border border-[#1E3452] text-[#16C5D8]">
                      +{company.techStack.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action */}
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                onClick={() => setSelectedCompany(company)}
              >
                Inspect Firmographic Dossier
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Firmographic Dossier Modal */}
      {selectedCompany && (
        <Modal
          isOpen={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
          title={`Enriched Dossier — ${selectedCompany.name}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="cyan" size="sm">{selectedCompany.industry}</Badge>
                <span className="text-xs font-mono text-emerald-400 font-bold">{selectedCompany.revenue}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{selectedCompany.name}</h3>
              <p className="text-xs text-slate-400 font-mono">Domain: {selectedCompany.domain} • Funding: {selectedCompany.fundingRound}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400">Buying Triggers & Intent Signals</h4>
              <div className="space-y-2">
                {selectedCompany.buyingTriggers.map((trig, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#081426] border border-[#1E3452] text-xs text-slate-200 font-mono flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#16C5D8] shrink-0" />
                    <span>{trig}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400">Identified Key Decision Makers ({selectedCompany.decisionMakersCount})</h4>
              <div className="space-y-1.5">
                {selectedCompany.recentHires.map((hire, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-[#040B14] border border-[#1E3452]/80 text-xs text-slate-300 flex items-center justify-between">
                    <span className="font-semibold text-white">{hire}</span>
                    <Badge variant="purple" size="sm">Decision Maker</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#1E3452]/60">
              <span className="text-xs text-slate-400 font-mono">Last crawled: 2 mins ago via Aura Crawler</span>
              <Button variant="secondary" size="sm" onClick={() => setSelectedCompany(null)}>
                Close Dossier
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
