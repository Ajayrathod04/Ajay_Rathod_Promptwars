import React from 'react';
import { InformationGapItem } from '../types/decision';
import { CheckCircle2, HelpCircle, AlertCircle } from 'lucide-react';

interface InformationGapMatrixProps {
  items: InformationGapItem[];
}

export const InformationGapMatrix: React.FC<InformationGapMatrixProps> = ({ items }) => {
  const known = items.filter((i) => i.status === 'KNOWN');
  const assumed = items.filter((i) => i.status === 'ASSUMED');
  const unknown = items.filter((i) => i.status === 'UNKNOWN');

  return (
    <div className="bg-white rounded-2xl border border-canvas-200 p-5 sm:p-6 shadow-sm space-y-4">
      <div>
        <h3 className="text-xs font-bold text-brand-900 uppercase tracking-wider">
          Information Gaps Matrix
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Explicitly distinguishing verified facts, unverified assumptions, and unmapped variables.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* KNOWN Column */}
        <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-200">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wide mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>VERIFIED KNOWN ({known.length})</span>
          </div>
          <ul className="space-y-2.5 text-xs">
            {known.map((item) => (
              <li key={item.id} className="bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
                <span className="font-semibold text-slate-900 block">{item.topic}</span>
                <span className="text-slate-600 text-[11px] block mt-0.5">{item.details}</span>
              </li>
            ))}
            {known.length === 0 && (
              <li className="text-slate-400 italic">No verified facts recorded.</li>
            )}
          </ul>
        </div>

        {/* ASSUMED Column */}
        <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-200">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-800 uppercase tracking-wide mb-3">
            <HelpCircle className="w-4 h-4 text-amber-600" aria-hidden="true" />
            <span>UNVERIFIED ASSUMED ({assumed.length})</span>
          </div>
          <ul className="space-y-2.5 text-xs">
            {assumed.map((item) => (
              <li key={item.id} className="bg-white p-2.5 rounded-lg border border-amber-100 shadow-2xs">
                <span className="font-semibold text-slate-900 block">{item.topic}</span>
                <span className="text-slate-600 text-[11px] block mt-0.5">{item.details}</span>
              </li>
            ))}
            {assumed.length === 0 && (
              <li className="text-slate-400 italic">No assumptions flagged.</li>
            )}
          </ul>
        </div>

        {/* UNKNOWN Column */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
            <AlertCircle className="w-4 h-4 text-slate-500" aria-hidden="true" />
            <span>CURRENTLY UNKNOWN ({unknown.length})</span>
          </div>
          <ul className="space-y-2.5 text-xs">
            {unknown.map((item) => (
              <li key={item.id} className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="font-semibold text-slate-900 block">{item.topic}</span>
                <span className="text-slate-600 text-[11px] block mt-0.5">{item.details}</span>
              </li>
            ))}
            {unknown.length === 0 && (
              <li className="text-slate-400 italic">No unknown factors flagged.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
