import { DecisionInput, BlindSpotAnalysis, AssumptionItem, MissingFactorItem, RiskItem, ConflictItem, PerspectiveItem, CriticalQuestionItem, InformationGapItem } from '../types/decision';

/**
 * Deterministic local fallback engine for offline or key-less evaluation.
 * Performs rule-based semantic analysis of decision text.
 */
export function generateFallbackAnalysis(input: DecisionInput): BlindSpotAnalysis {
  const fullText = `${input.decision} ${input.context || ''} ${input.beliefs || ''} ${input.factors || ''} ${input.options || ''} ${input.constraints || ''}`.toLowerCase();

  const assumptions: AssumptionItem[] = [];
  const missingFactors: MissingFactorItem[] = [];
  const risks: RiskItem[] = [];
  const conflicts: ConflictItem[] = [];
  const perspectives: PerspectiveItem[] = [];
  const criticalQuestions: CriticalQuestionItem[] = [];
  const informationGaps: InformationGapItem[] = [];

  // --- 1. Assumption Detection ---
  if (fullText.includes('because') || fullText.includes('experience') || fullText.includes('internship')) {
    assumptions.push({
      id: 'asm-1',
      assumption: 'The role will provide high-quality learning and meaningful project ownership.',
      whyItMatters: 'Your decision heavily relies on skill development justifying the time commitment.',
      checkMethod: 'Ask the hiring manager or previous incumbents about daily task allocation and mentor availability.',
      evidenceMissing: 'No concrete breakdown of weekly mentor hours or project scope was specified.'
    });
  }

  if (fullText.includes('close') || fullText.includes('commute') || fullText.includes('location') || fullText.includes('home')) {
    assumptions.push({
      id: 'asm-2',
      assumption: 'Proximity will eliminate commute stress and preserve overall daily energy.',
      whyItMatters: 'Physical proximity does not guarantee manageable workload or predictable schedules.',
      checkMethod: 'Verify actual working hours, peak traffic patterns, or remote work flexibility.',
      evidenceMissing: 'Commute times during peak hours were not calculated.'
    });
  }

  if (fullText.includes('stipend') || fullText.includes('money') || fullText.includes('pay') || fullText.includes('cost') || fullText.includes('salary')) {
    assumptions.push({
      id: 'asm-3',
      assumption: 'The financial compensation sufficiently balances the opportunity cost of alternative choices.',
      whyItMatters: 'Financial yield should be measured against hidden expenses, tax implications, or alternative offers.',
      checkMethod: 'Calculate net income after expenses (transit, equipment, taxes, lost study hours).',
      evidenceMissing: 'Net financial ledger accounting for indirect costs was omitted.'
    });
  }

  // Fallback default assumption if text is short
  if (assumptions.length === 0) {
    assumptions.push({
      id: 'asm-def',
      assumption: 'The primary benefit identified will outweigh unstated administrative and secondary obligations.',
      whyItMatters: 'Decisions often falter due to unaccounted operational friction rather than major strategy flaws.',
      checkMethod: 'List all recurring routine requirements associated with this choice.',
      evidenceMissing: 'Routine execution requirements have not been mapped out.'
    });
  }

  // --- 2. Missing Factors Detection ---
  if (fullText.includes('internship') || fullText.includes('course') || fullText.includes('study') || fullText.includes('academic')) {
    missingFactors.push({
      id: 'mf-1',
      factor: 'Academic schedule alignment and exam period conflicts',
      category: 'Schedule',
      significance: 'Peak workloads at work may coincide directly with university assignment or exam deadlines.'
    });
    missingFactors.push({
      id: 'mf-2',
      factor: 'Formal mentorship structure and feedback frequency',
      category: 'Career',
      significance: 'Without dedicated mentorship, learning velocity may be significantly lower than expected.'
    });
  }

  if (fullText.includes('move') || fullText.includes('city') || fullText.includes('relocat')) {
    missingFactors.push({
      id: 'mf-3',
      factor: 'Cost-of-living adjustments and social support network continuity',
      category: 'Finances',
      significance: 'Relocation expenses and loss of local support networks impact long-term well-being.'
    });
  }

  if (fullText.includes('buy') || fullText.includes('laptop') || fullText.includes('expensive') || fullText.includes('device')) {
    missingFactors.push({
      id: 'mf-4',
      factor: 'Total cost of ownership (warranties, software licenses, depreciation)',
      category: 'Finances',
      significance: 'Hardware cost is often accompanied by mandatory secondary tool investments.'
    });
  }

  // Ensure at least 2 missing factors
  if (missingFactors.length < 2) {
    missingFactors.push({
      id: 'mf-def-1',
      factor: 'Exit strategy and reversal flexibility if circumstances change',
      category: 'Risk',
      significance: 'Knowing how easily this decision can be undone reduces downside exposure.'
    });
    missingFactors.push({
      id: 'mf-def-2',
      factor: 'Long-term opportunity cost against unchosen alternatives',
      category: 'Personal',
      significance: 'Choosing this path prevents committing time and resources to competing priorities.'
    });
  }

  // --- 3. Risks & Uncertainties ---
  risks.push({
    id: 'rsk-1',
    risk: 'Over-commitment leading to burnout across parallel responsibilities.',
    severity: 'medium',
    mitigationQuestion: 'What specific boundary will you enforce if weekly hours exceed expectations?'
  });
  risks.push({
    id: 'rsk-2',
    risk: 'Misalignment between initial expectations and day-to-day reality.',
    severity: 'high',
    mitigationQuestion: 'What early warning signal will indicate after 30 days that this path needs re-evaluation?'
  });

  // --- 4. Conflicts & Trade-offs ---
  if (fullText.includes('stipend') || fullText.includes('money') || fullText.includes('pay') || fullText.includes('job') || fullText.includes('internship')) {
    conflicts.push({
      id: 'cnf-1',
      priorityA: 'Immediate Income & Practical Experience',
      priorityB: 'Academic Workload & Personal Discretionary Time',
      description: 'Gaining professional experience and compensation directly competes with study hours and rest.',
      tradeOffSummary: 'You are trading short-term time flexibility for financial gain and resume credentialing.'
    });
  } else {
    conflicts.push({
      id: 'cnf-def',
      priorityA: 'Immediate Goal Attainment',
      priorityB: 'Future Resource Flexibility',
      description: 'Committing resources now limits your ability to pivot if better information emerges later.',
      tradeOffSummary: 'You trade optionality for immediate action.'
    });
  }

  // --- 5. Alternative Perspectives ---
  perspectives.push({
    id: 'prsp-1',
    lensName: 'Future-Self',
    insight: 'Looking back 2 years from now, will this decision matter more for skills acquired or for the opportunities forgone?'
  });
  perspectives.push({
    id: 'prsp-2',
    lensName: 'Financial',
    insight: 'Framing this decision purely as an ROI calculation: does it yield a measurable compound return?'
  });
  perspectives.push({
    id: 'prsp-3',
    lensName: 'Risk',
    insight: 'What is the absolute worst-case outcome, and do you have the buffer to absorb it without severe disruption?'
  });

  // --- 6. Critical Questions ---
  criticalQuestions.push({
    id: 'cq-1',
    question: 'What specific evidence do you possess that confirms mentorship and project quality will meet your standard?',
    targetArea: 'Assumptions',
    rationale: 'Validates whether key expectations are grounded in facts or hopeful assumptions.'
  });
  criticalQuestions.push({
    id: 'cq-2',
    question: 'How will your daily routine adjust during peak strain or exam periods?',
    targetArea: 'Schedule Conflicts',
    rationale: 'Exposes operational vulnerability before commitment.'
  });
  criticalQuestions.push({
    id: 'cq-3',
    question: 'If the financial compensation or immediate benefit were reduced by 30%, would you still lean toward this option?',
    targetArea: 'Trade-offs',
    rationale: 'Isolates whether the non-financial benefits stand on their own merit.'
  });

  // --- 7. Information Gaps Matrix ---
  informationGaps.push({
    id: 'gap-1',
    topic: 'Stated decision objective',
    status: 'KNOWN',
    details: input.decision
  });
  informationGaps.push({
    id: 'gap-2',
    topic: 'Mentorship structure & actual workload',
    status: 'ASSUMED',
    details: 'Priced into reasoning without explicit verification.'
  });
  informationGaps.push({
    id: 'gap-3',
    topic: 'Long-term career conversion rate / true net value',
    status: 'UNKNOWN',
    details: 'Uncertain external variable requiring observational tracking.'
  });

  return {
    summary: `BlindLens examined your decision ("${input.decision}"). We identified key unstated assumptions regarding workload, opportunity cost, and missing verification steps.`,
    assumptions,
    missingFactors,
    risks,
    conflicts,
    perspectives,
    criticalQuestions,
    informationGaps,
    reflectionPrompt: 'After examining these blind spots, has your perspective on this decision evolved?',
    decisionSafetyNotice: 'BlindLens surfaces blind spots in your reasoning. The final decision always belongs to you.',
    isFallback: true,
  };
}
