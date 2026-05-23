@echo off
REM ============================================
REM Inventory Management System - Dev Start
REM ============================================

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║   🚀 Inventory Management System - Development Mode        ║
echo ║                                                            ║
echo ║   Starting Backend Server on port 5000...                 ║
echo ║   Frontend will be available at: http://localhost:5000    ║
echo ║                                                            ║
echo ║   Default Login:                                           ║
echo ║   Username: admin                                         ║
echo ║   Password: admin123                                      ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed or not in PATH
    echo 📥 Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed
node --version
echo.

REM Navigate to backend directory
cd backend

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed
    echo.
)

REM Start the server
echo 🔥 Starting server...
echo.
call npm start

REM If npm start fails
if errorlevel 1 (
    echo ❌ Failed to start server
    pause
    exit /b 1
)

pause
