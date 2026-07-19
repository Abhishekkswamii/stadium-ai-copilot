# 🎯 Manual Steps Required - Stadium AI Copilot

Your app is **DEPLOYED & WORKING** but needs 2 quick manual steps to be fully functional! 🚀

---

## ✅ Current Status

```
✓ Cloud Run deployed and running
✓ Firebase Hosting live
✓ All environment variables configured
✓ Landing page loading successfully
✓ Gemini AI key configured
✓ Firebase service account configured
✓ Firestore database seeded
```

**Your Live URL**: https://stadium-ai-copilot-01.web.app

---

## 🔧 Step 1: Add Firebase Auth Authorized Domains (REQUIRED)

**Time**: 2 minutes  
**Why**: Without this, users cannot login or register - Firebase will block all auth requests

### Instructions:

1. **Click this link**: https://console.firebase.google.com/project/stadium-ai-copilot-01/authentication/settings

2. **Scroll down** to the **"Authorized domains"** section

3. **Click the "Add domain" button**

4. **Add these 3 domains** (one at a time):
   ```
   stadium-ai-copilot-01.web.app
   ```
   *(Click "Add domain", paste the URL, click "Add")*

   ```
   stadium-ai-copilot-01.firebaseapp.com
   ```
   *(Click "Add domain", paste the URL, click "Add")*

   ```
   stadium-ai-copilot-ryqidae4iq-uc.a.run.app
   ```
   *(Click "Add domain", paste the URL, click "Add")*

5. **Done!** You should now see all 3 domains in the authorized list.

### Screenshot Reference:
```
┌─────────────────────────────────────────────────────┐
│ Authorized domains                                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  localhost                                          │
│  stadium-ai-copilot-01.web.app                     │  ← Add this
│  stadium-ai-copilot-01.firebaseapp.com             │  ← Add this
│  stadium-ai-copilot-ryqidae4iq-uc.a.run.app        │  ← Add this
│                                                     │
│  [+ Add domain]                                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 💰 Step 2: Set Budget Alert (RECOMMENDED)

**Time**: 3 minutes  
**Why**: Protect yourself from unexpected charges - get alerts before costs spiral

### Instructions:

1. **Click this link**: https://console.cloud.google.com/billing/budgets?project=stadium-ai-copilot-01

2. **Click** the **"CREATE BUDGET"** button

3. **Fill in the form**:

   **Scope**:
   - Projects: ✓ stadium-ai-copilot-01
   - Services: (All services)
   - Credit types: (All credits)

   **Amount**:
   - Budget type: ● Specified amount
   - Target amount: **₹2000** (or **$25 USD**)
   - Budget period: ● Monthly

   **Actions**:
   - Alert threshold rules:
     - ✓ Actual: **50%** of budget
     - ✓ Actual: **90%** of budget
     - ✓ Actual: **100%** of budget
   - Manage notifications: 
     - Email alerts to: *your-email@example.com*

4. **Click** "FINISH"

5. **Done!** You'll get emails at ₹1000, ₹1800, and ₹2000 spent.

### Expected Costs:

| Service | Estimated Monthly Cost |
|---------|------------------------|
| Cloud Run | ₹300-800 ($5-10) |
| Firebase Hosting | ₹0 (Free tier) |
| Firestore | ₹0 (Free tier covers usage) |
| Gemini AI | ₹100-500 ($1-5) depending on usage |
| **TOTAL** | **₹400-1300 ($5-15)** |

> 💡 **Tip**: You have plenty of headroom with a ₹2000 budget!

---

## 🧪 Test Your App (After Step 1)

Once you've added the authorized domains, test these features:

### 1. Landing Page ✓
Visit: https://stadium-ai-copilot-01.web.app
- Should see premium landing page with animations
- Click "Launch Dashboard" button

### 2. Register New Account
- Click "Register" or use the register link
- Email: `test@example.com`
- Password: `Test123!@#`
- Should successfully create account

### 3. Login
- Use credentials from step 2
- Should redirect to dashboard

### 4. Dashboard Features
- **Overview**: Should show stadium statistics
- **Stadiums**: List of 3 stadiums (Wankhede, Eden Gardens, M. Chinnaswamy)
- **Incidents**: List of incidents with severity badges
- **Alerts**: Real-time alerts
- **Matches**: Upcoming and ongoing matches

### 5. AI Features 🤖
- **Analyze Incident**: Go to Incidents → Click any incident → "Analyze with AI"
- **Generate Briefing**: Go to Overview → "Generate Briefing"
- **Simulator**: Go to Simulator → Select scenario → Run simulation

---

## 🚨 Troubleshooting

### "Auth domain not authorized" error
→ **Complete Step 1 above** - add all 3 domains to Firebase Auth

### Landing page shows "Loading..." forever
→ **Already fixed!** This was caused by `public/index.html` blocking Cloud Run proxy. We removed it.

### AI features not working
→ Check logs:
```bash
gcloud run services logs read stadium-ai-copilot --region us-central1 --limit 50
```

### Budget alert not received
→ Check spam folder, or verify email in billing alerts

---

## 📊 Quick Verification

Run this command to verify deployment:
```bash
./verify-deployment.sh
```

All checks should show ✅ green checkmarks!

---

## 🎉 What's Next?

Once you complete Step 1 (required) and Step 2 (recommended):

1. **Start using your app!** https://stadium-ai-copilot-01.web.app
2. **Invite team members** via Firebase Auth
3. **Customize the AI prompts** in `src/app/api/ai/*`
4. **Add more stadiums** via Firestore console
5. **Set up custom domain** (optional)

---

## 📞 Resources

- **Firebase Console**: https://console.firebase.google.com/project/stadium-ai-copilot-01
- **Cloud Run Logs**: https://console.cloud.google.com/run/detail/us-central1/stadium-ai-copilot/logs
- **Firestore Database**: https://console.firebase.google.com/project/stadium-ai-copilot-01/firestore
- **Gemini API**: https://aistudio.google.com/apikey
- **Full Deployment Docs**: See `DEPLOYMENT_COMPLETE.md`

---

**Current Time**: Sunday, July 19, 2026 at 11:52 PM IST

**Status**: 🟢 **95% Complete** - Just 2 quick steps away! 🚀

**Estimated time to full functionality**: **5 minutes**

---

*You've got this! Complete these 2 steps and your Stadium AI Copilot will be fully operational!* 🎯
