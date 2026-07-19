# 🚀 Deploy Your Stadium AI Copilot - DO THIS NOW

## ⏱️ Estimated Time: 20 minutes

---

## STEP 1: Enable Billing (5 minutes)

### Click this link RIGHT NOW:
👉 https://console.firebase.google.com/project/stadium-ai-copilot-01/usage

### What to do:
1. Click the blue **"Modify plan"** button
2. Select **"Blaze (Pay as you go)"**
3. Click **"Continue"** or **"Purchase"**
4. Link an existing billing account OR create new one
5. ✅ **IMPORTANT**: Set a budget alert for $25/month

### Why?
Cloud Run requires billing. Expected cost: **$5-25/month**

---

## STEP 2: Deploy to Cloud Run (10 minutes)

### Open Terminal and run:

```bash
cd "Stadium AI Copilot"

# Make deploy script executable (if not already)
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### What happens:
1. ✅ Enables Cloud Run APIs
2. ✅ Builds Docker container
3. ✅ Pushes to Google Container Registry  
4. ✅ Deploys to Cloud Run
5. ✅ Deploys Firebase Hosting
6. ✅ Gives you production URLs

### Script will pause and ask you to set environment variables...

---

## STEP 3: Set Environment Variables (3 minutes)

### Click this link when script pauses:
👉 https://console.cloud.google.com/run?project=stadium-ai-copilot-01

### What to do:
1. Click **"stadium-ai-copilot"** service
2. Click **"EDIT & DEPLOY NEW REVISION"** (top)
3. Scroll to **"Variables & Secrets"** section
4. Click **"ADD VARIABLE"** for each:

```env
NEXT_PUBLIC_FIREBASE_API_KEY = (from .env.local)
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = stadium-ai-copilot-01.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = stadium-ai-copilot-01
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = stadium-ai-copilot-01.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = (from .env.local)
NEXT_PUBLIC_FIREBASE_APP_ID = (from .env.local)
GEMINI_API_KEY = (from .env.local)
FIREBASE_SERVICE_ACCOUNT_B64 = (from .env.local)
NODE_ENV = production
NEXT_PUBLIC_APP_URL = https://stadium-ai-copilot-01.web.app
```

5. Click **"DEPLOY"** at bottom
6. Wait 1-2 minutes for deployment
7. **Go back to terminal** and press **Y** to continue

---

## STEP 4: Configure Firebase Auth (2 minutes)

### Click this link:
👉 https://console.firebase.google.com/project/stadium-ai-copilot-01/authentication/settings

### What to do:
1. Scroll to **"Authorized domains"** section
2. Click **"Add domain"**
3. Add: `stadium-ai-copilot-01.web.app`
4. Click **"Add domain"** again
5. Add: `stadium-ai-copilot-01.firebaseapp.com`
6. ✅ Done!

---

## STEP 5: Test Your App! (2 minutes)

### Visit your production URL:
👉 https://stadium-ai-copilot-01.web.app

### Test checklist:
- [ ] Landing page loads ✅
- [ ] Click "Launch Dashboard" → redirects to login ✅
- [ ] Click "Register" → create test account ✅
- [ ] Login with test account ✅
- [ ] Dashboard loads with data ✅
- [ ] Click "Incidents" → see incident list ✅
- [ ] Open incident → click "Analyze with AI" ✅
- [ ] Dark mode toggle works ✅
- [ ] Mobile responsive (resize browser) ✅

---

## 🎉 SUCCESS!

Your app is now live at:
- **Primary**: https://stadium-ai-copilot-01.web.app
- **Alternative**: https://stadium-ai-copilot-01.firebaseapp.com

---

## 🔧 If Something Goes Wrong

### Deployment fails?
```bash
# Check Cloud Run logs
gcloud run services logs read stadium-ai-copilot --region us-central1
```

### 404 on Firebase Hosting?
Check firebase.json rewrites are correct

### Login doesn't work?
Make sure you added authorized domains (Step 4)

### AI features fail?
Check environment variables are set (Step 3)

---

## 📊 Monitor Your App

### View Logs:
👉 https://console.cloud.google.com/run/detail/us-central1/stadium-ai-copilot/logs

### View Usage:
👉 https://console.firebase.google.com/project/stadium-ai-copilot-01/usage

### View Metrics:
👉 https://console.cloud.google.com/run/detail/us-central1/stadium-ai-copilot/metrics

---

## 💰 Set Budget Alerts

### Important - Do this NOW:
👉 https://console.cloud.google.com/billing/budgets

1. Click **"CREATE BUDGET"**
2. Name: "Stadium AI Copilot Monthly"
3. Budget amount: **$25**
4. Set alerts at: **50%, 90%, 100%**
5. Add your email
6. Click **"FINISH"**

This prevents unexpected charges!

---

## ✅ YOU'RE DONE!

**Time to celebrate!** 🎉

Your Stadium AI Copilot is now:
- ✅ Deployed to Firebase Hosting
- ✅ Running on Cloud Run (auto-scaling)
- ✅ Connected to Firestore
- ✅ Using Firebase Auth
- ✅ Powered by Gemini AI
- ✅ HTTPS enabled
- ✅ Global CDN
- ✅ Production ready!

**Share your app**: https://stadium-ai-copilot-01.web.app

---

## 📞 Need Help?

If you get stuck:
1. Check `FIREBASE_DEPLOYMENT_INSTRUCTIONS.md` (detailed guide)
2. Check Cloud Run logs (link above)
3. Check Firebase Console for errors
4. Review environment variables

**Most common issues:**
- Billing not enabled → Enable Blaze plan
- Env vars not set → Set in Cloud Run Console
- Auth domains not added → Add in Firebase Auth settings

---

**Ready? Let's deploy!** 🚀

**Start here**: https://console.firebase.google.com/project/stadium-ai-copilot-01/usage
