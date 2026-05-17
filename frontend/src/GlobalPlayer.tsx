import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { playerService } from './services/playerService';

/**
 * Global Player Container
 * This component remains mounted across route changes to preserve the video element
 * and the Shaka Player instance.
 */
const GlobalPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { currentVideo } = useSelector((state: RootState) => state.player);

  useEffect(() => {
    if (videoRef.current) {
      playerService.init(videoRef.current);
    }
  }, []);

  // This hidden container keeps the video element alive
  return (
    <div className="hidden">
      <video ref={videoRef} playsInline />
    </div>
  );
};

export default GlobalPlayer;
