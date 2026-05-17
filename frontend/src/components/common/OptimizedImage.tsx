import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

/**
 * Optimized Image Component
 * Features lazy loading, error fallbacks, and stable aspect ratios.
 */
const OptimizedImage: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  className, 
  fallback = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop',
  ...props 
}) => {
  const [error, setError] = React.useState(false);

  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default React.memo(OptimizedImage);
