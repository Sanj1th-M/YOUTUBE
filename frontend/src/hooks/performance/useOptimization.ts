import { useEffect, useRef } from 'react';

/**
 * Prevents rapid repeated calls to a function.
 */
export const useThrottle = (callback: Function, delay: number) => {
  const lastCall = useRef(0);

  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  };
};

/**
 * Simple debounce hook.
 */
export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
