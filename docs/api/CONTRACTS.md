# API Abstraction Design

## Normalized Video Model
All external responses must be mapped to this structure.

```typescript
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string; // ISO 8601 or formatted
  views: string;
  channel: {
    id: string;
    name: string;
    thumbnail: string;
  };
  uploadedAt: string;
  type: 'video' | 'short' | 'stream';
}
```

## Internal API Endpoints

### 1. Home Feed
`GET /api/v1/home`
- **Description**: Returns the personalized or default home feed.
- **Query Params**: `page`, `limit`.

### 2. Search
`GET /api/v1/search`
- **Description**: Search for videos and channels.
- **Query Params**: `q`, `page`, `filter`.

### 3. Video Details
`GET /api/v1/video/:id`
- **Description**: Returns metadata for a specific video.

### 4. Related Videos
`GET /api/v1/video/:id/related`
- **Description**: Returns related videos for a given video ID.

### 5. Search Suggestions
`GET /api/v1/suggestions`
- **Query Params**: `q`.

## Response Format
```json
{
  "success": true,
  "data": {},
  "meta": {
    "page": 1,
    "total": 100
  },
  "error": null
}
```

## Error Format
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": []
  }
}
```
