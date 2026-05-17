import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

/**
 * Performance Hooks
 * Specialized hooks for optimized state selection and memoization.
 */

// Example: Memoized selector for video results to prevent unnecessary re-renders
const selectSearchResults = (state: RootState) => state.search.results;

export const useMemoizedSearchResults = () => {
  const results = useSelector(selectSearchResults);
  return useMemo(() => results, [results]);
};

export const useStablePlayerState = () => {
  const player = useSelector((state: RootState) => state.player);
  return useMemo(() => ({
    isPlaying: player.isPlaying,
    currentTime: player.currentTime,
    duration: player.duration
  }), [player.isPlaying, player.currentTime, player.duration]);
};
