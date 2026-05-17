import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={`bg-zinc-800 animate-pulse rounded-lg ${className}`} />
  );
};

export const VideoCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-video bg-zinc-800 rounded-xl overflow-hidden relative">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>
      <div className="flex gap-3 px-1">
        <Skeleton className="w-9 h-9 rounded-full flex-shrink-0 mt-1" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </div>
    </div>
  );
};

export const SearchResultSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Skeleton className="w-full md:w-[360px] aspect-video rounded-xl flex-shrink-0" />
      <div className="flex flex-col flex-1 py-1 gap-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
        <div className="flex items-center gap-2 mt-2">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
