# User System & Authentication Architecture

## Overview
Phase 6 establishes a secure, production-grade user system with full support for authentication, session management, and activity tracking (history/playlists).

## Security Architecture (SSDLC)

### 1. Password Security
- **Algorithm**: Argon2 (industry standard, resistant to GPU/ASIC cracking).
- **Policy**: Minimum 8 characters, hashed with unique salt.
- **Storage**: Never stored in plain text.

### 2. JWT Session System
- **Access Tokens**: Short-lived (15 minutes), used for stateless authorization.
- **Refresh Tokens**: Long-lived (7 days), used for session persistence.
- **Rotation**: Refresh tokens are rotated on each use to prevent replay attacks.
- **Revocation**: Sessions can be revoked from the database to force logout across devices.

### 3. Authentication Flow
1. **Login**: User provides credentials. Backend verifies hash.
2. **Tokens**: Backend returns `accessToken` and `refreshToken`.
3. **Usage**: Frontend stores `accessToken` in memory and `refreshToken` in secure storage (or HttpOnly cookie in production).
4. **Interceptors**: Axios interceptors automatically handle 401 errors by calling `/auth/refresh`.

## Activity Tracking (Future Recommendations)

### 1. Watch History
Granular tracking of:
- `video_id`
- `duration_watched`
- `completion_percent`
- `last_watched_at`

### 2. Search History
Tracking user queries to personalize future search suggestions and home feed rankings.

### 3. Playlists
Foundation for "Watch Later" and custom user collections.

## Scalability
- **Database**: PostgreSQL with proper indexing on `user_id` and timestamps.
- **Statelessness**: JWTs allow the API to scale horizontally without session affinity.
