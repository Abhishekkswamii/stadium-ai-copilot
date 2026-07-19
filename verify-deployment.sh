#!/bin/bash

# Stadium AI Copilot - Deployment Verification Script
# Run this to verify your deployment is working

echo "🔍 Stadium AI Copilot - Deployment Verification"
echo "================================================"
echo ""

# Check Firebase Hosting
echo "1️⃣ Testing Firebase Hosting..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://stadium-ai-copilot-01.web.app)
if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Firebase Hosting: LIVE (HTTP $HTTP_CODE)"
else
    echo "   ❌ Firebase Hosting: FAILED (HTTP $HTTP_CODE)"
fi
echo ""

# Check Cloud Run Service
echo "2️⃣ Testing Cloud Run Service..."
CLOUD_RUN_URL=$(gcloud run services describe stadium-ai-copilot --region us-central1 --format="value(status.url)" 2>/dev/null)
if [ -n "$CLOUD_RUN_URL" ]; then
    echo "   ✅ Cloud Run URL: $CLOUD_RUN_URL"
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$CLOUD_RUN_URL")
    if [ "$HTTP_CODE" = "200" ]; then
        echo "   ✅ Cloud Run Service: LIVE (HTTP $HTTP_CODE)"
    else
        echo "   ❌ Cloud Run Service: FAILED (HTTP $HTTP_CODE)"
    fi
else
    echo "   ❌ Cloud Run: Service not found"
fi
echo ""

# Check Environment Variables
echo "3️⃣ Checking Environment Variables..."
ENV_COUNT=$(gcloud run services describe stadium-ai-copilot --region us-central1 --format="yaml(spec.template.spec.containers[0].env)" 2>/dev/null | grep -c "name:")
if [ "$ENV_COUNT" -ge 8 ]; then
    echo "   ✅ Environment Variables: $ENV_COUNT variables configured"
else
    echo "   ⚠️  Environment Variables: Only $ENV_COUNT variables found (expected 8+)"
fi
echo ""

# Check if GEMINI_API_KEY is set
GEMINI_SET=$(gcloud run services describe stadium-ai-copilot --region us-central1 --format="yaml(spec.template.spec.containers[0].env)" 2>/dev/null | grep -c "GEMINI_API_KEY")
if [ "$GEMINI_SET" -gt 0 ]; then
    echo "   ✅ GEMINI_API_KEY: Configured"
else
    echo "   ❌ GEMINI_API_KEY: NOT SET"
fi
echo ""

# Check if Firebase Service Account Secret is mounted
SECRET_SET=$(gcloud run services describe stadium-ai-copilot --region us-central1 --format="yaml(spec.template.spec.containers[0].env)" 2>/dev/null | grep -c "firebase-service-account")
if [ "$SECRET_SET" -gt 0 ]; then
    echo "   ✅ FIREBASE_SERVICE_ACCOUNT_B64: Configured (from Secret Manager)"
else
    echo "   ❌ FIREBASE_SERVICE_ACCOUNT_B64: NOT SET"
fi
echo ""

# Check Page Title
echo "4️⃣ Testing Landing Page Content..."
TITLE=$(curl -sL https://stadium-ai-copilot-01.web.app 2>&1 | grep -o '<title>[^<]*</title>' | sed 's/<title>//; s/<\/title>//')
if [ -n "$TITLE" ]; then
    echo "   ✅ Page Title: $TITLE"
else
    echo "   ⚠️  Could not fetch page title"
fi
echo ""

# Summary
echo "================================================"
echo "📊 DEPLOYMENT STATUS SUMMARY"
echo "================================================"
echo ""
echo "Primary URL: https://stadium-ai-copilot-01.web.app"
echo "Cloud Run URL: $CLOUD_RUN_URL"
echo ""
echo "⚠️  MANUAL STEPS REQUIRED:"
echo "   1. Add Firebase Auth Authorized Domains"
echo "      → https://console.firebase.google.com/project/stadium-ai-copilot-01/authentication/settings"
echo ""
echo "   2. Set Budget Alert (₹2000/month)"
echo "      → https://console.cloud.google.com/billing/budgets?project=stadium-ai-copilot-01"
echo ""
echo "📖 Full instructions: see DEPLOYMENT_COMPLETE.md"
echo ""
