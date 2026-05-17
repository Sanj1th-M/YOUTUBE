// @ts-ignore
import shaka from 'shaka-player/dist/shaka-player.ui.js';
import { store, setPlaying, updateTime, updateDuration, setBuffering, setPlayerError } from '../store';

import { monitoringService } from './monitoring/monitoringService';

/**
 * Player Service
 * Abstracts Shaka Player logic and provides a centralized playback controller.
 */
class PlayerService {
  private player: shaka.Player | null = null;
  private videoElement: HTMLVideoElement | null = null;

  init(videoElement: HTMLVideoElement) {
    if (this.player) return;

    this.videoElement = videoElement;
    this.player = new shaka.Player(videoElement);

    // Error handling
    this.player.addEventListener('error', (event: any) => {
      const error = event.detail;
      console.error('Shaka Player Error', error);
      store.dispatch(setPlayerError(error.message || 'Playback Error'));

      // TELEMETRY (PHASE 16 STABILIZATION)
      const currentVideo = store.getState().player.currentVideo;
      if (currentVideo) {
        monitoringService.trackPlaybackFailure(currentVideo.id, error);
      }
    });

    // Buffering states
    this.videoElement.addEventListener('waiting', () => store.dispatch(setBuffering(true)));
    this.videoElement.addEventListener('playing', () => store.dispatch(setBuffering(false)));
    
    // Time updates
    this.videoElement.addEventListener('timeupdate', () => {
      if (this.videoElement) {
        store.dispatch(updateTime(this.videoElement.currentTime));
      }
    });

    this.videoElement.addEventListener('durationchange', () => {
      if (this.videoElement) {
        store.dispatch(updateDuration(this.videoElement.duration));
      }
    });

    // MediaSession Integration
    this.setupMediaSession();
  }

  async load(manifestUrl: string) {
    if (!this.player) return;

    try {
      await this.player.load(manifestUrl);
      this.videoElement?.play();
      store.dispatch(setPlaying(true));
      this.updateMetadata();
    } catch (error) {
      console.error('Error loading manifest', error);
      store.dispatch(setPlayerError('Failed to load video stream'));
    }
  }

  play() {
    this.videoElement?.play();
    store.dispatch(setPlaying(true));
  }

  pause() {
    this.videoElement?.pause();
    store.dispatch(setPlaying(false));
  }

  seek(time: number) {
    if (this.videoElement) {
      this.videoElement.currentTime = time;
    }
  }

  setVolume(volume: number) {
    if (this.videoElement) {
      this.videoElement.volume = volume;
    }
  }

  setPlaybackRate(rate: number) {
    if (this.videoElement) {
      this.videoElement.playbackRate = rate;
    }
  }

  private setupMediaSession() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => this.play());
      navigator.mediaSession.setActionHandler('pause', () => this.pause());
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined) {
          this.seek(details.seekTime);
        }
      });
    }
  }

  private updateMetadata() {
    const video = store.getState().player.currentVideo;
    if (video && 'mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: video.title,
        artist: video.channel.name,
        artwork: [{ src: video.thumbnail, sizes: '512x512', type: 'image/jpeg' }]
      });
    }
  }

  destroy() {
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }
  }
}

export const playerService = new PlayerService();
