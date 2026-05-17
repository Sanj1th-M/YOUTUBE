#!/bin/bash

# Simple deployment script for Docker Compose environment

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

echo "🚀 Starting deployment of YOUTUBE platform..."

# 1. Build and start containers in detached mode
docker-compose up -d --build

# 2. Run database migrations (future phase)
# docker-compose exec backend npm run migrate

# 3. Prune old images to save space
docker image prune -f

echo "✅ Deployment complete. System is running."
echo "🔗 Access via: http://localhost"
