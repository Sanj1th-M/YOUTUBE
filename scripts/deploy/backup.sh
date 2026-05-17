#!/bin/bash

# Database Backup Script
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./deploy/backups"
DB_CONTAINER="yt_db"
DB_USER="yt_user"
DB_NAME="youtube_db"

mkdir -p $BACKUP_DIR

echo "📦 Backing up database $DB_NAME..."

docker exec $DB_CONTAINER pg_dump -U $DB_USER $DB_NAME > $BACKUP_DIR/db_backup_$TIMESTAMP.sql

echo "✅ Backup completed: $BACKUP_DIR/db_backup_$TIMESTAMP.sql"

# Keep only the last 7 days of backups
find $BACKUP_DIR -name "*.sql" -type f -mtime +7 -delete
