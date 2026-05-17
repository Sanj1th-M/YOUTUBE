import React from 'react';
import Skeleton from '../common/Skeleton';

export const FeedSkeleton: React.FC = () => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <Skeleton className="aspect-video rounded-xl" />
          <div className="flex gap-3 px-1">
            <Skeleton className="w-9 h-9 rounded-full flex-shrink-0 mt-1" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-4 bg-zinc-800 rounded w-full" />
              <div className="h-3 bg-zinc-800 rounded w-2/3" />
              <div className="h-3 bg-zinc-800 rounded w-1/2 mt-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const WatchSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 max-w-[1700px] mx-auto">
      <div className="flex-1">
        <Skeleton className="aspect-video rounded-xl mb-4" />
        <div className="h-8 bg-zinc-800 rounded w-3/4 mb-4" />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-2">
              <div className="h-4 bg-zinc-800 rounded w-24" />
              <div className="h-3 bg-zinc-800 rounded w-16" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[400px] flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-2">
            <Skeleton className="w-40 h-24 rounded-lg flex-shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-4 bg-zinc-800 rounded w-full" />
              <div className="h-3 bg-zinc-800 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
