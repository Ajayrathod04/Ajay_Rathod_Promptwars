import React, { useState } from 'react';
import { BlindSpotAnalysis, DecisionInput, ChatMessage } from '../types/decision';
import { processAskTheLensQuery } from '../domain/askTheLensEngine';
import { MessageSquare, Send, X, ShieldAlert, Sparkles } from 'lucide-react';

interface AskTheLensModalProps {
  isOpen: boolean;
  onClose: () => void;
  input: DecisionInput;
  analysis: BlindSpotAnalysis;
}

export const AskTheLensModal: React.FC<AskTheLensModalProps> = ({
  isOpen,
  onClose,
  input,
  analysis,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'lens',
      text: `Welcome to Ask the Lens. I am strictly bound to your decision context ("${input.decision}"). Ask me to explain an assumption, examine a trade-off, or suggest evidence to verify claims. Note: BlindLens does not make the decision for you.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [userQuery, setUserQuery] = useState('');

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || userQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const lensReplyText = processAskTheLensQuery(query, input, analysis);

    const lensMsg: ChatMessage = {
      id: `lens-${Date.now() + 1}`,
      sender: 'lens',
      text: lensReplyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg, lensMsg]);
    if (!textToSend) setUserQuery('');
  };

  const QUICK_PROMPTS = [
    'Explain this assumption',
    'What evidence would resolve this?',
    'Help me examine this trade-off',
    'What perspective am I missing?',
    'Which option should I choose?', // Tests decision neutrality guard!
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-950/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ask-lens-title"
    >
      <div className="bg-white rounded-3xl border border-canvas-200 shadow-2xl max-w-xl w-full flex flex-col h-[600px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-canvas-200 bg-brand-950 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 id="ask-lens-title" className="text-base font-bold font-serif">Ask the Lens</h2>
              <p className="text-[11px] text-brand-300">Contextual Reasoning Assistant • Neutrality Guard Active</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-brand-300 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400"
            aria-label="Close Ask the Lens chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-canvas-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-brand-900 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-canvas-300 shadow-2xs rounded-bl-xs'
                }`}
              >
                {m.sender === 'lens' && (
                  <div className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>REASONING ANALYSIS</span>
                  </div>
                )}
                <p>{m.text}</p>
                <span className="block text-[10px] opacity-60 text-right mt-1.5">{m.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Prompts */}
        <div className="p-3 bg-white border-t border-canvas-200 flex flex-wrap gap-1.5">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-canvas-100 text-brand-950 border border-canvas-300 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white border-t border-canvas-200 flex items-center space-x-2"
        >
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Ask about assumptions, trade-offs, or missing evidence..."
            className="flex-1 px-4 py-2.5 text-sm bg-canvas-50 border border-canvas-300 rounded-xl focus:ring-2 focus:ring-brand-600 focus:outline-none"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-brand-900 text-white font-bold hover:bg-brand-950 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Neutrality Footer Notice */}
        <div className="px-4 py-2 bg-amber-50 border-t border-amber-200 text-[11px] text-amber-900 flex items-center justify-center space-x-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>BlindLens informs your thinking. The final decision always belongs to you.</span>
        </div>
      </div>
    </div>
  );
};
