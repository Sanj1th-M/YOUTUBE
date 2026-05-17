import React from 'react';
import { Home, History, Download, PlaySquare, Settings, Clock } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { NavLink } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Sidebar: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Clock, label: 'History', path: '/history' },
    { icon: Download, label: 'Downloads', path: '/downloads' },
    { icon: PlaySquare, label: 'Playlists', path: '/playlists' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside 
      className={cn(
        "hidden md:flex flex-col sticky top-14 h-[calc(100vh-56px)] bg-black transition-all duration-300 overflow-y-auto",
        isOpen ? "w-64 px-3" : "w-[72px] px-1"
      )}
    >
      <div className="flex flex-col gap-1 py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-5 p-3 rounded-lg hover:bg-zinc-800 transition-colors",
              isActive ? "bg-zinc-800 font-medium" : "bg-transparent",
              !isOpen && "flex-col gap-1 px-1 justify-center"
            )}
          >
            <item.icon size={24} />
            <span className={cn("text-sm", !isOpen && "text-[10px] truncate w-full text-center")}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
      
      <div className="mt-auto border-t border-zinc-800 py-3">
        {bottomItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={cn(
              "flex items-center gap-5 p-3 rounded-lg hover:bg-zinc-800 transition-colors",
              !isOpen && "flex-col gap-1 px-1 justify-center"
            )}
          >
            <item.icon size={24} />
            <span className={cn("text-sm", !isOpen && "text-[10px] truncate w-full text-center")}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
