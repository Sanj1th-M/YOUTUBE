import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { withSuspense } from './utils/lazyLoad';
import { FeedSkeleton, WatchSkeleton } from './components/skeletons/Loaders';
import GlobalPlayer from './GlobalPlayer';

// Lazy load pages with proper skeletons
const Home = withSuspense(lazy(() => import('./pages/Home')), <FeedSkeleton />);
const Search = withSuspense(lazy(() => import('./pages/Search')), <FeedSkeleton />);
const Watch = withSuspense(lazy(() => import('./pages/Watch')), <WatchSkeleton />);
const Profile = withSuspense(lazy(() => import('./pages/Profile')));
const History = withSuspense(lazy(() => import('./pages/History')), <FeedSkeleton />);
const Downloads = withSuspense(lazy(() => import('./pages/Downloads')), <FeedSkeleton />);
const Playlists = withSuspense(lazy(() => import('./pages/Playlists')), <FeedSkeleton />);
const Settings = withSuspense(lazy(() => import('./pages/Settings')));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalPlayer />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="watch/:id" element={<Watch />} />
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<History />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="playlists" element={<Playlists />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
