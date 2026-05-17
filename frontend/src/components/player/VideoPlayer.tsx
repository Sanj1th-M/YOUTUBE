import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { playerService } from '../../services/playerService';
import { Play, Pause, Volume2, Maximize, Settings, SkipForward, SkipBack } from 'lucide-react';

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { currentVideo, isPlaying, isBuffering, currentTime, duration } = useSelector((state: RootState) => state.player);

  useEffect(() => {
    if (videoRef.current) {
      playerService.init(videoRef.current);
    }
  }, []);

  useEffect(() => {
    if (currentVideo) {
      // In a real app, we would fetch the manifest URL from the backend
      // For now, we use a placeholder or wait for Phase 6
      // playerService.load(`https://example.com/manifest/${currentVideo.id}`);
    }
  }, [currentVideo]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative group aspect-video bg-black rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full cursor-pointer"
        playsInline
      />

      {/* Buffering Overlay */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Custom Controls Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        {/* Progress Bar */}
        <div className="relative w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer">
           <div 
             className="absolute top-0 left-0 h-full bg-red-600 rounded-full" 
             style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
           />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => isPlaying ? playerService.pause() : playerService.play()}>
              {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
            </button>
            <button><SkipForward size={24} fill="white" /></button>
            <div className="flex items-center gap-2">
               <Volume2 size={20} />
               <div className="w-20 h-1 bg-white/30 rounded-full">
                  <div className="w-full h-full bg-white rounded-full" />
               </div>
            </div>
            <div className="text-sm font-medium">
               {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button><Settings size={20} /></button>
            <button><Maximize size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
