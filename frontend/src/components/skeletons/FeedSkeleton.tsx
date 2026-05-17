import React from 'react';
import { VideoCardSkeleton } from '../common/Skeleton';

/**
 * Feed Skeleton
 * Optimized for layout stability and mobile performance.
 */
const FeedSkeleton: React.FC<{ count?: number }> = ({ count = 12 }) => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
      {Array.from({ length: count }).map((_, i) => (
        <VideoCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default React.memo(FeedSkeleton);
