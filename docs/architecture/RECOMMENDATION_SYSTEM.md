# Recommendation Engine Foundation

## Overview
Phase 8 establishes the architectural foundation for a personalized, session-aware recommendation system. It uses a candidate-generation and ranking pipeline to deliver dynamic feeds.

## Architecture

### 1. Candidate Generation
Candidates are sourced from multiple layers:
- **Base Layer**: Trending videos and global popular content.
- **Personalization Layer**: User watch history and search behavior.
- **Contextual Layer**: Related videos for the currently viewed content.
- **Session Layer**: Topic-specific content based on the user's current session activity.

### 2. Modular Ranking Engine
The `ScoringEngine` applies weights to candidates based on:
- **Freshness**: Newer videos receive a higher base score.
- **Session Relevance**: Real-time boost for topics the user is currently exploring.
- **User Familiarity**: Boosting channels or categories the user has previously engaged with.
- **Exploration**: A controlled randomization factor (10-20%) to ensure feed diversity.

### 3. User Signal Pipeline
The system tracks granular user signals to build a high-fidelity profile for future ML upgrades:
- `watch_progress`: Completion percentage and watch duration.
- `search_click`: Which results users choose for specific queries.
- `home_click`: Engagement with recommended items.

## Scalability & Performance
- **Redis Caching**: Homepage feeds and candidate pools are cached to reduce backend latency.
- **Fallbacks**: If personalization fails, the system automatically falls back to a curated trending feed.
- **Async Tracking**: Signal logging is non-blocking to preserve API response times.

## Future AI Readiness
The architecture is decoupled to support future integrations with:
- Vector databases (e.g. Pinecone) for similarity search.
- Machine Learning models (e.g. TensorFlow/PyTorch) for neural ranking.
- Collaborative filtering for peer-based recommendations.
