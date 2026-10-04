import { BlindSpotAnalysis, DecisionInput } from '../types/decision';
import { sanitizeDirectiveText } from './decisionGuard';

/**
 * Handles contextual reasoning questions without ever taking a directive stance.
 */
export function processAskTheLensQuery(
  query: string,
  input: DecisionInput,
  analysis: BlindSpotAnalysis
): string {
  const lower = query.toLowerCase();

  // 1. Directive Decision Attempt Interception
  if (
    lower.includes('which should i choose') ||
    lower.includes('what should i pick') ||
    lower.includes('tell me what to do') ||
    lower.includes('which option is better') ||
    lower.includes('give me a recommendation') ||
    lower.includes('should i accept') ||
    lower.includes('should i buy') ||
    lower.includes('should i move')
  ) {
    const tradeOff = analysis.conflicts[0]?.tradeOffSummary || 'balancing immediate benefits against long-term opportunity cost';
    const check = analysis.assumptions[0]?.checkMethod || 'verifying key claims with direct evidence';

    return `BlindLens inform your thinking, but will not choose for you. Based on your context, the primary unresolved tension involves ${tradeOff}. Before deciding, consider ${check}. The final choice belongs entirely to you.`;
  }

  // 2. Explain Assumption Prompt
  if (lower.includes('assumption') || lower.includes('explain assumption')) {
    if (analysis.assumptions.length > 0) {
      const first = analysis.assumptions[0];
      return `One core assumption identified is: "${first.assumption}". This matters because ${first.whyItMatters} To verify this, consider: ${first.checkMethod}`;
    }
    return "BlindLens identified that your reasoning assumes current operational conditions will remain stable throughout execution.";
  }

  // 3. Evidence Check Prompt
  if (lower.includes('evidence') || lower.includes('resolve')) {
    const gap = analysis.informationGaps.find((g) => g.status === 'ASSUMED') || analysis.informationGaps[0];
    return `To resolve uncertainty regarding "${gap?.topic || 'unverified claims'}", gather evidence on: ${gap?.details || 'mentor availability, working hours, and net financial cost'}.`;
  }

  // 4. Trade-off Prompt
  if (lower.includes('trade-off') || lower.includes('conflict') || lower.includes('compare')) {
    if (analysis.conflicts.length > 0) {
      const c = analysis.conflicts[0];
      return `The primary conflict is between Priority A ("${c.priorityA}") and Priority B ("${c.priorityB}"). ${c.description} Summary: ${c.tradeOffSummary}`;
    }
    return "The primary trade-off is exchanging short-term resource flexibility for immediate execution velocity.";
  }

  // 5. Missing Perspective Prompt
  if (lower.includes('perspective') || lower.includes('missing')) {
    if (analysis.perspectives.length > 0) {
      const p = analysis.perspectives[0];
      return `Consider the ${p.lensName} Perspective: "${p.insight}"`;
    }
    return "Consider looking at this from a 2-year Future-Self perspective: Will the skills acquired compensate for the unchosen alternatives?";
  }

  // 6. Generic Contextual Reasoning Response
  return sanitizeDirectiveText(
    `Regarding your decision ("${input.decision}"), key factors worth examining include: ${analysis.summary} Probing question: "${analysis.criticalQuestions[0]?.question || 'What evidence confirms your primary expectation?'}"`
  );
}
