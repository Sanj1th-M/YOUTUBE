import { useState, useCallback, useRef } from 'react';

/**
 * Hook for managing deduplicated API requests.
 */
export function useRequestDedupe() {
  const activeRequests = useRef<Record<string, Promise<any>>>({});

  const dedupe = useCallback(async (key: string, fetchFn: () => Promise<any>) => {
    if (activeRequests.current[key]) {
      return activeRequests.current[key];
    }

    const promise = fetchFn().finally(() => {
      delete activeRequests.current[key];
    });

    activeRequests.current[key] = promise;
    return promise;
  }, []);

  return dedupe;
}
