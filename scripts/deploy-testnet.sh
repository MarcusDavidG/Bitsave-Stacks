#!/bin/bash

# BitSave Testnet Deployment Script
# This script deploys BitSave contracts to Stacks testnet

set -e

echo "🚀 Starting BitSave Testnet Deployment..."

# Check if clarinet is installed
if ! command -v clarinet &> /dev/null; then
    echo "❌ Clarinet not found. Please install clarinet first."
    exit 1
fi

# Check if testnet configuration exists
if [ ! -f "settings/Testnet.toml" ]; then
    echo "❌ Testnet configuration not found. Please set up settings/Testnet.toml"
    exit 1
fi

# Validate contracts
echo "📋 Validating contracts..."
clarinet check

# Run tests
echo "🧪 Running tests..."
npm test

# Deploy to testnet
echo "🌐 Deploying to testnet..."
clarinet deployments apply --testnet

# Set up badge minting authorization
echo "🏆 Setting up badge system..."
if [ -f "deployments/set-minter.testnet-plan.yaml" ]; then
    clarinet deployments apply -p deployments/set-minter.testnet-plan.yaml --testnet
fi

echo "✅ Testnet deployment completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Verify contracts on testnet explorer"
echo "2. Test contract functions manually"
echo "3. Update frontend with deployed contract addresses"
echo "4. Run integration tests"
echo ""
echo "🔗 Testnet Explorer: https://explorer.hiro.so/?chain=testnet"
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
<!-- update 12 -->
<!-- update 13 -->
<!-- update 14 -->
<!-- update 15 -->
<!-- update 16 -->
<!-- update 17 -->
<!-- update 18 -->
<!-- update 19 -->
<!-- update 20 -->
<!-- update 21 -->
<!-- update 22 -->
<!-- update 23 -->
<!-- update 24 -->
<!-- update 25 -->
<!-- update 26 -->
<!-- update 27 -->
<!-- update 28 -->
<!-- update 29 -->
<!-- update 30 -->
<!-- update 31 -->
