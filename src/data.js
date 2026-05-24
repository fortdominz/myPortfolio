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
    category: "Languages & Scripting",
    items: ["Python", "Java", "JavaScript", "Bash", "HTML", "CSS", "SQL"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "FastAPI", "Vite", "Node.js", "Django", "Bootstrap", "MongoDB", "Git"],
  },
  {
    category: "Cloud, DevOps & Infra",
    items: ["Linux", "AWS", "Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins", "GitHub Actions", "GitLab CI/CD", "Helm", "GCP", "Prometheus", "Grafana", "Loki"],
  },
  {
    category: "AI Tools & Agents",
    items: ["Gemini AI", "Claude Code", "GitHub Copilot", "Amazon Q"],
  },
]

export const projects = [
  {
    id: "gatekeep",
    name: "GateKeep — Facial Recognition Security System",
    status: "complete",
    tagline: "Real-time computer vision security. Know who's at the door before they knock.",
    description:
      "Built a real-time computer vision security dashboard with an MJPEG camera stream, InsightFace-powered face detection, and cosine similarity matching against an enrolled watchlist. React SOC-style interface includes live feed, alert logging, enrollment, and banned-persons management.",
    stack: ["Python", "FastAPI", "React", "Vite", "InsightFace", "SQLite"],
    github: "https://github.com/fortdominz/gatekeep",
    demo: null,
    live: "https://gatekeep.dominioneze.dev",
    terminal: [
      { delay: 0,    type: "input",  text: "python main.py" },
      { delay: 700,  type: "output", text: "GateKeep Security Dashboard — starting..." },
      { delay: 1000, type: "output", text: "" },
      { delay: 1100, type: "output", text: "  Camera stream:     ACTIVE" },
      { delay: 1200, type: "output", text: "  Face detection:    InsightFace loaded" },
      { delay: 1300, type: "output", text: "  Watchlist entries: 4 enrolled" },
      { delay: 1500, type: "output", text: "" },
      { delay: 1600, type: "output", text: "⟳ Scanning frame..." },
      { delay: 2200, type: "output", text: "  Face detected — cosine similarity: 0.91" },
      { delay: 2500, type: "output", text: "" },
      { delay: 2600, type: "output", text: "  ⚠ ALERT: Banned person detected" },
      { delay: 2800, type: "output", text: "  Match: John Doe  confidence: 91%" },
      { delay: 3000, type: "output", text: "  Alert logged → alerts/2026-05-17.json" },
    ],
  },
  {
    id: "job-tracker",
    name: "Job Application Tracker v1.0",
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
    name: "MusicTasteMatch v3.0",
    status: "complete",
    tagline: "Describe your mood in plain English. Get songs that actually match.",
    description:
      "AI-powered music recommendation system built with a 6-stage pipeline: Llama 3.2 converts natural language into structured preference profiles, searches the live Spotify catalog, scores songs by genre/mood/energy match, runs a bias detector with confidence scoring, gets an AI critique pass, and logs every session for auditability. v2.0 — evolved from a static CSV to full Spotify API + local LLM inference.",
    stack: ["Python", "Gemini GenAI API", "Spotify API", "FastAPI", "React", "Pytest"],
    github: "https://github.com/fortdominz/musictastematch-applied-ai",
    demo: "https://www.loom.com/share/2e682286e00e4854b13feece69df9ee6",
    live: "https://musictastematchai.dominioneze.dev",
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
    name: "DayKeep v2.0",
    status: "complete",
    tagline: "Daily accountability, habits, and journaling — all in one place.",
    description:
      "A full-stack daily accountability app with Goals, Tasks, and Journal. Built with FastAPI + React. Features streak tracking, stale task detection, mood logging, postpone history, and a real-time dashboard.",
    stack: ["FastAPI", "React", "Vite", "Python", "JSON"],
    github: "https://github.com/fortdominz/daykeep",
    demo: null,
    live: "https://daykeep.dominioneze.dev",
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
    name: "Study Session Tracker v1.0",
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
    role: "Fellow",
    org: "Propel2excel",
    period: "2026 – Present",
    location: "Remote",
    tags: ["Professional Dev", "Leadership", "Career Readiness"],
    bullets: [
      "Selected as a fellow in Propel2excel, a program dedicated to accelerating the careers of high-potential students.",
    ],
  },
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
    org: "Extern",
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
    period: "Jan. 2016 – Sep. 2021",
    gpa: null,
    highlights: [],
  },
]

export const certifications = [
  { name: "AI Fluency for Students", issuer: "Anthropic", file: "/cert-anthropic-ai-fluency.pdf" },
  { name: "Intermediate Technical Interview Prep (TIP102)", issuer: "CodePath", file: "/cert-codepath-tip102.pdf" },
  { name: "AI Engineering (AI110)", issuer: "CodePath", file: "/cert-codepath-ai110.pdf" },
  { name: "Intro to Web Development", issuer: "CodePath", file: "/cert-codepath-web101.pdf" },
  { name: "Intro to Technical Interview Prep (TIP101)", issuer: "CodePath", file: "/cert-codepath-tip101.pdf" },
  { name: "CodePath In Residence (CIR)", issuer: "CodePath × Fisk University", file: "/cert-codepath-cir.pdf" },
  { name: "Remote Extern", issuer: "Extern × Emboldly", file: "/cert-extern-emboldly.pdf" },
]

// ── LIFEPEEK ─────────────────────────────────────────────────────────────────

// Life Journey — horizontal timeline milestones
// types: 'milestone' | 'program' | 'experience' | 'future'
export const lifejourney = [
  { id: "fisk-start",    date: "Jan 2025",    title: "Arrived at Fisk University",          type: "milestone",   color: "#2563EB", tag: "Education"   },
  { id: "stanford",      date: "Apr 2025",    title: "Stanford Code in Place",              type: "program",     color: "#EF4444", tag: "Program"     },
  { id: "web101",        date: "Apr 2025",    title: "CodePath WEB101",                     type: "program",     color: "#10B981", tag: "Program"     },
  { id: "oracle",        date: "May 2025",    title: "Oracle REACH",                        type: "program",     color: "#F59E0B", tag: "Program"     },
  { id: "pwc",           date: "Jul 2025",    title: "Extern · Remote Program",             type: "experience",  color: "#EF4444", tag: "Experience"  },
  { id: "summer-build",  date: "Summer 2025", title: "15+ Python Projects Built",           type: "milestone",   color: "#2563EB", tag: "Build Sprint" },
  { id: "codepath-ai",   date: "Feb 2026",    title: "CodePath AI Engineering Fellow",      type: "program",     color: "#8B5CF6", tag: "Program"     },
  { id: "codepath-tip",  date: "Feb 2026",    title: "CodePath Technical Interview Prep",   type: "program",     color: "#06B6D4", tag: "Program"     },
  { id: "ey",            date: "Mar 2026",    title: "EY Expedition",                       type: "program",     color: "#06B6D4", tag: "Program"     },
  { id: "propel",        date: "2026",        title: "Propel2Excel Fellow",                 type: "program",     color: "#8B5CF6", tag: "Program"     },
  { id: "internship",    date: "Soon",        title: "First Internship",                    type: "future",      color: null,      tag: "Next Chapter" },
]

// Open World — educational program posts
// images: paths relative to /public (e.g. '/life/ey-week1.jpg')
// Leave images: [] until you have photos — card renders without image gracefully
export const openworld = [
  {
    id: "ey-expedition-start",
    date: "Mar 2026",
    program: "EY Expedition",
    title: "Week 1 at EY Expedition",
    body: "First week in the EY Expedition accelerator. Covered AI fundamentals, digital transformation frameworks, and what it actually means to consult at a Big 4 firm. The cohort is sharp — being in a room of people who are actually hungry is different. This is going to push me.",
    images: [],
    tags: ["EY", "consulting", "accelerator"],
  },
]

// Touching Grass — outings, hobbies, real life moments
// location: optional — where it happened
export const touchinggrass = [
  {
    id: "nashville-first-look",
    date: "Spring 2025",
    location: "Nashville, TN",
    title: "Learning the city",
    body: "First few months figuring out Nashville. Walked downtown, found the good spots, started feeling at home. Lagos to Nashville is a big jump — but the city has its own energy once you stop comparing it to what you came from.",
    images: [],
    tags: ["nashville", "exploring", "new city"],
  },
]

// Legacy bento tiles — kept for reference, not used by new page
// (can be removed once new page is confirmed)
export const lifepeek = [
  // ── HERO ──
  {
    id: "journey",
    type: "hero",
    colSpan: 4,
    title: "Lagos → Nashville",
    subtitle: "The journey that made me.",
    body: "Flew in January 2025 — alone, a semester late, no CS classes that term. Visa delays pushed my start back. Most people would wait. I locked in and built everything myself.",
    tag: "Origin story",
  },

  // ── ROW 2 ──
  {
    id: "gpa",
    type: "stat",
    colSpan: 1,
    value: "4.0",
    label: "GPA",
    sub: "Fisk University",
    color: "#F59E0B",
  },
  {
    id: "route",
    type: "stat",
    colSpan: 1,
    value: "NG → US",
    label: "Route",
    sub: "Lagos to Nashville",
    color: "#10B981",
  },
  {
    id: "summer",
    type: "story",
    colSpan: 2,
    title: "The Summer I Built Everything",
    body: "No CS classes that first semester. So I made my own curriculum — Stanford Code in Place, CodePath WEB101, 15+ Python projects. ATM simulator. Snake. Pong. REST APIs. All summer. No cohort. Just me.",
    tag: "Summer 2025",
    color: "#2563EB",
  },

  // ── ROW 3 ──
  {
    id: "ey",
    type: "program",
    colSpan: 2,
    org: "EY",
    title: "Expedition EY",
    body: "Competitive accelerator for high-potential CS students. Exploring AI, cybersecurity, and data analytics inside EY's digital transformation framework.",
    period: "Mar 2026 – Present",
    badge: "Active",
    color: "#06B6D4",
  },
  {
    id: "codepath-ai",
    type: "program",
    colSpan: 1,
    org: "CodePath",
    title: "AI Engineering Fellow",
    body: "Building RAG systems, LangChain pipelines, Vector DBs, and production AI apps.",
    period: "Feb 2026 – Present",
    badge: "Active",
    color: "#8B5CF6",
  },
  {
    id: "oracle",
    type: "program",
    colSpan: 1,
    org: "Oracle",
    title: "REACH Participant",
    body: "Professional development initiative for underrepresented students in technology.",
    period: "May 2025 – Present",
    badge: "Active",
    color: "#F59E0B",
  },

  // ── ROW 4 ──
  {
    id: "quote",
    type: "quote",
    colSpan: 2,
    text: "\"My pace doesn't have to match anyone else's for me to make progress. I create my own opportunities by being consistent, curious, and proactive.\"",
    author: "— Dominion Eze",
    color: "#10B981",
  },
  {
    id: "hobby-music",
    type: "hobby",
    colSpan: 1,
    emoji: "🎵",
    title: "Music",
    body: "Always playing something. Mood-driven playlist guy. The right song at the right time hits different.",
    color: "#8B5CF6",
  },
  {
    id: "pwc",
    type: "program",
    colSpan: 1,
    org: "Extern",
    title: "Remote Extern",
    body: "Consulted for a social impact startup. Built a Partnership Playbook. Presented to exec leadership.",
    period: "Jul – Aug 2025",
    badge: "Completed",
    color: "#EF4444",
  },

  // ── ROW 5 ──
  {
    id: "math-teacher",
    type: "story",
    colSpan: 2,
    title: "5 Years Teaching Math",
    body: "Before college, I spent five years as a math teaching assistant in Lagos. Led a team of 3 to win a school-wide competition — contributing 70%+ of the score. Breaking hard things down until they make sense is practiced, not new.",
    tag: "2016 – 2021 · Lagos, Nigeria",
    color: "#F59E0B",
  },
  {
    id: "codepath-tip",
    type: "program",
    colSpan: 1,
    org: "CodePath",
    title: "Technical Interview Prep",
    body: "Advanced DSA — Dynamic Programming, Backtracking, Graphs. UMPIRE framework. Real pressure.",
    period: "Feb 2026 – Present",
    badge: "Active",
    color: "#06B6D4",
  },
  {
    id: "propel",
    type: "program",
    colSpan: 1,
    org: "Propel2Excel",
    title: "Fellow",
    body: "Accelerating careers of high-potential students through professional development and leadership.",
    period: "2026 – Present",
    badge: "Active",
    color: "#8B5CF6",
  },

  // ── ROW 6 ──
  {
    id: "stanford",
    type: "program",
    colSpan: 2,
    org: "Stanford University",
    title: "Code in Place",
    body: "Stanford's introductory Python programming course with live lectures and global community. Where structured CS thinking began.",
    period: "Apr – Jun 2025",
    badge: "Completed",
    color: "#EF4444",
  },
  {
    id: "hobby-build",
    type: "hobby",
    colSpan: 1,
    emoji: "🔨",
    title: "Building",
    body: "If I can think it, I'll try to build it. Ideas first, sleep second. Every project starts with a real problem.",
    color: "#2563EB",
  },
  {
    id: "web101",
    type: "program",
    colSpan: 1,
    org: "CodePath",
    title: "WEB101",
    body: "Intro to Web Development. HTML, CSS, JavaScript. Where the frontend journey officially started.",
    period: "Apr – Aug 2025",
    badge: "Completed",
    color: "#10B981",
  },
]
