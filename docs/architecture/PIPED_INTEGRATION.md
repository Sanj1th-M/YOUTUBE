# Public Piped Integration Strategy

## Overview
The platform leverages public Piped instances as a data source and proxy to YouTube. To ensure reliability, we implement a multi-instance management strategy.

## Instance Management Architecture

### 1. Instance Registry
- A curated list of high-quality public Piped instances.
- Stored in the database and cached in Redis.

### 2. Instance Manager Service Responsibilities
- **Discovery**: Automatically fetch and validate new instances from official sources.
- **Benchmarking**: Periodically test latency (ping) and reliability (success rate).
- **Health Validation**: Check if the `/health` or `/instances` endpoints are responsive.
- **Failover Logic**: If an instance fails a request, automatically rotate to the next healthiest instance in the pool.
- **Blacklisting**: Temporarily or permanently remove instances that return 403 (Rate Limited) or 5xx errors frequently.

## Internal Model Mapping
The Instance Manager is responsible for normalizing various Piped versions into our internal API contract.

## Instance Selection Algorithm
1. Filter by `healthy: true`.
2. Sort by `latency` (ascending).
3. Use weighted random or round-robin among the top 3 instances to avoid overloading a single one.

## Security Controls
- **Domain Whitelisting**: The Backend only allows requests to a hardcoded or managed list of Piped domains.
- **Header Stripping**: Remove sensitive user headers before forwarding requests to Piped.
- **User-Agent Rotation**: Use generic user-agents to avoid fingerprinting.
