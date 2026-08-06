import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/ui/Button';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  const { setActiveModule } = useAppStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-4">
      <div className="p-4 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400">
        <ShieldAlert className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-bold text-white">404 - Module Route Not Found</h2>
      <p className="text-xs text-slate-400 max-w-md">
        The requested intelligence view is unavailable or you do not have permission to access it.
      </p>
      <Button
        variant="primary"
        size="md"
        leftIcon={<ArrowLeft className="w-4 h-4" />}
        onClick={() => setActiveModule('overview')}
      >
        Return to Executive Overview
      </Button>
    </div>
  );
};
