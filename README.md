# BLINDLENS

## See what you're missing before you decide.

**BLINDLENS** is an AI-powered reasoning assistant that helps users uncover assumptions, missing information, risks, trade-offs, conflicts and critical questions around a decision — without making the decision for them.

---

## Problem

People often focus on the most visible information when making decisions. They may overlook important factors, rely on unstated assumptions, or fail to notice conflicts in their reasoning.

BLINDLENS is designed to expose those blind spots and encourage deeper reflection before commitment.

---

## Solution

BlindLens acts as a **Reasoning Inspector**. It analyzes the user's thought process and surfaces unstated assumptions, unconsidered variables, trade-offs, information gaps, and probing questions.

### Core Workflow

```text
Decision Context
   ↓
Reasoning Analysis
   ↓
Assumptions
   ↓
Missing Factors
   ↓
Risks
   ↓
Trade-offs
   ↓
Critical Questions
   ↓
Reflection
   ↓
Re-Scan
   ↓
User Makes the Decision
```

> **"BLINDLENS does not decide for the user."**
> 
> This is a core product constraint, not merely a disclaimer. The final decision always belongs to the user.

---

## Why BLINDLENS Is Different

BLINDLENS is **not a generic chatbot** or recommendation engine. It is a specialized reasoning inspection workspace built around cognitive perimeter expansion.

1. **Structured Reasoning Inspection**: Organizes analysis into distinct visual reasoning surfaces rather than returning raw text blocks.
2. **Explicit Assumption & Evidence Checking**: Surfaces what the user is assuming and provides an actionable direction to verify claims with evidence.
3. **Information Gap Matrix**: Explicitly separates facts, unverified assumptions, and unmapped variables.
4. **Side-by-Side Trade-off Analysis**: Compares competing priorities directly without declaring a winner.
5. **Grouped Critical Questions**: Generates probing questions paired with rationales explaining *why* asking each question improves logic.
6. **Reflection & Re-Scan Loop**: Tracks perspective changes and calculates a delta (*Previously Overlooked -> Now Clarified -> Still Unresolved*).
7. **Contextual Ask the Lens Assistant**: Contextual chat strictly bound to decision context that neutralizes directive queries.
8. **Decision-Neutrality Guard**: Multi-layer post-processor that intercepts and neutralizes recommendation language.
9. **Deterministic Fallback Engine**: Local rule-based heuristic engine ensuring 100% functionality when AI services are unavailable.

---

## Key Features

### 1. Scenario Modes
Lightweight preset filters tailored to domain contexts: **Career**, **Education**, **Money**, **Relocation**, **Project**, and **Personal Trade-offs**.

### 2. Reasoning Lens
Interactive SVG visual representation of the decision core surrounded by orbital nodes (*Assumptions*, *Missing Factors*, *Risks*, *Trade-offs*, *Questions*).

### 3. Assumption Detection
Identifies unstated beliefs built into reasoning and provides an evidence-check direction (*Expected belief → Evidence check*).

### 4. Blind Spots / Information Gaps
Classifies factors into a scannable matrix:
- **VERIFIED KNOWN**: Facts directly established in the context.
- **UNVERIFIED ASSUMED**: Assumptions accepted without concrete proof.
- **CURRENTLY UNKNOWN**: Variables requiring further empirical inquiry.

### 5. Risks & Trade-offs
Makes competing priorities (*Priority A vs Priority B*) and downside risks explicit.

### 6. Critical Questions
Questions grouped into functional categories:
- Missing Evidence
- Assumption Check
- Risk Check
- Long-Term View
- Alternative Perspective

### 7. Reflection + Re-Scan
Allows the user to select how their reasoning has evolved (*My reasoning changed*, *I need more information*, *My reasoning still holds*), add new information, and inspect the re-scan delta:
- Previously Overlooked
- Now Clarified
- Still Unresolved

### 8. Ask the Lens
A contextual reasoning assistant for exploring the analysis in-depth. It strictly enforces decision neutrality and will not recommend choices.

---

## Example

### Scenario: 6-Month Engineering Internship
A student is considering a 6-month software engineering internship because of solid stipend pay, proximity to home, and expected industry experience.

### What BLINDLENS Surfacing:
- **Unstated Assumption**: Assumes the role will provide dedicated mentorship and high-quality technical tasks.
- **Evidence Check**: Verify weekly mentor hours and typical intern project assignments before accepting.
- **Missing Factors**: Potential conflicts with university exam schedules and academic workload.
- **Trade-off**: Immediate Income & Practical Experience vs Academic Workload & Discretionary Time.
- **Critical Question**: *"If the internship workload increases during exam weeks, what boundary will you enforce?"*

> **The student remains the decision-maker.**

---

## AI Contribution

BLINDLENS uses Artificial Intelligence to perform multi-dimensional semantic reasoning inspection across unstated assumptions and unconsidered variables.

### Technical Data Flow

```text
User decision context
   ↓
Prompt sanitization & XML tag wrapping
   ↓
Structured AI reasoning (Gemini API via Serverless Endpoint)
   ↓
Domain-specific reasoning output (JSON Schema parsing)
   ↓
Decision-neutrality guard (Directive phrase neutralization)
   ↓
Structured UI reasoning surfaces
```

- **GenAI Provider**: Google Gemini API (`gemini-1.5-flash` JSON Structured Output).
- **Service Integration**: Serverless function at `/api/analyze`.
- **AI Responsibilities**: Extracting hidden assumptions, unconsidered variables, trade-offs, probing questions, and contextual responses.
- **Resilience**: Features a deterministic rule-based fallback engine (`fallbackEngine.ts`) that executes locally if Gemini is unreachable or if no API key is present.

---

## AI Safety / Decision Neutrality

BLINDLENS enforces decision neutrality through a 5-layer safety architecture:

1. **System Prompt Enforcement**: System instructions explicitly prohibit recommendations or directive advice.
2. **Prompt Sanitization**: User inputs are sanitized and enclosed in `<decision_context>` XML tags to block instruction overrides.
3. **Output Neutrality Guard (`decisionGuard.ts`)**: Post-processor that scans and rewrites directive phrases (*"you should choose"*, *"option A is superior"*) into neutral reasoning guidance (*"one option to consider is"*).
4. **Ask the Lens Interception**: If a user asks *"Which option should I choose?"*, the assistant responds: *"BlindLens informs your thinking, but will not choose for you..."*
5. **Automated Regression Tests**: Vitest regression tests continuously verify decision neutrality.

---

## Security

Implemented security controls:
- **Prompt-Injection Sanitization**: Strips raw HTML/XML tags and sanitizes prompt override attempts.
- **XML Context Delimiters**: Encloses untrusted user input within `<decision_context>` tags.
- **Input Length Validation**: Enforces a strict 3,000 character limit on input fields.
- **Server-Side API Key**: `GEMINI_API_KEY` is kept strictly on the serverless backend (`api/analyze.ts`) and is never exposed to the client.
- **Security Headers**: Enforces `X-Content-Type-Options: nosniff` and `X-Frame-Options: DENY`.
- **Safe Error Handling**: Prevents technical stack traces or internal secrets from leaking to the frontend.

---

## Accessibility

Implemented accessibility measures:
- **Semantic HTML5**: Native `<header>`, `<main>`, `<section>`, `<footer>` landmark structure with single logical `<h1>`.
- **Keyboard Navigation**: Full keyboard accessibility across form controls, tab bar, interactive lens nodes, and modals.
- **Visible Focus States**: High-contrast focus rings (`focus-visible:ring-brand-500`).
- **Skip Navigation**: Keyboard skip-link (`<a href="#main-content">`).
- **Screen Reader Support**: `aria-live="polite"` regions for dynamic status updates and `aria-hidden="true"` on decorative icons.
- **WCAG AA Contrast**: Curated palette achieving 4.5:1+ contrast ratios.
- **Reduced Motion**: Respects `prefers-reduced-motion` settings.

---

## Architecture

```text
React + TypeScript Frontend
        |
        v
Vercel Serverless API (/api/analyze)
        |
        v
AI Service / Gemini API (gemini-1.5-flash)
        |
        +------> Decision-Neutrality Guard (decisionGuard.ts)
        |
        +------> Deterministic Local Fallback (fallbackEngine.ts)
        |
        v
Structured Reasoning Results
        |
        v
BLINDLENS Reasoning Surfaces
```

### Modular Directory Structure

```text
d:/Blindlens/
├── api/
│   └── analyze.ts                  # Serverless API endpoint & Gemini integration
├── public/
│   └── favicon.svg                 # Signature Reasoning Lens SVG favicon
├── src/
│   ├── components/
│   │   ├── Header.tsx               # Navigation bar & skip-link
│   │   ├── LensVisualization.tsx    # Signature Reasoning Lens SVG component
│   │   ├── DecisionForm.tsx         # Decision intake form & scenario selector
│   │   ├── AssumptionCard.tsx      # Assumption & evidence check card
│   │   ├── ConflictCard.tsx        # Trade-off split comparison view
│   │   ├── InformationGapMatrix.tsx# Known vs Assumed vs Unknown matrix
│   │   ├── QuestionsSurface.tsx    # Grouped probing questions surface
│   │   ├── ReflectionPanel.tsx     # Reflection & re-scan delta calculator
│   │   ├── AskTheLensModal.tsx     # Contextual reasoning chat assistant modal
│   │   ├── DecisionSafetyBanner.tsx# Neutrality principle banner
│   │   └── ErrorBoundary.tsx       # React error boundary
│   ├── domain/
│   │   ├── decisionGuard.ts        # Decision neutralizer post-processor
│   │   ├── fallbackEngine.ts       # Offline rule-based fallback engine
│   │   ├── promptSanitizer.ts      # Prompt injection defense & XML tag sanitizer
│   │   ├── askTheLensEngine.ts     # Contextual chat logic & prompt interception
│   │   ├── scenarioModes.ts        # Scenario presets metadata
│   │   └── presetExamples.ts       # 1-click decision presets
│   ├── screens/
│   │   └── AnalysisScreen.tsx      # Main reasoning analysis screen
│   ├── services/
│   │   └── api.ts                  # Client API & re-scan service
│   ├── tests/
│   │   ├── decisionGuard.test.ts
│   │   ├── fallbackEngine.test.ts
│   │   ├── promptSanitizer.test.ts
│   │   └── askTheLens.test.ts
│   ├── types/
│   │   └── decision.ts             # TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── NOTEBOOKLM_PRESENTATION_SOURCE.md
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

---

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Testing**: Vitest, Happy-DOM
- **API / Backend**: Vercel Serverless Functions, Google Gemini API (`gemini-1.5-flash`)
- **Styling & Icons**: Tailwind CSS, Lucide React

---

## Testing & Verification

Verified local and production test results:
- **Test Suite**: 4 test files, 9/9 unit and integration tests passing (`Vitest v1.6.1`).
- **TypeScript Check**: `tsc --noEmit` returned **0 errors**.
- **Production Build**: Successful Vite production compilation.
- **Local Preview Smoke Test**: HTTP 200 OK.
- **Production Live Test**: HTTP 200 OK on Vercel deployment.
- **Test Scopes**: Decision neutrality interception, prompt injection defense, offline fallback engine, and contextual Ask the Lens chat.

---

## Efficiency

- **Client Bundle Size**: `216.56 kB` raw (`64.41 kB` Gzip JS + `6.08 kB` Gzip CSS = **~70.5 kB Gzip Total**).
- **Lightweight Architecture**: Zero heavy WebGL/Three.js assets; uses clean SVG/CSS animation.
- **Resilient Fallback**: Local rule-based fallback engine eliminates total dependency on external network calls.

---

## Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run local dev server**:
   ```bash
   npm run dev
   ```
3. **Run automated test suite**:
   ```bash
   npm test
   ```
4. **Run TypeScript typecheck**:
   ```bash
   npm run typecheck
   ```
5. **Run production build**:
   ```bash
   npm run build
   ```
6. **Run local preview server**:
   ```bash
   npm run preview
   ```

---

## Environment Variables

Copy `.env.example` to `.env` for Gemini-backed AI reasoning:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

- **Production Configuration**: `GEMINI_API_KEY` must remain strictly server-side (e.g. Vercel Environment Variables).
- **Fallback Execution**: If `GEMINI_API_KEY` is omitted, BLINDLENS seamlessly switches to its local deterministic fallback engine.

---

## Deployment

- **Production URL**: [https://blindlens-wine.vercel.app](https://blindlens-wine.vercel.app)
- **GitHub Repository**: [https://github.com/Ajayrathod04/Ajay_Rathod_Promptwars](https://github.com/Ajayrathod04/Ajay_Rathod_Promptwars)
- **Branch**: `main`

---

## Evaluation Alignment

| Evaluation Area | BLINDLENS Evidence |
|---|---|
| **Problem Alignment** | Surfaces unstated assumptions, missing factors, risks, trade-offs, and critical questions. |
| **AI Contribution** | Structured JSON AI reasoning + contextual Ask the Lens assistant. |
| **Decision Safety** | Multi-layer neutrality guard (`decisionGuard.ts` + prompt interception). |
| **Security** | XML tag sanitization + server-side API key protection + security headers. |
| **Accessibility** | Semantic HTML5, keyboard focus states, ARIA live regions, contrast, reduced motion. |
| **Testing** | 9/9 unit and integration tests passing across 4 test files. |
| **Code Quality** | Modular TypeScript architecture with 0 compiler errors. |
| **Efficiency** | ~70.5 kB Gzip client bundle. |
| **Reliability** | Local rule-based fallback engine + verified production Vercel deployment. |

---

## Design Philosophy

> **"BLINDLENS is not an answer generator. It is a reasoning inspection layer between the user's context and their final decision."**

---

## Limitations

- **Subjective Context**: The depth of reasoning analysis scales with the context provided by the user.
- **Domain Scope**: Complex legal, medical, or financial compliance decisions require qualified professional consultation.
- **AI Guidance**: AI-generated reasoning should be treated as prompts for further investigation rather than absolute facts.
