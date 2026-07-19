# Stadium AI Copilot — Project Rules

> Read this file before generating any code.

---

## Stack

| Layer         | Technology                             |
| ------------- | -------------------------------------- |
| Framework     | Next.js 15 App Router                  |
| Language      | TypeScript 5 (strict mode, no `any`)   |
| UI            | React 19 + shadcn/ui + Tailwind CSS v3 |
| Auth          | Firebase Auth                          |
| Database      | Firestore                              |
| Storage       | Cloud Storage                          |
| AI            | Google AI Studio (Gemini API) via `@google/genai` |
| Env           | `@t3-oss/env-nextjs` + Zod             |
| State         | TanStack Query v5                      |
| Notifications | Sonner                                 |
| Icons         | Lucide React                           |

---

## Hard Rules — Never Break These

- **No `any` types** — ever.
- **No placeholder code or TODOs** — write real, working code.
- **No mock data** unless explicitly requested.
- **AI calls go through Next.js API routes only** (`/api/ai/*`) — never call AI from client components.
- **Use Google AI Studio (Gemini API)** with `gemini-2.5-flash-lite-preview-06-17` model.
- **Never expose Firebase service account keys or GCP credentials to the frontend**.
- **ESLint must stay clean** — no suppressions unless justified with a comment.
- **Accessibility AA** — semantic HTML, aria labels, keyboard nav on all interactive elements.
- **Dark mode** — every component must support `dark:` variants.
- **Mobile-first** — Tailwind breakpoints start from `sm:`.

---

## Architecture

```
src/
├── app/             # Next.js App Router (route groups: (auth), (dashboard))
├── components/
│   ├── ui/          # shadcn/ui generated — do not edit manually
│   ├── layout/      # sidebar, header, page-shell
│   └── common/      # loading, error-boundary, badge, empty-state
├── lib/
│   ├── firebase/    # client.ts (browser SDK), admin.ts (server-only)
│   ├── ai/          # gemini.ts (server-only)
│   └── utils/       # cn.ts, errors.ts, dates.ts
├── hooks/           # use-auth.ts, use-firestore.ts, use-debounce.ts
├── types/           # index.ts — all shared TypeScript types
├── constants/       # index.ts — routes, collections, app metadata
├── providers/       # auth-provider, theme-provider, providers (root)
└── styles/          # globals.css
```

Target: 25–35 source files. Do not exceed unless a feature explicitly requires it.

---

## Firestore Collections

Start with these 5 only:

| Collection  | Purpose                              |
| ----------- | ------------------------------------ |
| `users`     | Auth profile, role, preferences      |
| `stadiums`  | Stadium metadata, sections, capacity |
| `incidents` | Reported incidents with AI analysis  |
| `alerts`    | System-generated or manual alerts    |
| `matches`   | Match/event scheduling data          |

---

## AI — lib/ai/ (1 file only)

```
lib/ai/
└── gemini.ts    # Google AI Studio client + generateJSON wrapper
```

- Use `@google/genai` with Google AI Studio API key (GEMINI_API_KEY).
- Model: `gemini-2.5-flash-lite-preview-06-17`.
- All AI logic lives in Next.js API routes (`src/app/api/ai/*`).
- All AI calls are server-only (Cloud Functions or Server Actions).
- Always validate AI JSON output with Zod before using it.

---

## Naming Conventions

- Files: kebab-case
- Components: PascalCase
- Functions/hooks: camelCase
- Types: PascalCase
- Constants: SCREAMING_SNAKE_CASE
- Firestore collections: defined in constants/index.ts as COLLECTIONS object

---

## Component Conventions

- Single named export per component file.
- Props: `[ComponentName]Props` interface in the same file.
- Use `cn()` from `lib/utils/cn.ts` for class merging.
- Server Components by default. Add `'use client'` only when required.

---

## Env Variables

- `NEXT_PUBLIC_` prefix: client-safe Firebase config only.
- No prefix: server-only secrets.
- All validated in `src/env.ts` via `@t3-oss/env-nextjs`.

---

## API Routes

- All AI calls live in `src/app/api/ai/*`.
- Server-side only (protected with `server-only` package).
- Export HTTP-callable functions using `onCall` (v2).
- Validate all request data with Zod before processing.

---

## Prompt Sequence

| #   | Prompt                     |
| --- | -------------------------- |
| 1   | Project Skeleton ← current |
| 2   | Firebase Setup             |
| 3   | Google AI Studio Integration |
| 4   | Authentication             |
| 5   | UI & Design System         |
| 6   | Core Stadium Module        |
| 7   | AI Features                |
| 8   | Testing + Deployment       |
