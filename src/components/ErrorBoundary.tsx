import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('BlindLens UI Error caught by boundary:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-canvas-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl border border-rose-200 shadow-xl max-w-md w-full text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-brand-950 font-serif">
              An unexpected UI error occurred
            </h2>
            <p className="text-xs text-slate-600">
              BlindLens caught an isolated component error. Your reasoning data has not been lost.
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-3 rounded-xl bg-brand-900 text-white font-bold text-sm hover:bg-brand-950 transition-colors flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Reasoning Inspector</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
