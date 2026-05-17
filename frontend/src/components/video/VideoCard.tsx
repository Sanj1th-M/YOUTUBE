import React, { memo } from 'react';
import { Video } from '../../types';
import { Link } from 'react-router-dom';

interface VideoCardProps {
  video: Video;
}

/**
 * Optimized VideoCard
 * Uses React.memo for efficient rerenders and stable props.
 */
const VideoCard: React.FC<VideoCardProps> = memo(({ video }) => {
  return (
    <div className="flex flex-col gap-3 group cursor-pointer">
      <Link to={`/watch/${video.id}`} className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy" // Native lazy loading
        />
        <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[12px] font-medium text-white">
          {video.duration}
        </div>
      </Link>

      <div className="flex gap-3 px-1">
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-zinc-800 mt-1">
            <img 
              src={video.channel.thumbnail} 
              alt={video.channel.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-[16px] font-bold line-clamp-2 text-white leading-tight mb-1 group-hover:text-zinc-200">
            {video.title}
          </h3>
          <div className="text-[14px] text-zinc-400">
            <p className="hover:text-white transition-colors">{video.channel.name}</p>
            <p>{video.views} • {video.uploadedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

VideoCard.displayName = 'VideoCard';

export default VideoCard;
