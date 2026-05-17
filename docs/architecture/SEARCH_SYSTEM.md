# Search Engine Architecture

## Overview
Phase 7 implements a production-grade search system that mimics YouTube's speed and interactivity. It features a debounced autocomplete system, persistent search history, and normalized result models.

## Search Pipeline

### 1. Request Flow
`Frontend (Debounced)` -> `Backend API Gateway` -> `Search Service` -> `Piped Instance` -> `Normalization` -> `Response`

### 2. Normalization
All search results from external Piped instances are transformed into our internal `Video` model. This ensures consistency and frontend safety.

```typescript
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  channel: {
    id: string;
    name: string;
    thumbnail: string;
  };
  views: string;
  uploadedAt: string;
}
```

## Features

### 1. Autocomplete Suggestions
- Debounced frontend input (300ms).
- Backend abstraction of Piped's suggestion API.
- Secure query validation to prevent abuse.

### 2. Search History
- **Authenticated Users**: Searches are saved to the PostgreSQL `search_history` table.
- **Privacy**: Users can retrieve and clear their search history via protected endpoints.
- **Frontend**: Recently searched terms are displayed in the suggestion dropdown for quick access.

### 3. Scalable Infrastructure
- **Redis Integration**: Prepared architecture for caching popular search queries and trending suggestions.
- **Rate Limiting**: Applied to both search and suggestion endpoints to prevent scraping and abuse.

## Future Personalization
The architecture is prepared for Phase 8+ personalization:
- **Ranking**: Future integration of user watch history and preferences to boost relevant search results.
- **Contextual Suggestions**: Suggestions based on the user's current session or trending regional topics.
