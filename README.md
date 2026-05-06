# myPortfolio — dominioneze.com

Personal portfolio site for Dominion Eze. Built to showcase projects, experience, and skills in a clean, terminal-inspired design.

## Stack

- **React** — component-based UI
- **Vite** — fast dev server and build tool
- **Tailwind CSS v4** — utility classes via `@tailwindcss/vite` plugin
- **CSS custom properties** — full light/dark theme system using `[data-theme="dark"]`

## Typography

- **Fraunces** — headings and display text
- **Geist** — body and UI text
- **JetBrains Mono** — terminal blocks, labels, and monospace accents

## Features

- Light/dark mode toggle with localStorage persistence
- Animated typewriter hero with cycling lines
- Scripted terminal demo components per project
- Data-driven architecture — all content lives in `src/data.js`
- Smooth scroll with dynamic nav height compensation
- Clickable certification badges that open PDFs
- Planned project cards locked with padlock treatment

## Project Structure

```
src/
  components/     # Nav, Hero, About, Skills, Projects, Education, Experience, Contact, Footer
  data.js         # All content — profile, projects, experience, education, certifications
  index.css       # CSS variables, theme definitions, global styles
  ThemeContext.jsx # Dark mode state and toggle
public/
  resume.pdf      # Downloadable resume
  cert-*.pdf      # Certificate files
```

## Running Locally

```bash
npm install
npm run dev
```
