import { BlindSpotAnalysis } from '../types/decision';

/**
 * Forbidden directive phrases that indicate an AI attempts to make a decision for the user.
 */
const FORBIDDEN_DIRECTIVE_PATTERNS = [
  /you should (choose|select|pick|take|accept|go with|buy|move|opt for)/gi,
  /the best (option|choice|decision|path|course) is/gi,
  /i recommend (that you|choosing|selecting|taking)/gi,
  /you ought to/gi,
  /definitely (choose|select|pick|accept|buy)/gi,
  /option [a-z0-9]+ is (superior|better|the right choice|ideal)/gi,
  /you must (choose|select|decide to)/gi,
];

/**
 * Replaces directive advice phrases with neutral reasoning challenges.
 */
export function sanitizeDirectiveText(text: string): string {
  let cleaned = text;
  
  // Forbidden phrases replacements
  cleaned = cleaned.replace(/you should choose/gi, 'one option to consider is');
  cleaned = cleaned.replace(/you should accept/gi, 'factors around accepting include');
  cleaned = cleaned.replace(/you should take/gi, 'aspects of taking this path include');
  cleaned = cleaned.replace(/the best decision is/gi, 'a key consideration in your decision is');
  cleaned = cleaned.replace(/i recommend/gi, 'one factor worth examining is');
  cleaned = cleaned.replace(/definitely choose/gi, 'carefully evaluate');

  // Generic directive fallback catch-all
  FORBIDDEN_DIRECTIVE_PATTERNS.forEach((pattern) => {
    cleaned = cleaned.replace(pattern, 'Factors worth examining include:');
  });

  return cleaned;
}

/**
 * Audits and enforces the AI decision-neutrality safety policy across all output fields.
 */
export function auditAndEnforceSafety(analysis: BlindSpotAnalysis): BlindSpotAnalysis {
  const safeAnalysis: BlindSpotAnalysis = {
    ...analysis,
    summary: sanitizeDirectiveText(analysis.summary),
    assumptions: analysis.assumptions.map((a) => ({
      ...a,
      assumption: sanitizeDirectiveText(a.assumption),
      whyItMatters: sanitizeDirectiveText(a.whyItMatters),
      checkMethod: sanitizeDirectiveText(a.checkMethod),
    })),
    missingFactors: analysis.missingFactors.map((f) => ({
      ...f,
      factor: sanitizeDirectiveText(f.factor),
      significance: sanitizeDirectiveText(f.significance),
    })),
    risks: analysis.risks.map((r) => ({
      ...r,
      risk: sanitizeDirectiveText(r.risk),
      mitigationQuestion: sanitizeDirectiveText(r.mitigationQuestion),
    })),
    conflicts: analysis.conflicts.map((c) => ({
      ...c,
      description: sanitizeDirectiveText(c.description),
      tradeOffSummary: sanitizeDirectiveText(c.tradeOffSummary),
    })),
    perspectives: analysis.perspectives.map((p) => ({
      ...p,
      insight: sanitizeDirectiveText(p.insight),
    })),
    criticalQuestions: analysis.criticalQuestions.map((q) => ({
      ...q,
      question: sanitizeDirectiveText(q.question),
      rationale: sanitizeDirectiveText(q.rationale),
    })),
    informationGaps: analysis.informationGaps.map((g) => ({
      ...g,
      details: sanitizeDirectiveText(g.details),
    })),
    reflectionPrompt: sanitizeDirectiveText(analysis.reflectionPrompt || "After seeing these blind spots, has anything changed in how you view the decision?"),
    decisionSafetyNotice: "BlindLens surfaces blind spots in your reasoning. The final decision always belongs to you.",
  };

  return safeAnalysis;
}
