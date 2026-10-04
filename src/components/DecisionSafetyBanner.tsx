import React from 'react';
import { ShieldAlert, Check } from 'lucide-react';

interface DecisionSafetyBannerProps {
  onNewInspection?: () => void;
}

export const DecisionSafetyBanner: React.FC<DecisionSafetyBannerProps> = ({ onNewInspection }) => {
  return (
    <div className="bg-canvas-100 rounded-2xl border-2 border-brand-900/10 p-6 sm:p-8 text-center space-y-4 my-8 shadow-sm">
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-900 text-white text-xs font-bold uppercase tracking-wider">
        <ShieldAlert className="w-4 h-4 text-amber-400" aria-hidden="true" />
        <span>CORE PRODUCT PRINCIPLE</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-950 font-serif tracking-tight">
        BlindLens does not decide for you.
      </h2>

      <p className="text-base text-slate-700 max-w-xl mx-auto leading-relaxed">
        We surface assumptions, risks, and missing factors to challenge your reasoning. Now that you've inspected your blind spots, <strong className="text-brand-950">the final decision belongs to you.</strong>
      </p>

      {onNewInspection && (
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onNewInspection}
            className="px-6 py-3 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-bold text-sm shadow-md transition-all flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>I'm Ready — Make My Decision</span>
          </button>
        </div>
      )}
    </div>
  );
};
