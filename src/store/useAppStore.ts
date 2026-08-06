import { create } from 'zustand';
import { ModuleId, AIEmployeeState, PendingApprovalItem, ActivityLog, SystemNotification, WorkspaceTenant } from '../types';

interface AppStoreState {
  activeModule: ModuleId;
  isSidebarCollapsed: boolean;
  isCommandMenuOpen: boolean;
  isNotificationsOpen: boolean;
  aiEmployee: AIEmployeeState;
  pendingApprovals: PendingApprovalItem[];
  activities: ActivityLog[];
  notifications: SystemNotification[];
  currentWorkspace: WorkspaceTenant;

  // Actions
  setActiveModule: (module: ModuleId) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleCommandMenu: () => void;
  setCommandMenuOpen: (open: boolean) => void;
  toggleNotifications: () => void;
  setNotificationsOpen: (open: boolean) => void;
  approveAction: (id: string) => void;
  rejectAction: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  setWorkspace: (workspace: WorkspaceTenant) => void;
}

export const useAppStore = create<AppStoreState>((set) => ({
  activeModule: 'overview',
  isSidebarCollapsed: false,
  isCommandMenuOpen: false,
  isNotificationsOpen: false,

  currentWorkspace: {
    id: 'ws-aura-corp',
    name: 'Acme Enterprise Sales',
    domain: 'acme-corp.auralead.ai',
    plan: 'Enterprise Ultimate',
    activeUsers: 48,
    monthlyCreditsUsed: 84250,
    monthlyCreditsLimit: 100000,
    crmConnected: 'HubSpot Cloud Enterprise',
    geminiModel: 'Gemini 1.5 Pro / Flash 2.0 (Server-Side)',
  },

  aiEmployee: {
    name: 'Aura Agent Alpha',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    role: 'Lead Intelligence & Autonomous Revenue Agent',
    status: 'autonomous',
    currentAction: 'Evaluating 142 lead fit vectors & generating personalized sequences...',
    activeTasksCount: 18,
    confidenceScore: 98.4,
    lastActive: 'Active now (Live)',
    tokensProcessedPerSec: 1420,
    activeAgentsCount: 6,
    reasoningSteps: [
      {
        id: 'step-1',
        timestamp: '10:14:02 AM',
        stepName: 'Technographic Crawl & Domain Verification',
        description: 'Analyzed stripe.com headers, DNS MX records, and technographic stack (Salesforce, Marketo, Snowflake).',
        confidence: 99.1,
        dataSources: ['BuiltWith API', 'Clearbit Webhook', 'DNS Inspector'],
        status: 'passed',
      },
      {
        id: 'step-2',
        timestamp: '10:14:08 AM',
        stepName: 'Executive Personnel Mapping',
        description: 'Identified Chief Revenue Officer & 4 VP Sales hires in EMEA expansion team.',
        confidence: 97.8,
        dataSources: ['LinkedIn Sales Nav', 'Apollo API', 'G2 Intent Engine'],
        status: 'passed',
      },
      {
        id: 'step-3',
        timestamp: '10:14:15 AM',
        stepName: 'Custom Persona Outreach Drafting',
        description: 'Synthesized 4-step personalized email sequence referencing recent Stripe DevCon expansion announcement.',
        confidence: 98.2,
        dataSources: ['Gemini 1.5 Pro', 'Salesforce Historical Win Patterns'],
        status: 'passed',
      },
      {
        id: 'step-4',
        timestamp: '10:14:20 AM',
        stepName: 'Governance Policy Gate Check',
        description: 'Opportunity value ($185k) exceeds $100k threshold. Routing to Human Approval Hub.',
        confidence: 100,
        dataSources: ['Aura Security Policy Engine'],
        status: 'flagged',
      },
    ],
  },

  pendingApprovals: [
    {
      id: 'appr-101',
      title: 'High-Touch Enterprise C-Level Sequence Dispatch',
      category: 'Outreach Draft',
      companyName: 'Stripe Technologies Inc.',
      companyDomain: 'stripe.com',
      opportunityValue: 185000,
      confidenceScore: 98.2,
      aiReasoning: 'Strong buying signals detected: Added 3 VP Sales hires this month & expanded EMEA office.',
      proposedAction: 'Dispatch personalized 4-step C-level email sequence to Chief Revenue Officer.',
      timestamp: '2026-08-06T05:05:00Z',
      priority: 'high',
      riskScore: 'Low',
      targetContact: {
        name: 'Claire Hughes',
        title: 'Chief Revenue Officer',
        email: 'c.hughes@stripe.com',
      },
      emailPreview: {
        subject: 'Accelerating Stripe EMEA revenue velocity with autonomous AI agents',
        body: 'Hi Claire,\n\nI noticed Stripe recently expanded its EMEA sales leadership team. As you scale revenue operations across new regions, traditional lead qualification often creates latency between intent spikes and AE follow-up.\n\nAura Lead Intelligence operates as an autonomous AI SDR, enriching 100% of incoming lead vectors and generating C-level sequences in real-time.\n\nWould you be open to a 10-minute preview of how we helped comparable hyper-growth teams reduce lead response times from 4 hours to 45 seconds?',
      },
      reasoningSteps: [
        {
          id: 's1',
          timestamp: '10:14:02 AM',
          stepName: 'Technographic Crawl',
          description: 'Verified Stripe DNS records and verified enterprise CRM setup.',
          confidence: 99.2,
          dataSources: ['Clearbit API', 'BuiltWith'],
          status: 'passed',
        },
        {
          id: 's2',
          timestamp: '10:14:08 AM',
          stepName: 'Executive Mapping',
          description: 'Identified Claire Hughes (CRO) as primary economic buyer.',
          confidence: 97.8,
          dataSources: ['Apollo', 'LinkedIn'],
          status: 'passed',
        },
        {
          id: 's3',
          timestamp: '10:14:15 AM',
          stepName: 'C-Level Email Draft',
          description: 'Drafted tailored sequence matching Stripe brand tone.',
          confidence: 98.2,
          dataSources: ['Gemini Enterprise'],
          status: 'passed',
        },
      ],
    },
    {
      id: 'appr-102',
      title: 'Tier-1 Account Intent Escalation & AE Re-routing',
      category: 'Lead Escalation',
      companyName: 'Datadog Systems',
      companyDomain: 'datadoghq.com',
      opportunityValue: 240000,
      confidenceScore: 94.5,
      aiReasoning: 'Intent score spiked to 92/100 following 4 downloads of Enterprise Security Whitepaper.',
      proposedAction: 'Re-route account owner from SMB team to Enterprise AE Sarah Jenkins.',
      timestamp: '2026-08-06T04:45:00Z',
      priority: 'high',
      riskScore: 'Low',
      targetContact: {
        name: 'Marcus Vance',
        title: 'VP Engineering & Infrastructure',
        email: 'm.vance@datadoghq.com',
      },
      reasoningSteps: [
        {
          id: 's10',
          timestamp: '09:40:00 AM',
          stepName: 'Intent Spike Detection',
          description: 'Datadog IP range downloaded Security Whitepaper 4 times in 2 hours.',
          confidence: 96.5,
          dataSources: ['G2 Crowd', 'Bombora Intent'],
          status: 'passed',
        },
      ],
    },
    {
      id: 'appr-103',
      title: 'Contract Discount Incentive Override Request',
      category: 'Contract Terms',
      companyName: 'Vercel Platform Cloud',
      companyDomain: 'vercel.com',
      opportunityValue: 120000,
      confidenceScore: 89.1,
      aiReasoning: 'Competitor counter-offer detected. 12% multi-year discount maintains 88% win probability.',
      proposedAction: 'Apply 12% multi-year commitment incentive to proposal draft.',
      timestamp: '2026-08-06T03:30:00Z',
      priority: 'medium',
      riskScore: 'Moderate',
      targetContact: {
        name: 'Guillermo Rauch',
        title: 'CEO',
        email: 'g.rauch@vercel.com',
      },
      reasoningSteps: [
        {
          id: 's20',
          timestamp: '08:20:00 AM',
          stepName: 'Competitor Offer Analysis',
          description: 'Detected competitive evaluation signals. Monte Carlo model predicts +18% win rate with 12% discount.',
          confidence: 89.1,
          dataSources: ['Gong Call Transcripts', 'Salesforce AI Model'],
          status: 'passed',
        },
      ],
    },
    {
      id: 'appr-104',
      title: 'Autonomous Technographic Stack Enrichment',
      category: 'Enrichment Trigger',
      companyName: 'Snowflake Analytics',
      companyDomain: 'snowflake.com',
      opportunityValue: 310000,
      confidenceScore: 97.0,
      aiReasoning: 'Deep scan discovered 18 sales tech stack technologies and 45 key decision maker emails.',
      proposedAction: 'Commit enriched firmographic record into CRM database.',
      timestamp: '2026-08-06T02:15:00Z',
      priority: 'low',
      riskScore: 'Low',
      targetContact: {
        name: 'Sridhar Ramaswamy',
        title: 'CEO',
        email: 'sridhar@snowflake.com',
      },
      reasoningSteps: [],
    },
  ],

  activities: [
    {
      id: 'act-1',
      timestamp: '2 mins ago',
      actor: 'Aura AI',
      action: 'Qualified Lead #8492 (Linear Systems)',
      target: 'Lead Score: 96/100',
      type: 'qualification',
      status: 'success',
      latencyMs: 340,
    },
    {
      id: 'act-2',
      timestamp: '8 mins ago',
      actor: 'Human Approved',
      action: 'Outreach Sequence Approved for Figma Inc.',
      target: 'Campaign #204 (120 leads)',
      type: 'approval',
      status: 'success',
      latencyMs: 120,
    },
    {
      id: 'act-3',
      timestamp: '15 mins ago',
      actor: 'Aura AI',
      action: 'Enriched Firmographics for Notion Labs',
      target: '52 Decision Makers Enriched',
      type: 'enrichment',
      status: 'success',
      latencyMs: 820,
    },
    {
      id: 'act-4',
      timestamp: '28 mins ago',
      actor: 'Aura AI',
      action: 'Predicted Q3 Pipeline Expansion',
      target: '+$1.4M Opportunity Delta',
      type: 'scoring',
      status: 'success',
      latencyMs: 450,
    },
    {
      id: 'act-5',
      timestamp: '42 mins ago',
      actor: 'System',
      action: 'HubSpot CRM Sync Completed',
      target: '1,240 records updated',
      type: 'enrichment',
      status: 'success',
      latencyMs: 1100,
    },
  ],

  notifications: [
    {
      id: 'notif-1',
      title: 'Human Approval Required',
      message: 'Aura prepared a high-value outreach draft for Stripe Technologies ($185k ARR).',
      timestamp: '10 mins ago',
      type: 'approval_required',
      read: false,
      linkId: 'approvals',
    },
    {
      id: 'notif-2',
      title: 'High Buying Intent Detected',
      message: 'Datadog intent score reached 92/100 across 3 sales channels.',
      timestamp: '25 mins ago',
      type: 'ai_insight',
      read: false,
      linkId: 'scoring',
    },
    {
      id: 'notif-3',
      title: 'Autonomous Enrichment Complete',
      message: 'Successfully enriched 45 company records with technographic data.',
      timestamp: '1 hour ago',
      type: 'workflow_complete',
      read: true,
      linkId: 'enrichment',
    },
  ],

  setActiveModule: (module: ModuleId) => set({ activeModule: module }),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setSidebarCollapsed: (collapsed: boolean) => set({ isSidebarCollapsed: collapsed }),
  toggleCommandMenu: () => set((state) => ({ isCommandMenuOpen: !state.isCommandMenuOpen })),
  setCommandMenuOpen: (open: boolean) => set({ isCommandMenuOpen: open }),
  toggleNotifications: () => set((state) => ({ isNotificationsOpen: !state.isNotificationsOpen })),
  setNotificationsOpen: (open: boolean) => set({ isNotificationsOpen: open }),

  approveAction: (id: string) =>
    set((state) => {
      const approvedItem = state.pendingApprovals.find((i) => i.id === id);
      const updatedApprovals = state.pendingApprovals.filter((i) => i.id !== id);
      const newActivity: ActivityLog = {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        actor: 'Human Approved',
        action: `Approved: ${approvedItem?.title || 'Action'}`,
        target: approvedItem?.companyName || 'Target',
        type: 'approval',
        status: 'success',
        latencyMs: 180,
      };
      return {
        pendingApprovals: updatedApprovals,
        activities: [newActivity, ...state.activities],
      };
    }),

  rejectAction: (id: string) =>
    set((state) => ({
      pendingApprovals: state.pendingApprovals.filter((i) => i.id !== id),
    })),

  markNotificationRead: (id: string) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  setWorkspace: (workspace: WorkspaceTenant) => set({ currentWorkspace: workspace }),
}));
