export interface DecisionInput {
  decision: string;
  context?: string;
  beliefs?: string;
  factors?: string;
  options?: string;
  constraints?: string;
}

export interface AssumptionItem {
  id: string;
  assumption: string;
  whyItMatters: string;
  checkMethod: string;
  evidenceMissing?: string;
}

export interface MissingFactorItem {
  id: string;
  factor: string;
  category: 'Schedule' | 'Finances' | 'Career' | 'Personal' | 'Risk' | 'General';
  significance: string;
}

export interface RiskItem {
  id: string;
  risk: string;
  severity: 'low' | 'medium' | 'high';
  mitigationQuestion: string;
}

export interface ConflictItem {
  id: string;
  priorityA: string;
  priorityB: string;
  description: string;
  tradeOffSummary: string;
}

export interface PerspectiveItem {
  id: string;
  lensName: 'Future-Self' | 'Financial' | 'Career' | 'Time' | 'Risk' | 'Opportunity';
  insight: string;
}

export interface CriticalQuestionItem {
  id: string;
  question: string;
  targetArea: string;
  rationale: string;
}

export interface InformationGapItem {
  id: string;
  topic: string;
  status: 'KNOWN' | 'ASSUMED' | 'UNKNOWN';
  details: string;
}

export interface BlindSpotAnalysis {
  summary: string;
  assumptions: AssumptionItem[];
  missingFactors: MissingFactorItem[];
  risks: RiskItem[];
  conflicts: ConflictItem[];
  perspectives: PerspectiveItem[];
  criticalQuestions: CriticalQuestionItem[];
  informationGaps: InformationGapItem[];
  reflectionPrompt: string;
  decisionSafetyNotice: string;
  isFallback?: boolean;
}

export interface ReassessmentInput {
  originalDecision: DecisionInput;
  originalAnalysis: BlindSpotAnalysis;
  userReflectionState: 'changed' | 'more_info' | 'holds';
  updatedReasoning: string;
  newFactors?: string;
}

export interface ReassessmentDelta {
  previouslyOverlookedResolved: string[];
  nowClarified: string[];
  stillUnresolved: string[];
  updatedAnalysis: BlindSpotAnalysis;
}

export interface PresetExample {
  id: string;
  title: string;
  description: string;
  input: DecisionInput;
}
