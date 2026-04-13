#!/bin/sh

npx prisma generate
echo "Running migrations..."

until npx prisma migrate deploy; do
  echo "Migration failed, retrying in 3s..."
  sleep 3
done

echo "Starting app..."
node dist/src/main.js