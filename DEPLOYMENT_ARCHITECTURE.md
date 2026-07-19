# 🏗️ Stadium AI Copilot - Deployment Architecture

## 📍 WHERE EVERYTHING WILL BE DEPLOYED

### Current Components Analysis

```
Your Application Has:
├── Next.js Frontend (Landing + Dashboard)
├── Next.js API Routes (/api/ai/*, /api/auth/*)
├── Firebase Firestore (Database - ALREADY LIVE)
├── Firebase Authentication (ALREADY ENABLED)
└── Google AI Studio API (Gemini 2.5 Flash-Lite)
```

---

## 🎯 DEPLOYMENT STRATEGY: Vercel + Firebase

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    🌐 VERCEL PLATFORM                       │
│                 (your-app.vercel.app)                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📱 FRONTEND (Static + SSR)                                 │
│  ├─ Landing Page (/)                                        │
│  ├─ Dashboard (/dashboard/*)                                │
│  ├─ Auth Pages (/login, /register)                          │
│  └─ All React Components                                    │
│                                                              │
│  ⚡ API ROUTES (Serverless Functions)                       │
│  ├─ /api/ai/analyze-incident  → Calls Gemini API           │
│  ├─ /api/ai/briefing          → Calls Gemini API           │
│  ├─ /api/ai/simulate          → Calls Gemini API           │
│  ├─ /api/auth/session         → Manages auth cookies       │
│  └─ /api/health               → Health check                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                            ↓ ↑
                    (HTTPS Requests)
                            ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│              🔥 FIREBASE (stadium-ai-copilot-01)            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  💾 FIRESTORE DATABASE (ALREADY DEPLOYED)                   │
│  ├─ stadiums/    → Stadium data                             │
│  ├─ matches/     → Match schedules                          │
│  ├─ incidents/   → Incident reports                         │
│  ├─ alerts/      → System alerts                            │
│  └─ users/       → User profiles                            │
│                                                              │
│  🔐 AUTHENTICATION (ALREADY ENABLED)                        │
│  ├─ Email/Password                                          │
│  └─ Google Sign-In                                          │
│                                                              │
│  📦 CLOUD STORAGE (Optional)                                │
│  └─ Incident attachments, avatars                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                            ↓ ↑
                    (API Key in Vercel)
                            ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│              🤖 GOOGLE AI STUDIO                            │
│              (Gemini 2.5 Flash-Lite API)                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✨ AI PROCESSING (API Only - No Deployment)               │
│  ├─ Incident Analysis                                       │
│  ├─ Operations Briefing                                     │
│  └─ Scenario Simulation                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 DEPLOYMENT BREAKDOWN

| Component | Where | Status | Action Needed |
|-----------|-------|--------|---------------|
| **Landing Page** | Vercel | Not deployed | ✅ Deploy now |
| **Dashboard UI** | Vercel | Not deployed | ✅ Deploy now |
| **API Routes** | Vercel Serverless | Not deployed | ✅ Deploy now |
| **Firestore DB** | Firebase | ✅ LIVE | Already seeded |
| **Firebase Auth** | Firebase | ✅ LIVE | Already enabled |
| **Gemini AI** | Google AI Studio | ✅ LIVE | API key ready |
| **Domain/SSL** | Vercel | Auto | Free HTTPS |

---

## 🚀 DEPLOYMENT PLAN

### Step 1: Vercel Deployment (Frontend + Backend API)

**What happens:**
- Next.js app builds on Vercel
- Static pages pre-rendered (landing, login, register)
- Dynamic pages use SSR (dashboard)
- API routes become serverless functions
- Auto HTTPS + global CDN
- Environment variables injected securely

**URL you'll get:**
```
https://stadium-ai-copilot-[random].vercel.app
```

### Step 2: Firebase (Already Done!)

**What's already deployed:**
- ✅ Firestore database with collections
- ✅ Firebase Auth with Email/Password
- ✅ Google Sign-In enabled
- ✅ Security rules deployed
- ✅ Data seeded (stadiums, incidents, alerts, matches)

**No action needed** - Firebase is live!

### Step 3: Google AI Studio (Already Done!)

**What's already set up:**
- ✅ Gemini API key active
- ✅ API working (we tested it)
- ✅ Model: gemini-2.5-flash-lite-preview-06-17

**No action needed** - Just add key to Vercel env vars!

---

## 💰 COST ESTIMATE

### Vercel (Recommended Tier: Hobby - FREE)

| Item | Hobby (Free) | Pro ($20/mo) |
|------|--------------|--------------|
| Bandwidth | 100 GB/mo | 1 TB/mo |
| Builds | 6000 min/mo | Unlimited |
| Serverless Executions | 100 GB-Hrs | 1000 GB-Hrs |
| Custom Domain | ✅ Yes | ✅ Yes |
| Team Members | 1 | Unlimited |

**Recommendation**: Start with **FREE Hobby tier**

### Firebase (Pay-as-you-go)

| Service | Free Tier | After Free Tier |
|---------|-----------|-----------------|
| Firestore Reads | 50K/day | $0.06 per 100K |
| Firestore Writes | 20K/day | $0.18 per 100K |
| Authentication | 10K MAU | Free up to 50K |
| Storage | 1 GB | $0.026/GB |

**Estimated**: $0-5/month (low traffic)

### Google AI Studio (Gemini API)

| Model | Input Price | Output Price |
|-------|-------------|--------------|
| Gemini 2.5 Flash-Lite | $0.075 / 1M tokens | $0.30 / 1M tokens |

**Estimated**: $0.10-2/month (normal usage)

### **TOTAL MONTHLY COST: $0-7**

(Free tier should cover initial traffic!)

---

## 🔐 ENVIRONMENT VARIABLES FOR VERCEL

These will be added to Vercel dashboard (I'll do this for you):

```bash
# Firebase Client (Public - Safe to expose)
NEXT_PUBLIC_FIREBASE_API_KEY=your-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=stadium-ai-copilot-01.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=stadium-ai-copilot-01
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=stadium-ai-copilot-01.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Firebase Admin (SECRET - Server Only)
FIREBASE_SERVICE_ACCOUNT_B64=base64-encoded-service-account

# Google AI Studio (SECRET - Server Only)
GEMINI_API_KEY=your-gemini-key

# App Config
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NODE_ENV=production
```

---

## ✅ POST-DEPLOYMENT VERIFICATION

After deployment, I'll test:

1. ✅ Landing page loads
2. ✅ "Launch Dashboard" redirects to login
3. ✅ Register new user works
4. ✅ Login works
5. ✅ Dashboard loads with Firestore data
6. ✅ Incidents page shows data
7. ✅ AI features work (Analyze, Briefing, Simulator)
8. ✅ Dark mode works
9. ✅ Mobile responsive
10. ✅ HTTPS enabled

---

## 🎯 READY TO DEPLOY?

I will now:

1. **Check Prerequisites** (Firebase keys, Gemini key)
2. **Build Production Bundle** (verify no errors)
3. **Deploy to Vercel** (using Vercel CLI)
4. **Configure Environment Variables** (inject secrets)
5. **Test Deployment** (full integration test)
6. **Give You Production URL**

**Estimated Time**: 5-10 minutes

---

## ⚠️ WHAT WON'T BE DEPLOYED

- ❌ Cloud Functions (deleted - using Next.js API routes)
- ❌ Vertex AI (removed - using Google AI Studio)
- ❌ Separate backend server (Next.js handles it)
- ❌ Database server (Firestore is managed)

Everything runs on **Vercel + Firebase + Google AI Studio**!

