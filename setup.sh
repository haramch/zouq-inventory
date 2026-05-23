#!/bin/bash

echo "🚀 Inventory Management System - Setup Script"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📥 Please download and install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Navigate to backend
cd backend

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "📝 Creating .env from template..."
    cp .env.example .env
    echo ""
    echo "⚙️  Please edit backend/.env and add your MongoDB connection string"
    echo ""
    read -p "Press Enter after you've updated the .env file..."
fi

# Install dependencies
echo "📦 Installing backend dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "   1. Make sure your .env file has MongoDB connection string"
echo "   2. Run: npm start (from backend folder)"
echo "   3. Open frontend/index.html in your browser"
echo ""
echo "🔗 Backend will run on: http://localhost:5000"
echo "🔗 Frontend: Open frontend/index.html"
echo ""
