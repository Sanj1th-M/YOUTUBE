import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResults, setSearchLoading, setSearchError } from '../store';
import apiClient from '../services/api';
import EmptyState from '../components/common/EmptyState';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const query = searchParams.get('q');
  
  const { results, loading, error } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      dispatch(setSearchLoading(true));
      try {
        const res = await apiClient.get(`/search?q=${encodeURIComponent(query)}`);
        dispatch(setSearchResults(res.data.data));
      } catch (err) {
        console.error('Search failed', err);
        dispatch(setSearchError('Failed to fetch search results'));
      }
    };

    fetchResults();
  }, [query, dispatch]);

  if (loading) {
    return (
      <div className="max-w-[1100px] mx-auto p-4 flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-4 animate-pulse">
            <div className="w-full md:w-[360px] aspect-video bg-zinc-800 rounded-xl flex-shrink-0" />
            <div className="flex flex-col flex-1 gap-2">
              <div className="h-5 bg-zinc-800 rounded w-3/4" />
              <div className="h-4 bg-zinc-800 rounded w-1/4" />
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 rounded-full bg-zinc-800" />
                <div className="h-4 bg-zinc-800 rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto p-4 flex flex-col gap-4">
      {/* Mobile Search Input (Visible only on mobile) */}
      <div className="flex md:hidden items-center bg-zinc-900 rounded-full px-4 border border-zinc-800 focus-within:border-blue-500 mb-2">
        <SearchIcon size={20} className="text-zinc-400 mr-2" />
        <input 
          type="text" 
          placeholder="Search YOUTUBE" 
          defaultValue={query || ''}
          className="flex-1 bg-transparent py-2.5 outline-none text-sm"
        />
      </div>

      {results.length === 0 && !loading && (
        <EmptyState 
          title="No results found" 
          description="Try different keywords or filters." 
        />
      )}

      {/* Search Results */}
      <div className="flex flex-col gap-6">
        {results.map((video) => (
          <div key={video.id} className="flex flex-col md:flex-row gap-4 group cursor-pointer">
            <Link to={`/watch/${video.id}`} className="relative w-full md:w-[360px] aspect-video bg-zinc-800 rounded-xl overflow-hidden flex-shrink-0">
               <img src={video.thumbnail} className="w-full h-full object-cover" alt={video.title} />
               <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[12px] text-white">
                 {video.duration}
               </div>
            </Link>
            <div className="flex flex-col flex-1 py-1">
              <Link to={`/watch/${video.id}`}>
                <h3 className="text-lg font-bold line-clamp-2 leading-tight mb-1 group-hover:text-zinc-200">
                  {video.title}
                </h3>
              </Link>
              <p className="text-xs text-zinc-400 mb-3">{video.views} • {video.uploadedAt}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-zinc-700 overflow-hidden">
                  <img src={video.channel.thumbnail} className="w-full h-full object-cover" alt="" />
                </div>
                <span className="text-xs text-zinc-400 hover:text-white transition-colors">{video.channel.name}</span>
              </div>
              
              <p className="text-xs text-zinc-400 line-clamp-2">
                {/* Future: Add video description from backend */}
                Explore more content from {video.channel.name} on the platform.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
