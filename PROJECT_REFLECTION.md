# Project Reflection — dominioneze.dev (Personal Portfolio)

**Project type:** Frontend web application (multi-page, client-side routed)
**Stack:** Vite + React, React Router DOM v7, CSS custom properties, no UI framework
**Live at:** https://dominioneze.dev
**Repo:** https://github.com/fortdominz/myPortfolio
**Deployed:** May 2026 (initial) — ongoing
**Built by:** Dominion Eze

---

## Overview

A personal portfolio built from scratch — not from a template — to be a professional landing page for internship recruiting and a central hub for every live project. The goal was a product, not a page. Something that communicates how I think before a recruiter reads a single word.

The concept: **"Editorial OS"** — dark, technical, intentional. The page feels like a breathing magazine until the projects section hits and it suddenly feels like a running system. As the project matured, it grew into a multi-page application with a personal social-media-style section called **LifePeek** — a place to document life beyond the resume: programs, timelines, outings, and moments that don't belong on a bullet point.

---

## The Journey

### Why it was built
Before this project, I had no live presence. GitHub existed, but nothing a recruiter could land on and immediately understand who I was. The portfolio fixed that — it became the thing I hand every person I meet professionally.

### What was built — Phase 1: Initial Launch

- Terminal-style boot/loading screen that fires on every page load
- Two-column hero: text left, circular headshot (220px) right with gradient ring
- Typewriter animation in a terminal prompt box
- Animated dot grid background in hero with mask gradient
- CSS grain texture overlay (`body::after` at 0.032 opacity) for atmosphere
- Scroll-triggered FadeIn animations tied to boot completion (`ready` prop)
- Light/dark theme toggle via `ThemeContext` and CSS custom properties
- Fixed status bar at the bottom — availability, school, GPA
- Sections: Hero → About → Skills → Projects → Education → Experience → Contact → Footer
- Clickable certification badges in Education, linking to PDFs in `/public`
- All content from a single `src/data.js` — single source of truth

### What was built — Phase 2: Content Expansion

- Added certifications: Anthropic AI Fluency, CodePath TIP102, AI110, CIR
- Added GateKeep project card with live link to `gatekeep.dominioneze.dev`
- Added DayKeep as full-stack web app with live link
- Added MusicTasteMatch open app link
- Added version numbers to project titles (`v3.0`, `v2.0`, etc.)
- Added Propel2Excel fellowship to Experience
- Separated live app links from demo video links on project cards
- Fixed CIR cert name and issuer
- Fixed high school graduation year (Sep. 2021, not the wrong date)
- Updated resume PDF to May 2026 DevOps version
- Fixed `document.title` — Chrome was overriding it with page content inference

### What was built — Phase 3: Motion + Color System Upgrade

- Swapped accent color from `#7EB8D4` (soft blue-gray) to `#2563EB` (electric blue)
  - Dark mode: `#3B82F6`, Dark hover: `#60A5FA`
  - Light mode: `#2563EB`, Light hover: `#1D4ED8`
- Upgraded `FadeIn.jsx` with a `direction` prop: `up`, `down`, `left`, `right`, `fade`
  - Cubic-bezier `(0.25, 0.46, 0.45, 0.94)` easing, 0.65s duration
- Added mouse-move parallax to `Hero.jsx` — headshot moves with cursor, dot grid moves counter
- Staggered `Projects.jsx` card entrances with `FadeIn delay={i * 80}`
- Rebuilt `Skills.jsx` with FadeIn from left, tag hover lifts and glow effects
- Added `<Link to="/lifepeek">` to Nav for client-side routing

### What was built — Phase 4: LifePeek (Multi-page Personal Section)

LifePeek went through three iterations before landing:

**Iteration 1:** Bento grid at `/lifepeek`. Tiles for GPA, NG→US route, The Summer I Built Everything, EY/CodePath/Oracle/PwC program cards, quote, hobbies. Content driven from `lifepeek[]` in `data.js`. Scrolled as one page with the portfolio nav's smooth scroll anchors.

**Iteration 2 (v2):** Rebuilt as a separate page with three scroll sections — Life Journey (horizontal drag-to-scroll timeline), Open World (programs feed), Touching Grass (outings feed). Theme-aware via `useTokens(dark)`. The old forced dark mode was removed and replaced with a full light/dark system.

**Iteration 3 (final):** Separated into 4 individual routes:
- `/lifepeek` — Hub: restored original bento grid + hero header + 3 sub-page nav cards
- `/lifepeek/life-journey` — Full-page horizontal timeline with 11 milestones, drag + wheel scroll
- `/lifepeek/open-world` — Programs/fellowships feed with PostCard grid
- `/lifepeek/touching-grass` — Outings/hobbies feed with PostCard grid

Shared utilities extracted into `src/pages/lifepeek/shared.jsx`:
- `useTokens()` — full light/dark color token system
- `useClock()` — live HH:MM:SS clock in nav
- `useInView()` — IntersectionObserver for scroll animations
- `LifePeekNav` — sticky nav with `useLocation()` for active link highlighting
- `PageShell` — page wrapper with grain, title management, nav
- `PostCard`, `EmptyState`, `PageHeader` — shared layout components

**React Router** was added to `App.jsx` — `BrowserRouter`, 5 routes, `vercel.json` SPA rewrite config.

**Phase 2 plan** (not yet built): FastAPI on Render, Cloudinary for image storage, env-var password auth for admin posting to the feeds.

### How long it took
Initial launch: one session (May 7, 2026). Content expansion: multiple sessions over the following days. Motion + color upgrade: one session (May 22, 2026). LifePeek: designed and rebuilt across two sessions the same day, three iterations total.

### Deployment
Vercel, auto-deploys on every push to `main`. Custom domain `dominioneze.dev` via Namecheap. DNS: A record → Vercel IP, CNAME `www` → Vercel edge. `vercel.json` SPA rewrite added when React Router routes were introduced — without it, direct URL access to `/lifepeek/life-journey` would 404.

---

## What I Learned About React Architecture

The portfolio taught me what "separation of concerns" actually means in practice, not in theory:

- **`data.js` as a content layer** means I've never touched a component to update a project, skill, or cert. The data interface is the contract between content and presentation.
- **CSS custom properties as a runtime configuration layer** — light/dark toggle works with zero JavaScript outside of a single class toggle. One token cascades everywhere.
- **The FadeIn `ready` prop** was the hardest lesson. IntersectionObserver fires when an element enters the viewport — but the LoadingScreen was covering everything with opacity 0. Every section was being marked as "seen" before the user could see it. The fix was delaying observer attachment until `booted` state became `true`. That's a real timing architecture problem, not a component bug.
- **Hooks must have one responsibility.** `useGridCols` was written with `useState` instead of `useEffect` for the side effect setup. React treated the event listener setup as a lazy state initializer — `setCols` fired during render, cleanup never ran, and the hub page broke silently. One letter difference (`useState` → `useEffect`) broke a navigation feature.

---

## Architectural Decisions

**Why Vite over Create React App?**
Faster dev server, modern ESM bundling, the industry standard. CRA is effectively deprecated.

**Why no CSS framework?**
Tailwind and Bootstrap impose a visual language. The portfolio had to feel original. Inline styles with CSS custom properties gave full control and kept the design system mine — not borrowed from a utility class set.

**Why a single `data.js` file?**
Any future me can update content without opening a component. Add a project, skill, or cert once — it appears everywhere automatically. It also meant I could copy the structure directly to LifePeek's data exports without refactoring.

**Why React Router instead of anchor-scroll nav for LifePeek?**
Separate pages need real URLs. A recruiter or program officer who gets sent `/lifepeek/life-journey` should land on the timeline, not the homepage. That requires proper routing and `vercel.json` SPA rewrites.

**Why shared.jsx for LifePeek?**
Four pages sharing the same nav, tokens, animations, and card components. Without a shared file, changing the nav would mean touching 4 files. With it, one edit propagates everywhere. That's the actual reason to abstract — not DRY as a principle, but edit-in-one-place as a practical constraint.

**Why data.js for Phase 1 LifePeek content instead of a CMS?**
Phase 1 is static. Deploying a CMS and Cloudinary setup for zero posts doesn't make sense. The data sits in `data.js`, gets updated in code, and Phase 2 adds the real posting system when there's actual content to post.

---

## Dependencies & Third-Party Services

| Dependency | What it does | What breaks if it changes |
|------------|-------------|--------------------------|
| React + Vite | Component model, build system | Everything |
| React Router DOM v7 | Client-side routing | All LifePeek routes 404 |
| Vercel | Hosting + auto-deploy pipeline | Site goes down |
| Namecheap DNS | Custom domain resolution | dominioneze.dev unreachable |
| Google Fonts (Fraunces, Geist, JetBrains Mono) | Typography | Font fallbacks activate, design degrades |

**Costs at scale:** The portfolio is a static site. Vercel's free tier handles unlimited traffic. No APIs, no database, no backend. Cost: $0 indefinitely unless a backend is added in Phase 2 of LifePeek.

---

## Performance & Optimization

- Biggest bottleneck: none currently. Vite produces 305KB JS bundle (gzipped: ~93KB). This is acceptable for a portfolio.
- Animations use CSS `transform` and `opacity` — GPU-composited, zero layout thrash.
- The grain texture is an inline SVG data URI, not a network request.
- Mouse-move parallax in Hero uses direct DOM ref manipulation (`ref.current.style.transform`) instead of React state — avoids re-renders on every mouse move.
- What would need to change at 10x load: nothing for the static site. Phase 2 backend on Render would need review — the free tier spins down after 15 minutes of inactivity.

---

## Testing Approach

- **Manual tests run:** Boot sequence on refresh, FadeIn on scroll, theme toggle persistence, all nav links, all project card links, LifePeek routes by direct URL, drag scroll on timeline, wheel scroll on timeline, light and dark mode on all 4 LifePeek pages.
- **Bugs only caught by running it:** `useGridCols` useState bug only manifested when navigating from the hub — the build passed with no errors.
- **What a proper test suite would cover:** Route rendering, FadeIn observer timing, `useClock` output format, theme token values in both modes, PostCard rendering with and without images.
- **What I'd check first if something broke in production:** Vercel deployment logs. Then direct URL access to check if SPA rewrites are intact. Then browser console for React runtime errors.

---

## AI Collaboration — One Instance Where It Worked Well

The FadeIn timing architecture. The problem: animations were silently not triggering. Everything looked correct in isolation — the observer was set up, the elements were in the DOM, the CSS transitions were valid. But nothing animated.

Reasoning through the component lifecycle revealed the issue: the LoadingScreen was covering the viewport with `opacity: 0` while the IntersectionObserver was already running. Every section was already "in view" before the user could see the page. The solution — a `ready` prop that gates observer attachment on `booted` state — required thinking across component boundaries and timing. That's the kind of cross-component reasoning that AI collaboration specifically accelerates.

---

## AI Collaboration — One Instance Where It Fell Short or Surprised Me

The `useGridCols` bug. The hook was written with `useState` instead of `useEffect` — a one-word mistake. The build succeeded. Vite compiled with zero errors or warnings. The bug only appeared at runtime when navigating between routes. AI-generated code compiled cleanly but broke a feature in a way that only surfaced in actual usage, not in static analysis.

The lesson: compilation success is not the same as correctness. Code that passes the build can still be semantically wrong. Running it is the only real test.

---

## What Surprised Me About Building and Testing This

How much a single design decision changes the entire system feel. When the accent color changed from `#7EB8D4` to `#2563EB`, the whole portfolio felt like it got sharper. Not bigger — sharper. The old blue was soft and hesitant. The new one communicates conviction. That swap touched every interactive element, every active link, every hover state, every glow — through a single CSS variable. That's why design tokens matter.

Also: the LifePeek feature went through three full iterations in one session — bento grid → scroll sections → separate pages. The first two weren't wrong builds; they were correct builds of the wrong idea. You can only know what you actually want by seeing what you built and noticing what's missing. That's not inefficiency. That's how design actually works.

---

## The Moment It Clicked

When the horizontal timeline in Life Journey was working — drag to scroll, wheel redirected horizontal, dots alternating above and below the line, milestone cards floating with delays. It was the first thing on this project that felt genuinely interactive in a way a recruiter would actually play with. Not a portfolio component. A feature you'd show someone.

That was the moment LifePeek stopped being a "nice to have" section and became something I actually wanted to build out properly.

---

## Could This System Be Misused? How Would You Prevent It?

The portfolio itself is static — no user input, no database, no auth surface. The only data exposed is intentionally public (resume, certs, project links). Risk: low.

Phase 2 of LifePeek introduces an admin posting interface. The plan is env-var password authentication over FastAPI on Render. The risk surface expands: the password could be brute-forced if not rate-limited, and the Cloudinary key would be exposed if committed to the repo. Prevention: rate limiting on the admin endpoint, Cloudinary key in env vars only (never committed), CORS locked to dominioneze.dev origin only.

---

## What Would I Do Differently If I Rebuilt This From Scratch?

- **React Router from day one.** The portfolio nav was built as anchor-scroll links. When LifePeek needed real routes, the nav had to be refactored and a BrowserRouter added to `App.jsx`. Starting with Router means the architecture is already right when you need it.
- **Design token file as a JS object, not just CSS custom properties.** Right now tokens live in `index.css`. When LifePeek needed its own token system, I had to build `useTokens()` in `shared.jsx` from scratch. A single source-of-truth JS token file that generates CSS would have made that extension trivial.
- **Name shared files by what they export, not where they live.** `shared.jsx` is vague. `useLifePeekTokens.js`, `LifePeekNav.jsx`, etc. are self-documenting. This matters once the project scales past one person reading it.

---

## What I'd Tell My Past Self Before Starting

Build it like a product, not a page — but design the data model first. Everything you'll ever add, change, or remove flows through `data.js`. If that file is structured right, the UI is just a view. If it's not, you're refactoring components every time the content changes.

---

## What's the One Thing This Project Taught Me That a Tutorial Never Would?

The difference between a feature that works and a feature that belongs.

I built and reverted a vertical timeline for Experience. A horizontal scroll for Skills. Section dots. A bento grid for LifePeek — then rebuilt it as scroll sections — then rebuilt it again as separate pages. None of these were broken. They worked. But they either fragmented the design or didn't match what I actually wanted once I saw them in context.

A tutorial teaches you how to build the feature. It doesn't teach you how to look at your own work, recognize when something is technically correct but aesthetically or architecturally wrong, and have the discipline to undo it. That judgment — knowing when to stop, when to revert, when to rebuild — is the real skill. It's just not the one that shows up in documentation.

---

## What Does v2 Look Like?

- **LifePeek Phase 2:** FastAPI on Render, Cloudinary for image storage, env-var password admin page for posting to Open World and Touching Grass feeds. Real posts with real photos.
- **LifePeek Phase 3:** Comments (aesthetic only — no accounts, no moderation surface), RSS-style feed for recruiters who want to follow the journey.
- **Portfolio Phase 2:** Interactive terminal in the hero that accepts actual commands (`ls projects`, `cat gatekeep`, `./open musictastematch`) — links out to live apps.
- **Data layer migration:** Move `data.js` to a lightweight headless CMS (Contentful or Sanity) so content updates don't require code pushes.

---

## As a System Architect

- The portfolio is a **presentation layer over a data model** — `data.js` is the model, components are views, CSS custom properties are the configuration layer
- Deployment is a **CI/CD pipeline**: push to GitHub → Vercel auto-builds → live in ~60 seconds
- The theming system uses **CSS custom properties as a runtime configuration layer** — no JavaScript needed for the cascade, just a class toggle
- The animation system respects **system state** (boot complete) before activating — event-driven, not time-driven
- `vercel.json` SPA rewrites are the **glue between the CDN and the client-side router** — without them, every deep link 404s
- `shared.jsx` in LifePeek is a **micro design system** — tokens, nav, shell, cards — it's what allows 4 pages to feel like one product

## As an AI Engineer

- Used AI as a **collaborator on architecture decisions** — the FadeIn timing problem was diagnosed through conversation, not autocomplete
- The `useGridCols` bug proved that **AI-generated code requires runtime testing, not just compilation** — the build passes, the bug doesn't surface until navigation
- LifePeek iterations (bento → sections → pages) show that **AI can build what you describe, but you have to see it to know what you wanted** — fast iteration is the real value
- Every feature that shipped was **intentional** — nothing was added because it was possible

---

## Portfolio Signal — What This Project Demonstrates

- **Skills demonstrated:** React architecture, client-side routing, custom design systems, CSS animation systems, IntersectionObserver, real component design, multi-page app structure, Vercel deployment pipeline
- **Problem-solving shown:** FadeIn timing across component lifecycle boundaries; hook misuse caught by runtime behavior; design iteration discipline (three LifePeek rebuilds, multiple feature reverts)
- **What I'd say in an interview:** "I built my portfolio as a product, not a template — designed a data layer in `data.js` so content updates never touch component code, built a custom motion system with scroll-triggered animations, and added a personal section called LifePeek with its own routing and design system. The whole thing ships on Vercel from a git push."
- **The one thing that makes this stand out:** It kept evolving after launch. Most portfolio projects are point-in-time. This one has a commit history of real decisions, real reverts, and real iterations — which is what actual engineering looks like.

---

## Wins

- Zero live presence → deployed at a custom `.dev` domain in one session
- Boot sequence StrictMode guard (`ran.current`) — works perfectly, zero duplicate lines
- FadeIn animations fire at exactly the right moment — after boot, not before
- Single `data.js` file — updating the portfolio takes minutes across any section
- Accent color swap (`#7EB8D4` → `#2563EB`) with a single CSS variable changed the feel of the entire site
- LifePeek: three iterations shipped in one session — bento → sections → 4 separate pages with shared utilities
- Mouse-move parallax in Hero via direct DOM refs — smooth, zero React re-renders
- `vercel.json` SPA rewrite — deep links to LifePeek sub-pages work correctly

## Hiccups

- Boot sequence showing duplicate lines (React StrictMode double-fire) — fixed with `ran.current` ref guard
- FadeIn animations not triggering — IntersectionObserver firing before LoadingScreen cleared — fixed with `ready` prop + `booted` state gate
- Status bar invisible in light mode — fixed by hardcoding dark colors instead of CSS variables
- Headshot clipped on right — `overflow: hidden` on parent — fixed by removing it and converting to inline styles
- PowerShell execution policy blocking `npm` — fixed with `Set-ExecutionPolicy` + `Unblock-File`
- `document.title` being overridden by Chrome — fixed with explicit title set in `useEffect`
- `useGridCols` hook using `useState` instead of `useEffect` — setCols firing during render, cleanup never running — silently broke Open World and Touching Grass navigation
- LifePeek hub nav was using scroll anchors when it should have been routing — replaced with `<Link>` components
- `vercel.json` missing on initial LifePeek route deployment — direct URL to sub-routes returned 404 until added

## Honest Score

**If I'm being real:** This portfolio is genuinely good for a freshman in college. The design is original, the animations are intentional, the architecture is cleaner than most junior projects I've seen — single data layer, proper component separation, a real deployment pipeline. The LifePeek feature is something you don't see on portfolio sites, and that's the point.

What's rough: the inline styles make components noisy to read. The `data.js` approach doesn't scale past ~20 projects without some form of pagination or filtering. The LifePeek Phase 2 backend doesn't exist yet, so the feed pages are placeholders. But none of those things are embarrassing. They're next steps, and I know exactly what they are. That's what matters.
