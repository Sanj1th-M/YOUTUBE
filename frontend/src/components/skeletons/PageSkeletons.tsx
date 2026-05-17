import React from 'react';
import Skeleton from '../common/Skeleton';

export const WatchPageSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 max-w-[1700px] mx-auto w-full">
      <div className="flex-1">
        <Skeleton className="aspect-video rounded-xl mb-4" />
        <Skeleton className="h-8 w-3/4 mb-4" />
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
      <div className="w-full lg:w-[400px] flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-2">
            <Skeleton className="w-40 h-24 rounded-lg flex-shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SearchPageSkeleton: React.FC = () => {
  return (
    <div className="max-w-[1100px] mx-auto p-4 flex flex-col gap-6 w-full">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex flex-col md:flex-row gap-4 animate-pulse">
          <Skeleton className="w-full md:w-[360px] aspect-video rounded-xl flex-shrink-0" />
          <div className="flex flex-col flex-1 gap-3 py-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <div className="flex items-center gap-2 mt-2">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-12 w-full mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
};
