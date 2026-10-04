import { describe, it, expect } from 'vitest';
import { generateFallbackAnalysis } from '../domain/fallbackEngine';

describe('Local Deterministic Fallback Engine', () => {
  it('should generate structured analysis for internship scenario without API key', () => {
    const input = {
      decision: "Should I accept a 6-month software engineering internship?",
      beliefs: "I believe the stipend is solid and proximity to home saves commute time.",
    };

    const analysis = generateFallbackAnalysis(input);

    expect(analysis.isFallback).toBe(true);
    expect(analysis.assumptions.length).toBeGreaterThan(0);
    expect(analysis.missingFactors.length).toBeGreaterThan(0);
    expect(analysis.risks.length).toBeGreaterThan(0);
    expect(analysis.conflicts.length).toBeGreaterThan(0);
    expect(analysis.criticalQuestions.length).toBeGreaterThan(0);
    expect(analysis.informationGaps.length).toBeGreaterThan(0);
  });

  it('should handle general decision inputs cleanly', () => {
    const input = { decision: "Should I buy this new gadget?" };
    const analysis = generateFallbackAnalysis(input);
    expect(analysis.summary).toBeDefined();
    expect(analysis.decisionSafetyNotice).toContain("final decision always belongs to you");
  });
});
