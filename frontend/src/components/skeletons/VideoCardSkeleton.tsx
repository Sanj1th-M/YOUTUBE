import React from 'react';
import Skeleton from '../common/Skeleton';

/**
 * VideoCardSkeleton
 * Optimized for layout stability and perceived performance.
 */
const VideoCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* Thumbnail Aspect Ratio Box */}
      <div className="relative aspect-video">
        <Skeleton className="absolute inset-0 rounded-xl" />
      </div>
      
      {/* Meta Info Row */}
      <div className="flex gap-3 px-1">
        <Skeleton className="w-9 h-9 rounded-full flex-shrink-0 mt-1" />
        <div className="flex flex-col gap-2 flex-1 pt-1">
          <Skeleton className="h-4 w-11/12 rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
          <div className="flex gap-2 mt-1">
            <Skeleton className="h-3 w-1/4 rounded" />
            <Skeleton className="h-3 w-1/4 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(VideoCardSkeleton);
