import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Sidebar from '../components/navigation/Sidebar';
import BottomNav from '../components/navigation/BottomNav';
import MiniPlayer from '../components/player/MiniPlayer';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-red-600/30">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>
      <MiniPlayer />
      <BottomNav />
    </div>
  );
};

export default MainLayout;
