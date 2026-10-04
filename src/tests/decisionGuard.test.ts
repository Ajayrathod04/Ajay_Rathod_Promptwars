import { describe, it, expect } from 'vitest';
import { sanitizeDirectiveText, auditAndEnforceSafety } from '../domain/decisionGuard';
import { BlindSpotAnalysis } from '../types/decision';

describe('Decision Guard & Safety Neutralizer', () => {
  it('should neutralize directive advice phrases like "You should choose A"', () => {
    const directiveInput = "Based on your situation, you should choose Option A because it is better.";
    const sanitized = sanitizeDirectiveText(directiveInput);
    expect(sanitized).not.toContain("you should choose");
    expect(sanitized).toContain("one option to consider is");
  });

  it('should sanitize forbidden phrases in full analysis objects', () => {
    const maliciousAnalysis: BlindSpotAnalysis = {
      summary: "I recommend that you accept the offer immediately.",
      assumptions: [
        {
          id: '1',
          assumption: "You should accept the internship.",
          whyItMatters: "The best decision is Option B.",
          checkMethod: "Check mentorship availability."
        }
      ],
      missingFactors: [],
      risks: [],
      conflicts: [],
      perspectives: [],
      criticalQuestions: [],
      informationGaps: [],
      reflectionPrompt: "Definitely choose Option A.",
      decisionSafetyNotice: ""
    };

    const audited = auditAndEnforceSafety(maliciousAnalysis);

    expect(audited.summary).not.toMatch(/i recommend/i);
    expect(audited.assumptions[0].assumption).not.toMatch(/you should accept/i);
    expect(audited.assumptions[0].whyItMatters).not.toMatch(/the best decision is/i);
    expect(audited.decisionSafetyNotice).toContain("final decision always belongs to you");
  });
});
