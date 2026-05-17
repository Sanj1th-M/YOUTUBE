# YOUTUBE Platform Architecture - Phase 1

## Overview
A production-grade YouTube-style streaming platform built for long-term maintainability, security, and scalability.

## High-Level Flow
`Frontend App` -> `Internal API Gateway (Backend)` -> `Internal Services` -> `Public Piped Instances` -> `YouTube`

## Core Principles
1. **Frontend Isolation**: The frontend NEVER communicates with public Piped instances directly.
2. **Normalization**: All external data is transformed into internal models before reaching the frontend.
3. **Failover Resilience**: The system supports multi-instance management and automatic failover.
4. **SSDLC**: Security is integrated into every phase of development.

## Service Boundaries

### 1. Frontend (/frontend)
- **Role**: User Interface and interaction.
- **Stack**: React, Tailwind CSS, Capacitor (Mobile), Redux Toolkit (State Management).
- **Security**: Strictly consumes internal APIs, handles token-based auth, implements XSS protections.

### 2. Backend / API Gateway (/backend)
- **Role**: Orchestration, Authentication, Authorization, and Rate Limiting.
- **Stack**: Node.js, Express.js.
- **Responsibilities**: Route requests to internal services, normalize responses, enforce security policies.

### 3. Instance Manager (/instance-manager)
- **Role**: Discovery and health management of public Piped instances.
- **Responsibilities**: Health checks, benchmarking, load balancing across instances, blacklisting.

### 4. Recommendation Engine (/recommendation-engine)
- **Role**: Processing user signals to generate feeds.
- **Status**: Planning phase (Logic to be implemented in Phase 2).

### 5. Cache Service (/cache-service)
- **Role**: High-performance data retrieval using Redis.
- **Targets**: Metadata, search results, home feed.

### 6. Shared (/shared)
- **Role**: Common types, constants, and utilities used across services.

## Security Architecture
- **SSRF Protection**: Strict whitelist for Piped domains.
- **Input Validation**: All frontend input is treated as untrusted.
- **Rate Limiting**: Applied at the gateway level.
- **Secret Management**: Environment variables with no hardcoded secrets.
