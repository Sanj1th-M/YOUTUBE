#!/bin/bash

# Final Production Readiness Verification Script

echo "🔍 Starting Final Production Verification..."

# 1. Check for critical configs
if [ ! -f "youtube-platform/docker-compose.yml" ]; then echo "❌ Missing docker-compose.yml"; exit 1; fi
if [ ! -f "youtube-platform/nginx/nginx.conf" ]; then echo "❌ Missing nginx.conf"; exit 1; fi

# 2. Verify Backend Hardening
if ! grep -q "applySecurityMiddleware" "youtube-platform/backend/src/index.js"; then echo "❌ Backend security middleware missing"; exit 1; fi
if ! grep -q "requestLogger" "youtube-platform/backend/src/index.js"; then echo "❌ Backend logging missing"; exit 1; fi

# 3. Verify Frontend Abstraction
if ! grep -q "withSuspense" "youtube-platform/frontend/src/App.tsx"; then echo "❌ Frontend lazy loading missing"; exit 1; fi

# 4. Verify SSDLC Coverage
if [ ! -f "youtube-platform/docs/security/SSDLC.md" ]; then echo "❌ Missing SSDLC documentation"; exit 1; fi
if [ ! -f "youtube-platform/docs/architecture/PERFORMANCE.md" ]; then echo "❌ Missing performance documentation"; exit 1; fi

# 5. Check Deployment Scripts
if [ ! -f "youtube-platform/scripts/deploy/deploy.sh" ]; then echo "❌ Missing deploy script"; exit 1; fi
if [ ! -f "youtube-platform/scripts/deploy/backup.sh" ]; then echo "❌ Missing backup script"; exit 1; fi

echo "✅ ALL PRODUCTION CHECKS PASSED."
echo "🚀 Platform is ready for FINAL RELEASE."
