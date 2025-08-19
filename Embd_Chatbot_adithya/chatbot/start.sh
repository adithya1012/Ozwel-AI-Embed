#!/bin/bash

# Medical AI Chatbot Startup Script

echo "🏥 Starting Medical AI Chatbot Server..."
echo "======================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    
    # Try npm install first
    if ! npm install; then
        echo "⚠️  npm install failed, trying to fix cache issues..."
        echo "🧹 Cleaning npm cache..."
        npm cache clean --force
        
        echo "🔄 Retrying npm install..."
        npm install --no-optional --legacy-peer-deps
    fi
fi

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

# Start the server
echo "🚀 Starting server..."
npm start
