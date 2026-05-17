import { useEffect, useRef } from 'react';

/**
 * Use Intersection Observer for lazy loading and visibility tracking.
 */
export const useIntersectionObserver = (callback: () => void, options = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '100px',
      ...options
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [callback, options]);

  return elementRef;
};
