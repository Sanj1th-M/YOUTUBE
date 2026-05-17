import React, { memo } from 'react';

interface CategoryChipProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryChip: React.FC<CategoryChipProps> = memo(({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
        isActive 
          ? 'bg-white text-black' 
          : 'bg-zinc-800 text-white hover:bg-zinc-700'
      }`}
    >
      {label}
    </button>
  );
});

CategoryChip.displayName = 'CategoryChip';

export default CategoryChip;
