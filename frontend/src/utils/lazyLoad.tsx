import React, { lazy, Suspense } from 'react';

/**
 * Higher Order Component to wrap lazy loaded components with a Suspense boundary.
 * Renamed for consistent architectural usage in Phase 10.
 */
export const withSuspense = (
  LazyComponent: React.LazyExoticComponent<any>,
  Fallback: React.ReactNode = <div className="p-4">Loading...</div>
) => {
  return (props: any) => (
    <Suspense fallback={Fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

/**
 * Standard lazyLoad helper
 */
export const lazyLoad = (importFn: () => Promise<any>, Fallback: React.ReactNode = null) => {
  const LazyComponent = lazy(importFn);
  
  return (props: any) => (
    <Suspense fallback={Fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
