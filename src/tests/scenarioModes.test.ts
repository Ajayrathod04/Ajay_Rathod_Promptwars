import { describe, it, expect } from 'vitest';
import { SCENARIO_MODES } from '../domain/scenarioModes';
import { PRESET_EXAMPLES } from '../domain/presetExamples';

describe('Scenario Modes & Preset Integrity', () => {
  it('should define valid scenario category metadata', () => {
    expect(SCENARIO_MODES.length).toBeGreaterThanOrEqual(6);
    const categories = SCENARIO_MODES.map((m) => m.category);
    expect(categories).toContain('Career');
    expect(categories).toContain('Education');
    expect(categories).toContain('Money');
    expect(categories).toContain('Relocation');
    expect(categories).toContain('Project');
    expect(categories).toContain('Personal');
  });

  it('should associate each preset example with a valid scenario category', () => {
    PRESET_EXAMPLES.forEach((preset) => {
      expect(preset.category).toBeDefined();
      expect(preset.input.decision).toBeDefined();
      expect(preset.input.decision.length).toBeGreaterThan(10);
    });
  });
});
