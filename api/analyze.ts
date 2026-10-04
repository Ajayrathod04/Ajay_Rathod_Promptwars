import { sanitizeText, buildSecurePromptPayload } from '../src/domain/promptSanitizer';
import { auditAndEnforceSafety } from '../src/domain/decisionGuard';
import { generateFallbackAnalysis } from '../src/domain/fallbackEngine';
import { DecisionInput, BlindSpotAnalysis } from '../src/types/decision';

export const config = {
  runtime: 'edge',
};

const SYSTEM_PROMPT = `
You are a senior reasoning analyst for BlindLens.
MISSION: Examine the user's decision context to surface unstated assumptions, missing factors, risks, conflicts/trade-offs, alternative perspectives, critical questions, and information gaps.

CRITICAL POLICY:
1. YOU MUST NEVER MAKE THE DECISION FOR THE USER.
2. NEVER use directive language like "You should choose X", "Option A is better", "Accept the offer", or "The best decision is".
3. Instead use analytical framing: "One assumption in your reasoning may be...", "An unresolved factor is...", "Consider verifying...", "Your reasoning prioritizes X over Y".
4. Separate facts (KNOWN), assumptions (ASSUMED), and uncertainties (UNKNOWN).

Return valid JSON with the exact structure:
{
  "summary": "Concise 2-sentence summary of reasoning blind spots.",
  "assumptions": [
    {
      "id": "asm-1",
      "assumption": "Clear statement of assumed fact",
      "whyItMatters": "Impact on decision",
      "checkMethod": "Concrete step to verify evidence",
      "evidenceMissing": "What evidence is currently missing"
    }
  ],
  "missingFactors": [
    {
      "id": "mf-1",
      "factor": "Overlooked factor name",
      "category": "Schedule" | "Finances" | "Career" | "Personal" | "Risk" | "General",
      "significance": "Why this factor matters"
    }
  ],
  "risks": [
    {
      "id": "rsk-1",
      "risk": "Potential downside or uncertainty",
      "severity": "low" | "medium" | "high",
      "mitigationQuestion": "Question to test resilience"
    }
  ],
  "conflicts": [
    {
      "id": "cnf-1",
      "priorityA": "First competing priority",
      "priorityB": "Second competing priority",
      "description": "Conflict description",
      "tradeOffSummary": "Net trade-off overview"
    }
  ],
  "perspectives": [
    {
      "id": "prsp-1",
      "lensName": "Future-Self" | "Financial" | "Career" | "Time" | "Risk" | "Opportunity",
      "insight": "Alternative framing insight"
    }
  ],
  "criticalQuestions": [
    {
      "id": "cq-1",
      "question": "Deep probing question",
      "targetArea": "Category/Area",
      "rationale": "Why asking this improves reasoning"
    }
  ],
  "informationGaps": [
    {
      "id": "gap-1",
      "topic": "Information item",
      "status": "KNOWN" | "ASSUMED" | "UNKNOWN",
      "details": "Explanation of status"
    }
  ],
  "reflectionPrompt": "After seeing these blind spots, has anything changed in how you view the decision?"
}
`.trim();

export default async function handler(req: Request): Promise<Response> {
  // CORS & Method Check
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const input: DecisionInput = body?.input;

    if (!input || !input.decision || typeof input.decision !== 'string' || input.decision.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid decision input. Decision text is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Input length limit defense
    if (input.decision.length > 3000) {
      return new Response(JSON.stringify({ error: 'Decision input exceeds maximum allowed length (3000 characters).' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      // Fallback Engine execution
      const fallbackResult = generateFallbackAnalysis(input);
      const safeFallback = auditAndEnforceSafety(fallbackResult);
      return new Response(JSON.stringify(safeFallback), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    }

    // Call Gemini API REST Endpoint
    const securePayload = buildSecurePromptPayload(input);
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const apiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nAnalyze the following decision context:\n\n${securePayload}` }] },
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!apiResponse.ok) {
      console.warn('Gemini API call returned non-200 status. Falling back to local engine.');
      const fallbackResult = generateFallbackAnalysis(input);
      return new Response(JSON.stringify(auditAndEnforceSafety(fallbackResult)), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const responseData = await apiResponse.json();
    const candidateText = responseData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('Empty response from AI model');
    }

    const rawAnalysis: BlindSpotAnalysis = JSON.parse(candidateText);
    const safeAnalysis = auditAndEnforceSafety(rawAnalysis);

    return new Response(JSON.stringify(safeAnalysis), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
      },
    });
  } catch (err) {
    console.error('API Error in /api/analyze:', err);
    // Guarantee response resilience with fallback engine
    try {
      const body = await req.json().catch(() => ({}));
      const fallbackResult = generateFallbackAnalysis(body?.input || { decision: 'General decision' });
      return new Response(JSON.stringify(auditAndEnforceSafety(fallbackResult)), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch {
      return new Response(JSON.stringify({ error: 'Failed to analyze decision.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}
