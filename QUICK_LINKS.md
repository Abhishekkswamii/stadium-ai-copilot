# 🔗 Quick Links - Stadium AI Copilot

## 🌐 Production URLs

| Service | URL |
|---------|-----|
| **Your Live App** | https://stadium-ai-copilot-01.web.app |
| Cloud Run Backend | https://stadium-ai-copilot-ryqidae4iq-uc.a.run.app |

---

## 🎯 Manual Steps (MUST DO)

### Step 1: Add Firebase Auth Domains (Required)
**Link**: https://console.firebase.google.com/project/stadium-ai-copilot-01/authentication/settings

**Add these domains**:
- `stadium-ai-copilot-01.web.app`
- `stadium-ai-copilot-01.firebaseapp.com`
- `stadium-ai-copilot-ryqidae4iq-uc.a.run.app`

### Step 2: Set Budget Alert (Recommended)
**Link**: https://console.cloud.google.com/billing/budgets?project=stadium-ai-copilot-01

**Settings**: ₹2000/month with 50%, 90%, 100% alerts

---

## 🎛️ Admin Consoles

| Console | URL |
|---------|-----|
| Firebase Overview | https://console.firebase.google.com/project/stadium-ai-copilot-01 |
| Firebase Auth | https://console.firebase.google.com/project/stadium-ai-copilot-01/authentication/users |
| Firestore Database | https://console.firebase.google.com/project/stadium-ai-copilot-01/firestore |
| Cloud Run | https://console.cloud.google.com/run/detail/us-central1/stadium-ai-copilot |
| Cloud Run Logs | https://console.cloud.google.com/run/detail/us-central1/stadium-ai-copilot/logs |
| Billing | https://console.cloud.google.com/billing?project=stadium-ai-copilot-01 |
| IAM & Permissions | https://console.cloud.google.com/iam-admin/iam?project=stadium-ai-copilot-01 |

---

## 🔐 API & Keys

| Service | URL |
|---------|-----|
| Gemini API Keys | https://aistudio.google.com/apikey |
| Google Secret Manager | https://console.cloud.google.com/security/secret-manager?project=stadium-ai-copilot-01 |

---

## 🛠️ Useful Commands

### View Logs
```bash
gcloud run services logs read stadium-ai-copilot --region us-central1 --limit 50
```

### Verify Deployment
```bash
./verify-deployment.sh
```

### Check Environment Variables
```bash
gcloud run services describe stadium-ai-copilot --region us-central1 --format="yaml(spec.template.spec.containers[0].env)"
```

### Redeploy Cloud Run
```bash
gcloud run deploy stadium-ai-copilot --source . --region us-central1 --allow-unauthenticated
```

### Redeploy Firebase Hosting
```bash
firebase deploy --only hosting
```

### Open Firebase Console
```bash
firebase open
```

### Check Project Status
```bash
gcloud projects describe stadium-ai-copilot-01
```

---

## 📄 Documentation Files

| File | Purpose |
|------|---------|
| `MANUAL_STEPS.md` | Step-by-step manual setup (START HERE) |
| `DEPLOYMENT_COMPLETE.md` | Full deployment documentation |
| `verify-deployment.sh` | Automated deployment verification |
| `QUICK_LINKS.md` | This file - quick reference |

---

## 🎯 Next Actions

1. ✅ Complete Step 1 (Add Firebase Auth Domains) ← **DO THIS FIRST**
2. ✅ Complete Step 2 (Set Budget Alert)
3. 🧪 Test your app at https://stadium-ai-copilot-01.web.app
4. 🎉 Start using your Stadium AI Copilot!

---

**Project ID**: `stadium-ai-copilot-01`  
**Project Number**: `250840547420`  
**Region**: `us-central1`  
**Deployed**: July 19, 2026 at 11:52 PM IST

---

*Bookmark this page for quick access to all important links!* 🔖
