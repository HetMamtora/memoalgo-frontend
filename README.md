# MemoAlgo

**Spaced-repetition revision tracker for DSA.** Log the problems you've solved, and MemoAlgo schedules exactly when to revisit each one using the SM-2 algorithm — the same spaced-repetition math behind Anki — so the patterns you've already learned don't quietly fade away.

**Live:** [memoalgo.dev](https://memoalgo.dev)
**Backend repo:** [memoalgo-backend](https://github.com/HetMamtora/memoalgo-backend) <!-- replace with actual link -->

---

## Features

- **JWT authentication** with OTP-verified email registration and password reset — no account is created (and no password is changed) until a 6-digit code sent to your inbox is confirmed
- **Problem Library** — add, edit, delete, filter (by topic and difficulty), and search problems you've solved
- **Spaced-repetition Review Session** — a daily queue of due problems; rate your recall (Again / Hard / Good / Easy) and the SM-2 algorithm reschedules the next review automatically
- **Dashboard & Stats** — retention rate, streak tracking, problems-by-topic and by-difficulty breakdowns, and a 5-week GitHub-style activity heatmap
- **Light / Dark / System theme**, fully responsive (desktop sidebar nav, mobile bottom-tab nav)

## Tech stack

**Frontend:** React 19, TypeScript, Vite, Tailwind CSS, React Router
**Backend:** Java 21, Spring Boot 3.3, Spring Security, JWT, PostgreSQL ([backend repo](https://github.com/HetMamtora/memoalgo-backend))
**Infrastructure:** Vercel (frontend), Railway (backend + PostgreSQL), Resend (transactional email), custom domain with DMARC through Hostinger

## Architecture notes

- **Service layer pattern** — components never call Axios directly; every API call goes through a typed function in `services/` that returns a typed DTO, mirroring the Controller → Service → Repository separation on the backend.
- **Data-driven navigation** — the 4 nav items (Dashboard/Library/Review/Stats) are defined once in `config/navigation.ts` and rendered by both the desktop Sidebar and mobile BottomNav, rather than duplicated in two places.

## Getting started

```bash
npm install
npm run dev
```

Requires the [backend](https://github.com/HetMamtora/memoalgo-backend) running (locally or pointed at a deployed instance) for anything beyond the landing page to work.

### Scripts

- `npm run dev` — start the dev server
- `npm run build` — typecheck + production build
- `npm run lint` — ESLint
- `npm run preview` — preview the production build locally

## Project structure

```
src/
├── components/    # common/ (Button, Modal, Skeleton...), and per-feature
│                  # folders (dashboard/, library/, review/, stats/, layout/)
├── context/       # AuthContext, ThemeContext
├── hooks/         # useAuth, useTheme, useProblems, useReviews, useStats...
├── pages/         # one component per route
├── services/      # typed API call wrappers (one file per backend resource)
├── types/         # shared TypeScript interfaces, mirroring backend DTOs
└── utils/         # validation, date formatting, color tokens
```