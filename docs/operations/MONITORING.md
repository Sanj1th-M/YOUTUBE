# Operational Monitoring & Resilience (Phase 14)

## Overview
Phase 14 establishes a robust monitoring and logging foundation to ensure high availability, quick failure detection, and operational resilience for the YOUTUBE platform.

## Monitoring Architecture

### 1. Structured Logging
- **Unified Logger**: Winston-based structured JSON logging for production.
- **Data Privacy**: Automatic scrubbing of sensitive keys (passwords, tokens, secrets) from all logs.
- **Request Logging**: Middleware tracks timing, status, and metadata for every API call.

### 2. Health Monitoring
Located under `/api/v1/monitoring/health`:
- `/health`: Liveness probe (Server process status).
- `/ready`: Readiness probe (Validates DB and Redis connectivity).
- `/status`: Internal dashboard endpoint (Uptime and metrics).

### 3. Service Observability (Metrics)
The `MetricsService` tracks:
- **API Throughput**: Success/Failure rates per endpoint.
- **External Failures**: Timeout and error frequency for Piped instances.
- **Playback Reliability**: Frontend telemetry for buffering and stream errors.
- **Cache Efficiency**: Hit/Miss/Failure ratios.

## Failure Detection & Alerting

### 1. Failure Categories
- **Critical**: DB downtime, Backend crashes, Security breaches.
- **Warning**: High Piped instance failure rate, Cache downtime, Slow API responses.

### 2. Alert Preparation
The `AlertService` is prepared to route critical events to:
- **Phase 14**: Structured high-visibility logs.
- **Future**: Integration with Slack, Email, and PagerDuty.

## Operational Resilience

### 1. Frontend Recovery
- **Security Error Boundary**: Prevents total app crashes and reports rendering failures to backend telemetry.
- **Playback Retries**: Shaka Player integration (Phase 4) combined with health-aware node rotation (Phase 2).

### 2. Incident Response
- **Log ID Tracking**: Every security event and error has a unique ID for cross-referencing frontend/backend logs.
- **Recovery Flows**: Standardized procedures for database restoration and cache purging.

## Monitoring Security
- **Access Control**: Health endpoints are internal-facing or restricted.
- **Sanitization**: External logs are sanitized before ingestion.
- **No Secrets**: Environment-aware logging ensures secrets are NEVER written to disk or stdout.
