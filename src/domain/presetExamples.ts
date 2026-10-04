import { PresetExample } from '../types/decision';

export const PRESET_EXAMPLES: PresetExample[] = [
  {
    id: 'internship',
    title: '6-Month Internship',
    category: 'Career',
    description: 'Good stipend, close to home, industry experience.',
    input: {
      decision: "Should I accept a 6-month software engineering internship?",
      context: "The stipend is solid, the office is a 15-minute drive from my house, and it promises real industry experience.",
      beliefs: "I believe the experience will boost my resume significantly and the stipend will help pay my living costs.",
      factors: "Stipend amount, proximity to home, resume value.",
      options: "Option A: Accept internship. Option B: Stay focused purely on academic coursework and open-source projects.",
      constraints: "Must complete final year university courses simultaneously.",
      scenarioCategory: 'Career'
    }
  },
  {
    id: 'relocation',
    title: 'City Relocation for Work',
    category: 'Relocation',
    description: 'Higher salary offer in a major metro 500 miles away.',
    input: {
      decision: "Should I move to another city to take a higher-paying job offer?",
      context: "Offered a position paying 30% more in a tech hub city, but I currently live near family and friends.",
      beliefs: "I think moving to a bigger city is necessary for rapid career growth in my 20s.",
      factors: "Salary, career trajectory, social network, cost of living.",
      options: "Option A: Relocate for new job. Option B: Negotiate current role or look for remote positions.",
      constraints: "Lease ends in 2 months.",
      scenarioCategory: 'Relocation'
    }
  },
  {
    id: 'laptop',
    title: 'Workstation Purchase',
    category: 'Money',
    description: 'High-end laptop for freelance engineering & design work.',
    input: {
      decision: "Should I spend $2,500 on a top-spec workstation laptop?",
      context: "My current laptop works but slows down during heavy compilation and rendering tasks. I do freelance client work.",
      beliefs: "Faster compile times will increase my hourly billable output and pay for the machine in 3 months.",
      factors: "Performance speed, price, portability, battery life.",
      options: "Option A: Buy $2,500 workstation. Option B: Upgrade desktop RAM and keep current laptop.",
      constraints: "Paying cash from freelance savings.",
      scenarioCategory: 'Money'
    }
  },
  {
    id: 'startup-vs-corp',
    title: 'Startup A vs Company B',
    category: 'Career',
    description: 'High-equity early startup vs high-salary corporate role.',
    input: {
      decision: "Should I join an early-stage startup (Option A) or an established tech company (Option B)?",
      context: "Startup A offers lower base salary but 1.5% equity. Company B offers high base salary, stability, and benefits.",
      beliefs: "I lean toward Startup A because I want ownership and direct impact.",
      factors: "Equity potential, base compensation, stability, learning pace.",
      options: "Startup A (Series A) vs Company B (Public Enterprise)",
      constraints: "Need stable health insurance.",
      scenarioCategory: 'Career'
    }
  }
];
