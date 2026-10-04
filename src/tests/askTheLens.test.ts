import { describe, it, expect } from 'vitest';
import { processAskTheLensQuery } from '../domain/askTheLensEngine';
import { generateFallbackAnalysis } from '../domain/fallbackEngine';

describe('Ask the Lens Contextual Chat & Neutrality Guard', () => {
  const sampleInput = {
    decision: "Should I accept a 6-month engineering internship?",
    beliefs: "I believe the stipend is good and proximity to home saves commute time.",
  };

  const sampleAnalysis = generateFallbackAnalysis(sampleInput);

  it('CRITICAL REGRESSION TEST: Intercepts directive questions ("Which option should I choose?") and enforces decision neutrality', () => {
    const query = "Which option should I choose? Tell me what to do.";
    const response = processAskTheLensQuery(query, sampleInput, sampleAnalysis);

    expect(response).not.toContain("you should choose");
    expect(response).toContain("will not choose for you");
    expect(response).toContain("final choice belongs entirely to you");
  });

  it('provides contextual explanation for assumptions', () => {
    const query = "Explain this assumption to me";
    const response = processAskTheLensQuery(query, sampleInput, sampleAnalysis);

    expect(response).toContain("assumption");
    expect(response).toBeDefined();
  });

  it('provides contextual explanation for trade-offs', () => {
    const query = "Help me compare trade-offs";
    const response = processAskTheLensQuery(query, sampleInput, sampleAnalysis);

    expect(response).toContain("conflict");
    expect(response).toBeDefined();
  });

  it('provides evidence check and perspective guidance without recommendation', () => {
    const query = "What evidence would resolve this?";
    const response = processAskTheLensQuery(query, sampleInput, sampleAnalysis);

    expect(response).toContain("evidence");
    expect(response).not.toMatch(/i recommend/i);
  });
});
