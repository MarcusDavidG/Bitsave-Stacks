#!/bin/bash

# Quick start script
echo "🚀 BitSave Quick Start"
echo ""

# Check dependencies
echo "Checking dependencies..."
command -v clarinet >/dev/null 2>&1 || { echo "❌ Clarinet not installed"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm not installed"; exit 1; }

echo "✅ Dependencies OK"
echo ""

# Install packages
echo "Installing packages..."
npm install

# Check contracts
echo "Checking contracts..."
clarinet check

# Run tests
echo "Running tests..."
npm test

echo ""
echo "✅ Setup complete!"
<!-- update 1 -->
<!-- update 2 -->
<!-- update 3 -->
<!-- update 4 -->
<!-- update 5 -->
<!-- update 6 -->
<!-- update 7 -->
<!-- update 8 -->
<!-- update 9 -->
<!-- update 10 -->
<!-- update 11 -->
