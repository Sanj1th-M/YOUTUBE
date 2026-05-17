import React from 'react';
import { User, Clock, Download, PlaySquare, Settings, ChevronRight } from 'lucide-react';
import Button from '../components/common/Button';

const Profile: React.FC = () => {
  const sections = [
    { icon: Clock, label: 'History', path: '/history' },
    { icon: PlaySquare, label: 'Playlists', path: '/playlists' },
    { icon: Download, label: 'Downloads', path: '/downloads' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="p-4 flex flex-col gap-8 pb-20">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center">
          <User size={48} className="text-zinc-500" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Guest User</h1>
          <p className="text-zinc-400 text-sm">@guest_user</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">Google Account</Button>
          <Button variant="secondary" size="sm">Switch account</Button>
        </div>
      </div>

      {/* Mobile Shortcuts */}
      <div className="flex flex-col border-t border-zinc-800">
        {sections.map((item) => (
          <div key={item.label} className="flex items-center justify-between p-4 active:bg-zinc-900 transition-colors">
            <div className="flex items-center gap-4">
              <item.icon size={24} className="text-zinc-300" />
              <span className="text-base font-medium">{item.label}</span>
            </div>
            <ChevronRight size={20} className="text-zinc-500" />
          </div>
        ))}
      </div>

      {/* Sign In CTA */}
      <div className="bg-zinc-900 rounded-2xl p-6 flex flex-col gap-4 items-center text-center">
        <h3 className="font-bold text-lg">Sign in to do more</h3>
        <p className="text-sm text-zinc-400">Like videos, create playlists, and see your history across all devices.</p>
        <Button variant="primary" className="w-full max-w-[200px]">Sign in</Button>
      </div>
    </div>
  );
};

export default Profile;
