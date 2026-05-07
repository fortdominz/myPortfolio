export const profile = {
  name: "Dominion Eze",
  handle: "fortdominz",
  tagline: "I build tools I actually need — then ship them for everyone who needs them too.",
  subline: "CS @ Fisk University · 4.0 GPA · Building in public",
  bio: `I came to Fisk as a spring 2025 student. Visa issues pushed my start back, and there were no CS classes offered that semester — I already felt behind before I'd even started. That summer, I locked in.

I taught myself Python, completed Stanford's Code in Place, and built projects just to prove I could. Before college, I spent five years as a math teaching assistant in Nigeria — breaking hard things down until they made sense is something I've practiced for a long time.

My pace doesn't have to match anyone else's. I create my own opportunities by being consistent, curious, and proactive. Every tool I build starts as something I personally need — and I keep building until others can use it too.`,
  email: "fortdominz10@gmail.com",
  phone: "615-587-0596",
  github: "https://github.com/fortdominz",
  linkedin: "https://www.linkedin.com/in/dominion-eze-278b57307",
  location: "Nashville, TN",
  education: {
    school: "Fisk University",
    degree: "Bachelor of Science in Computer Science",
    grad: "Dec. 2028",
    gpa: "4.0",
    coursework: ["Intro to CS I & II (Python, Java)", "Data Structures", "Calculus I & II"],
  },
}

export const skills = [
  {
    category: "Languages",
    items: ["Python", "Java", "JavaScript", "HTML", "CSS", "SQL"],
  },
  {
    category: "Frameworks & Tools",
    items: ["React", "FastAPI", "MongoDB", "Node.js", "Django", "Bootstrap", "Streamlit", "Pytest", "Gemini GenAI API", "Spotify Web API", "Git"],
  },
  {
    category: "Currently Learning",
    items: ["FastAPI", "MongoDB", "SQL", "Kotlin", "Go", "Swift"],
  },
  {
    category: "AI-Augmented Dev",
    items: ["Claude Code — guided development, code review, agentic workflows", "Ollama (Llama 3.2) — local AI inference"],
  },
]

export const projects = [
  {
    id: "job-tracker",
    name: "Job Application Tracker",
    status: "complete",
    tagline: "A CLI tool to track every internship application in one place.",
    description:
      "6-phase CLI app across 4 modules — tracking 13 fields through a 9-stage pipeline with full CRUD, 5-sort modes, keyword search, deadline alerts, CSV export, and a terminal analytics dashboard. Architected with an isolated data layer for planned MongoDB migration.",
    stack: ["Python", "OOP", "JSON", "CLI"],
    github: "https://github.com/fortdominz/job-application-tracker",
    demo: "https://www.youtube.com/watch?v=IAcH4Dfapi8",
    terminal: [
      { delay: 0,   type: "input",  text: "python main.py" },
      { delay: 800, type: "output", text: "┌─────────────────────────────────┐" },
      { delay: 900, type: "output", text: "│   Job Application Tracker v1    │" },
      { delay: 1000, type: "output", text: "└─────────────────────────────────┘" },
      { delay: 1200, type: "output", text: "" },
      { delay: 1300, type: "output", text: "  [1] Add application" },
      { delay: 1400, type: "output", text: "  [2] View all applications" },
      { delay: 1500, type: "output", text: "  [3] Filter & search" },
      { delay: 1600, type: "output", text: "  [4] Analytics dashboard" },
      { delay: 1700, type: "output", text: "  [5] Export to CSV" },
      { delay: 1800, type: "output", text: "  [q] Quit" },
      { delay: 2000, type: "input",  text: "2" },
      { delay: 2600, type: "output", text: "" },
      { delay: 2700, type: "output", text: "  Company          Role              Status" },
      { delay: 2800, type: "output", text: "  ──────────────────────────────────────────" },
      { delay: 2900, type: "output", text: "  Google           SWE Intern        Applied" },
      { delay: 3000, type: "output", text: "  Meta             SWE Intern        OA Sent" },
      { delay: 3100, type: "output", text: "  Stripe           Eng Intern        Interview" },
      { delay: 3200, type: "output", text: "" },
      { delay: 3300, type: "output", text: "  3 applications tracked." },
    ],
  },
  {
    id: "musictastematch",
    name: "MusicTasteMatch",
    status: "complete",
    tagline: "Describe your mood in plain English. Get songs that actually match.",
    description:
      "AI-powered music recommendation system built with a 6-stage pipeline: Llama 3.2 converts natural language into structured preference profiles, searches the live Spotify catalog, scores songs by genre/mood/energy match, runs a bias detector with confidence scoring, gets an AI critique pass, and logs every session for auditability. v2.0 — evolved from a static CSV to full Spotify API + local LLM inference.",
    stack: ["Python", "Gemini GenAI API", "Spotify API", "FastAPI", "React", "Pytest"],
    github: "https://github.com/fortdominz/musictastematch-applied-ai",
    demo: "https://www.loom.com/share/2e682286e00e4854b13feece69df9ee6",
    app: "https://musictastematchai.dominioneze.dev",
    terminal: [
      { delay: 0,    type: "input",  text: "python main.py" },
      { delay: 700,  type: "output", text: "MusicTasteMatch v2.0 — AI Music Recommender" },
      { delay: 900,  type: "output", text: "" },
      { delay: 1000, type: "input",  text: "Describe your vibe: late night study, lo-fi, mellow" },
      { delay: 1600, type: "output", text: "⟳ Building preference profile via Llama 3.2..." },
      { delay: 2200, type: "output", text: "  genre: lo-fi / genre: chill  mood: focused" },
      { delay: 2400, type: "output", text: "  energy: 0.32  valence: 0.48  tempo: ~85bpm" },
      { delay: 2700, type: "output", text: "" },
      { delay: 2800, type: "output", text: "⟳ Searching Spotify catalog..." },
      { delay: 3300, type: "output", text: "  Found 48 candidate tracks" },
      { delay: 3500, type: "output", text: "" },
      { delay: 3600, type: "output", text: "✓ Top recommendations:" },
      { delay: 3800, type: "output", text: "  1. Snowflake — idealism           score: 0.94" },
      { delay: 3950, type: "output", text: "  2. Quiet Hours — Float Away       score: 0.91" },
      { delay: 4100, type: "output", text: "  3. Philanthrope — Reminiscing     score: 0.88" },
      { delay: 4300, type: "output", text: "" },
      { delay: 4400, type: "output", text: "  bias confidence: 0.12 ✓ (no dominance detected)" },
      { delay: 4600, type: "output", text: "  session logged → sessions/2026-05-05.json" },
    ],
  },
  {
    id: "daykeep",
    name: "DayKeep",
    status: "complete",
    tagline: "Daily accountability, habits, and journaling — all in one place.",
    description:
      "A full-stack daily accountability app with Goals, Tasks, and Journal. Built with FastAPI + React. Features streak tracking, stale task detection, mood logging, postpone history, and a real-time dashboard.",
    stack: ["FastAPI", "React", "Vite", "Python", "JSON"],
    github: "https://github.com/fortdominz/daykeep",
    demo: "https://daykeep.dominioneze.dev",
    terminal: [
      { delay: 0,   type: "input",  text: "python main.py" },
      { delay: 800, type: "output", text: "┌──────────────────────────┐" },
      { delay: 900, type: "output", text: "│   DayKeep · May 5 2026   │" },
      { delay: 1000, type: "output", text: "└──────────────────────────┘" },
      { delay: 1200, type: "output", text: "" },
      { delay: 1300, type: "output", text: "  🔥 Current streak: 12 days" },
      { delay: 1500, type: "output", text: "" },
      { delay: 1600, type: "output", text: "  Today's tasks:" },
      { delay: 1700, type: "output", text: "  [✓] Review FastAPI docs" },
      { delay: 1800, type: "output", text: "  [ ] Push portfolio commit" },
      { delay: 1900, type: "output", text: "  [ ] Study Data Structures ch.4" },
      { delay: 2100, type: "output", text: "" },
      { delay: 2200, type: "output", text: "  Journal entry for today:" },
      { delay: 2300, type: "output", text: "  > locked in on the portfolio build." },
      { delay: 2400, type: "output", text: "  > feeling the momentum." },
    ],
  },
  {
    id: "study-tracker",
    name: "Study Session Tracker",
    status: "complete",
    tagline: "Track study sessions, subjects, and consistency over time.",
    description:
      "CLI tool that tracks study sessions at the subject level, feeding study data and subject-level insights into the cross-app analytics layer at dominioneze.com.",
    stack: ["Python", "OOP", "JSON", "CLI"],
    github: "https://github.com/fortdominz/study-session-tracker",
    demo: null,
    terminal: [
      { delay: 0,   type: "input",  text: "python main.py" },
      { delay: 800, type: "output", text: "┌───────────────────────────────┐" },
      { delay: 900, type: "output", text: "│   Study Session Tracker       │" },
      { delay: 1000, type: "output", text: "└───────────────────────────────┘" },
      { delay: 1200, type: "output", text: "" },
      { delay: 1300, type: "output", text: "  This week:" },
      { delay: 1400, type: "output", text: "  Data Structures    ████████░░  4.5 hrs" },
      { delay: 1500, type: "output", text: "  Python             ██████░░░░  3.0 hrs" },
      { delay: 1600, type: "output", text: "  Calculus II        ████░░░░░░  2.0 hrs" },
      { delay: 1800, type: "output", text: "" },
      { delay: 1900, type: "output", text: "  Total: 9.5 hrs  ·  5-day streak" },
    ],
  },
  {
    id: "game-night",
    name: "Neighborhood Game Night",
    status: "complete",
    tagline: "A responsive multi-page site for local gaming events.",
    description:
      "Designed and built a responsive multi-page web application for local gaming events. Mobile-first Bootstrap layout with JavaScript dynamic DOM manipulation and RSVP event handling.",
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    github: "https://github.com/fortdominz",
    demo: null,
    terminal: null,
    link: "https://positive-berry-musician-695.vscodeedu.app/",
  },
  {
    id: "python-cli-suite",
    name: "Python CLI Suite",
    status: "complete",
    tagline: "15+ Python projects built while learning — from games to API integrations.",
    description:
      "A collection of 15+ Python projects spanning CLI, GUI, and API paradigms: ATM simulator, Coffee Machine (OOP), Snake & Turtle Racing, Quiz Game, Blackjack, and integrations with OpenWeatherMap, Alpha Vantage, NewsAPI, and Twilio. Built during self-study summer 2025.",
    stack: ["Python", "OOP", "Tkinter", "Turtle Graphics", "REST APIs", "Twilio"],
    github: "https://github.com/fortdominz/python-cli-suite",
    demo: null,
    terminal: null,
  },
  {
    id: "ezresume",
    name: "EzResume",
    status: "planned",
    tagline: "Your complete experience on record. Your resume, on demand.",
    description:
      "Resume management platform where your full experience lives permanently in journals, and resumes are curated views — toggled, arranged, and exported on demand. Overleaf-style split screen editor.",
    stack: ["React", "FastAPI", "MongoDB", "React-PDF", "Tiptap", "dnd-kit"],
    github: null,
    demo: null,
    terminal: null,
    link: "https://ezresume.app",
  },
  {
    id: "ezguide",
    name: "EzGuide",
    status: "planned",
    tagline: "The guide nobody gave you — built by someone who needed it.",
    description:
      "A full stack platform built specifically for international students. Status & immigration info, time management tools, community, resources, and belonging. Built by someone who lived it.",
    stack: ["React", "Tailwind", "FastAPI", "MongoDB"],
    github: null,
    demo: null,
    terminal: null,
  },
  {
    id: "ezfill",
    name: "EzFill",
    status: "planned",
    tagline: "Apply once, fill forever.",
    description:
      "Chrome extension that watches you fill job application forms, saves your answers, and auto-fills future applications. Makes applying faster and less stressful.",
    stack: ["JavaScript", "Chrome Extension APIs"],
    github: null,
    demo: null,
    terminal: null,
  },
]

export const experience = [
  {
    role: "Expedition EY Participant",
    org: "EY",
    period: "Mar. 2026 – Present",
    location: "Remote",
    tags: ["Consulting", "Tech Strategy", "Leadership"],
    bullets: [
      "Selected for a competitive professional accelerator for high-potential CS and Information Systems students.",
      "Exploring AI, cybersecurity, and data analytics within EY's digital transformation frameworks through technical modules and leadership workshops.",
      "Engaging with EY technology leaders to gain insights into enterprise-level software solutions and tech consulting methodologies.",
    ],
  },
  {
    role: "Intermediate Technical Interview Prep",
    org: "CodePath",
    period: "Feb. 2026 – Present",
    location: "Remote",
    tags: ["Algorithms", "DSA", "Interview Prep"],
    bullets: [
      "Intensive fellowship mastering advanced data structures and algorithms — Dynamic Programming, Backtracking, and Advanced Graphs.",
      "Applying the UMPIRE framework to articulate technical logic and optimize space/time complexity in live coding sessions.",
      "Simulating high-pressure technical interview environments through rigorous pair-programming and peer review.",
    ],
  },
  {
    role: "AI Engineering Fellow",
    org: "CodePath",
    period: "Feb. 2026 – Present",
    location: "Remote",
    tags: ["AI/ML", "LangChain", "Python"],
    bullets: [
      "Building, evaluating, and debugging production-ready AI applications in a project-based fellowship.",
      "Developing RAG-based systems using Python, LangChain, and Vector Databases (Pinecone/ChromaDB).",
      "Designing complex system prompts and deploying AI-driven features into functional web applications.",
    ],
  },
  {
    role: "Remote Extern",
    org: "PwC",
    period: "July – Aug. 2025",
    location: "Remote",
    tags: ["Consulting", "Strategy", "Research"],
    bullets: [
      "Consulted for a social impact startup aiming to provide 1.5M women of color and non-binary individuals leadership access.",
      "Identified and qualified 5 high-value donor organizations through mission-alignment research.",
      "Developed a Partnership Playbook with tailored outreach strategies, presenting to executive leadership using PwC consulting frameworks.",
    ],
  },
  {
    role: "Mathematics Teaching Assistant & Competition Lead",
    org: "Oshboug Modern Secondary School",
    period: "Apr. 2016 – Sep. 2021",
    location: "Lagos, Nigeria",
    tags: ["Teaching", "Leadership", "Problem Solving"],
    bullets: [
      "Broke down complex mathematical concepts for students over 5 years — directly transferable to algorithm design, debugging, and technical communication.",
      "Led a team of 3 to win a school-wide mathematics competition, contributing over 70% of the total score.",
    ],
  },
  {
    role: "Laboratory Assistant",
    org: "Oshboug Modern Secondary School",
    period: "Oct. 2020 – Sep. 2021",
    location: "Lagos, Nigeria",
    tags: ["Research", "Operations", "STEM"],
    bullets: [
      "Coordinated chemistry and physics practicals, ensuring safety compliance and smooth lab operations.",
    ],
  },
  {
    role: "REACH Participant",
    org: "Oracle",
    period: "May 2025 – Present",
    location: "Remote",
    tags: ["Professional Dev", "Tech Industry"],
    bullets: [
      "Selected for Oracle's REACH program, a professional development initiative for underrepresented students in technology.",
    ],
  },
  {
    role: "WEB101 — Intro to Web Development",
    org: "CodePath",
    period: "Apr. – Aug. 2025",
    location: "Remote",
    tags: ["HTML/CSS", "JavaScript", "Frontend"],
    bullets: [
      "Completed CodePath's live, hands-on introduction to HTML, CSS, and JavaScript.",
      "Built a personal website using responsive layouts, interactive elements, and clean design practices.",
    ],
  },
  {
    role: "Code in Place",
    org: "Stanford University",
    period: "Apr. – Jun. 2025",
    location: "Remote",
    tags: ["Python", "Programming"],
    bullets: [
      "Participated in Stanford's introductory Python programming course with live lectures and guided exercises.",
      "Strengthened foundational programming logic — variables, conditionals, loops, and functions.",
    ],
  },
  {
    role: "Protocol Officer",
    org: "Jets Club, Oshboug Modern Secondary School",
    period: "May – Aug. 2018",
    location: "Lagos, Nigeria",
    tags: ["Project Management", "Leadership", "STEM"],
    bullets: [
      "Organized meetings and documented STEM projects for 30+ members, including building light bulbs, extension boxes, and mini fans.",
    ],
  },
]

export const extracurriculars = [
  "African Students Association (ASA)",
  "Computer Science Club",
  "ColorStack",
]

export const education = [
  {
    school: "Fisk University",
    location: "Nashville, TN",
    degree: "Bachelor of Science — Computer Science",
    period: "Jan. 2025 – Dec. 2028",
    gpa: "4.0",
    highlights: [
      "Intro to CS I & II (Python, Java)",
      "Data Structures",
      "Calculus I & II",
    ],
  },
  {
    school: "Oshboug Modern Secondary School",
    location: "Lagos, Nigeria",
    degree: "High School Diploma — Science",
    period: "Jan. 2016 – Sep. 2022",
    gpa: null,
    highlights: [],
  },
]

export const certifications = [
  { name: "Intro to Web Development", issuer: "CodePath", file: "/cert-codepath-web101.pdf" },
  { name: "Intro to Technical Interview Prep (TIP101)", issuer: "CodePath", file: "/cert-codepath-tip101.pdf" },
  { name: "Intro to CS Interview Prep (CIR)", issuer: "CodePath", file: "/cert-codepath-cir.pdf" },
  { name: "Remote Extern", issuer: "Extern × Emboldly", file: "/cert-extern-emboldly.pdf" },
]
