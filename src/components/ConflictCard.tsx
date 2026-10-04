import React from 'react';
import { ConflictItem } from '../types/decision';
import { Scale } from 'lucide-react';

interface ConflictCardProps {
  item: ConflictItem;
}

export const ConflictCard: React.FC<ConflictCardProps> = React.memo(({ item }) => {
  return (
    <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-5 sm:p-6 space-y-4">
      <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
        <Scale className="w-4 h-4 text-emerald-600" aria-hidden="true" />
        <span>Trade-Off & Competing Priorities</span>
      </div>

      {/* Priority Split Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="bg-canvas-50 p-4 rounded-xl border border-canvas-200">
          <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wide">PRIORITY A</span>
          <p className="mt-1 text-sm font-bold text-brand-950">{item.priorityA}</p>
        </div>

        <div className="bg-canvas-50 p-4 rounded-xl border border-canvas-200">
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">PRIORITY B</span>
          <p className="mt-1 text-sm font-bold text-brand-950">{item.priorityB}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-slate-700 leading-relaxed">{item.description}</p>
      </div>

      <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 text-xs text-emerald-950">
        <span className="font-bold text-emerald-900 uppercase">Core Trade-Off Summary: </span>
        <span className="font-medium">{item.tradeOffSummary}</span>
      </div>
    </div>
  );
});
