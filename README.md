# MemoAlgo Frontend

Spaced-repetition revision app for DSA problems. React + TypeScript + Vite + Tailwind CSS.

Backend: see the main `MEMOALGO_HANDOFF.md` (Java 21 / Spring Boot 3.3 / PostgreSQL).
Frontend build log: see `DAY8_NOTES.md` for what's implemented so far and why.

## Quick start

```bash
npm install
cp .env.example .env   # edit VITE_API_BASE_URL if your backend isn't on :8080
npm run dev
```

The backend must be running first (`http://localhost:8080` by default).

## Scripts

- `npm run dev` -- start the dev server (http://localhost:5173)
- `npm run build` -- typecheck (`tsc -b`) + production build to `dist/`
- `npm run lint` -- ESLint
- `npm run preview` -- preview the production build locally
