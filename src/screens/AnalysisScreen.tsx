import React, { useRef } from 'react';
import { BlindSpotAnalysis, DecisionInput, ReassessmentDelta } from '../types/decision';
import { LensVisualization } from '../components/LensVisualization';
import { AssumptionCard } from '../components/AssumptionCard';
import { ConflictCard } from '../components/ConflictCard';
import { InformationGapMatrix } from '../components/InformationGapMatrix';
import { ReflectionPanel } from '../components/ReflectionPanel';
import { DecisionSafetyBanner } from '../components/DecisionSafetyBanner';
import { QuestionsSurface } from '../components/QuestionsSurface';
import { EyeOff, AlertTriangle, Compass, Sparkles, ShieldCheck, MessageSquare } from 'lucide-react';

interface AnalysisScreenProps {
  input: DecisionInput;
  analysis: BlindSpotAnalysis;
  onReset: () => void;
  onReassessmentComplete: (delta: ReassessmentDelta) => void;
  onOpenAskTheLens?: () => void;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({
  input,
  analysis,
  onReset,
  onReassessmentComplete,
  onOpenAskTheLens,
}) => {
  const assumptionsRef = useRef<HTMLDivElement>(null);
  const missingRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);
  const conflictsRef = useRef<HTMLDivElement>(null);
  const questionsRef = useRef<HTMLDivElement>(null);

  const handleNodeSelect = (nodeKey: string) => {
    if (nodeKey === 'assumptions') assumptionsRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (nodeKey === 'missing') missingRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (nodeKey === 'risks') risksRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (nodeKey === 'conflicts') conflictsRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (nodeKey === 'questions') questionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Fallback Notice Banner if applicable */}
      {analysis.isFallback && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2.5 rounded-xl text-xs flex items-center justify-between shadow-2xs">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Local Reasoning Engine Active:</strong> Analyzing decision perimeter using deterministic rule-based heuristics.
            </span>
          </div>
        </div>
      )}

      {/* Signature UI Element: The Reasoning Lens */}
      <section id="surface-lens" aria-labelledby="lens-section-heading">
        <h2 id="lens-section-heading" className="sr-only">Signature Reasoning Lens Visualization</h2>
        <LensVisualization
          decisionTitle={input.decision}
          analysis={analysis}
          onSelectNode={handleNodeSelect}
        />
      </section>

      {/* 1. Blind Spot Summary & Quick Ask Button */}
      <section id="surface-frame" aria-labelledby="summary-heading" className="bg-white rounded-3xl border border-canvas-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-500" aria-hidden="true" />
            <span>REASONING PERIMETER OVERVIEW</span>
          </div>
          {onOpenAskTheLens && (
            <button
              onClick={onOpenAskTheLens}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask the Lens About This Summary</span>
            </button>
          )}
        </div>
        <h2 id="summary-heading" className="text-2xl font-bold font-serif text-brand-950">
          Blind-Spot Summary
        </h2>
        <p className="text-base text-slate-700 leading-relaxed font-medium">
          {analysis.summary}
        </p>
      </section>

      {/* Surface 3: Blind Spots, Assumptions, Missing Factors, Risks, Conflicts */}
      <div id="surface-blindspots" className="space-y-10">
        {/* 2. Assumptions Section */}
        <section ref={assumptionsRef} aria-labelledby="assumptions-heading" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <h2 id="assumptions-heading" className="text-xl font-bold text-brand-950 font-serif">
              Unstated Assumptions ({analysis.assumptions.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Beliefs built into your reasoning that may lack concrete verification evidence.
          </p>

          <div className="space-y-3">
            {analysis.assumptions.map((item, index) => (
              <AssumptionCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* 3. Missing Factors */}
        <section ref={missingRef} aria-labelledby="missing-heading" className="bg-white rounded-3xl border border-canvas-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-indigo-800 text-xs font-bold uppercase tracking-wider">
            <EyeOff className="w-4 h-4 text-indigo-600" aria-hidden="true" />
            <span>UNCONSIDERED VARIABLES</span>
          </div>
          <h2 id="missing-heading" className="text-xl font-bold font-serif text-brand-950">
            Missing Factors
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {analysis.missingFactors.map((item) => (
              <div key={item.id} className="bg-canvas-50 p-4 rounded-xl border border-canvas-200 space-y-1.5">
                <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded uppercase border border-indigo-200">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-brand-950">{item.factor}</h3>
                <p className="text-xs text-slate-600 leading-normal">{item.significance}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Risks & Uncertainties */}
        <section ref={risksRef} aria-labelledby="risks-heading" className="bg-white rounded-3xl border border-rose-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-rose-800 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-600" aria-hidden="true" />
            <span>POTENTIAL DOWNSIDES</span>
          </div>
          <h2 id="risks-heading" className="text-xl font-bold font-serif text-brand-950">
            Risks & Uncertainties
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {analysis.risks.map((item) => (
              <div key={item.id} className="bg-rose-50/40 p-4 rounded-xl border border-rose-100 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-brand-950">{item.risk}</h3>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    item.severity === 'high' ? 'bg-rose-200 text-rose-900' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {item.severity} Risk
                  </span>
                </div>
                <p className="text-xs text-slate-700">
                  <strong className="text-rose-950">Test Question: </strong>
                  {item.mitigationQuestion}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Conflicts & Trade-offs */}
        <section ref={conflictsRef} aria-labelledby="conflicts-heading">
          <h2 id="conflicts-heading" className="sr-only">Conflicts and Trade-offs</h2>
          <div className="space-y-4">
            {analysis.conflicts.map((item) => (
              <ConflictCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* 6. Alternative Perspectives */}
        <section aria-labelledby="perspectives-heading" className="bg-white rounded-3xl border border-canvas-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-violet-800 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-violet-600" aria-hidden="true" />
            <span>ALTERNATIVE FRAMINGS</span>
          </div>
          <h2 id="perspectives-heading" className="text-xl font-bold font-serif text-brand-950">
            Alternative Perspectives
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {analysis.perspectives.map((item) => (
              <div key={item.id} className="bg-violet-50/50 p-4 rounded-xl border border-violet-100 space-y-2">
                <span className="text-[10px] font-bold text-violet-900 bg-violet-100 px-2 py-0.5 rounded uppercase">
                  {item.lensName} Perspective
                </span>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">{item.insight}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Information Gaps Matrix */}
        <section aria-labelledby="gaps-heading">
          <h2 id="gaps-heading" className="sr-only">Information Gaps Matrix</h2>
          <InformationGapMatrix items={analysis.informationGaps} />
        </section>
      </div>

      {/* Surface 4: Grouped Critical Questions */}
      <section ref={questionsRef} id="surface-questions" aria-labelledby="questions-surface-heading">
        <h2 id="questions-surface-heading" className="sr-only">Critical Probing Questions Surface</h2>
        <QuestionsSurface questions={analysis.criticalQuestions} />
      </section>

      {/* Surface 5: Interactive Reflection & Decision Re-Scan */}
      <section id="surface-reflect" aria-labelledby="reflection-heading">
        <h2 id="reflection-heading" className="sr-only">Reflection & Decision Re-Scan</h2>
        <ReflectionPanel
          originalDecision={input}
          analysis={analysis}
          onReassessmentComplete={onReassessmentComplete}
        />
      </section>

      {/* Surface 6: Final Decision Safety Enforcement Banner */}
      <section aria-labelledby="safety-heading">
        <h2 id="safety-heading" className="sr-only">Decision Safety Banner</h2>
        <DecisionSafetyBanner onNewInspection={onReset} />
      </section>
    </div>
  );
};
