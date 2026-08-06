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

export interface AIEmployeeState {
  name: string;
  avatar: string;
  role: string;
  status: AIStatusState;
  currentAction: string;
  activeTasksCount: number;
  confidenceScore: number;
  lastActive: string;
}

export interface PendingApprovalItem {
  id: string;
  title: string;
  category: 'Outreach Draft' | 'Lead Escalation' | 'Contract Terms' | 'Deal Stage Change' | 'Enrichment Trigger';
  companyName: string;
  companyDomain: string;
  opportunityValue: number;
  confidenceScore: number;
  aiReasoning: string;
  proposedAction: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  actor: 'Aura AI' | 'Human Approved' | 'System';
  action: string;
  target: string;
  type: 'qualification' | 'enrichment' | 'outreach' | 'scoring' | 'approval';
  status: 'success' | 'pending' | 'flagged';
}

export interface WorkspaceTenant {
  id: string;
  name: string;
  domain: string;
  plan: 'Enterprise Ultimate' | 'Scale Pro' | 'Custom';
  activeUsers: number;
  monthlyCreditsUsed: number;
  monthlyCreditsLimit: number;
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
