import React, { useState } from 'react';
import { CriticalQuestionItem, QuestionGroup } from '../types/decision';
import { HelpCircle, Sparkles, Filter } from 'lucide-react';

interface QuestionsSurfaceProps {
  questions: CriticalQuestionItem[];
}

const GROUPS: QuestionGroup[] = [
  'Missing Evidence',
  'Assumption Check',
  'Risk Check',
  'Long-Term View',
  'Alternative Perspective',
];

export const QuestionsSurface: React.FC<QuestionsSurfaceProps> = ({ questions }) => {
  const [selectedGroup, setSelectedGroup] = useState<QuestionGroup | 'ALL'>('ALL');

  // Assign groups if not already present
  const enrichedQuestions = questions.map((q, idx) => ({
    ...q,
    group: q.group || GROUPS[idx % GROUPS.length],
  }));

  const filteredQuestions = selectedGroup === 'ALL'
    ? enrichedQuestions
    : enrichedQuestions.filter((q) => q.group === selectedGroup);

  return (
    <div className="bg-white rounded-3xl border border-sky-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-sky-800 text-xs font-bold uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4 text-sky-600" aria-hidden="true" />
            <span>CRITICAL REASONING QUESTIONS</span>
          </div>
          <h2 className="text-2xl font-bold font-serif text-brand-950">
            Probing Questions Worth Exploring
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setSelectedGroup('ALL')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedGroup === 'ALL'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-canvas-100 text-slate-700 hover:bg-canvas-200'
            }`}
          >
            All ({enrichedQuestions.length})
          </button>
          {GROUPS.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedGroup === g
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-canvas-100 text-slate-700 hover:bg-canvas-200'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => (
          <div key={q.id} className="bg-gradient-to-r from-sky-50/50 to-indigo-50/30 p-5 rounded-2xl border border-sky-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-900 border border-sky-200">
                <Filter className="w-3 h-3 mr-1 text-sky-600" />
                {q.group}
              </span>
              <span className="text-[11px] font-medium text-slate-500">Target: {q.targetArea}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-brand-950 leading-snug">
              "{q.question}"
            </h3>

            <div className="flex items-start space-x-2 text-xs text-slate-700 bg-white/80 p-3 rounded-xl border border-sky-100">
              <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="text-brand-950">Why Asking This Improves Reasoning: </strong>
                <span>{q.rationale}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredQuestions.length === 0 && (
          <p className="text-sm text-slate-500 italic text-center py-6">
            No questions found for this category filter.
          </p>
        )}
      </div>
    </div>
  );
};
