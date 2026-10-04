import React, { useState } from 'react';
import { DecisionInput } from '../types/decision';
import { PRESET_EXAMPLES } from '../domain/presetExamples';
import { Sparkles, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

interface DecisionFormProps {
  onSubmit: (input: DecisionInput) => void;
  isAnalyzing: boolean;
}

export const DecisionForm: React.FC<DecisionFormProps> = ({ onSubmit, isAnalyzing }) => {
  const [decision, setDecision] = useState('');
  const [beliefs, setBeliefs] = useState('');
  const [context, setContext] = useState('');
  const [factors, setFactors] = useState('');
  const [showOptionalContext, setShowOptionalContext] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decision.trim()) {
      setErrorMessage('Please describe the decision you are considering.');
      return;
    }
    setErrorMessage('');
    onSubmit({
      decision: decision.trim(),
      beliefs: beliefs.trim() || undefined,
      context: context.trim() || undefined,
      factors: factors.trim() || undefined,
    });
  };

  const handleSelectPreset = (presetId: string) => {
    const preset = PRESET_EXAMPLES.find((p) => p.id === presetId);
    if (preset) {
      setDecision(preset.input.decision);
      setBeliefs(preset.input.beliefs || '');
      setContext(preset.input.context || '');
      setFactors(preset.input.factors || '');
      setShowOptionalContext(true);
      setErrorMessage('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Hero Headline & Subtext */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-950 font-serif tracking-tight leading-tight">
          See what you're missing <br className="hidden sm:inline" />
          before you decide.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          Describe a decision you're considering. BlindLens examines the reasoning behind it and surfaces assumptions, missing factors, risks, conflicts, and questions worth exploring.
        </p>

        {/* Preset Chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">Try Example:</span>
          {PRESET_EXAMPLES.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset.id)}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white text-brand-900 border border-canvas-300 hover:border-brand-500 hover:bg-brand-50 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <Sparkles className="w-3 h-3 text-amber-500 mr-1.5" aria-hidden="true" />
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-canvas-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Field 1: Decision */}
        <div>
          <label htmlFor="decision-input" className="block text-sm font-bold text-brand-950 uppercase tracking-wide mb-2">
            WHAT ARE YOU DECIDING? <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="decision-input"
            rows={3}
            value={decision}
            onChange={(e) => {
              setDecision(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            placeholder="e.g. Should I accept a 6-month software engineering internship with a good stipend?"
            className="w-full px-4 py-3 text-brand-950 bg-canvas-50 border border-canvas-300 rounded-xl focus:ring-2 focus:ring-brand-600 focus:bg-white focus:outline-none text-base placeholder-slate-400 transition-colors"
            required
            aria-describedby={errorMessage ? "decision-error" : undefined}
          />
          {errorMessage && (
            <p id="decision-error" className="mt-1.5 text-sm font-medium text-rose-600">
              {errorMessage}
            </p>
          )}
        </div>

        {/* Field 2: Beliefs / Why lean that way */}
        <div>
          <label htmlFor="beliefs-input" className="block text-sm font-bold text-brand-950 uppercase tracking-wide mb-2">
            WHAT MAKES YOU LEAN THAT WAY?
          </label>
          <textarea
            id="beliefs-input"
            rows={2}
            value={beliefs}
            onChange={(e) => setBeliefs(e.target.value)}
            placeholder="e.g. I think the industry experience will boost my resume and the office is close to home."
            className="w-full px-4 py-3 text-brand-950 bg-canvas-50 border border-canvas-300 rounded-xl focus:ring-2 focus:ring-brand-600 focus:bg-white focus:outline-none text-sm placeholder-slate-400 transition-colors"
          />
        </div>

        {/* Accordion Toggle: Optional Context */}
        <div className="border-t border-canvas-200 pt-4">
          <button
            type="button"
            onClick={() => setShowOptionalContext(!showOptionalContext)}
            className="flex items-center justify-between w-full text-left text-xs font-semibold text-brand-700 hover:text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded p-1"
            aria-expanded={showOptionalContext}
          >
            <span>{showOptionalContext ? 'Hide Optional Context' : '+ Add Optional Situation & Constraints'}</span>
            {showOptionalContext ? (
              <ChevronUp className="w-4 h-4 text-brand-600" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-4 h-4 text-brand-600" aria-hidden="true" />
            )}
          </button>

          {showOptionalContext && (
            <div className="mt-4 space-y-4 pt-2">
              <div>
                <label htmlFor="context-input" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Situation / Background Context
                </label>
                <textarea
                  id="context-input"
                  rows={2}
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="e.g. Current semester workload, family commitments, lease status..."
                  className="w-full px-3 py-2 text-sm bg-canvas-50 border border-canvas-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="factors-input" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Priority Factors That Matter Most
                </label>
                <input
                  id="factors-input"
                  type="text"
                  value={factors}
                  onChange={(e) => setFactors(e.target.value)}
                  placeholder="e.g. Learning speed, stipend, commute time, academic grades"
                  className="w-full px-3 py-2 text-sm bg-canvas-50 border border-canvas-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Primary CTA */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full py-4 px-6 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-bold text-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-brand-500/30 disabled:opacity-60"
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Scanning Reasoning...</span>
              </>
            ) : (
              <>
                <span>Scan My Reasoning</span>
                <ArrowRight className="w-5 h-5 text-brand-300" aria-hidden="true" />
              </>
            )}
          </button>
        </div>

        {/* Accessibility Status Region */}
        <div aria-live="polite" className="sr-only">
          {isAnalyzing ? 'Scanning decision reasoning and identifying potential blind spots.' : ''}
        </div>
      </form>
    </div>
  );
};
