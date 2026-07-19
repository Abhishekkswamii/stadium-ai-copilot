# 🔥 Firebase Complete Deployment - Step by Step Instructions

## ⚠️ IMPORTANT: Billing Required

Cloud Run requires a **billing account** to be linked to your Firebase project.

### **Cost Estimate**: $5-25/month
- Cloud Run: ~$5-20/month (based on traffic)
- Gemini API: ~$0.10-2/month
- Firestore/Auth: Free tier covers most usage

---

## 📋 PREREQUISITES

✅ **Already Done:**
- [x] Firebase project created (stadium-ai-copilot-01)
- [x] Firestore database seeded
- [x] Firebase Auth enabled
- [x] Gemini API key ready
- [x] Firebase CLI installed (v15.24.0)
- [x] gcloud CLI installed (v576.0.0)

❌ **Action Required:**
- [ ] **Enable billing on Firebase project**

---

## 🚀 STEP 1: Enable Billing (YOU MUST DO THIS)

### Option A: Via Firebase Console (Recommended)

1. Go to https://console.firebase.google.com/project/stadium-ai-copilot-01
2. Click the ⚙️ gear icon → **Project settings**
3. Click **Usage and billing** tab
4. Click **Modify plan**
5. Select **Blaze (Pay as you go)**
6. Link a billing account or create a new one
7. **Set a budget alert** (recommended: $25/month)

### Option B: Via Google Cloud Console

1. Go to https://console.cloud.google.com/billing
2. Link project `stadium-ai-copilot-01` to a billing account
3. Enable Cloud Run API
4. Enable Cloud Build API

---

## 🚀 STEP 2: Deploy to Cloud Run

Once billing is enabled, run these commands:

```bash
# Navigate to project directory
cd "Stadium AI Copilot"

# Set Firebase project
gcloud config set project stadium-ai-copilot-01

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# Build and deploy to Cloud Run
gcloud run deploy stadium-ai-copilot \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --timeout 60s \
  --max-instances 10 \
  --set-env-vars NODE_ENV=production
```

**This will:**
- Build Docker container from Dockerfile
- Push to Google Container Registry
- Deploy to Cloud Run
- Give you a URL like: `https://stadium-ai-copilot-xxx-uc.a.run.app`

---

## 🚀 STEP 3: Set Environment Variables in Cloud Run

After initial deployment, add secrets:

```bash
# Get your Cloud Run service name
gcloud run services list --platform managed --region us-central1

# Update with environment variables
gcloud run services update stadium-ai-copilot \
  --region us-central1 \
  --update-env-vars \
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_KEY",\
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="stadium-ai-copilot-01.firebaseapp.com",\
NEXT_PUBLIC_FIREBASE_PROJECT_ID="stadium-ai-copilot-01",\
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="stadium-ai-copilot-01.appspot.com",\
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID",\
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID",\
GEMINI_API_KEY="YOUR_GEMINI_KEY",\
FIREBASE_SERVICE_ACCOUNT_B64="YOUR_BASE64_SERVICE_ACCOUNT"
```

**Or set via Console:**
1. Go to https://console.cloud.google.com/run
2. Click `stadium-ai-copilot` service
3. Click **EDIT & DEPLOY NEW REVISION**
4. Scroll to **Variables & Secrets**
5. Add all environment variables
6. Click **DEPLOY**

---

## 🚀 STEP 4: Deploy Firebase Hosting

```bash
# Initialize Firebase Hosting (if not done)
firebase init hosting

# When prompted:
# - Select existing project: stadium-ai-copilot-01
# - Public directory: public
# - Single-page app: No
# - Set up rewrites: No (we already have firebase.json)

# Deploy hosting
firebase deploy --only hosting
```

**This will:**
- Deploy static assets to Firebase Hosting CDN
- Configure rewrites to your Cloud Run service
- Give you URLs:
  - https://stadium-ai-copilot-01.web.app
  - https://stadium-ai-copilot-01.firebaseapp.com

---

## 🚀 STEP 5: Update Firebase Auth Authorized Domains

1. Go to https://console.firebase.google.com/project/stadium-ai-copilot-01/authentication/settings
2. Scroll to **Authorized domains**
3. Click **Add domain**
4. Add both:
   - `stadium-ai-copilot-01.web.app`
   - `stadium-ai-copilot-01.firebaseapp.com`
   - Your Cloud Run URL (if accessing directly)

---

## ✅ STEP 6: Test Deployment

Visit your production URLs:

```
https://stadium-ai-copilot-01.web.app
https://stadium-ai-copilot-01.firebaseapp.com
```

**Test checklist:**
- [ ] Landing page loads
- [ ] "Launch Dashboard" redirects to login
- [ ] Register new account works
- [ ] Login works
- [ ] Dashboard loads with Firestore data
- [ ] Incidents page shows data
- [ ] AI features work (Analyze, Briefing, Simulator)
- [ ] Dark mode toggles
- [ ] Mobile responsive

---

## 📊 MONITORING & LOGS

### View Cloud Run Logs
```bash
gcloud run services logs read stadium-ai-copilot --region us-central1
```

### View in Console
- Cloud Run: https://console.cloud.google.com/run
- Firebase Hosting: https://console.firebase.google.com/project/stadium-ai-copilot-01/hosting
- Firestore: https://console.firebase.google.com/project/stadium-ai-copilot-01/firestore

---

## 🔧 TROUBLESHOOTING

### Issue: "Billing not enabled"
**Solution**: Enable Blaze plan in Firebase Console (Step 1)

### Issue: "Cloud Run service not found"
**Solution**: Ensure deployment completed successfully, check `gcloud run services list`

### Issue: "404 on Firebase Hosting"
**Solution**: Check firebase.json rewrites, ensure Cloud Run service name matches

### Issue: "Auth not working"
**Solution**: Add production URLs to Firebase Auth authorized domains

### Issue: "Environment variables not loaded"
**Solution**: Use Cloud Run Console to add env vars, then deploy new revision

---

## 💡 OPTIMIZATION TIPS

### 1. Set Budget Alerts
```bash
# In Google Cloud Console
# Billing → Budgets & alerts → Create Budget
# Set to $25/month with alerts at 50%, 90%, 100%
```

### 2. Configure Auto-scaling
```bash
gcloud run services update stadium-ai-copilot \
  --region us-central1 \
  --min-instances 0 \
  --max-instances 10
```

### 3. Enable CDN Caching
Already configured in firebase.json for static assets!

### 4. Monitor Usage
- Firebase Console: https://console.firebase.google.com/project/stadium-ai-copilot-01/usage
- Cloud Run Metrics: https://console.cloud.google.com/run/detail/us-central1/stadium-ai-copilot/metrics

---

## 🎯 DEPLOYMENT SUMMARY

Once billing is enabled and you follow the steps above:

```
✅ Frontend: Firebase Hosting + Cloud Run
   URL: https://stadium-ai-copilot-01.web.app

✅ Backend: Cloud Run (Next.js Server)
   Auto-scaling, serverless

✅ Database: Firestore
   Already deployed & seeded

✅ Auth: Firebase Authentication
   Already enabled

✅ AI: Google AI Studio (Gemini API)
   Via environment variable

✅ SSL/CDN: Automatic
   Free HTTPS, global CDN
```

**Total Setup Time**: 20-30 minutes  
**Monthly Cost**: $5-25 (mostly Cloud Run)

---

## 📞 READY TO DEPLOY?

1. **Enable billing** on Firebase (Step 1)
2. **Run the gcloud commands** (Steps 2-3)
3. **Deploy Firebase Hosting** (Step 4)
4. **Test your app** (Step 6)

**Need help?** Contact Firebase Support or check logs!

---

**Status**: ⏳ Waiting for billing to be enabled
**Next**: Enable Blaze plan → Run deployment commands
