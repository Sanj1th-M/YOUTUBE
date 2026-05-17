import React from 'react';
import { Menu, Search, User, Youtube } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../store';
import SearchInput from '../search/SearchInput';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <nav className="h-14 px-4 flex items-center justify-between sticky top-0 bg-black z-50">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors hidden md:block"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-1 cursor-pointer">
          <Youtube className="text-red-600" size={30} fill="currentColor" />
          <span className="font-bold text-xl tracking-tighter">YOUTUBE</span>
        </div>
      </div>

      <SearchInput />

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-zinc-800 rounded-full md:hidden">
          <Search size={24} />
        </button>
        <button className="p-1 hover:bg-zinc-800 rounded-full transition-colors">
          <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
