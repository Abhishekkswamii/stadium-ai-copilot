# 🔥 Stadium AI Copilot - Firebase Complete Deployment

## 📍 ALL GOOGLE SERVICES - FIREBASE ONLY

### Deployment Architecture (100% Google Cloud)

```
┌─────────────────────────────────────────────────────────────┐
│           🔥 FIREBASE HOSTING (CDN)                         │
│           https://stadium-ai-copilot-01.web.app             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📱 STATIC ASSETS (Cached on CDN)                           │
│  ├─ CSS, JavaScript bundles                                 │
│  ├─ Images, SVGs, Fonts                                     │
│  └─ Static HTML (if any)                                    │
│                                                              │
│  🔄 REWRITES (Proxy to Cloud Run)                           │
│  ├─ /* → Cloud Run (Next.js server)                        │
│  └─ All dynamic routes                                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                            ↓ ↑
                    (Internal Google Network)
                            ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│              ☁️ CLOUD RUN (Container)                       │
│              (Next.js Server - Auto-scaling)                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📱 FRONTEND (SSR + Client)                                 │
│  ├─ Landing Page (/) - Server-side rendered                │
│  ├─ Dashboard (/dashboard/*) - Dynamic SSR                  │
│  ├─ Auth Pages (/login, /register)                          │
│  └─ All React Components                                    │
│                                                              │
│  ⚡ API ROUTES (Next.js Handlers)                           │
│  ├─ /api/ai/analyze-incident                                │
│  ├─ /api/ai/briefing                                        │
│  ├─ /api/ai/simulate                                        │
│  ├─ /api/auth/session                                       │
│  └─ /api/health                                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                            ↓ ↑
                    (Google Cloud Internal)
                            ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│              🔥 FIRESTORE (Database)                        │
│              stadium-ai-copilot-01                          │
├─────────────────────────────────────────────────────────────┤
│  ✅ ALREADY DEPLOYED & SEEDED                               │
│  ├─ stadiums/                                               │
│  ├─ matches/                                                │
│  ├─ incidents/                                              │
│  ├─ alerts/                                                 │
│  └─ users/                                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              🔐 FIREBASE AUTHENTICATION                     │
├─────────────────────────────────────────────────────────────┤
│  ✅ ALREADY ENABLED                                         │
│  ├─ Email/Password                                          │
│  └─ Google Sign-In                                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              🤖 GOOGLE AI STUDIO                            │
│              (Gemini 2.5 Flash-Lite)                        │
├─────────────────────────────────────────────────────────────┤
│  ✅ ALREADY CONFIGURED                                      │
│  └─ API Key in Cloud Run environment                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              📦 CLOUD STORAGE (Optional)                    │
├─────────────────────────────────────────────────────────────┤
│  ✅ ALREADY CONFIGURED                                      │
│  └─ For incident attachments                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 DEPLOYMENT COMPONENTS

| Component | Service | URL/Location |
|-----------|---------|--------------|
| **Frontend** | Firebase Hosting + Cloud Run | https://stadium-ai-copilot-01.web.app |
| **Backend API** | Cloud Run (Next.js) | Internal (via Hosting rewrite) |
| **Database** | Firestore | ✅ LIVE (stadium-ai-copilot-01) |
| **Authentication** | Firebase Auth | ✅ LIVE |
| **AI Processing** | Google AI Studio API | ✅ LIVE |
| **File Storage** | Cloud Storage | ✅ LIVE |
| **SSL/CDN** | Firebase Hosting | Auto-provisioned |

---

## 💰 COST BREAKDOWN (Firebase/GCP Only)

### Firebase Spark Plan (Free Tier)
- Hosting: 10 GB storage, 360 MB/day bandwidth
- Firestore: 50K reads/day, 20K writes/day
- Auth: 50K MAU free
- Storage: 5 GB free

### Cloud Run (Pay-as-you-go)
- Free tier: 2M requests/month
- CPU: $0.00002400/vCPU-second
- Memory: $0.00000250/GB-second
- Estimated: $5-20/month (depends on traffic)

### Gemini API
- $0.075 per 1M input tokens
- $0.30 per 1M output tokens
- Estimated: $0.10-2/month

### **TOTAL: $5-25/month** (mostly Cloud Run)

---

## 🚀 DEPLOYMENT STEPS

I will execute these steps for you:

### 1. Configure Firebase Project
```bash
firebase init hosting
firebase init firestore (already done)
```

### 2. Create Dockerfile for Cloud Run
```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### 3. Build and Deploy to Cloud Run
```bash
gcloud run deploy stadium-ai-copilot \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### 4. Configure Firebase Hosting to use Cloud Run
```json
{
  "hosting": {
    "public": "public",
    "rewrites": [
      {
        "source": "**",
        "run": {
          "serviceId": "stadium-ai-copilot",
          "region": "us-central1"
        }
      }
    ]
  }
}
```

### 5. Deploy Firebase Hosting
```bash
firebase deploy --only hosting
```

---

## 📋 PREREQUISITES CHECK

Let me verify what we have:

