import React, { useState } from 'react';
import { BlindSpotAnalysis, DecisionInput, ReassessmentDelta } from '../types/decision';
import { rescanDecision } from '../services/api';
import { RefreshCw, CheckCircle, ArrowRight, MessageSquare } from 'lucide-react';

interface ReflectionPanelProps {
  originalDecision: DecisionInput;
  analysis: BlindSpotAnalysis;
  onReassessmentComplete: (delta: ReassessmentDelta) => void;
}

export const ReflectionPanel: React.FC<ReflectionPanelProps> = ({
  originalDecision,
  analysis,
  onReassessmentComplete,
}) => {
  const [reflectionChoice, setReflectionChoice] = useState<'changed' | 'more_info' | 'holds' | null>(null);
  const [updatedReasoning, setUpdatedReasoning] = useState('');
  const [isRescanning, setIsRescanning] = useState(false);
  const [reassessmentDelta, setReassessmentDelta] = useState<ReassessmentDelta | null>(null);

  const handleChoiceSelect = (choice: 'changed' | 'more_info' | 'holds') => {
    setReflectionChoice(choice);
  };

  const handleRescanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionChoice) return;

    setIsRescanning(true);
    try {
      const delta = await rescanDecision({
        originalDecision,
        originalAnalysis: analysis,
        userReflectionState: reflectionChoice,
        updatedReasoning: updatedReasoning.trim() || 'No additional text provided.',
      });
      setReassessmentDelta(delta);
      onReassessmentComplete(delta);
    } catch (err) {
      console.error('Re-scan error:', err);
    } finally {
      setIsRescanning(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-brand-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 my-10">
      <div className="flex items-center space-x-2 text-brand-300 text-xs font-bold uppercase tracking-wider">
        <MessageSquare className="w-5 h-5 text-amber-400" aria-hidden="true" />
        <span>STEP 3 — REFLECTION & RE-SCAN</span>
      </div>

      <div>
        <h2 className="text-2xl font-bold font-serif leading-snug">
          {analysis.reflectionPrompt || 'After examining these blind spots, has anything changed in how you view the decision?'}
        </h2>
        <p className="text-sm text-brand-200 mt-2">
          Select how your perspective has evolved, update your reasoning, and re-scan your decision perimeter.
        </p>
      </div>

      {/* Choice Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <button
          type="button"
          onClick={() => handleChoiceSelect('changed')}
          className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
            reflectionChoice === 'changed'
              ? 'bg-amber-500 text-brand-950 border-amber-300 font-bold shadow-lg ring-2 ring-amber-400'
              : 'bg-brand-950/60 text-brand-100 border-brand-800 hover:border-brand-600 hover:bg-brand-900'
          }`}
        >
          <span className="text-sm font-bold">My reasoning changed</span>
          <span className="text-xs opacity-80 mt-2">Identified a major assumption or unworkable trade-off.</span>
        </button>

        <button
          type="button"
          onClick={() => handleChoiceSelect('more_info')}
          className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
            reflectionChoice === 'more_info'
              ? 'bg-sky-500 text-brand-950 border-sky-300 font-bold shadow-lg ring-2 ring-sky-400'
              : 'bg-brand-950/60 text-brand-100 border-brand-800 hover:border-brand-600 hover:bg-brand-900'
          }`}
        >
          <span className="text-sm font-bold">I need more information</span>
          <span className="text-xs opacity-80 mt-2">Must ask critical questions before taking action.</span>
        </button>

        <button
          type="button"
          onClick={() => handleChoiceSelect('holds')}
          className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
            reflectionChoice === 'holds'
              ? 'bg-emerald-500 text-brand-950 border-emerald-300 font-bold shadow-lg ring-2 ring-emerald-400'
              : 'bg-brand-950/60 text-brand-100 border-brand-800 hover:border-brand-600 hover:bg-brand-900'
          }`}
        >
          <span className="text-sm font-bold">My reasoning still holds</span>
          <span className="text-xs opacity-80 mt-2">Accepting highlighted risks with conscious mitigations.</span>
        </button>
      </div>

      {/* Decision Re-Scan Form */}
      {reflectionChoice && (
        <form onSubmit={handleRescanSubmit} className="pt-4 border-t border-brand-800/80 space-y-4">
          <div>
            <label htmlFor="updated-reasoning" className="block text-xs font-bold text-brand-200 uppercase tracking-wide mb-2">
              Update Your Reasoning or Answer Critical Questions
            </label>
            <textarea
              id="updated-reasoning"
              rows={3}
              value={updatedReasoning}
              onChange={(e) => setUpdatedReasoning(e.target.value)}
              placeholder="e.g. I spoke with the manager; mentorship is available 2x weekly. However, exam workload during week 8 remains tight..."
              className="w-full px-4 py-3 bg-brand-950 text-white border border-brand-700 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none text-sm placeholder-brand-400"
            />
          </div>

          <button
            type="submit"
            disabled={isRescanning}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-brand-950 font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-60"
          >
            {isRescanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Re-scanning Updated Reasoning...</span>
              </>
            ) : (
              <>
                <span>Re-Scan My Updated Reasoning</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {/* Delta Display (WHAT CHANGED?) */}
      {reassessmentDelta && (
        <div className="bg-brand-900 p-5 rounded-2xl border border-brand-700 space-y-3 mt-6">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">
            <CheckCircle className="w-4 h-4" />
            <span>RE-SCAN ANALYSIS — WHAT CHANGED?</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-brand-950 p-3 rounded-xl border border-brand-800">
              <span className="text-amber-400 font-bold block mb-1">PREVIOUSLY OVERLOOKED</span>
              <ul className="list-disc list-inside space-y-1 text-brand-200">
                {reassessmentDelta.previouslyOverlookedResolved.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-brand-950 p-3 rounded-xl border border-brand-800">
              <span className="text-emerald-400 font-bold block mb-1">NOW CLARIFIED</span>
              <ul className="list-disc list-inside space-y-1 text-brand-200">
                {reassessmentDelta.nowClarified.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-brand-950 p-3 rounded-xl border border-brand-800">
              <span className="text-sky-400 font-bold block mb-1">STILL UNRESOLVED</span>
              <ul className="list-disc list-inside space-y-1 text-brand-200">
                {reassessmentDelta.stillUnresolved.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
