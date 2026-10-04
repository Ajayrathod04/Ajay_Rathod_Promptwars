# BLINDLENS

> **"See what you might be missing before you decide."**

BlindLens is an AI-powered reasoning inspection tool designed to help users identify potential blind spots, unstated assumptions, missing information, trade-offs, and critical questions when considering a decision.

---

## 🎯 Problem Statement

People often make decisions based on the information that is most visible to them. As a result, they frequently:
- Rely on unstated or unverified assumptions.
- Overlook critical factors (such as hidden costs or academic schedule conflicts).
- Ignore underlying risks and trade-offs between competing priorities.
- Fail to identify missing information before committing.
- Suffer from confirmation bias and premature commitment.

Traditional decision tools either offer generic advice or make choices *for* the user. 

---

## 💡 Solution

BlindLens acts as a **Reasoning Inspector**. It analyzes the user's thought process and surfaces hidden assumptions, unconsidered variables, trade-offs, and critical probing questions.

**CRITICAL PRODUCT REQUIREMENT:**
> **BLINDLENS DOES NOT MAKE THE DECISION FOR THE USER.**
> The system challenges reasoning and reveals blind spots. The final decision always belongs to the user.

---

## 🔄 Core User Flow

```
DECISION CONTEXT
      ↓
REASONING ANALYSIS
      ↓
HIDDEN ASSUMPTIONS (with Verification Checks)
      ↓
MISSING FACTORS (Categorized Unconsidered Variables)
      ↓
CONFLICTS & TRADE-OFFS (Priority A vs Priority B)
      ↓
INFORMATION GAPS (Verified Known vs Unverified Assumed vs Currently Unknown)
      ↓
CRITICAL QUESTIONS (Highest-Value Probing Questions)
      ↓
INTERACTIVE REFLECTION (User Perspective Assessment)
      ↓
DECISION RE-SCAN (What Changed Delta Analysis)
      ↓
USER DECIDES (Neutrality Enforcement)
```

---

## 🚀 Key Features

1. **Signature UI — Reasoning Lens**: Circular visual metaphor representing the decision core surrounded by orbital nodes (*Assumptions*, *Missing Factors*, *Risks*, *Trade-Offs*, *Questions*).
2. **Hidden Assumption Detection**: Extracts unstated assumptions and generates concrete verification checks (*Expected belief → Evidence needed*).
3. **Missing-Factor Detection**: Uncovers unconsidered variables across Schedule, Finances, Career, Personal, and Risk.
4. **Conflict & Trade-Off Analysis**: Side-by-side priority split views with net trade-off summaries.
5. **Alternative Perspectives**: Reframes logic through *Future-Self*, *Financial*, *Career*, *Time*, and *Risk* lenses.
6. **Known / Assumed / Unknown Matrix**: Categorizes factors into `VERIFIED KNOWN`, `UNVERIFIED ASSUMED`, and `CURRENTLY UNKNOWN`.
7. **Critical Question Generation**: Probing questions designed to stress-test reasoning before commitment.
8. **Interactive Reflection Panel**: Asks how the user's perspective has evolved (`My reasoning changed`, `I need more information`, `My reasoning still holds`).
9. **Decision Re-Scan Delta**: Allows users to input updated information and calculate delta (*Previously Overlooked -> Now Clarified -> Still Unresolved*).
10. **Decision Safety Neutrality Guard**: Post-processor that neutralizes directive recommendation language to guarantee AI decision neutrality.
11. **Offline Heuristic Fallback**: Deterministic rule-based engine ensuring 100% functionality offline or without an API key.

---

## 🤖 AI Integration & Safety

- **GenAI Model**: Google Gemini API (`gemini-1.5-flash` JSON Structured Output).
- **Service Endpoint**: Serverless API `/api/analyze`.
- **Where GenAI is Used**: GenAI is used exclusively to analyze decision context and extract assumptions, missing factors, trade-offs, and questions.
- **Why AI is Necessary**: GenAI performs semantic pattern extraction across unstated assumptions that rigid statistical formulas cannot capture.
- **Decision Safety Guarantee**: The system prompt explicitly forbids recommendations. Furthermore, `decisionGuard.ts` automatically intercepts and rewrites any directive phrasing (*"You should choose"*, *"Option A is better"*) into neutral reasoning guidance.

---

## 🏗️ Architecture

```
User (Browser)
  ↓
Decision Input Form (React 18 + TS)
  ↓
Prompt Sanitization & Delimiter Escaping (XML Tags)
  ↓
Serverless API Route (/api/analyze)
  ├── Gemini API REST Endpoint (Structured JSON)
  └── Offline Fallback Engine (Rule-based Heuristics)
  ↓
Decision Neutrality Guard (Output Auditing)
  ↓
Reasoning Lens & Structured Cards UI
  ↓
Reflection & Re-Scan Engine
  ↓
Final User Decision ("You Decide")
```

---

## 🔐 Security

- **Prompt Injection Defense**: All user inputs are sanitized and enclosed in `<decision_context>` XML tags.
- **API Key encapsulation**: `GEMINI_API_KEY` is kept strictly on the server/API layer and is never exposed to the client.
- **Input Validation**: Strict schema checks and length caps (maximum 3,000 characters).
- **Security Headers**: Includes `X-Content-Type-Options: nosniff` and `X-Frame-Options: DENY`.

---

## ♿ Accessibility

- **Semantic HTML5**: Native `<header>`, `<main>`, `<section>`, `<footer>` tags with single logical `<h1>`.
- **Keyboard Navigation**: Full keyboard accessibility with visible `:focus-visible` ring indicators (`focus-visible:ring-brand-500`).
- **Screen Readers**: `aria-live="polite"` regions for dynamic loading status and `aria-hidden="true"` on decorative icons.
- **Skip Link**: `<a href="#main-content">` for quick keyboard navigation.
- **WCAG AA Contrast**: Curated palette achieving 4.5:1+ contrast ratios.
- **Reduced Motion**: Respects `prefers-reduced-motion` settings.

---

## 🧪 Testing Results

All tests execute via Vitest (`npm test`):

```bash
 RUN  v1.6.1 D:/Blindlens

 ✓ src/tests/decisionGuard.test.ts  (2 tests)
 ✓ src/tests/fallbackEngine.test.ts  (2 tests)
 ✓ src/tests/promptSanitizer.test.ts  (2 tests)

 Test Files  3 passed (3)
      Tests  6 passed (6)
```

Verified Test Coverage:
1. Decision Safety Guard recommendation neutralization.
2. Prompt injection defense & XML tag escaping.
3. Offline heuristic fallback engine execution.
4. Schema output integrity.

---

## ⚡ Performance & Bundle Size

- **Total Gzip Bundle Size**: ~66 kB (`60.65 kB` JS + `5.72 kB` CSS).
- **TypeScript Check**: `tsc --noEmit` returned **0 errors**.
- **Production Build**: Clean compilation in `28.09s`.

---

## 💻 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Testing**: Vitest, Happy-DOM
- **API / Server**: Vercel Serverless Function (`api/analyze.ts`), Google Gemini API (`gemini-1.5-flash`)

---

## 📁 Project Structure

```
d:/Blindlens/
├── api/
│   └── analyze.ts            # Serverless API endpoint & Gemini integration
├── public/
│   └── favicon.svg           # Signature Reasoning Lens SVG favicon
├── src/
│   ├── components/
│   │   ├── Header.tsx                 # Accessible Header & skip link
│   │   ├── LensVisualization.tsx      # Signature circular Reasoning Lens SVG
│   │   ├── DecisionForm.tsx           # Progressive decision intake form
│   │   ├── AssumptionCard.tsx        # Assumption & evidence check card
│   │   ├── ConflictCard.tsx          # Trade-off comparison split view
│   │   ├── InformationGapMatrix.tsx  # Known vs Assumed vs Unknown matrix
│   │   ├── ReflectionPanel.tsx       # Reflection & Decision Re-Scan
│   │   ├── DecisionSafetyBanner.tsx  # Decision neutrality banner
│   │   └── ErrorBoundary.tsx         # Production error boundary
│   ├── domain/
│   │   ├── decisionGuard.ts          # Decision recommendation neutralizer
│   │   ├── fallbackEngine.ts         # Deterministic offline fallback engine
│   │   ├── promptSanitizer.ts        # Prompt injection & XML tag sanitizer
│   │   └── presetExamples.ts         # 1-click decision presets
│   ├── screens/
│   │   └── AnalysisScreen.tsx        # Main reasoning analysis screen
│   ├── services/
│   │   └── api.ts                    # Client API & re-scan service
│   ├── tests/
│   │   ├── decisionGuard.test.ts
│   │   ├── fallbackEngine.test.ts
│   │   └── promptSanitizer.test.ts
│   ├── types/
│   │   └── decision.ts               # Strict TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── README.md
```

---

## 🛠️ Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run tests**:
   ```bash
   npm test
   ```
3. **Run TypeScript check**:
   ```bash
   npm run typecheck
   ```
4. **Run local dev server**:
   ```bash
   npm run dev
   ```
5. **Run production build**:
   ```bash
   npm run build
   ```

---

## 🚀 Deployment

- **Hosting Platform**: Vercel
- **Environment Variables**:
  ```env
  GEMINI_API_KEY=your_gemini_api_key_here
  ```

---

## ⚖️ Responsible AI & Decision Safety

> **"BlindLens does not make decisions for users. It identifies assumptions, missing information, conflicts, and questions that may improve the user's reasoning. The user remains responsible for the final decision."**

---

## ⚠️ Known Limitations

- **Subjective Inputs**: The quality of reasoning analysis scales with the depth of context provided by the user.
- **Domain Scope**: Specialized legal, medical, or financial compliance decisions still require qualified professional consultation.

---

## 🎬 Evaluator Demo Sequence

1. **Open Application**: Observe the clean, editorial UI with the tagline *"See what you're missing before you decide."*
2. **Select 1-Click Preset**: Click `6-Month Internship` preset chip.
3. **Scan Reasoning**: Click `Scan My Reasoning`.
4. **Inspect Reasoning Lens**: Watch the circular lens reveal orbital nodes (*Assumptions*, *Missing*, *Risks*, *Trade-offs*, *Questions*).
5. **Examine Assumptions**: Review assumption #1 (*"The role will provide high-quality learning"*) and its verification check.
6. **Examine Trade-offs**: View side-by-side priority split (*Income + Experience vs Academic Workload*).
7. **Review Information Gaps**: Inspect `VERIFIED KNOWN` vs `UNVERIFIED ASSUMED` vs `CURRENTLY UNKNOWN` matrix.
8. **Explore Critical Questions**: Read probing questions designed to test logic.
9. **Reflect & Re-Scan**: Select `I need more information`, type an updated note, and click `Re-Scan My Updated Reasoning` to view what changed.
10. **Final Safety Notice**: Note the clear statement: *"BlindLens does not decide for you. You decide."*
