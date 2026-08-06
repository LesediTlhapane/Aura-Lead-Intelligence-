import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Zap, CheckCircle2, ShieldCheck, Clock, FileText, Search, ExternalLink, Code, Database } from 'lucide-react';

export const ExecutedWorkflows: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  const mockWorkflows = [
    {
      id: 'wf-901',
      name: 'Stripe C-Level Email Campaign Dispatch',
      module: 'Outreach Studio',
      executor: 'Human Approved (Alex Mercer)',
      timestamp: '12 mins ago',
      status: 'Completed',
      duration: '1.2s API execution',
      payload: {
        target: 'Claire Hughes (CRO @ Stripe)',
        campaignId: 'cmp-stripe-emea-c-level',
        channel: 'SendGrid Enterprise API',
        statusCode: 200,
        response: 'Message ID <msg-9401284@sendgrid.com> queued for dispatch',
      },
    },
    {
      id: 'wf-902',
      name: 'HubSpot CRM Account Re-assignment & Intent Tagging',
      module: 'Lead Qualification',
      executor: 'Aura Autonomous Agent',
      timestamp: '45 mins ago',
      status: 'Completed',
      duration: '840ms API execution',
      payload: {
        target: 'Datadog Systems (datadoghq.com)',
        assignedRep: 'Sarah Jenkins (Enterprise AE)',
        scoreAssigned: 94,
        statusCode: 200,
        response: 'HubSpot Deal #84910 updated successfully',
      },
    },
    {
      id: 'wf-903',
      name: 'Technographic Crawl & Firmographic Enrichment',
      module: 'Company Enrichment',
      executor: 'Aura Autonomous Agent',
      timestamp: '2 hours ago',
      status: 'Completed',
      duration: '4.5s Web Scan',
      payload: {
        target: 'Snowflake Analytics',
        technographicsDetected: 18,
        decisionMakersEnriched: 45,
        statusCode: 200,
        response: 'Clearbit + Apollo API payload synced to Aura DB',
      },
    },
    {
      id: 'wf-904',
      name: 'Monte Carlo Pipeline Win Rate Recalculation',
      module: 'Revenue Prediction',
      executor: 'Scheduled Cron Agent',
      timestamp: '4 hours ago',
      status: 'Completed',
      duration: '2.1s Calculation',
      payload: {
        iterations: 10000,
        expectedQ3Revenue: 2840000,
        confidenceInterval: '95%',
        statusCode: 200,
        response: 'Forecast cache updated',
      },
    },
  ];

  const filtered = mockWorkflows.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.executor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#E94E97]" />
              Executed Workflows & Immutable Audit Log
            </h1>
            <Badge variant="cyan" size="sm">
              SOC-2 Type II Compliance
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete cryptographic audit log of all automated, human-approved, and system workflow executions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-64">
            <Input
              placeholder="Search by ID or workflow..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-[#16C5D8]" />}
            />
          </div>
          <Button variant="secondary" size="sm" leftIcon={<FileText className="w-3.5 h-3.5" />}>
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">EXECUTIONS TODAY</div>
              <div className="text-2xl font-bold text-white mt-1">1,420 Actions</div>
            </div>
            <Badge variant="cyan" size="sm">100% Success</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">AVG LATENCY</div>
              <div className="text-2xl font-bold text-[#16C5D8] mt-1">1.1s</div>
            </div>
            <Badge variant="purple" size="sm">Fast API</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">HUMAN SIGN-OFFS</div>
              <div className="text-2xl font-bold text-amber-400 mt-1">42 Signed</div>
            </div>
            <Badge variant="orange" size="sm">Audited</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Audit Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#040B14] text-slate-400 uppercase font-mono text-[10px] border-b border-[#1E3452]">
                <tr>
                  <th className="py-3 px-4">Workflow Name & Ref ID</th>
                  <th className="py-3 px-4">Module Source</th>
                  <th className="py-3 px-4">Initiator / Approver</th>
                  <th className="py-3 px-4">Latency</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Payload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E3452]/40 font-mono">
                {filtered.map((wf) => (
                  <tr key={wf.id} className="hover:bg-[#0E1E38]/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white font-sans">{wf.name}</div>
                      <div className="text-[10px] text-slate-500">{wf.id} • {wf.timestamp}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#16C5D8] font-semibold">{wf.module}</td>
                    <td className="py-3.5 px-4 text-slate-300">{wf.executor}</td>
                    <td className="py-3.5 px-4 text-slate-400">{wf.duration}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant="success" size="sm" dot>
                        {wf.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right font-sans">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Code className="w-3 h-3 text-[#16C5D8]" />}
                        onClick={() => setSelectedLog(wf)}
                      >
                        Inspect Payload
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payload Modal */}
      {selectedLog && (
        <Modal
          isOpen={!!selectedLog}
          onClose={() => setSelectedLog(null)}
          title={`API Payload Inspection — ${selectedLog.id}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-1">
              <div className="text-slate-400">Workflow: <span className="text-white font-semibold">{selectedLog.name}</span></div>
              <div className="text-slate-400">Initiator: <span className="text-[#16C5D8]">{selectedLog.executor}</span></div>
            </div>

            <div className="space-y-1">
              <div className="text-[#16C5D8] text-[11px] uppercase">Cryptographic Audit Payload</div>
              <pre className="p-4 rounded-xl bg-[#040B14] border border-[#1E3452] text-emerald-400 text-[11px] overflow-x-auto leading-relaxed">
                {JSON.stringify(selectedLog.payload, null, 2)}
              </pre>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#1E3452]/60">
              <Button variant="secondary" size="sm" onClick={() => setSelectedLog(null)}>
                Close Log
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
