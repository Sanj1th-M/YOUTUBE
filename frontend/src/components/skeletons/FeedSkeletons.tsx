import React from 'react';

const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-zinc-800 animate-pulse rounded-lg ${className}`} />
);

export const VideoGridSkeleton = () => (
  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="flex flex-col gap-3">
        <Skeleton className="aspect-video rounded-xl" />
        <div className="flex gap-3 px-1">
          <Skeleton className="w-9 h-9 rounded-full flex-shrink-0 mt-1" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const WatchSkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 max-w-[1700px] mx-auto animate-pulse">
    <div className="flex-1">
      <Skeleton className="aspect-video rounded-xl mb-4" />
      <Skeleton className="h-8 w-3/4 mb-4" />
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
    <div className="w-full lg:w-[400px] space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex gap-2">
          <Skeleton className="w-40 h-24 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
