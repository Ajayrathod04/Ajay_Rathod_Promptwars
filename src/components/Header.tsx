import React from 'react';
import { Eye, ShieldCheck, RefreshCw, MessageSquare } from 'lucide-react';

export type NavigationTab = 'frame' | 'lens' | 'blindspots' | 'questions' | 'reflect';

interface HeaderProps {
  onReset?: () => void;
  isAnalyzing?: boolean;
  activeTab?: NavigationTab;
  onTabChange?: (tab: NavigationTab) => void;
  onOpenAskTheLens?: () => void;
  hasAnalysis?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  isAnalyzing,
  activeTab = 'frame',
  onTabChange,
  onOpenAskTheLens,
  hasAnalysis = false,
}) => {
  return (
    <>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-900 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        Skip to main content
      </a>

      <header className="border-b border-canvas-200 bg-canvas-50/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer select-none"
            onClick={onReset}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onReset?.()}
          >
            <div className="w-10 h-10 rounded-xl bg-brand-900 text-brand-100 flex items-center justify-center shadow-sm border border-brand-700">
              <Eye className="w-5 h-5 text-brand-500 animate-pulse-subtle" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-brand-950 font-serif">BLINDLENS</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-brand-100 text-brand-700">
                  Reasoning Inspector
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                See what you're missing before you decide.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          {hasAnalysis && onTabChange && (
            <nav className="hidden md:flex items-center space-x-1 bg-white p-1 rounded-xl border border-canvas-200 shadow-2xs">
              <button
                onClick={() => onTabChange('frame')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'frame' ? 'bg-brand-900 text-white shadow-2xs' : 'text-slate-600 hover:text-brand-950'
                }`}
              >
                Frame
              </button>
              <button
                onClick={() => onTabChange('lens')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'lens' ? 'bg-brand-900 text-white shadow-2xs' : 'text-slate-600 hover:text-brand-950'
                }`}
              >
                Lens
              </button>
              <button
                onClick={() => onTabChange('blindspots')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'blindspots' ? 'bg-brand-900 text-white shadow-2xs' : 'text-slate-600 hover:text-brand-950'
                }`}
              >
                Blind Spots
              </button>
              <button
                onClick={() => onTabChange('questions')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'questions' ? 'bg-brand-900 text-white shadow-2xs' : 'text-slate-600 hover:text-brand-950'
                }`}
              >
                Questions
              </button>
              <button
                onClick={() => onTabChange('reflect')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'reflect' ? 'bg-brand-900 text-white shadow-2xs' : 'text-slate-600 hover:text-brand-950'
                }`}
              >
                Reflect
              </button>
            </nav>
          )}

          {/* Right Actions & Neutrality Badge */}
          <div className="flex items-center space-x-3">
            {hasAnalysis && onOpenAskTheLens && (
              <button
                onClick={onOpenAskTheLens}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Ask the Lens</span>
              </button>
            )}

            <div className="hidden lg:flex items-center space-x-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              <span>Neutrality Guard Active</span>
            </div>

            {onReset && (
              <button
                onClick={onReset}
                disabled={isAnalyzing}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50 transition-colors"
                aria-label="New Decision Inspection"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                <span className="hidden sm:inline">New Inspection</span>
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
