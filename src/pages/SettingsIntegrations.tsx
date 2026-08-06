import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { Settings, Key, Database, Shield, Sliders, CheckCircle2, RefreshCw } from 'lucide-react';

export const SettingsIntegrations: React.FC = () => {
  const { currentWorkspace } = useAppStore();
  const [activeTab, setActiveTab] = useState('integrations');

  const integrations = [
    {
      name: 'HubSpot CRM Integration',
      category: 'CRM Synchronization',
      status: 'Connected & Active',
      syncTime: '5 mins ago',
      iconColor: 'bg-orange-500/20 text-orange-400',
    },
    {
      name: 'Salesforce Enterprise Cloud',
      category: 'CRM & Pipeline Data',
      status: 'Connected & Active',
      syncTime: '12 mins ago',
      iconColor: 'bg-blue-500/20 text-blue-400',
    },
    {
      name: 'Gemini Enterprise AI API',
      category: 'LLM & Autonomous Agent Core',
      status: 'Connected (Server-Side)',
      syncTime: 'Real-time',
      iconColor: 'bg-[#16C5D8]/20 text-[#16C5D8]',
    },
    {
      name: 'Gong.io Sales Intelligence',
      category: 'Call Transcripts & Intent',
      status: 'Pending OAuth',
      syncTime: 'Not Synced',
      iconColor: 'bg-purple-500/20 text-purple-400',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Settings className="w-6 h-6 text-slate-400" />
              Settings & Workspace Integrations
            </h1>
            <Badge variant="cyan" size="sm">
              {currentWorkspace.plan}
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure CRM connectors, Gemini AI API credentials, multi-tenant RBAC permissions, and webhook notifications.
          </p>
        </div>
      </div>

      <Tabs
        tabs={[
          { id: 'integrations', label: 'API Integrations & Connectors', icon: <Database className="w-4 h-4" /> },
          { id: 'workspace', label: 'Workspace Details & Billing', icon: <Sliders className="w-4 h-4" /> },
          { id: 'security', label: 'Security & Governance', icon: <Shield className="w-4 h-4" /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((item, idx) => (
            <Card key={idx} hoverEffect>
              <CardContent className="p-5 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Badge variant={item.status.includes('Connected') ? 'success' : 'warning'} size="sm" dot>
                    {item.status}
                  </Badge>
                  <h3 className="text-sm font-semibold text-white pt-1">{item.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{item.category}</p>
                  <span className="text-[10px] text-slate-500 font-mono block">Last synced: {item.syncTime}</span>
                </div>

                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'workspace' && (
        <Card>
          <CardHeader>
            <CardTitle>Tenant & Organization Parameters</CardTitle>
            <CardDescription>Managed settings for {currentWorkspace.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-w-xl">
            <Input label="Workspace Name" defaultValue={currentWorkspace.name} />
            <Input label="Custom Domain" defaultValue={currentWorkspace.domain} />
            <Input label="Primary Administrative Email" defaultValue="ops@acme-corp.com" />
            <Button variant="primary" size="sm" glow>
              Save Changes
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card>
          <CardHeader>
            <CardTitle>Human-in-the-loop Governance Controls</CardTitle>
            <CardDescription>Define threshold rules for requiring human sign-off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Outreach Email Dispatch Approval</span>
                <Badge variant="cyan" size="sm">Mandatory Sign-off</Badge>
              </div>
              <p className="text-xs text-slate-400">
                All AI-drafted outreach emails require human approval before sending out to prospects.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">High Value Opportunity Threshold</span>
                <span className="text-xs font-mono text-emerald-400">$100,000 ARR</span>
              </div>
              <p className="text-xs text-slate-400">
                Any lead score change or deal stage movement above $100k requires C-level operator approval.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
