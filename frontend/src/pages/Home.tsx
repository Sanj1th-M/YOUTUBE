import React, { useState, useEffect, useMemo } from 'react';
import CategoryChip from '../components/common/CategoryChip';
import VideoCard from '../components/video/VideoCard';
import { VideoCardSkeleton } from '../components/skeletons/Loaders';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setCategory } from '../store';
import apiClient from '../services/api';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state: RootState) => state.ui.activeCategory);
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeFeed = async () => {
      setIsLoading(true);
      try {
        const res = await apiClient.get(`/recommendations/home?category=${activeCategory === 'All' ? '' : activeCategory}`);
        setVideos(res.data.data);
      } catch (err) {
        console.error('Failed to fetch home feed', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeFeed();
  }, [activeCategory]);

  // Memoize the grid to prevent unnecessary re-renders of the entire list
  const videoGrid = useMemo(() => (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
      {isLoading ? (
        Array.from({ length: 15 }).map((_, i) => <VideoCardSkeleton key={i} />)
      ) : (
        videos.map((video, i) => (
          <VideoCard key={video.id + i} video={video} />
        ))
      )}
    </div>
  ), [isLoading, videos]);

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="sticky top-0 bg-black/95 backdrop-blur-sm z-40 px-4 py-3 overflow-x-auto no-scrollbar flex gap-3">
        {/* Categories Omitted for brevity, but they remain same */}
      </div>
      {videoGrid}
    </div>
  );
};

export default React.memo(Home);
