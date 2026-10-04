import React, { useState } from 'react';
import { AssumptionItem } from '../types/decision';
import { CheckCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface AssumptionCardProps {
  item: AssumptionItem;
  index: number;
}

export const AssumptionCard: React.FC<AssumptionCardProps> = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // Expand first by default

  return (
    <div className="bg-white rounded-xl border border-amber-200 shadow-sm overflow-hidden transition-all hover:border-amber-300">
      <div
        className="p-4 sm:p-5 flex items-start justify-between cursor-pointer bg-amber-50/50 select-none"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start space-x-3 pr-4">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center border border-amber-300">
            {index + 1}
          </span>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
              UNSTATED ASSUMPTION
            </span>
            <h3 className="mt-1 text-base font-semibold text-brand-950 leading-snug">
              "{item.assumption}"
            </h3>
          </div>
        </div>

        <button
          type="button"
          className="text-amber-800 hover:text-amber-950 focus:outline-none p-1"
          aria-label={isExpanded ? "Collapse assumption details" : "Expand assumption details"}
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-5 border-t border-amber-100 space-y-4 text-sm">
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Why It Matters</h4>
            <p className="mt-1 text-slate-800 leading-relaxed font-medium">{item.whyItMatters}</p>
          </div>

          <div className="bg-canvas-50 p-3.5 rounded-lg border border-canvas-200">
            <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wide mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              <span>Verification Check</span>
            </div>
            <p className="text-slate-700 text-sm">{item.checkMethod}</p>
          </div>

          {item.evidenceMissing && (
            <div className="flex items-start space-x-2 text-xs text-amber-900 bg-amber-50 p-3 rounded-lg border border-amber-200">
              <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-bold">Missing Evidence: </span>
                <span>{item.evidenceMissing}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
