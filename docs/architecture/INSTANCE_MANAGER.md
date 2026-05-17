# Instance Manager Documentation

## Overview
The Instance Manager is a resilient infrastructure component responsible for managing public Piped instances. It ensures the platform remains stable even when individual public servers fail.

## Core Components

### 1. Discovery Service
Fetches the official list of Piped instances from `https://piped.video/instances.json`. It normalizes the data and prepares it for health monitoring.

### 2. Health Service
Performs periodic health checks (every 5 minutes by default) on all discovered instances. It measures:
- **Availability**: Is the `/health` endpoint responsive?
- **Latency**: How fast is the response?
- **Stability**: Does the instance return valid data for search and metadata?

### 3. Scoring System
Instances are ranked based on a composite score:
- **Latency**: Lower latency results in a higher score.
- **Stability**: Fewer failures result in a higher score.
- **Healthy Status**: Unhealthy instances receive a score of 0.

### 4. Blacklist System
Instances that fail consecutively (default: 3 times) are temporarily moved to a blacklist for 30 minutes. This prevents the system from wasting requests on known-broken servers.

### 5. Routing Service
Provides a centralized method `getBestInstance()` for other services. It returns the highest-ranked, non-blacklisted instance currently available.

## Failover & Survivability
- **Automatic Failover**: If the current "best" instance fails, the next request will automatically pick the next best one.
- **SSRF Protection**: Outbound requests are managed via a `RequestLayer` that enforces HTTPS and timeout limits.
- **Redis Integration**: Active instance states and scores are cached in Redis for fast access.

## Configuration
Controlled via environment variables:
- `INSTANCE_CHECK_INTERVAL_MS`: Frequency of health checks.
- `INSTANCE_TIMEOUT_MS`: Timeout for outbound requests to instances.
- `MAX_FAILURE_COUNT`: Failures before blacklisting.
- `BLACKLIST_DURATION_MS`: Duration of temporary suspension.
