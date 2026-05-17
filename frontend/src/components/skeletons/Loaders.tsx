import React from 'react';

/**
 * Skeleton Item
 * Basic building block for all skeleton loaders.
 */
export const SkeletonItem: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-zinc-800 animate-pulse rounded ${className}`} />
);

/**
 * Video Card Skeleton
 * Single card for the home feed grid.
 */
export const VideoCardSkeleton: React.FC = () => (
  <div className="flex flex-col gap-3">
    <SkeletonItem className="aspect-video rounded-xl" />
    <div className="flex gap-3 px-1">
      <SkeletonItem className="w-9 h-9 rounded-full flex-shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <SkeletonItem className="h-4 w-3/4" />
        <SkeletonItem className="h-3 w-1/2" />
      </div>
    </div>
  </div>
);

/**
 * Feed Skeleton
 * Mimics the YouTube home feed grid.
 */
export const FeedSkeleton: React.FC = () => (
  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
    {Array.from({ length: 15 }).map((_, i) => (
      <VideoCardSkeleton key={i} />
    ))}
  </div>
);

/**
 * Video Details Skeleton
 * Mimics the watch page layout.
 */
export const WatchSkeleton: React.FC = () => (
  <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 max-w-[1700px] mx-auto">
    <div className="flex-1">
      <SkeletonItem className="aspect-video rounded-xl mb-4" />
      <SkeletonItem className="h-6 w-1/2 mb-4" />
      <div className="flex items-center gap-4 mb-6">
        <SkeletonItem className="w-10 h-10 rounded-full" />
        <SkeletonItem className="h-4 w-32" />
      </div>
    </div>
    <div className="w-full lg:w-[400px] flex flex-col gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex gap-2">
          <SkeletonItem className="w-40 h-24 rounded-lg flex-shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <SkeletonItem className="h-3 w-full" />
            <SkeletonItem className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
