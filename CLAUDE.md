# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (Vite, localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview production build
npm run lint     # ESLint check
```

## Architecture

**Single-page app** (React 19 + Vite 8 + Tailwind CSS 4) deployed to Vercel at `dominioneze.dev`.

**Routing** — `src/App.jsx` defines two route groups:
- `/` → `Portfolio` component (the full single-page portfolio with all sections stacked)
- `/lifepeek/*` → four sub-pages (`LifePeekHub`, `LifeJourney`, `OpenWorld`, `TouchingGrass`)

**All content lives in `src/data.js`** — this is the single source of truth for every section (profile, skills, projects, experience, education, certifications, lifepeek timeline entries). Editing content means editing `data.js`; components just read from it.

**Theming** — `src/ThemeContext.jsx` wraps the entire app. Theme is toggled via `data-theme="dark|light"` on `<html>`. All colors are CSS custom properties defined in `src/index.css` under `:root` (light) and `[data-theme="dark"]`. Never hardcode colors — always use `var(--bg)`, `var(--text)`, `var(--accent)`, `var(--muted)`, `var(--border)`, `var(--surface)`, `var(--terminal-bg)`, etc.

**Typography system** (three fonts, each with a specific role):
- `Fraunces` (serif) — headings (`h1`–`h4`), set globally in `index.css`
- `Geist` (sans-serif) — body text and UI, the default body font
- `JetBrains Mono` (monospace) — code, terminal blocks, anything `.mono`

**Styling approach** — no CSS modules or styled-components. Styles are inline `style={{}}` objects on components using CSS vars, plus Tailwind utility classes for layout helpers. The design uses a warm off-white (`#F4F1EC`) background in light mode and a GitHub-dark (`#0D1117`) in dark mode.

**Static assets** — served from `public/`. Key files: `public/headshot.jpg`, `public/resume.pdf`, `public/cert-*.pdf`. Resume link in `Hero.jsx` is a direct download of `/resume.pdf` — update by replacing that file in `public/`.

**LifePeek pages** (`src/pages/lifepeek/`) — a personal life/journey section with three sub-pages:
- `LifeJourney` — horizontal scrolling timeline (`lifejourney` array in data.js)
- `OpenWorld` — program/experience post cards (`openworld` array)
- `TouchingGrass` — personal outings/moments posts (`touchinggrass` array)

**`FadeIn` component** — wraps every main section. Receives a `ready` bool (set to `true` after `LoadingScreen` finishes) and an optional `delay` (ms). Sections only fade in after the loading screen completes.

## Key patterns

- To add a new project: add an entry to the `projects` array in `data.js`. Fields: `id`, `name`, `status` (`"complete"` | `"planned"`), `tagline`, `description`, `stack`, `github`, `live`, `demo`, `terminal` (array of `{delay, type, text}` for the animated terminal demo).
- To add a new experience: add to the `experience` array in `data.js`. New entries go at the top.
- The `terminal` array in each project drives the `TerminalDemo` component — `type: "input"` renders with a `$` prompt, `type: "output"` renders as output lines, `delay` is ms from start.
- Theme-aware components must use `useTheme()` from `ThemeContext` if they need to branch on dark/light; most components just rely on CSS vars and don't need to import it.

## Deployment

Frontend → Vercel. Push to `main` triggers auto-deploy. No build config needed — Vite output is `dist/`.
