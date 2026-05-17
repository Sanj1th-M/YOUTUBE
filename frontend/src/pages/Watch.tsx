import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/video/VideoCard';
import Button from '../components/common/Button';
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal } from 'lucide-react';
import apiClient from '../services/api';

const Watch: React.FC = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const [videoRes, relatedRes] = await Promise.all([
          apiClient.get(`/videos/${id}`),
          apiClient.get(`/recommendations/related/${id}`)
        ]);
        setVideo(videoRes.data.data);
        setRelated(relatedRes.data.data);
      } catch (err) {
        console.error('Failed to fetch video data', err);
      }
    };

    if (id) fetchVideoData();
  }, [id]);

  if (!video) return <div className="p-4 animate-pulse bg-zinc-900 rounded-xl aspect-video" />;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 max-w-[1700px] mx-auto">
      {/* Main Content */}
      <div className="flex-1">
        {/* Video Player Placeholder */}
        <div className="aspect-video bg-zinc-900 rounded-xl overflow-hidden mb-4 relative flex items-center justify-center border border-zinc-800">
           <span className="text-zinc-500 font-medium">Video Player (Phase 5+)</span>
        </div>

        {/* Title and Metadata */}
        <h1 className="text-xl font-bold mb-2 line-clamp-2">{video.title}</h1>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden">
              <img src={video.channel.thumbnail} alt={video.channel.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold leading-tight">{video.channel.name}</span>
              <span className="text-xs text-zinc-400">{video.subCount} subscribers</span>
            </div>
            <Button variant="primary" className="ml-4 px-4 py-2">Subscribe</Button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <div className="flex bg-zinc-800 rounded-full h-9 items-center">
              <button className="flex items-center gap-2 px-3 hover:bg-zinc-700 rounded-l-full border-r border-zinc-700 h-full">
                <ThumbsUp size={18} />
                <span className="text-sm font-medium">12K</span>
              </button>
              <button className="flex items-center px-3 hover:bg-zinc-700 rounded-r-full h-full">
                <ThumbsDown size={18} />
              </button>
            </div>
            <Button variant="secondary" size="sm" className="h-9 gap-2">
              <Share2 size={18} /> Share
            </Button>
            <Button variant="secondary" size="sm" className="h-9 gap-2">
              <Download size={18} /> Download
            </Button>
            <Button variant="secondary" size="icon" className="h-9 w-9">
              <MoreHorizontal size={18} />
            </Button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-zinc-800/50 rounded-xl p-3 text-sm hover:bg-zinc-800 transition-colors cursor-pointer">
          <div className="font-bold mb-1">{video.views} • {video.uploadedAt}</div>
          <p className="line-clamp-3">{video.description}</p>
          <button className="font-bold mt-2">Show more</button>
        </div>
      </div>

      {/* Suggested Videos Sidebar */}
      <div className="w-full lg:w-[400px] flex flex-col gap-4">
        {related.map((v) => (
          <div key={v.id} className="flex gap-2 group cursor-pointer">
            <div className="relative w-40 h-24 flex-shrink-0 bg-zinc-800 rounded-lg overflow-hidden">
               <img src={v.thumbnail} className="w-full h-full object-cover" alt="" />
               <div className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-[10px] text-white">{v.duration}</div>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-bold line-clamp-2 leading-tight mb-1">{v.title}</h4>
              <p className="text-xs text-zinc-400">{v.channel.name}</p>
              <p className="text-xs text-zinc-400">{v.views} • {v.uploadedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watch;
