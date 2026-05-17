import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, Info, Keyboard } from 'lucide-react';

const Settings: React.FC = () => {
  const settingsGroups = [
    {
      title: 'App settings',
      items: [
        { icon: Bell, label: 'Notifications', description: 'Choose when and how to be notified' },
        { icon: Shield, label: 'Privacy', description: 'Manage your visibility and data' },
      ]
    },
    {
      title: 'Help & feedback',
      items: [
        { icon: Info, label: 'About', description: 'Version 1.0.0 (Phase 2)' },
        { icon: Keyboard, label: 'Keyboard shortcuts', description: 'View available shortcuts' },
      ]
    }
  ];

  return (
    <div className="max-w-[800px] mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <SettingsIcon size={28} /> Settings
      </h1>

      <div className="flex flex-col gap-8">
        {settingsGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-2">
            <h2 className="text-sm font-bold text-zinc-400 px-4 uppercase tracking-wider">{group.title}</h2>
            <div className="flex flex-col bg-zinc-900/50 rounded-2xl overflow-hidden">
              {group.items.map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-4 hover:bg-zinc-800 transition-colors cursor-pointer border-b border-zinc-800 last:border-none">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 text-zinc-300">
                    <item.icon size={22} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs text-zinc-400">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
