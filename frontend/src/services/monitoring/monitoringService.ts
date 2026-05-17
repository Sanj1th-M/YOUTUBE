import apiClient from '../api';

/**
 * Frontend Monitoring Service
 * Features:
 * 1. Playback failure tracking
 * 2. Component error logging
 * 3. User feedback reporting preparation
 */
class MonitoringService {
  /**
   * Tracks a playback failure.
   */
  public async trackPlaybackFailure(videoId: string, error: any) {
    console.error(`[PLAYBACK_FAILURE] Video: ${videoId}`, error);
    
    return await this.logToBackend('playback_failure', {
      videoId,
      errorMessage: error.message || 'Unknown stream error',
      errorStack: error.stack,
    }, 'error');
  }

  /**
   * Tracks a UI rendering error.
   */
  public async trackUIError(componentName: string, error: any, info: any) {
    return await this.logToBackend('ui_error', {
      componentName,
      errorMessage: error.message,
      componentStack: info.componentStack,
    }, 'error');
  }

  /**
   * Internal helper to send logs to backend telemetry.
   */
  private async logToBackend(event: string, details: any, level: 'info' | 'warn' | 'error' = 'info') {
    try {
      await apiClient.post('/monitoring/telemetry/logs', {
        event,
        details,
        level,
      });
    } catch (err) {
      // Avoid infinite loop if logging fails
      console.warn('Failed to send telemetry log to backend', err);
    }
  }
}

export const monitoringService = new MonitoringService();
