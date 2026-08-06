import React from 'react';
import { useAppStore } from './store/useAppStore';
import { DashboardShell } from './components/layout/DashboardShell';
import { DashboardOverview } from './pages/DashboardOverview';
import { LeadsQualification } from './pages/LeadsQualification';
import { CompanyEnrichment } from './pages/CompanyEnrichment';
import { OpportunityScoring } from './pages/OpportunityScoring';
import { OutreachStudio } from './pages/OutreachStudio';
import { RevenuePrediction } from './pages/RevenuePrediction';
import { ActionRecommendations } from './pages/ActionRecommendations';
import { HumanApprovalHub } from './pages/HumanApprovalHub';
import { ExecutedWorkflows } from './pages/ExecutedWorkflows';
import { SettingsIntegrations } from './pages/SettingsIntegrations';
import { NotFound } from './pages/NotFound';

export default function App() {
  const { activeModule } = useAppStore();

  const renderModule = () => {
    switch (activeModule) {
      case 'overview':
        return <DashboardOverview />;
      case 'leads':
        return <LeadsQualification />;
      case 'enrichment':
        return <CompanyEnrichment />;
      case 'scoring':
        return <OpportunityScoring />;
      case 'outreach':
        return <OutreachStudio />;
      case 'revenue':
        return <RevenuePrediction />;
      case 'recommendations':
        return <ActionRecommendations />;
      case 'approvals':
        return <HumanApprovalHub />;
      case 'workflows':
        return <ExecutedWorkflows />;
      case 'settings':
        return <SettingsIntegrations />;
      default:
        return <NotFound />;
    }
  };

  return <DashboardShell>{renderModule()}</DashboardShell>;
}

