import { useState, useCallback, useRef } from 'react';

/**
 * Hook to deduplicate pending API requests
 */
export const useRequestDeduplication = () => {
  const pendingRequests = useRef<Record<string, Promise<any>>>({});

  const executeRequest = useCallback(async (key: string, requestFunc: () => Promise<any>) => {
    if (pendingRequests.current[key]) {
      return pendingRequests.current[key];
    }

    const promise = requestFunc().finally(() => {
      delete pendingRequests.current[key];
    });

    pendingRequests.current[key] = promise;
    return promise;
  }, []);

  return { executeRequest };
};

/**
 * Hook for optimized list intersection observing (for lazy loading/infinite scroll)
 */
export const useIntersectionObserver = (callback: () => void, dependencies: any[]) => {
  const observer = useRef<IntersectionObserver | null>(null);

  return useCallback((node: any) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });
    if (node) observer.current.observe(node);
  }, dependencies);
};
