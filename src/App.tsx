import { useState } from 'react';
import { Header, NavigationTab } from './components/Header';
import { DecisionForm } from './components/DecisionForm';
import { AnalysisScreen } from './screens/AnalysisScreen';
import { AskTheLensModal } from './components/AskTheLensModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { DecisionInput, BlindSpotAnalysis, ReassessmentDelta } from './types/decision';
import { analyzeDecision } from './services/api';

export function App() {
  const [currentInput, setCurrentInput] = useState<DecisionInput | null>(null);
  const [analysis, setAnalysis] = useState<BlindSpotAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<NavigationTab>('frame');
  const [isAskTheLensOpen, setIsAskTheLensOpen] = useState(false);

  const handleDecisionSubmit = async (input: DecisionInput) => {
    setCurrentInput(input);
    setIsAnalyzing(true);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const result = await analyzeDecision(input);
      setAnalysis(result);
      setActiveTab('lens');
    } catch (err) {
      console.error('Analysis submission error:', err);
      setErrorMessage('An unexpected error occurred while analyzing your reasoning. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setCurrentInput(null);
    setAnalysis(null);
    setErrorMessage(null);
    setIsAnalyzing(false);
    setActiveTab('frame');
    setIsAskTheLensOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
    const element = document.getElementById(`surface-${tab}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReassessmentComplete = (delta: ReassessmentDelta) => {
    if (analysis) {
      setAnalysis(delta.updatedAnalysis);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-canvas-50 flex flex-col font-sans text-brand-950">
        <Header
          onReset={currentInput ? handleReset : undefined}
          isAnalyzing={isAnalyzing}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onOpenAskTheLens={() => setIsAskTheLensOpen(true)}
          hasAnalysis={!!analysis}
        />

        <main id="main-content" className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {errorMessage && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm flex items-center justify-between">
              <span>{errorMessage}</span>
              <button onClick={() => setErrorMessage(null)} className="font-bold underline text-xs">Dismiss</button>
            </div>
          )}

          {!analysis && (
            <DecisionForm onSubmit={handleDecisionSubmit} isAnalyzing={isAnalyzing} />
          )}

          {analysis && currentInput && (
            <AnalysisScreen
              input={currentInput}
              analysis={analysis}
              onReset={handleReset}
              onReassessmentComplete={handleReassessmentComplete}
              onOpenAskTheLens={() => setIsAskTheLensOpen(true)}
            />
          )}

          {analysis && currentInput && (
            <AskTheLensModal
              isOpen={isAskTheLensOpen}
              onClose={() => setIsAskTheLensOpen(false)}
              input={currentInput}
              analysis={analysis}
            />
          )}
        </main>

        <footer className="border-t border-canvas-200 bg-white/50 py-8 text-center text-xs text-slate-500">
          <div className="max-w-5xl mx-auto px-4 space-y-2">
            <p className="font-semibold text-brand-950">BLINDLENS — AI Reasoning Inspection Workspace</p>
            <p>Built for PromptWars. AI challenges reasoning; AI does not make the decision.</p>
            <p className="text-[11px] text-slate-400">
              Strictly privacy-preserving in-memory analysis. No decision data stored.
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
