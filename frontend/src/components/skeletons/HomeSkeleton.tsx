import React from 'react';
import { VideoCardSkeleton } from '../common/Skeleton';

const HomeSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-black">
      <div className="px-4 py-3 flex gap-3 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-8 w-20 bg-zinc-800 rounded-lg flex-shrink-0 animate-pulse" />
        ))}
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default HomeSkeleton;
