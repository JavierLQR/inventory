#!/bin/sh

echo "🚀 Pushing Prisma schema to DB..."
npx prisma db push

echo "✅ Starting NestJS app..."
node dist/main

echo "👋 Bye!"
