# Offline Download & Storage Architecture

## Overview
Phase 9 establishes the architectural foundation for a YouTube-style offline download system. It supports resumable video and audio downloads, local metadata persistence, and secure file handling.

## Architecture

### 1. Download Pipeline
`Frontend (User Interaction)` -> `Backend (Init Download)` -> `Frontend Download Manager` -> `Chunked Streaming` -> `Local Storage (Capacitor/Filesystem)`

### 2. Normalized Storage
All downloaded media is stored in an organized local file structure:
- `/downloads/video/`: Video files (MP4/DASH chunks).
- `/downloads/audio/`: Audio-only files.
- `/downloads/metadata/`: Video metadata and JSON descriptors.
- `/downloads/thumbnails/`: Cached thumbnails for offline UI rendering.

## Features

### 1. Resumable Downloads
- **Chunk Tracking**: The system tracks downloaded bytes and total size, allowing downloads to resume after network loss or app restart.
- **Persistent State**: Download status (queued, downloading, paused, etc.) is synced between the local Redux state and the PostgreSQL backend.

### 2. Download Queue Manager
- Supports multiple concurrent downloads with configurable limits.
- Provides granular controls: **Pause**, **Resume**, **Retry**, and **Remove**.

### 3. Offline Metadata Persistence
- Metadata is stored locally to allow the app to render the `Downloads` page and provide basic video details without an internet connection.
- Expiring manifests are **never** stored permanently; only stable metadata and local file pointers.

## Security (SSDLC)
- **Path Validation**: Strict validation of local file paths to prevent arbitrary file access or traversal attacks.
- **Backend-Controlled Sources**: The frontend only downloads from URLs validated and provided by our Internal API Gateway.
- **Auth Protection**: Only authenticated users can manage and access their downloads.

## Future Enhancements
- **Offline Playback**: Integration with Shaka Player to serve local file URIs as media sources.
- **Metadata Encryption**: Future support for encrypted JSON metadata to protect user privacy.
- **Storage Quotas**: Tracking and limiting total storage usage per user.
