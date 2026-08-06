import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import {
  Settings,
  Key,
  Database,
  Shield,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Server,
  Lock,
  UserCheck,
  Globe,
  Bell,
  Cpu,
} from 'lucide-react';

export const SettingsIntegrations: React.FC = () => {
  const { currentWorkspace } = useAppStore();
  const [activeTab, setActiveTab] = useState('integrations');

  const integrations = [
    {
      name: 'HubSpot CRM Enterprise',
      category: 'CRM Synchronization & Lead Route',
      status: 'Connected & Active',
      syncTime: '5 mins ago',
      iconColor: 'bg-orange-500/20 text-orange-400',
    },
    {
      name: 'Salesforce Sales Cloud',
      category: 'CRM & Pipeline Opportunity Sync',
      status: 'Connected & Active',
      syncTime: '12 mins ago',
      iconColor: 'bg-blue-500/20 text-blue-400',
    },
    {
      name: 'Google Gemini 1.5 Pro AI SDK',
      category: 'Server-Side Autonomous Core',
      status: 'Connected (Server Route)',
      syncTime: 'Real-time',
      iconColor: 'bg-[#16C5D8]/20 text-[#16C5D8]',
    },
    {
      name: 'Gong.io Call Intelligence',
      category: 'Conversation Intelligence & Sentiment',
      status: 'Connected',
      syncTime: '1 hour ago',
      iconColor: 'bg-purple-500/20 text-purple-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Settings className="w-6 h-6 text-[#16C5D8]" />
              Enterprise Settings & Workspace Connectors
            </h1>
            <Badge variant="cyan" size="sm">
              {currentWorkspace.plan}
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure CRM connectors, Gemini AI API proxies, multi-tenant RBAC permissions, and webhook notifications.
          </p>
        </div>

        <Button variant="secondary" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5 text-[#16C5D8]" />}>
          Sync All Connectors
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'integrations', label: 'API Integrations & CRM Connectors', icon: <Database className="w-4 h-4" /> },
          { id: 'workspace', label: 'Workspace & Multi-Tenancy', icon: <Sliders className="w-4 h-4" /> },
          { id: 'security', label: 'Governance Policy & RBAC', icon: <Shield className="w-4 h-4" /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab 1: API Integrations */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Server className="w-4 h-4 text-[#16C5D8]" />
                Server-Side API Route Architecture (.env Secret Protection)
              </CardTitle>
              <CardDescription>
                All secret API keys (including Gemini API) are kept strictly server-side inside Cloud Run environment variables.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 font-mono text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-[#040B14] border border-[#1E3452]">
                <div className="text-emerald-400 font-semibold mb-1">Status: SECURE_SERVER_PROXY_ACTIVE</div>
                <p className="text-[11px] text-slate-400">
                  Client requests are proxied via <span className="text-[#16C5D8]">/api/v1/gemini</span> endpoints to eliminate key exposure in browser DevTools.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 2: Workspace */}
      {activeTab === 'workspace' && (
        <Card>
          <CardHeader>
            <CardTitle>Organization & Multi-Tenant Profile</CardTitle>
            <CardDescription>Managed enterprise account settings for {currentWorkspace.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-w-xl">
            <Input label="Workspace Name" defaultValue={currentWorkspace.name} />
            <Input label="Custom Enterprise Domain" defaultValue={currentWorkspace.domain} />
            <Input label="Primary Administrative Email" defaultValue="ops@acme-corp.com" />
            <Input label="Cloud Region" defaultValue="us-central1 (Iowa)" disabled />

            <Button variant="primary" size="sm" glow>
              Save Organization Changes
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tab 3: Security & Governance */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                Human-in-the-Loop Governance Policies
              </CardTitle>
              <CardDescription>Strict rules requiring human operator verification before AI execution</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Outreach Email Dispatch Approval</span>
                  <Badge variant="cyan" size="sm">Mandatory Sign-off</Badge>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  All AI-drafted C-level outreach emails require human approval in Approval Hub before sending.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#040B14] border border-[#1E3452] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Opportunity Threshold Gate</span>
                  <span className="text-xs font-mono text-emerald-400">$100,000 ARR</span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Any deal score alteration or stage movement exceeding $100k requires VP RevOps sign-off.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#16C5D8]" />
                Role-Based Access Control (RBAC)
              </CardTitle>
              <CardDescription>Active team members and permissions</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2 font-mono text-xs">
              {[
                { name: 'Alex Mercer', role: 'VP RevOps / Owner', email: 'alex@aura-lead.com' },
                { name: 'Sarah Jenkins', role: 'Enterprise AE', email: 'sarah@aura-lead.com' },
                { name: 'Michael Chang', role: 'Solutions Architect', email: 'michael@aura-lead.com' },
              ].map((user, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#040B14] border border-[#1E3452] flex items-center justify-between">
                  <div>
                    <span className="text-white font-semibold font-sans block">{user.name}</span>
                    <span className="text-slate-500 text-[10px]">{user.email}</span>
                  </div>
                  <Badge variant="purple" size="sm">{user.role}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
