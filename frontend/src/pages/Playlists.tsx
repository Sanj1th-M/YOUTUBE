import React from 'react';
import { PlaySquare, Plus } from 'lucide-react';
import Button from '../components/common/Button';

const Playlists: React.FC = () => {
  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <PlaySquare size={28} /> Playlists
        </h1>
        <Button variant="secondary" className="gap-2">
          <Plus size={20} /> New playlist
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div className="flex flex-col gap-2 group cursor-pointer">
           <div className="relative aspect-video bg-zinc-800 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                 <PlaySquare size={48} className="text-white/60" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[12px] text-white">
                50 videos
              </div>
           </div>
           <div>
             <h3 className="font-bold text-sm">Watch Later</h3>
             <p className="text-xs text-zinc-400">Private • Updated today</p>
           </div>
        </div>

        <div className="flex flex-col gap-2 group cursor-pointer">
           <div className="relative aspect-video bg-zinc-800 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                 <PlaySquare size={48} className="text-white/60" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[12px] text-white">
                12 videos
              </div>
           </div>
           <div>
             <h3 className="font-bold text-sm">My Mix</h3>
             <p className="text-xs text-zinc-400">Public • Created 2 months ago</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Playlists;
