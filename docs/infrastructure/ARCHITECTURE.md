# Infrastructure & Monitoring Architecture

## Overview
Phase 13 establishes a production-ready foundation using Docker and Nginx. The architecture focuses on isolation, security, and scalability.

## Deployment Architecture

### 1. Containerization
All services are containerized using **Docker**:
- `yt_proxy`: Nginx reverse proxy (The only public entry point).
- `yt_frontend`: Nginx serving the static React build.
- `yt_backend`: Node.js API service.
- `yt_db`: PostgreSQL 15 for persistent data.
- `yt_cache`: Redis 7 for high-performance caching.

### 2. Network Isolation
Two internal networks are used:
- `proxy_net`: Connects `yt_proxy` to `yt_frontend` and `yt_backend`.
- `data_net`: Connects `yt_backend` to `yt_db` and `yt_cache`. (Marked as `internal` to block outbound traffic from data services).

### 3. Reverse Proxy (Nginx)
The central proxy handles:
- **Routing**: `/` to frontend, `/api/` to backend.
- **Security Headers**: HSTS, CSP, X-Frame-Options, etc.
- **Health Checks**: `/health` for basic proxy status.

## Monitoring Strategy

### 1. Health Checks
- **Backend Liveness**: `/api/v1/health/health` (Checks if process is running).
- **Backend Readiness**: `/api/v1/health/ready` (Checks DB and Redis connectivity).
- **Docker Healthchecks**: Configured in `docker-compose.yml` for automatic recovery.

### 2. Logging
- **Standardized Logs**: Services log to stdout/stderr in JSON-ready formats.
- **Docker Log Rotation**: Configured in Docker daemon (recommended) or via Compose (future update).

### 3. Failover & Scalability
- **Restart Policy**: `always` ensures containers recover from crashes.
- **Horizontal Scaling**: Backend is designed to be stateless, allowing multiple replicas behind Nginx (via `upstream` config).

## Storage & Backups
- **PostgreSQL**: Uses a named volume `postgres_data` for persistence.
- **Redis**: Uses `redis_data` volume.
- **Backup Plan**: Use `pg_dump` on the `yt_db` container for automated daily backups (to be scripted in next sub-phase).

## SSDLC Compliance
- **Least Privilege**: Services run on isolated networks.
- **Secrets Management**: No hardcoded secrets; all credentials injected via environment variables.
- **Minimal Surface**: Only ports 80/443 are exposed publicly.
