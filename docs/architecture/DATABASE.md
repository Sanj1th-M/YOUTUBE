# Database Schema Design

## PostgreSQL (Primary Data)

### users
- `id`: UUID (Primary Key)
- `email`: VARCHAR(255) (Unique)
- `password_hash`: TEXT
- `username`: VARCHAR(50)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### watch_history
- `id`: BIGSERIAL
- `user_id`: UUID (FK -> users.id)
- `video_id`: VARCHAR(50)
- `watched_at`: TIMESTAMP
- `progress_seconds`: INTEGER

### search_history
- `id`: BIGSERIAL
- `user_id`: UUID (FK -> users.id)
- `query`: TEXT
- `searched_at`: TIMESTAMP

### playlists
- `id`: UUID
- `user_id`: UUID (FK -> users.id)
- `title`: VARCHAR(255)
- `is_public`: BOOLEAN
- `created_at`: TIMESTAMP

### playlist_items
- `id`: BIGSERIAL
- `playlist_id`: UUID (FK -> playlists.id)
- `video_id`: VARCHAR(50)
- `added_at`: TIMESTAMP
- `position`: INTEGER

### sessions
- `id`: TEXT (Primary Key)
- `user_id`: UUID (FK -> users.id)
- `expires_at`: TIMESTAMP
- `data`: JSONB

### recommendation_signals
- `id`: BIGSERIAL
- `user_id`: UUID
- `event_type`: VARCHAR(50) (e.g., 'click', 'like', 'watch_complete')
- `video_id`: VARCHAR(50)
- `timestamp`: TIMESTAMP

## Redis (Caching)

### Cache Targets
1. **Home Feed**: `cache:home:v1` (TTL: 10 mins)
2. **Search Results**: `cache:search:{query}` (TTL: 30 mins)
3. **Video Metadata**: `cache:video:{id}` (TTL: 1 hour)
4. **Instance Health**: `status:instances` (TTL: 1 min)
