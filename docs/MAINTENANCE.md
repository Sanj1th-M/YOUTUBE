# Long-Term Maintenance & Survivability Guide

## 🛠️ Overview
This guide provides the necessary procedures for maintaining the YOUTUBE platform and ensuring its survivability against third-party fluctuations.

## 🔄 Update Strategy
### 1. Dependency Updates
- Run `npm audit` weekly in both `/frontend` and `/backend`.
- Use `Dependabot` or `Snyk` to monitor and automate security patches.
- Prioritize updates for core libraries: `shaka-player`, `zod`, `argon2`, and `express`.

### 2. Provider Maintenance
- Monitor public Piped instances via the `/api/v1/monitoring/health/status` endpoint.
- If Piped becomes unstable, update the `VideoProviderInterface` to include alternative extractors (e.g., official APIs or NewPipe-based extractors) without changing the frontend logic.

## 🛡️ Survivability Procedures
### 1. Instance Blacklisting
- The `InstanceManager` automatically blacklists failing nodes for 30 minutes.
- If widespread outages occur, update the `PIPED_WHITELIST` in the production environment variables to include fresh, stable instances.

### 2. Emergency Kill-Switches
- Use the `FeatureFlagService` to disable resource-intensive features (e.g., complex recommendations or high-res downloads) during high-load or instability events.

## 📈 Monitoring & Operational Health
- **Daily**: Check backend JSON logs for unusual error patterns.
- **Weekly**: Review the `playback_failure` telemetry in the `MetricsService` to identify device-specific issues.
- **Monthly**: Verify database backup integrity by performing a trial restoration in a staging environment.

## 📦 Scale-Out Procedure
The backend is stateless. To scale:
1. Spin up additional `yt_backend` containers.
2. Update the Nginx `upstream backend_server` block to include the new container addresses.
3. Reload Nginx: `docker-compose exec nginx nginx -s reload`.

---
**MAINTAINABILITY STATUS: HIGH**
*Built for multi-year survivability.*
