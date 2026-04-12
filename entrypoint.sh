#!/bin/sh

echo "Waiting for database..."
sleep 10

echo "Running migrations..."
npx prisma generate
npx prisma migrate deploy

echo "Starting app..."
node dist/src/main.js