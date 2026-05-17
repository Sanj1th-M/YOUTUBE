import React from 'react';
import { Search } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <div className="w-32 h-32 rounded-full bg-zinc-900 flex items-center justify-center">
        {icon || <Search size={64} className="text-zinc-700" />}
      </div>
      <div className="max-w-xs">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-zinc-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
