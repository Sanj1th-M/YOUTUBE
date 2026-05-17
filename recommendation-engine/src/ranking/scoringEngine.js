/**
 * Scoring Engine
 * Modular ranking logic based on multiple weighted signals.
 */
class ScoringEngine {
  constructor() {
    this.weights = {
      watchTime: 0.4,
      freshness: 0.2,
      sessionRelevance: 0.3,
      exploration: 0.1,
    };
  }

  /**
   * Calculates a combined score for a single candidate.
   */
  calculateScore(video, context) {
    let score = 0;

    // 1. Freshness (Newer videos get higher base score)
    const ageInHours = (Date.now() - new Date(video.uploadedAt).getTime()) / (1000 * 60 * 60);
    const freshnessScore = Math.max(0, 100 - ageInHours); 
    score += freshnessScore * this.weights.freshness;

    // 2. Session Relevance (Match current category/topic)
    if (context.sessionContext && video.title.toLowerCase().includes(context.sessionContext.toLowerCase())) {
      score += 100 * this.weights.sessionRelevance;
    }

    // 3. Watch Time Signal (Future implementation - how long users watch this video)
    // score += video.averageWatchTime * this.weights.watchTime;

    // 4. Random Exploration Factor (Adds diversity)
    const explorationScore = Math.random() * 50;
    score += explorationScore * this.weights.exploration;

    return score;
  }

  /**
   * Ranks a list of candidates and sorts them by score.
   */
  rank(candidates, context) {
    return candidates
      .map(video => ({
        ...video,
        score: this.calculateScore(video, context)
      }))
      .sort((a, b) => b.score - a.score);
  }
}

module.exports = new ScoringEngine();
