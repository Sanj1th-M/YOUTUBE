import React, { memo } from 'react';
import VideoCard from './VideoCard';
import { Video } from '../../types';

interface VideoGridProps {
  videos: Video[];
  isLoading?: boolean;
}

/**
 * Optimized Video Grid
 * Uses React.memo for the entire grid to prevent unnecessary rerenders
 * when parent state changes unrelated to the video list.
 */
const VideoGrid: React.FC<VideoGridProps> = memo(({ videos, isLoading }) => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
      {videos.map((video, i) => (
        <VideoCard key={video.id + i} video={video} />
      ))}
    </div>
  );
});

VideoGrid.displayName = 'VideoGrid';

export default VideoGrid;
