export type ModuleId = 
  | 'overview'
  | 'leads'
  | 'enrichment'
  | 'scoring'
  | 'outreach'
  | 'revenue'
  | 'recommendations'
  | 'approvals'
  | 'workflows'
  | 'settings';

export interface NavItem {
  id: ModuleId;
  label: string;
  iconName: string;
  badgeCount?: number;
  description: string;
  category: 'core' | 'intelligence' | 'governance' | 'system';
}

export type AIStatusState = 'autonomous' | 'waiting_approval' | 'executing' | 'idle';

export interface AIReasoningStep {
  id: string;
  timestamp: string;
  stepName: string;
  description: string;
  confidence: number;
  dataSources: string[];
  status: 'passed' | 'flagged' | 'in_progress';
}

export interface AIEmployeeState {
  name: string;
  avatar: string;
  role: string;
  status: AIStatusState;
  currentAction: string;
  activeTasksCount: number;
  confidenceScore: number;
  lastActive: string;
  reasoningSteps: AIReasoningStep[];
  tokensProcessedPerSec: number;
  activeAgentsCount: number;
}

export interface PendingApprovalItem {
  id: string;
  title: string;
  category: 'Outreach Draft' | 'Lead Escalation' | 'Contract Terms' | 'Deal Stage Change' | 'Enrichment Trigger';
  companyName: string;
  companyDomain: string;
  companyLogo?: string;
  opportunityValue: number;
  confidenceScore: number;
  aiReasoning: string;
  reasoningSteps: AIReasoningStep[];
  proposedAction: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  riskScore: 'Low' | 'Moderate' | 'High';
  targetContact: {
    name: string;
    title: string;
    email: string;
  };
  emailPreview?: {
    subject: string;
    body: string;
  };
}

export interface LeadRecord {
  id: string;
  name: string;
  title: string;
  company: string;
  companyDomain: string;
  email: string;
  phone?: string;
  location: string;
  intentScore: number;
  icpFitScore: number;
  budget: number;
  fitCategory: 'Tier 1 Enterprise' | 'Growth Enterprise' | 'Mid-Market';
  status: 'Qualified by AI' | 'Awaiting Sign-off' | 'Enriched' | 'Outreach Dispatched' | 'Disqualified';
  signals: string[];
  techStack: string[];
  lastActivity: string;
  assignedRep?: string;
}

export interface CompanyRecord {
  id: string;
  name: string;
  domain: string;
  logoUrl?: string;
  industry: string;
  employees: string;
  revenue: string;
  fundingRound: string;
  location: string;
  techStack: string[];
  intentLevel: 'Extreme' | 'High' | 'Moderate' | 'Emerging';
  intentScore: number;
  decisionMakersCount: number;
  status: 'Enriched by Aura AI' | 'Enriching Technographics...' | 'In Queue';
  recentHires: string[];
  buyingTriggers: string[];
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  actor: 'Aura AI' | 'Human Approved' | 'System';
  action: string;
  target: string;
  type: 'qualification' | 'enrichment' | 'outreach' | 'scoring' | 'approval';
  status: 'success' | 'pending' | 'flagged';
  latencyMs?: number;
}

export interface WorkspaceTenant {
  id: string;
  name: string;
  domain: string;
  plan: 'Enterprise Ultimate' | 'Scale Pro' | 'Custom';
  activeUsers: number;
  monthlyCreditsUsed: number;
  monthlyCreditsLimit: number;
  crmConnected: string;
  geminiModel: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'approval_required' | 'ai_insight' | 'system_alert' | 'workflow_complete';
  read: boolean;
  linkId?: ModuleId;
}
