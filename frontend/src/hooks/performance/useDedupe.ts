import { useRef, useCallback } from 'react';

/**
 * Hook to prevent duplicate/concurrent execution of an async function.
 */
export function useDedupe<T extends (...args: any[]) => Promise<any>>(fn: T) {
  const inProgress = useRef<boolean>(false);

  return useCallback(async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
    if (inProgress.current) {
      console.warn('Action already in progress, skipping...');
      return;
    }

    inProgress.current = true;
    try {
      return await fn(...args);
    } finally {
      inProgress.current = false;
    }
  }, [fn]);
}

/**
 * Simple debounce utility for input optimization.
 */
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: any;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
