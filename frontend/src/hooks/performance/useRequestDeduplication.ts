import { useState, useCallback, useRef } from 'react';

/**
 * useRequestDeduplication
 * Prevents multiple identical in-flight requests.
 */
export const useRequestDeduplication = () => {
  const pendingRequests = useRef<Map<string, Promise<any>>>(new Map());

  const execute = useCallback(async (key: string, requestFunc: () => Promise<any>) => {
    if (pendingRequests.current.has(key)) {
      return pendingRequests.current.get(key);
    }

    const promise = requestFunc().finally(() => {
      pendingRequests.current.delete(key);
    });

    pendingRequests.current.set(key, promise);
    return promise;
  }, []);

  return { execute };
};
