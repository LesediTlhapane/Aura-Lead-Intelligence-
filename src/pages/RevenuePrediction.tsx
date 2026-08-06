import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PieChart, TrendingUp, DollarSign, Calendar } from 'lucide-react';

export const RevenuePrediction: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1E3452]/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <PieChart className="w-6 h-6 text-[#16C5D8]" />
              Revenue & Pipeline Forecast Predictions
            </h1>
            <Badge variant="cyan" size="sm">
              Monte Carlo Model Active
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Predictive revenue modeling calculating win probabilities, sales cycle length & ARR expansion vectors.
          </p>
        </div>

        <Button variant="secondary" size="sm" leftIcon={<Calendar className="w-3.5 h-3.5 text-[#16C5D8]" />}>
          Export Q3 Model
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <span className="text-xs text-slate-400 font-mono">ESTIMATED Q3 COMMITTED REVENUE</span>
            <div className="text-2xl font-bold text-white mt-1">$2.84M ARR</div>
            <div className="text-[11px] text-emerald-400 font-mono mt-1">+14.2% vs target</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-[#10px] p-4">
            <span className="text-xs text-slate-400 font-mono">BEST CASE SCENARIO</span>
            <div className="text-2xl font-bold text-[#16C5D8] mt-1">$4.12M ARR</div>
            <div className="text-[11px] text-[#16C5D8] font-mono mt-1">Includes 8 pending enterprise deals</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <span className="text-xs text-slate-400 font-mono">MODEL ACCURACY SCORE</span>
            <div className="text-2xl font-bold text-[#6A4FD9] mt-1">97.8%</div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">Validated across 4 quarters</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
