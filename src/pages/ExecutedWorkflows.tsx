import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Zap, CheckCircle2, ShieldCheck, Clock, FileText } from 'lucide-react';

export const ExecutedWorkflows: React.FC = () => {
  const mockWorkflows = [
    {
      id: 'wf-901',
      name: 'Stripe C-Level Email Campaign Dispatch',
      module: 'Outreach Studio',
      executor: 'Human Approved (Alex Mercer)',
      timestamp: '12 mins ago',
      status: 'Completed',
      duration: '1.2s API execution',
    },
    {
      id: 'wf-902',
      name: 'HubSpot CRM Account Re-assignment & Intent Tagging',
      module: 'Lead Qualification',
      executor: 'Aura Autonomous Agent',
      timestamp: '45 mins ago',
      status: 'Completed',
      duration: '840ms API execution',
    },
    {
      id: 'wf-903',
      name: 'Technographic Crawl & Firmographic Enrichment',
      module: 'Company Enrichment',
      executor: 'Aura Autonomous Agent',
      timestamp: '2 hours ago',
      status: 'Completed',
      duration: '4.5s Web Scan',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#E94E97]" />
              Executed Workflows & Audit Trail
            </h1>
            <Badge variant="cyan" size="sm">
              Immutable Governance Audit Log
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete record of all automated, human-approved, and system workflow executions.
          </p>
        </div>

        <Button variant="secondary" size="sm" leftIcon={<FileText className="w-3.5 h-3.5" />}>
          Export Audit Log (CSV)
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#040B14] text-slate-400 uppercase font-mono text-[10px] border-b border-[#1E3452]">
                <tr>
                  <th className="py-3 px-4">Workflow Name & ID</th>
                  <th className="py-3 px-4">Module Source</th>
                  <th className="py-3 px-4">Approved / Initiated By</th>
                  <th className="py-3 px-4">Execution Latency</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E3452]/40 font-mono">
                {mockWorkflows.map((wf) => (
                  <tr key={wf.id} className="hover:bg-[#0E1E38]/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white font-sans">{wf.name}</div>
                      <div className="text-[10px] text-slate-500">{wf.id}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#16C5D8]">{wf.module}</td>
                    <td className="py-3.5 px-4 text-slate-300">{wf.executor}</td>
                    <td className="py-3.5 px-4 text-slate-400">{wf.duration}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant="success" size="sm" dot>
                        {wf.status}
                      </Badge>
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
