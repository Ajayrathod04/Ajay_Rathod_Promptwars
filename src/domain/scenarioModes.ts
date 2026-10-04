import { ScenarioCategory } from '../types/decision';

export interface ScenarioMeta {
  category: ScenarioCategory;
  label: string;
  description: string;
  focusArea: string;
}

export const SCENARIO_MODES: ScenarioMeta[] = [
  {
    category: 'Career',
    label: 'Career & Jobs',
    description: 'Promotions, internship offers, company switches, freelancing.',
    focusArea: 'Mentorship, learning velocity, work-life balance, opportunity cost'
  },
  {
    category: 'Education',
    label: 'Education & Courses',
    description: 'Degree selection, bootcamps, certifications, graduate studies.',
    focusArea: 'Prerequisites, tuition ROI, time commitment vs exam schedules'
  },
  {
    category: 'Money',
    label: 'Money & Purchases',
    description: 'High-ticket tech workstations, investments, major expenses.',
    focusArea: 'Total cost of ownership, net yield, cash flow impact'
  },
  {
    category: 'Relocation',
    label: 'Relocation & Housing',
    description: 'Moving to a new city, lease agreements, remote vs on-site.',
    focusArea: 'Cost of living, social network continuity, commute strain'
  },
  {
    category: 'Project',
    label: 'Project & Product',
    description: 'Architecture pivots, feature scope, product launch timing.',
    focusArea: 'Technical debt, team capacity, market timing risks'
  },
  {
    category: 'Personal',
    label: 'Personal Trade-Offs',
    description: 'Workload balances, health choices, time allocation.',
    focusArea: 'Energy reserves, boundary enforcement, long-term well-being'
  }
];
