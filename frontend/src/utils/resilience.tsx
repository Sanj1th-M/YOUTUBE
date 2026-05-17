import React, { Suspense, memo } from 'react';
import SecurityErrorBoundary from '../components/common/SecurityErrorBoundary';

/**
 * Higher Order Component for resilient component loading.
 * Combines Memoization, Suspense, and Error Boundaries.
 */
export function withResilience<P extends object>(
  Component: React.ComponentType<P>,
  fallback: React.ReactNode = <div className="p-4 animate-pulse bg-zinc-900 h-20 rounded" />
) {
  const MemoizedComponent = memo(Component);

  return (props: P) => (
    <SecurityErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <MemoizedComponent {...props} />
      </Suspense>
    </SecurityErrorBoundary>
  );
}
