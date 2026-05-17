#!/bin/bash

# Production Environment Setup Script

echo "🛠️ Initializing production environment..."

# 1. Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating template .env file. PLEASE UPDATE SECRETS!"
    cat <<EOF > .env
NODE_ENV=production
JWT_SECRET=$(openssl rand -base64 32)
JWT_REFRESH_SECRET=$(openssl rand -base64 32)
POSTGRES_USER=yt_user
POSTGRES_PASSWORD=$(openssl rand -base64 12)
POSTGRES_DB=youtube_db
REDIS_URL=redis://cache:6379
EOF
fi

# 2. Create required directories
mkdir -p deploy/backups

echo "✅ Initialization complete. Review your .env file and run ./scripts/deploy/deploy.sh"
