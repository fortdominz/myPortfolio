# Project Reflection — dominioneze.dev (Personal Portfolio)

**Project type:** Frontend web application
**Stack:** Vite + React, CSS custom properties, no UI framework
**Live at:** https://dominioneze.dev
**Repo:** https://github.com/fortdominz/myPortfolio
**Deployed:** May 2026
**Built by:** Dominion Eze

---

## Overview

A personal portfolio built from scratch to be a professional landing page for internship recruiting, and a central hub linking to all live projects. The goal was not a template portfolio — it had to feel like a product. Something that communicated how he thinks, not just what he has done.

The concept: **"Editorial OS"** — the page feels like a breathing magazine, until the projects section hits and it suddenly feels like a running system. Dark, technical, intentional.

---

## The Journey

### Why it was built
Before this project, Dominion had no live presence. GitHub existed, but nothing that a recruiter could land on and immediately understand who he was. The portfolio was built to fix that — to make the first impression count before a single word was read.

### What was built
- Terminal-style boot/loading screen that fires on every page load
- Two-column hero section with circular headshot, gradient ring, and animated dot grid background
- Typewriter animation in a terminal prompt box
- Scroll-triggered FadeIn animations tied to boot completion
- Fixed status bar at the bottom showing availability, school, and GPA
- CSS grain texture overlay for depth and atmosphere
- Card hover lift on project cards
- Light/dark theme toggle
- Clickable certification badges in the Education section
- MusicTasteMatch project card with Loom demo link
- All content managed from a single `src/data.js` file

### Deployment
- Hosted on Vercel, auto-deploys on every push to `main`
- Custom domain `dominioneze.dev` via Namecheap (`.dev` TLD — Google-owned, HTTPS-only by design)
- DNS: A record → Vercel IP, CNAME `www` → Vercel edge

---

## What I Learned About Frontend Systems Architecture

The biggest lesson was learning to treat a React app as a **system with layers**, not a collection of components. Every design decision had downstream effects:

- Using **CSS custom properties** (not Tailwind) meant full control over theming — one variable change cascades everywhere. This is what allowed the light/dark mode toggle to work without a CSS framework.
- Keeping all content in **`src/data.js`** meant zero components needed to be touched to update a project, skill, or certification. The data layer is the interface between content and presentation.
- The **FadeIn component** taught the most. The first version triggered animations on mount — but the LoadingScreen was blocking visibility during that window, so everything had already been "seen" by the IntersectionObserver before it became visible. The fix: a `ready` prop that delays the observer from starting until after the boot sequence completes. That's a real timing architecture problem.

---

## Architectural Decisions

**Why Vite over Create React App?**
Faster dev server, modern ESM-based bundling, and it's what the industry actually uses. CRA is effectively deprecated.

**Why no CSS framework?**
Tailwind and Bootstrap impose a visual language. The portfolio needed to feel original, not templated. Inline styles with CSS custom properties gave full control and kept the design intentional.

**Why a single `data.js` file?**
Separation of concerns. Any future collaborator or future-me can update content without touching component logic. It also means the portfolio scales — add a new project, skill, or certification in one place, it appears everywhere automatically.

**Why `overflow: hidden` removal mattered**
A single inherited CSS rule was clipping the headshot's glow ring. Removing it and converting all padding to inline styles was a lesson in how CSS cascade can silently constrain layouts for reasons you can't see by looking at the component in isolation.

---

## AI Collaboration — One Instance Where It Worked Well

The scroll animation architecture. The problem was subtle: FadeIn was using IntersectionObserver, which fires as soon as elements enter the viewport — but the LoadingScreen was on top with `opacity: 0` hiding everything. So all sections were technically "visible" to the observer during the boot phase and were immediately marked as seen, meaning animations never triggered.

The diagnosis and fix — introducing the `ready` prop that delays observer attachment until `booted` becomes `true` in App state — came from reasoning through the component lifecycle and the timing of visibility versus opacity. That kind of cross-component timing problem is hard to see without someone walking the execution path alongside you.

---

## AI Collaboration — One Instance Where It Fell Short or Surprised Me

The first attempt at Experience as a vertical timeline. It was built, shipped, and looked clean in theory. But when viewed in context with the rest of the portfolio, it felt like a different app had been pasted in — it didn't belong. The same happened with the horizontal scroll skills section. Both were reverted.

What that revealed: AI can build exactly what you describe, but it can't feel whether a design fits the system it lives in. That judgment only comes from the person who owns the vision. The lesson is that describing what you want is not enough — you have to be able to evaluate the output against the whole, not just the spec.

---

## What Surprised Me About Building and Testing This

The boot sequence duplicating in development. React's StrictMode intentionally runs effects twice in development to surface side effects — and the `useEffect` in LoadingScreen was not guarded against that, so every boot line appeared twice. The fix was a `useRef` guard (`ran.current`) that prevents the second invocation from doing anything. It's the kind of thing that only happens in React 18 dev mode and disappears in production, which makes it hard to debug without knowing what to look for.

Also: how much a single small visual decision changes the entire feel. Adding the CSS grain texture (a tiny SVG fractalNoise pattern at 0.032 opacity) went from "what's that?" to "why does this feel so premium?" in one question. Texture is invisible until it's gone.

---

## Could This System Be Misused? How Would You Prevent It?

The portfolio itself is static — there's no user input, no database, no authentication surface. The only attack surface is the resume PDF and cert PDFs in the `/public` folder, which are intentionally public.

The risk worth noting: anyone could clone the repo and swap the content to impersonate a different person. Prevention: the GitHub repo is public by design (it's a portfolio, after all), but the domain is owned and the deployment is controlled. If impersonation were a concern in the future, adding a `humans.txt` file and signing commits creates a verifiable authorship record.

---

## What Would I Do Differently If I Rebuilt This From Scratch?

**React Router from the start.** As apps get added and linked from the portfolio, the nav will need routes — not just anchor links. Building with Router initially would avoid the refactor later.

**Component-level CSS files instead of all inline styles.** Inline styles work and give full control, but they make components hard to read at a glance. A CSS Modules or vanilla extract approach would keep the design power without the noise.

**A design token file separate from the CSS.** Right now tokens live in `index.css` as custom properties. For a system that scales — especially when adding subdomains that need to match the design language — having tokens as a JS object that generates the CSS would allow sharing across projects.

---

## What's the One Thing This Project Taught Me That a Tutorial Never Would?

That the hardest part of building a real product is **knowing when to stop adding things**.

The horizontal scroll skills, the vertical timeline, the section dots — all of these were built, looked interesting in isolation, and got reverted. Because when you step back and look at the whole, you realize that clever features can fragment a design that was working. A tutorial teaches you how to build the feature. It never teaches you how to decide whether the feature belongs.

Restraint is an engineering skill. It's just not one that gets demoed.

---

## As a System Architect

- The portfolio is a **presentation layer over a data model** — `data.js` is the model, the components are views
- Deployment is a **CI/CD pipeline**: push to GitHub → Vercel auto-builds → live in ~60 seconds
- The theming system uses **CSS custom properties as a runtime configuration layer** — no JavaScript needed for theme switching
- The animation system respects **system state** (boot complete) before activating — it's event-driven, not time-driven

## As an AI Engineer

- Used AI as a **collaborator on architecture decisions**, not just code generation — the FadeIn timing problem was diagnosed through conversation, not autocomplete
- Learned to **evaluate AI output against the whole system**, not just the spec — the reverted features are proof
- The boot sequence, grain texture, and status bar ideas were **AI-proposed, human-approved** — the creative direction was set, the implementation was collaborative
- Every feature that shipped was **intentional** — nothing was added because it was possible. It was added because it belonged.

---

## Wins

- Went from zero live presence to a deployed portfolio at a custom `.dev` domain in one session
- Boot sequence with React StrictMode guard works perfectly
- Scroll animations fire at exactly the right moment — after the user sees the page, not before
- The headshot-in-hero two-column layout feels natural, not forced
- Single source of truth in `data.js` — updating the portfolio takes minutes, not hours

## Hiccups

- Boot sequence was showing duplicate lines (StrictMode double-fire) — fixed with `ran.current`
- FadeIn animations were silently not triggering — fixed with `ready` prop + `booted` state
- Status bar was invisible in light mode — fixed by hardcoding dark colors instead of using theme variables
- Headshot was being clipped on the right — fixed by removing `overflow: hidden` and `max-w-5xl` from the Hero section
- PowerShell execution policy blocked `npm` — fixed with `Set-ExecutionPolicy` + `Unblock-File`
- Vercel deployment was initiated before the latest commits were pushed — pushed first, then deployed
