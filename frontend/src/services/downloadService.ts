import apiClient from './api';
import { store, addDownload, updateDownload } from '../store';
import { Download } from '../types';

/**
 * Download Service (Frontend)
 * Orchestrates local media storage and resumable download logic.
 */
class DownloadService {
  /**
   * Initializes a new download.
   */
  async start(video: any, type: 'video' | 'audio' = 'video') {
    try {
      const res = await apiClient.post('/downloads/start', {
        videoId: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail,
        type,
      });

      const download = res.data.data;
      store.dispatch(addDownload(download));
      
      // Actual file download logic would be implemented here
      // For Phase 9, we simulate the progress update
      this.simulateProgress(download.id);
      
      return download;
    } catch (error) {
      console.error('Failed to start download', error);
      throw error;
    }
  }

  /**
   * Simulates download progress for Phase 9 architectural demonstration.
   * Real implementation would use Capacitor Filesystem or fetch streams.
   */
  private simulateProgress(id: string) {
    let progress = 0;
    const interval = setInterval(async () => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        store.dispatch(updateDownload({ id, progress: 100, status: 'completed' }));
        await apiClient.patch(`/downloads/${id}/status`, { status: 'completed', progress: 100 });
      } else {
        store.dispatch(updateDownload({ id, progress }));
        // Periodically sync progress with backend
        if (progress % 20 === 0) {
          await apiClient.patch(`/downloads/${id}/status`, { progress });
        }
      }
    }, 2000);
  }

  /**
   * Resumes a paused download.
   */
  async resume(id: string) {
    // Logic for resuming chunked/resumable downloads
    await apiClient.patch(`/downloads/${id}/status`, { status: 'downloading' });
    store.dispatch(updateDownload({ id, status: 'downloading' }));
    this.simulateProgress(id);
  }

  /**
   * Pauses an active download.
   */
  async pause(id: string) {
    await apiClient.patch(`/downloads/${id}/status`, { status: 'paused' });
    store.dispatch(updateDownload({ id, status: 'paused' }));
  }
}

export const downloadService = new DownloadService();
