import { DecisionInput, BlindSpotAnalysis, ReassessmentInput, ReassessmentDelta } from '../types/decision';
import { generateFallbackAnalysis } from '../domain/fallbackEngine';
import { auditAndEnforceSafety } from '../domain/decisionGuard';

/**
 * Sends decision reasoning to the API server or local fallback engine.
 */
export async function analyzeDecision(input: DecisionInput): Promise<BlindSpotAnalysis> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      console.warn('API returned non-OK status. Using local fallback engine.');
      const fallback = generateFallbackAnalysis(input);
      return auditAndEnforceSafety(fallback);
    }

    const data: BlindSpotAnalysis = await response.json();
    return auditAndEnforceSafety(data);
  } catch (err) {
    console.warn('Network or API connection error. Seamlessly switching to local fallback engine:', err);
    const fallback = generateFallbackAnalysis(input);
    return auditAndEnforceSafety(fallback);
  }
}

/**
 * Calculates decision re-scan delta after user reflects and adds updated reasoning.
 */
export async function rescanDecision(reassessment: ReassessmentInput): Promise<ReassessmentDelta> {
  const combinedInput: DecisionInput = {
    ...reassessment.originalDecision,
    beliefs: `${reassessment.originalDecision.beliefs || ''}\nUpdated Reasoning: ${reassessment.updatedReasoning}\nReflection state: ${reassessment.userReflectionState}`,
  };

  const updatedAnalysis = await analyzeDecision(combinedInput);

  const resolved: string[] = [];
  const clarified: string[] = [];
  const unresolved: string[] = [];

  if (reassessment.userReflectionState === 'changed') {
    resolved.push('Acknowledged core assumption regarding initial framing');
    clarified.push('Revised decision priorities based on uncovered trade-offs');
  } else if (reassessment.userReflectionState === 'more_info') {
    clarified.push('Identified missing verification steps to perform');
    unresolved.push('Verification needed for mentor & workload claims');
  } else {
    clarified.push('Re-verified core beliefs against highlighted risks');
    unresolved.push('Long-term opportunity cost remains unhedged');
  }

  return {
    previouslyOverlookedResolved: resolved,
    nowClarified: clarified,
    stillUnresolved: unresolved,
    updatedAnalysis,
  };
}
