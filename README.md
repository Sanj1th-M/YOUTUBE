# YOUTUBE Platform - Production-Grade Streaming Foundation

## Project Status: FINAL RELEASE COMPLETE (Production-Ready)

The YOUTUBE platform is now fully architected, stabilized, and verified for production release. The system is designed for high survivability, modular scalability, and follows a strict Secure Software Development Lifecycle (SSDLC).

## Core Modules & Capabilities

| Module | Description | Location |
|---|---|---|
| **API Gateway** | Secure entry point with auth, rate-limiting, and normalization. | `/backend` |
| **Instance Manager** | Resilient discovery and health monitoring of Piped instances. | `/backend/src/instance-manager` |
| **Playback Engine** | Persistent media system with Shaka Player and MediaSession. | `/frontend/src/player` |
| **Rec Engine** | Modular candidate generation and weighted scoring system. | `/recommendation-engine` |
| **SSDLC Hardening** | SSRF prevention, XSS protection, and secure JWT rotation. | `/backend/src/security` |
| **DevSecOps** | Automated CI/CD, security scanning, and unit testing. | `/.github/workflows` |
| **Infrastructure** | Dockerized services with isolated networks and Nginx proxy. | `/docker`, `/nginx` |
| **Observability** | Structured JSON logging, health probes, and telemetry. | `/backend/src/monitoring` |

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker & Docker Compose
- PostgreSQL (v15+)
- Redis

### Environment Setup

1. Clone the repository.
2. Copy the environment template: `cp .env.example .env`.
3. Fill in the required secrets in `.env`.
4. Install dependencies: `npm install` (in root, backend, and frontend).

### Development Workflow

1. **Start Infrastructure**: `docker-compose up -d`
2. **Backend**: `cd backend && npm run dev`
3. **Frontend**: `cd frontend && npm run dev`

For detailed contribution guidelines, please see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Primary Architectural Pillars

1.  **High Survivability**: Multi-node Piped instance failover with proactive health monitoring.
2.  **Provider Abstraction**: Backend is provider-agnostic, ready to swap data sources without frontend changes.
3.  **Secure by Design**: Zero-trust model for external responses and strict Zod validation for all inputs.
4.  **Operational Resilience**: Self-healing container policies and automated database backups.

## Final Documentation Index

1. [Architectural Synthesis](./docs/FINAL_SYNTHESIS.md)
2. [Final Release Verification](./docs/release/final/RELEASE_CONFIRMATION.md)
3. [SSDLC & Security](./docs/security/SSDLC.md)
4. [Performance & Scalability](./docs/architecture/PERFORMANCE.md)
5. [CI/CD & DevOps Pipeline](./docs/devops/PIPELINE.md)
6. [Infrastructure & Networking](./docs/infrastructure/ARCHITECTURE.md)
7. [Operational Monitoring](./docs/operations/MONITORING.md)
8. [Maintainability & Survivability](./docs/MAINTENANCE.md)

---

**The YOUTUBE platform is ready for production deployment.**
*Delivered by Gemini CLI - Final Release Phase.*
