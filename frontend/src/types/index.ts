export interface Channel {
  id: string;
  name: string;
  thumbnail: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadedAt: string;
  channel: Channel;
  type: 'video' | 'short' | 'stream';
}

export interface UIState {
  isSidebarOpen: boolean;
  isMiniPlayerVisible: boolean;
  activeCategory: string;
}

export interface PlayerState {
  currentVideo: Video | null;
  isPlaying: boolean;
  isMinimized: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  isBuffering: boolean;
  isFullscreen: boolean;
  error: string | null;
}

export interface Download {
  id: string;
  videoId: string;
  title: string;
  thumbnailUrl: string;
  type: 'video' | 'audio';
  status: 'queued' | 'downloading' | 'paused' | 'completed' | 'failed';
  progress: number;
  totalBytes: number;
  downloadedBytes: number;
  filePath?: string;
  errorMessage?: string;
  createdAt: string;
}

export interface DownloadState {
  items: Download[];
  loading: boolean;
  error: string | null;
}
