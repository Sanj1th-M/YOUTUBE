import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setMinimized, closePlayer } from '../../store';
import { playerService } from '../../services/playerService';
import { X, Play, Pause, Maximize2 } from 'lucide-react';

const MiniPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const { currentVideo, isMinimized, isPlaying } = useSelector((state: RootState) => state.player);

  if (!currentVideo) return null;

  return (
    <div 
      className={`fixed bottom-16 md:bottom-4 right-0 md:right-4 bg-zinc-900 border border-zinc-800 shadow-2xl transition-all duration-300 z-[100] ${
        isMinimized ? 'w-[300px] h-[170px]' : 'hidden'
      }`}
    >
      <div className="relative w-full h-full flex flex-col">
        {/* Video Thumbnail / Preview */}
        <div className="flex-1 bg-black flex items-center justify-center overflow-hidden">
          <img src={currentVideo.thumbnail} className="w-full h-full object-cover opacity-50" alt="" />
        </div>

        {/* Controls Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
          <div className="flex justify-between items-center">
             <button onClick={() => dispatch(setMinimized(false))} className="p-1 hover:bg-white/20 rounded-full">
               <Maximize2 size={16} />
             </button>
             <button onClick={() => dispatch(closePlayer())} className="p-1 hover:bg-white/20 rounded-full">
               <X size={16} />
             </button>
          </div>
          <div className="flex justify-center items-center gap-4">
            <button 
              onClick={() => isPlaying ? playerService.pause() : playerService.play()}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full"
            >
              {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
            </button>
          </div>
          <div className="h-0.5 bg-zinc-700 w-full rounded-full">
            <div className="h-full bg-red-600 w-1/3 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
