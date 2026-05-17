import React from 'react';
import { History as HistoryIcon, Trash2 } from 'lucide-react';
import Button from '../components/common/Button';

const History: React.FC = () => {
  return (
    <div className="max-w-[1000px] mx-auto p-4 md:p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <HistoryIcon size={28} /> Watch history
        </h1>
        <Button variant="ghost" className="text-sm gap-2">
          <Trash2 size={18} /> Clear all watch history
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-zinc-400 text-sm">Today</p>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4 group cursor-pointer">
            <div className="relative w-40 md:w-56 aspect-video bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
               <img src={`https://images.unsplash.com/photo-${1611162617474 + i}-5b21e879e113?q=80&w=300&auto=format&fit=crop`} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-bold line-clamp-2 leading-tight mb-1 group-hover:text-zinc-200">
                History Video Item {i + 1} - Learning Frontend Architecture
              </h3>
              <p className="text-xs text-zinc-400">Channel Name • 1.2M views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
