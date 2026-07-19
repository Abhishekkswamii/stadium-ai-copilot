#!/bin/bash
set -e

echo "🔥 Stadium AI Copilot - Firebase Deployment Script"
echo "=================================================="
echo ""

# Check if billing is enabled
echo "📋 Step 1: Checking prerequisites..."
gcloud config set project stadium-ai-copilot-01

echo "⚡ Step 2: Enabling required APIs..."
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com || {
    echo "❌ ERROR: Billing not enabled!"
    echo ""
    echo "Please enable billing first:"
    echo "1. Go to https://console.firebase.google.com/project/stadium-ai-copilot-01/usage"
    echo "2. Click 'Modify plan' → Select 'Blaze (Pay as you go)'"
    echo "3. Link a billing account"
    echo "4. Run this script again"
    exit 1
}

echo "🚀 Step 3: Building and deploying to Cloud Run..."
gcloud run deploy stadium-ai-copilot \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --timeout 60s \
  --max-instances 10 \
  --min-instances 0 \
  --set-env-vars NODE_ENV=production

echo "✅ Cloud Run deployed successfully!"
echo ""
echo "⚠️  IMPORTANT: Set environment variables:"
echo "1. Go to https://console.cloud.google.com/run"
echo "2. Click 'stadium-ai-copilot'"
echo "3. Edit & Deploy New Revision"
echo "4. Add all environment variables from .env.local"
echo ""

read -p "Have you set environment variables? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Please set environment variables before continuing!"
    exit 1
fi

echo "🌐 Step 4: Deploying Firebase Hosting..."
firebase deploy --only hosting

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo "=================================================="
echo ""
echo "Your app is now live at:"
echo "  https://stadium-ai-copilot-01.web.app"
echo "  https://stadium-ai-copilot-01.firebaseapp.com"
echo ""
echo "Next steps:"
echo "1. Add these URLs to Firebase Auth authorized domains"
echo "2. Test the application"
echo "3. Monitor usage in Firebase Console"
echo ""
