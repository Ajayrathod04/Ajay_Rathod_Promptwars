import React from 'react';
import { BlindSpotAnalysis } from '../types/decision';
import { HelpCircle, AlertTriangle, Scale, EyeOff, CheckCircle2 } from 'lucide-react';

interface LensVisualizationProps {
  decisionTitle: string;
  analysis?: BlindSpotAnalysis;
  isAnalyzing?: boolean;
}

export const LensVisualization: React.FC<LensVisualizationProps> = ({
  decisionTitle,
  analysis,
  isAnalyzing = false,
}) => {
  const assumptionsCount = analysis?.assumptions.length || 3;
  const missingCount = analysis?.missingFactors.length || 2;
  const risksCount = analysis?.risks.length || 2;
  const conflictsCount = analysis?.conflicts.length || 1;
  const questionsCount = analysis?.criticalQuestions.length || 3;

  return (
    <div className="relative w-full max-w-lg mx-auto my-8 p-6 bg-white rounded-3xl border border-canvas-200 shadow-sm flex flex-col items-center justify-center overflow-hidden">
      <span className="sr-only">
        Reasoning Lens visualization showing decision center and identified blind spot areas: {assumptionsCount} assumptions, {missingCount} missing factors, {risksCount} risks, {conflictsCount} trade-offs, and {questionsCount} critical questions.
      </span>

      {/* SVG Orbital Lens */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 320" aria-hidden="true">
          {/* Outer Orbit */}
          <circle
            cx="160"
            cy="160"
            r="135"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className={isAnalyzing ? 'animate-spin-slow' : ''}
          />
          {/* Inner Orbit */}
          <circle
            cx="160"
            cy="160"
            r="90"
            fill="none"
            stroke="#EEF2FF"
            strokeWidth="2"
          />
          {/* Radial Rays */}
          <line x1="160" y1="160" x2="160" y2="25" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="160" y1="160" x2="275" y2="105" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="160" y1="160" x2="250" y2="255" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="160" y1="160" x2="70" y2="255" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="160" y1="160" x2="45" y2="105" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 2" />
        </svg>

        {/* Central Core (What You See) */}
        <div className="relative z-10 w-32 h-32 rounded-full bg-brand-950 text-white flex flex-col items-center justify-center p-3 text-center shadow-xl border-4 border-white transition-transform hover:scale-105">
          <span className="text-[10px] font-bold tracking-wider text-brand-300 uppercase">WHAT YOU SEE</span>
          <p className="text-xs font-semibold line-clamp-2 mt-1 px-1 leading-tight text-brand-50">
            {decisionTitle || 'Your Decision'}
          </p>
        </div>

        {/* Orbital Nodes (Revealed Blind Spots) */}
        {/* Node 1: Assumptions (Top) */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-amber-50 border-2 border-amber-500 text-amber-700 flex items-center justify-center shadow-md">
            <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="mt-1 text-[11px] font-semibold text-amber-900 bg-amber-50/90 px-2 py-0.5 rounded-full border border-amber-200">
            {assumptionsCount} Assumptions
          </span>
        </div>

        {/* Node 2: Missing Factors (Top Right) */}
        <div className="absolute top-16 right-2 z-20 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-indigo-50 border-2 border-indigo-600 text-indigo-700 flex items-center justify-center shadow-md">
            <EyeOff className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="mt-1 text-[11px] font-semibold text-indigo-900 bg-indigo-50/90 px-2 py-0.5 rounded-full border border-indigo-200">
            {missingCount} Missing
          </span>
        </div>

        {/* Node 3: Risks (Bottom Right) */}
        <div className="absolute bottom-10 right-4 z-20 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-rose-50 border-2 border-rose-500 text-rose-700 flex items-center justify-center shadow-md">
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="mt-1 text-[11px] font-semibold text-rose-900 bg-rose-50/90 px-2 py-0.5 rounded-full border border-rose-200">
            {risksCount} Risks
          </span>
        </div>

        {/* Node 4: Trade-offs (Bottom Left) */}
        <div className="absolute bottom-10 left-4 z-20 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-emerald-50 border-2 border-emerald-600 text-emerald-700 flex items-center justify-center shadow-md">
            <Scale className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="mt-1 text-[11px] font-semibold text-emerald-900 bg-emerald-50/90 px-2 py-0.5 rounded-full border border-emerald-200">
            {conflictsCount} Trade-off
          </span>
        </div>

        {/* Node 5: Critical Questions (Top Left) */}
        <div className="absolute top-16 left-2 z-20 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-sky-50 border-2 border-sky-500 text-sky-700 flex items-center justify-center shadow-md">
            <HelpCircle className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="mt-1 text-[11px] font-semibold text-sky-900 bg-sky-50/90 px-2 py-0.5 rounded-full border border-sky-200">
            {questionsCount} Questions
          </span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs font-medium text-slate-500">
          {isAnalyzing ? (
            <span className="animate-pulse text-brand-600 font-semibold">Scanning reasoning perimeter for unstated factors...</span>
          ) : (
            <span>The Reasoning Lens reveals factors outside your initial focus ring.</span>
          )}
        </p>
      </div>
    </div>
  );
};
