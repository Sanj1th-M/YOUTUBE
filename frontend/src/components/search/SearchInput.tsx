import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, Clock, TrendingUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setSearchQuery, setSuggestions, addRecentSearch } from '../../store';
import apiClient from '../../services/api';

const SearchInput: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const query = useSelector((state: RootState) => state.search.query);
  const suggestions = useSelector((state: RootState) => state.search.suggestions);
  const recentSearches = useSelector((state: RootState) => state.search.recentSearches);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        try {
          const res = await apiClient.get(`/search/suggestions?q=${query}`);
          dispatch(setSuggestions(res.data.data));
        } catch (error) {
          console.error('Failed to fetch suggestions', error);
        }
      } else {
        dispatch(setSuggestions([]));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, dispatch]);

  const handleSearch = (q: string) => {
    if (q.trim()) {
      dispatch(addRecentSearch(q));
      setShowDropdown(false);
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1 max-w-[720px] mx-4 hidden md:flex">
      <div className="flex w-full group relative">
        <div className="flex flex-1 items-center bg-zinc-900 border border-zinc-800 rounded-l-full px-4 ml-8 group-focus-within:border-blue-500">
          <SearchIcon size={20} className="text-zinc-400 mr-2 hidden group-focus-within:block" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            value={query}
            onFocus={() => setShowDropdown(true)}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
            className="w-full bg-transparent border-none outline-none py-2 text-white placeholder-zinc-400"
          />
          {query && (
            <button onClick={() => dispatch(setSearchQuery(''))} className="p-1 hover:bg-zinc-800 rounded-full">
              <X size={20} className="text-zinc-400" />
            </button>
          )}
        </div>
        <button 
          onClick={() => handleSearch(query)}
          className="bg-zinc-800 border border-l-0 border-zinc-800 px-5 rounded-r-full hover:bg-zinc-700 transition-colors"
        >
          <SearchIcon size={20} className="text-white" />
        </button>

        {/* Suggestion Dropdown */}
        {showDropdown && (query || recentSearches.length > 0) && (
          <div 
            ref={dropdownRef}
            className="absolute top-[calc(100%+4px)] left-8 right-0 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-3 z-[100] overflow-hidden"
          >
            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className="flex flex-col mb-2">
                {recentSearches.map((s, i) => (
                  <div 
                    key={i} 
                    onClick={() => { dispatch(setSearchQuery(s)); handleSearch(s); }}
                    className="flex items-center px-4 py-1.5 hover:bg-zinc-800 cursor-default"
                  >
                    <Clock size={18} className="text-zinc-400 mr-4" />
                    <span className="font-bold text-sm text-zinc-100 flex-1 truncate">{s}</span>
                    <button className="text-blue-500 text-xs hover:underline">Remove</button>
                  </div>
                ))}
              </div>
            )}

            {/* Autocomplete Suggestions */}
            {query && suggestions.map((s, i) => (
              <div 
                key={i} 
                onClick={() => { dispatch(setSearchQuery(s)); handleSearch(s); }}
                className="flex items-center px-4 py-1.5 hover:bg-zinc-800 cursor-default"
              >
                <SearchIcon size={18} className="text-zinc-400 mr-4" />
                <span className="font-bold text-sm text-zinc-100">{s}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
