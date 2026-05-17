import React from 'react';

const Skeleton = ({ className }: { className: string }) => (
  <div className={`bg-zinc-800 animate-pulse rounded-lg ${className}`} />
);

export const VideoCardSkeleton = () => (
  <div className="flex flex-col gap-3">
    <Skeleton className="aspect-video rounded-xl" />
    <div className="flex gap-3 px-1">
      <Skeleton className="w-9 h-9 rounded-full flex-shrink-0 mt-1" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[60%]" />
      </div>
    </div>
  </div>
);

export const FeedSkeleton = ({ count = 8 }) => (
  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
    {Array.from({ length: count }).map((_, i) => (
      <VideoCardSkeleton key={i} />
    ))}
  </div>
);

export default Skeleton;
