import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

/**
 * Performance Hooks
 * Optimized selectors and utilities for heavy rendering.
 */

export const useVideoResults = () => {
  const results = useSelector((state: RootState) => state.search.results);
  return useMemo(() => results, [results]);
};

export const useHomeFeed = (activeCategory: string) => {
  const query = useSelector((state: RootState) => state.search.query);
  return useMemo(() => ({ query, activeCategory }), [query, activeCategory]);
};
