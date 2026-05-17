import React, { useEffect } from 'react';
import { Download as DownloadIcon, Settings, Pause, Play, Trash2, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setDownloads, updateDownload, removeDownload } from '../store';
import apiClient from '../services/api';
import EmptyState from '../components/common/EmptyState';

const Downloads: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state: RootState) => state.downloads);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const res = await apiClient.get('/downloads');
        dispatch(setDownloads(res.data.data));
      } catch (err) {
        console.error('Failed to fetch downloads', err);
      }
    };

    fetchDownloads();
  }, [dispatch]);

  const handleAction = async (id: string, action: 'pause' | 'resume' | 'remove') => {
    try {
      if (action === 'remove') {
        await apiClient.delete(`/downloads/${id}`);
        dispatch(removeDownload(id));
      } else {
        const status = action === 'pause' ? 'paused' : 'downloading';
        const res = await apiClient.patch(`/downloads/${id}/status`, { status });
        dispatch(updateDownload({ id, status: res.data.data.status }));
      }
    } catch (err) {
      console.error(`Failed to ${action} download`, err);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto p-4 md:p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <DownloadIcon size={28} /> Downloads
        </h1>
        <Button variant="ghost" size="icon">
          <Settings size={20} />
        </Button>
      </div>

      {items.length === 0 && !loading ? (
        <EmptyState 
          title="No downloads yet" 
          description="Videos you download will appear here for you to watch offline."
          icon={<DownloadIcon size={64} className="text-zinc-700" />}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 group bg-zinc-900/30 p-2 rounded-xl border border-transparent hover:border-zinc-800 transition-colors">
              <div className="relative w-40 md:w-56 aspect-video bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                 <img src={item.thumbnailUrl} className="w-full h-full object-cover" alt="" />
                 {item.status === 'downloading' && (
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   </div>
                 )}
              </div>
              
              <div className="flex flex-col flex-1 min-w-0 py-1">
                <h3 className="text-sm md:text-base font-bold line-clamp-2 leading-tight mb-1">
                  {item.title}
                </h3>
                <div className="flex flex-col gap-2 mt-auto">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>{item.status === 'completed' ? 'Completed' : `${item.progress}% • ${item.type}`}</span>
                    {item.status === 'failed' && <span className="text-red-500 flex items-center gap-1"><AlertCircle size={12} /> Failed</span>}
                  </div>
                  
                  {item.status !== 'completed' && (
                    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${item.status === 'failed' ? 'bg-red-600' : 'bg-blue-600'}`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-1">
                    {item.status === 'downloading' && (
                      <Button variant="secondary" size="icon" className="w-8 h-8" onClick={() => handleAction(item.id, 'pause')}>
                        <Pause size={14} />
                      </Button>
                    )}
                    {item.status === 'paused' && (
                      <Button variant="secondary" size="icon" className="w-8 h-8" onClick={() => handleAction(item.id, 'resume')}>
                        <Play size={14} />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-zinc-500 hover:text-red-500" onClick={() => handleAction(item.id, 'remove')}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Downloads;
