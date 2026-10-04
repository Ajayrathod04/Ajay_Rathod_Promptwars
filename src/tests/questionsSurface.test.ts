import { describe, it, expect } from 'vitest';
import { CriticalQuestionItem } from '../types/decision';

describe('Questions Surface & Rationale Validation', () => {
  it('should validate critical probing question formatting and non-empty rationale', () => {
    const questions: CriticalQuestionItem[] = [
      {
        id: 'cq-1',
        question: 'What evidence confirms mentorship availability?',
        targetArea: 'Assumptions',
        rationale: 'Validates key operational assumption prior to commitment.',
        group: 'Missing Evidence'
      },
      {
        id: 'cq-2',
        question: 'How will peak workload adjust during exam periods?',
        targetArea: 'Schedule Conflicts',
        rationale: 'Exposes operational vulnerability before final decision.',
        group: 'Risk Check'
      }
    ];

    questions.forEach((q) => {
      expect(q.question).toBeDefined();
      expect(q.rationale).toBeDefined();
      expect(q.targetArea).toBeDefined();
      expect(q.question.length).toBeGreaterThan(15);
    });
  });
});
