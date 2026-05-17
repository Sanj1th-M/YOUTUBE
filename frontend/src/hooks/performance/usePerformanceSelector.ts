import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

/**
 * usePerformanceSelector
 * A memoized selector hook to prevent unnecessary rerenders 
 * when only specific parts of the state change.
 */
export const usePerformanceSelector = <T,>(selector: (state: RootState) => T): T => {
  const state = useSelector(selector);
  return useMemo(() => state, [state]);
};
