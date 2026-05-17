import React, { Component, ErrorInfo, ReactNode } from 'react';
import { monitoringService } from '../../services/monitoring/monitoringService';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Security Error Boundary
 * Prevents application-wide crashes and sensitive information exposure in UI.
 */
class SecurityErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[SECURITY_UI_ERROR]', error, errorInfo);
    // Track error in backend monitoring
    monitoringService.trackUIError('SecurityErrorBoundary', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center bg-zinc-900 rounded-xl m-4 border border-red-900/30">
          <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-zinc-400 mb-6 max-w-md">
            We encountered a rendering error. Please try refreshing the page or navigating back.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SecurityErrorBoundary;
