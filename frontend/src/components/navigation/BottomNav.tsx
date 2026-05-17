import React from 'react';
import { Home, Search, Download, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-zinc-800 flex items-center justify-around md:hidden z-50">
      <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-white' : 'text-zinc-400'}`}>
        <Home size={24} />
        <span className="text-[10px]">Home</span>
      </NavLink>
      <NavLink to="/search" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-white' : 'text-zinc-400'}`}>
        <Search size={24} />
        <span className="text-[10px]">Search</span>
      </NavLink>
      <NavLink to="/downloads" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-white' : 'text-zinc-400'}`}>
        <Download size={24} />
        <span className="text-[10px]">Downloads</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-white' : 'text-zinc-400'}`}>
        <User size={24} />
        <span className="text-[10px]">You</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
