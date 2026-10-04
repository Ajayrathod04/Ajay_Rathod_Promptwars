import { DecisionInput } from '../types/decision';

/**
 * Sanitizes untrusted user input string to prevent prompt injection and XML delimiter exploits.
 */
export function sanitizeText(input: string | undefined): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>/g, '') // Strips raw HTML/XML tags
    .replace(/<\/?[a-z_-]+>/gi, '') // Strips closing/opening tag attempts
    .replace(/(system prompt|ignore previous instructions|you are now|override instructions|disregard safety)/gi, '[sanitized_attempt]')
    .trim();
}

/**
 * Constructs a secure XML-delimited prompt payload from user input.
 */
export function buildSecurePromptPayload(input: DecisionInput): string {
  const sanitizedDecision = sanitizeText(input.decision);
  const sanitizedContext = sanitizeText(input.context);
  const sanitizedBeliefs = sanitizeText(input.beliefs);
  const sanitizedFactors = sanitizeText(input.factors);
  const sanitizedOptions = sanitizeText(input.options);
  const sanitizedConstraints = sanitizeText(input.constraints);

  return `
<decision_context>
  <primary_decision>${sanitizedDecision}</primary_decision>
  <situation_context>${sanitizedContext || 'Not provided'}</situation_context>
  <current_beliefs>${sanitizedBeliefs || 'Not provided'}</current_beliefs>
  <valued_factors>${sanitizedFactors || 'Not provided'}</valued_factors>
  <known_options>${sanitizedOptions || 'Not provided'}</known_options>
  <constraints>${sanitizedConstraints || 'Not provided'}</constraints>
</decision_context>
`.trim();
}
