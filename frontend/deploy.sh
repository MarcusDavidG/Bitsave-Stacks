#!/bin/bash

# BitSave Frontend Deployment Script
# This script helps deploy the BitSave frontend to Vercel

set -e

echo "🚀 BitSave Frontend Deployment Script"
echo "======================================"

# Check if we're in the frontend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the frontend directory"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build and test locally first
echo "🔨 Building project locally..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Local build successful!"
else
    echo "❌ Local build failed. Please fix errors before deploying."
    exit 1
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."

# Check if this is the first deployment
if [ ! -f ".vercel/project.json" ]; then
    echo "🆕 First time deployment detected"
    echo "Please follow the prompts to configure your project:"
    vercel --prod
else
    echo "🔄 Deploying to existing project..."
    vercel --prod
fi

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your BitSave frontend is now live!"
echo ""
echo "Next steps:"
echo "1. Test your deployment thoroughly"
echo "2. Update any environment variables if needed"
echo "3. Configure custom domain (optional)"
echo ""
echo "Useful commands:"
echo "- vercel --prod    # Deploy to production"
echo "- vercel dev       # Run local development with Vercel"
echo "- vercel logs      # View deployment logs"
echo "- vercel domains   # Manage custom domains"
