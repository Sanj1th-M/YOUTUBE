# DevSecOps & CI/CD Pipeline Architecture

## Overview
Phase 12 establishes a professional DevSecOps foundation using GitHub Actions for automation, ensuring that every code change is validated for quality, security, and functionality before deployment.

## Pipeline Components

### 1. Continuous Integration (CI)
Located in `.github/workflows/ci.yml`.
- **Linting**: ESLint checks for backend and frontend.
- **Type Checking**: TypeScript validation for frontend.
- **Automated Testing**: Jest for backend, Vitest for frontend.
- **Strict Failure**: Pipeline fails if any check or test fails.

### 2. Continuous Security (Sec)
Located in `.github/workflows/security.yml`.
- **Dependency Audit**: `npm audit` to detect high/critical vulnerabilities.
- **Static Analysis (SAST)**: Semgrep scanning for secure coding patterns and common vulnerabilities (pre-configured).
- **Daily Scans**: Security audits run daily on the `main` branch.

### 3. Release & Packaging
Located in `.github/workflows/release.yml`.
- **Semantic Tagging**: Triggered on `v*` tags.
- **Build Artifacts**: Generates tarballs for backend and frontend-dist.
- **GitHub Releases**: Automatically creates releases with generated notes.

## Deployment Preparation

### Containerization
Located in `/docker/`.
- **Backend**: Multi-stage alpine-based Dockerfile for minimal image size.
- **Frontend**: Multi-stage build served via Nginx.
- **SSDLC Ready**: Minimal base images reduce the attack surface.

### Environment Management
- **GitHub Secrets**: Deployment pipelines are prepared to use encrypted secrets (e.g., `JWT_SECRET`, `DATABASE_URL`).
- **Environment Separation**: Separation of `develop` and `main` branches maps to `staging` and `production` logic.

## Security Gates
1. **Critical Vulns**: Block build if `npm audit` finds HIGH/CRITICAL issues.
2. **SAST Failures**: Semgrep errors block the merge.
3. **Test Coverage**: (Future) Enforce minimum coverage percentages.
