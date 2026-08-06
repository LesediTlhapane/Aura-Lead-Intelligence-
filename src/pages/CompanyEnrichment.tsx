import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Building2, Search, Sparkles, Globe, Users, Cpu, ExternalLink } from 'lucide-react';

export const CompanyEnrichment: React.FC = () => {
  const mockCompanies = [
    {
      id: 'comp-1',
      name: 'Stripe Technologies Inc.',
      domain: 'stripe.com',
      employees: '8,000+',
      revenue: '$14.2B',
      techStack: ['Salesforce CRM', 'Marketo', 'Snowflake', 'Gong.io', 'HubSpot'],
      intentLevel: 'Very High',
      status: 'Enriched by Aura AI',
    },
    {
      id: 'comp-2',
      name: 'Datadog Systems',
      domain: 'datadoghq.com',
      employees: '4,500+',
      revenue: '$2.1B',
      techStack: ['HubSpot', 'Outreach.io', 'ZoomInfo', 'BigQuery'],
      intentLevel: 'High',
      status: 'Enriched by Aura AI',
    },
    {
      id: 'comp-3',
      name: 'Figma Cloud',
      domain: 'figma.com',
      employees: '1,800+',
      revenue: '$600M',
      techStack: ['Salesforce', 'Marketo', 'Apollo.io'],
      intentLevel: 'Medium',
      status: 'Enriching Technographics...',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Building2 className="w-6 h-6 text-[#16C5D8]" />
              Company Firmographic & Technographic Enrichment
            </h1>
            <Badge variant="cyan" size="sm">
              Autonomous Deep Scanning
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time web crawling, technographic detection, leadership changes & intent signal synthesis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm" glow leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#040B14]" />}>
            Enrich New Domain
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockCompanies.map((company) => (
          <Card key={company.id} hoverEffect className="flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="cyan" size="sm" dot>
                  {company.status}
                </Badge>
                <span className="text-xs font-mono text-[#16C5D8] flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  {company.domain}
                </span>
              </div>
              <CardTitle className="mt-2 text-lg">{company.name}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs font-mono p-2.5 rounded-lg bg-[#040B14] border border-[#1E3452]">
                <div>
                  <span className="text-slate-500 block">Employees</span>
                  <span className="text-slate-200 font-semibold">{company.employees}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Est Revenue</span>
                  <span className="text-emerald-400 font-semibold">{company.revenue}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 block mb-1.5 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-[#6A4FD9]" />
                  Detected Sales Tech Stack:
                </span>
                <div className="flex flex-wrap gap-1">
                  {company.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#040B14] border border-[#1E3452] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full mt-2" rightIcon={<ExternalLink className="w-3 h-3" />}>
                Full Dossier
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
