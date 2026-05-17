import { Video } from '../../types';

/**
 * Performance Utilities
 * Includes feed rendering helpers and data processing.
 */

/**
 * Request Deduplication
 * Simple in-memory cache for ongoing requests to prevent duplicates.
 */
class RequestDeduplicator {
  private pendingRequests: Map<string, Promise<any>> = new Map();

  async execute(key: string, requestFn: () => Promise<any>) {
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }

    const promise = requestFn().finally(() => {
      this.pendingRequests.delete(key);
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }
}

export const requestDeduplicator = new RequestDeduplicator();

/**
 * Standardizes feed items for stable list rendering.
 */
export const prepareFeedItems = (videos: Video[]) => {
  return videos.map(video => ({
    ...video,
    // Add stable unique key if not present
    renderId: `${video.id}-${Math.random().toString(36).substr(2, 9)}`
  }));
};
