export const profile = {
  name: "Dominion Eze",
  handle: "fortdominz",
  tagline: "I build tools I actually need. Then I ship them for everyone who needs them too.",
  subline: "CS @ Fisk University · 4.0 GPA · Building in public",
  bio: `I came to Fisk as a spring 2025 student. Visa issues pushed my start back, and there were no CS classes offered that semester. I already felt behind before I'd even started. That summer, I locked in.

I taught myself Python, completed Stanford's Code in Place, and built projects just to prove I could. Before college, I spent five years as a math teaching assistant in Nigeria. Breaking hard things down until they make sense is something I've practiced for a long time.

My pace doesn't have to match anyone else's. I create my own opportunities by being consistent, curious, and proactive. Every tool I build starts as something I personally need. I keep building until others can use it too.`,
  email: "ezedominiongideon@gmail.com",
  phone: "615-587-0596",
  github: "https://github.com/fortdominz",
  linkedin: "https://www.linkedin.com/in/dominioneze",
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
    name: "GateKeep: Facial Recognition Security System",
    shortName: "GateKeep",
    status: "complete",
    tagline: "Real-time computer vision security. Know who's at the door before they knock.",
    heroColor: "#E8EEF7",
    overview: "GateKeep is a real-time facial recognition security dashboard you can run on any camera. InsightFace detects faces in the live feed and cosine similarity checks each one against an enrolled watchlist. Every scan completes in under a second. Authorized people get logged as granted, unknown faces get flagged, and anyone on the banned list triggers an alert that writes to a timestamped log file. The React frontend shows a live camera feed, a SOC-style access log, and an enrollment panel for managing the watchlist.",
    highlights: [
      { value: "< 1s", label: "Face match latency" },
      { value: "MJPEG", label: "Live camera stream" },
    ],
    howItWorks: [
      { title: "Camera streams live", desc: "An MJPEG stream feeds frames continuously into the detection pipeline in real time." },
      { title: "InsightFace detects faces", desc: "Each frame is scanned for faces with bounding boxes drawn and confidence scores attached." },
      { title: "Face embeddings are generated", desc: "Detected faces are converted into numerical vectors that encode facial geometry." },
      { title: "Cosine similarity matches the watchlist", desc: "Each embedding is compared against every enrolled face in SQLite. The closest match above the threshold is the identity." },
      { title: "Access decision is made", desc: "Authorized faces are granted. Unknown faces are flagged. Banned faces trigger a live alert on the dashboard." },
      { title: "Every scan is logged", desc: "Results are written to a timestamped file with identity, confidence score, and access decision." },
    ],
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
    shortName: "Job Tracker",
    status: "complete",
    tagline: "A CLI tool to track every internship application in one place.",
    heroColor: "#EEF2F7",
    overview: "A CLI tool built to bring every job application into one organized system. It tracks 13 fields per application through a 9-stage pipeline, lets you sort and filter any way you want, surfaces deadline alerts automatically, and exports everything to CSV. The data layer is isolated from the rest of the app so the whole thing can migrate to a proper database without touching the business logic.",
    highlights: [
      { value: "13", label: "Fields tracked per application" },
      { value: "9-stage", label: "Application pipeline" },
    ],
    howItWorks: [
      { title: "Add an application", desc: "Log company, role, status, deadline, salary range, notes, and 7 more fields in one command." },
      { title: "Move it through the pipeline", desc: "9 stages from applied to offer. Update status as things progress." },
      { title: "Sort and search", desc: "5 sort modes and keyword search across any field." },
      { title: "Get deadline alerts", desc: "Upcoming deadlines surface automatically when you launch the tracker." },
      { title: "View the analytics dashboard", desc: "See response rates, stage distribution, and application velocity in the terminal." },
      { title: "Export to CSV", desc: "One command exports everything for spreadsheet analysis or sharing." },
    ],
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
    shortName: "MusicTasteMatch",
    status: "complete",
    tagline: "Describe your mood in plain English. Get songs that actually match.",
    heroColor: "#F2ECFF",
    overview: "You describe how you feel in plain English and it finds the music that actually matches. Not a genre picker or an artist search. Gemini AI reads your description and converts it into structured Spotify search terms, then the app pulls real songs from the live Spotify catalog and scores each one against your original mood profile. A bias detection pass makes sure the results are not all the same artist or sound, and a final AI critique reviews the top results for overall alignment before anything gets returned to you.",
    highlights: [
      { value: "6-stage", label: "AI pipeline from prompt to playlist" },
      { value: "Live", label: "Real Spotify catalog, not pre-scraped data" },
    ],
    howItWorks: [
      { title: "You write your vibe", desc: "Plain English. \"Driving alone at night\" or \"studying but need energy, no lyrics.\"" },
      { title: "Gemini AI parses it", desc: "Converts your natural language into structured Spotify-searchable terms: tempo range, energy level, mood axis, lyric preference." },
      { title: "Spotify searches live", desc: "The structured profile drives a real-time Spotify API search. No cached dataset, no preselected pool." },
      { title: "Every song is scored", desc: "Each result is scored against your original mood profile. Results are ranked by match quality, not popularity." },
      { title: "Bias detection runs", desc: "Checks for artist overrepresentation and genre clustering so the final list is actually varied." },
      { title: "AI critique filters the rest", desc: "A final Gemini pass reviews the top results for vibe alignment and generates a brief critique report before returning them." },
    ],
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
    shortName: "DayKeep",
    status: "complete",
    tagline: "Daily accountability, habits, and journaling. All in one place.",
    heroColor: "#EDF5EA",
    overview: "DayKeep is a daily accountability app that ties your goals, tasks, and journal together in one place. You set goals, break them into tasks, and log your day. Streak tracking shows how consistent you have been over time, stale task detection flags anything you have been avoiding, and the journal entries give you a running record of how you were actually thinking at the time. Everything is stored and served by a FastAPI backend with a React frontend that pulls your full day into one dashboard.",
    highlights: [
      { value: "3-in-1", label: "Goals, tasks, and journal unified" },
      { value: "Live", label: "Deployed and in daily use" },
    ],
    howItWorks: [
      { title: "Set your goals", desc: "Create goals and break them into concrete tasks with deadlines." },
      { title: "Track daily tasks", desc: "Check off tasks as you complete them. Stale task detection flags items that have been sitting too long." },
      { title: "Log your mood and journal", desc: "Write a short entry for the day. Mood logging gives you a longitudinal view of how you were feeling over time." },
      { title: "Streaks keep you consistent", desc: "Consecutive active days build your streak. Missing a day resets it — simple accountability." },
      { title: "Dashboard gives you the big picture", desc: "A real-time summary of active goals, completion rate, and recent journal entries in one view." },
    ],
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
    shortName: "Study Tracker",
    status: "complete",
    tagline: "Track study sessions, subjects, and consistency over time.",
    heroColor: "#F0F4EE",
    overview: "A CLI tool for tracking study sessions at the subject level. Log what you studied and for how long, and the tracker builds a clear picture of where your time actually goes. Subject-level breakdowns and streak data feed into a cross-app analytics layer alongside data from the Job Tracker.",
    highlights: [
      { value: "Subject", label: "Level tracking, not just total time" },
      { value: "Feeds", label: "Cross-app analytics layer" },
    ],
    howItWorks: [
      { title: "Start a session", desc: "Name the subject and start the timer." },
      { title: "Log the session", desc: "When done, the session is recorded with subject, duration, and date." },
      { title: "View subject breakdowns", desc: "See hours per subject this week, this month, and all time." },
      { title: "Track your streak", desc: "Daily study streak and weekly summary keep you accountable." },
    ],
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
    shortName: "Game Night",
    status: "complete",
    tagline: "A responsive multi-page site for local gaming events.",
    heroColor: "#FEF0EC",
    overview: "A responsive multi-page website built for a local neighborhood gaming event. Mobile-first Bootstrap layout with JavaScript DOM manipulation for RSVP handling and dynamic game listings. The first real frontend project from CodePath WEB101.",
    highlights: [
      { value: "Multi-page", label: "Responsive web app" },
      { value: "Mobile-first", label: "Bootstrap layout" },
    ],
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
    shortName: "Python CLI Suite",
    status: "complete",
    tagline: "15+ Python projects built while learning: from games to API integrations.",
    heroColor: "#F4F0EA",
    overview: "A collection of 15 Python projects built during the summer of 2025 while teaching myself the language from scratch. The set spans CLI tools, GUI apps with Tkinter and Turtle, and live REST API integrations with OpenWeatherMap, Alpha Vantage, NewsAPI, and Twilio. Built to practice every core Python pattern before moving on to FastAPI and full-stack work.",
    highlights: [
      { value: "15+", label: "Projects built in one summer" },
      { value: "3", label: "Paradigms: CLI, GUI, REST APIs" },
    ],
    description:
      "A collection of 15+ Python projects spanning CLI, GUI, and API paradigms: ATM simulator, Coffee Machine (OOP), Snake & Turtle Racing, Quiz Game, Blackjack, and integrations with OpenWeatherMap, Alpha Vantage, NewsAPI, and Twilio. Built during self-study summer 2025.",
    stack: ["Python", "OOP", "Tkinter", "Turtle Graphics", "REST APIs", "Twilio"],
    github: "https://github.com/fortdominz/python-cli-suite",
    demo: null,
    terminal: null,
  },
  {
    id: "discoursiq",
    name: "DiscourseIQ",
    shortName: "DiscourseIQ",
    status: "planned",
    tagline: "Can you tell the difference between analysis and a hot take? It can.",
    description:
      "A fine-tuned text classifier that evaluates discourse quality in football/soccer online communities. Trained on 200+ manually annotated Reddit posts across three labels — analysis (evidence-backed arguments), hot_take (opinion without support), and reaction (emotion-anchored to a specific event). Built for CodePath AI201.",
    stack: ["Python", "HuggingFace Transformers", "scikit-learn", "Reddit API", "NLP"],
    github: "https://github.com/fortdominz/ai201-project3-takemeter",
    demo: null,
    terminal: [
      { delay: 0,    type: "input",  text: "python classify.py" },
      { delay: 600,  type: "output", text: "DiscourseIQ — loading fine-tuned classifier..." },
      { delay: 1000, type: "output", text: "" },
      { delay: 1100, type: "input",  text: "input: \"Ronaldo's movement off the ball in 2026 is tactically irrelevant — he just waits in the box now.\"" },
      { delay: 1700, type: "output", text: "" },
      { delay: 1800, type: "output", text: "  label:      hot_take" },
      { delay: 2000, type: "output", text: "  confidence: 0.87" },
      { delay: 2200, type: "output", text: "  reason:     bold claim, no tactical evidence cited" },
      { delay: 2500, type: "output", text: "" },
      { delay: 2600, type: "input",  text: "input: \"City's press success rate dropped 14% after Rodri's injury — xG against rose from 1.1 to 1.7 per game.\"" },
      { delay: 3200, type: "output", text: "" },
      { delay: 3300, type: "output", text: "  label:      analysis" },
      { delay: 3500, type: "output", text: "  confidence: 0.94" },
      { delay: 3700, type: "output", text: "  reason:     statistics-backed, causal argument" },
    ],
  },
  {
    id: "agent-outfitch",
    name: "Agent Outfitch",
    shortName: "Agent Outfitch",
    status: "planned",
    tagline: "Describe the fit. The agent finds it, styles it, and captions it.",
    description:
      "A multi-tool AI agent for secondhand fashion. Describe what you want in plain language — Outfitch parses the query via LLM, scores 40+ mock thrift listings by keyword relevance, picks the best match, generates outfit combinations from your wardrobe, and writes a shareable Instagram/TikTok caption for the look. Three chained tools in a full agent planning loop. Built for CodePath AI201.",
    stack: ["Python", "Groq API", "Multi-tool Agent", "LLM"],
    github: "https://github.com/fortdominz/ai201-project2-fitfindr-starter",
    demo: null,
    terminal: [
      { delay: 0,    type: "input",  text: "python agent.py" },
      { delay: 600,  type: "output", text: "Agent Outfitch — ready" },
      { delay: 900,  type: "output", text: "" },
      { delay: 1000, type: "input",  text: "what are you looking for? vintage graphic tee, size M, under $30" },
      { delay: 1500, type: "output", text: "" },
      { delay: 1600, type: "output", text: "⟳ parsing query..." },
      { delay: 2000, type: "output", text: "  description: vintage graphic tee  size: M  max: $30" },
      { delay: 2200, type: "output", text: "" },
      { delay: 2300, type: "output", text: "⟳ searching listings..." },
      { delay: 2700, type: "output", text: "  ✓ found: Vintage 90s Band Tee — $24  size M  Depop" },
      { delay: 2900, type: "output", text: "" },
      { delay: 3000, type: "output", text: "⟳ building outfit..." },
      { delay: 3400, type: "output", text: "  look 1: band tee + wide-leg jeans + white Air Forces" },
      { delay: 3600, type: "output", text: "  look 2: band tee tucked + cargo pants + chunky boots" },
      { delay: 3800, type: "output", text: "" },
      { delay: 3900, type: "output", text: "⟳ writing fit card..." },
      { delay: 4300, type: "output", text: "  \"found this $24 band tee on Depop and she goes with everything 🤌\"" },
    ],
  },
  {
    id: "northstar",
    name: "Unofficial NorthStar",
    shortName: "NorthStar",
    status: "planned",
    tagline: "The housing guide no one built for Fisk students. Until now.",
    description:
      "A RAG-powered AI assistant for off-campus housing near Fisk University. The knowledge students actually need — which buildings have issues, what a realistic budget looks like, which streets are safe — exists only in scattered Reddit threads and review sites. NorthStar aggregates 10 sources, chunks them at 500 characters, and makes it searchable in plain language. Built for CodePath AI201.",
    stack: ["Python", "RAG", "ChromaDB", "LLM", "Vector Search"],
    github: "https://github.com/fortdominz/ai201-project1-unofficial-guide-starter",
    demo: null,
    terminal: [
      { delay: 0,    type: "input",  text: "python northstar.py" },
      { delay: 600,  type: "output", text: "Unofficial NorthStar — AI Housing Guide for Fisk Students" },
      { delay: 900,  type: "output", text: "  10 sources loaded  ·  vector index ready" },
      { delay: 1100, type: "output", text: "" },
      { delay: 1200, type: "input",  text: "ask: what's the average rent near Fisk under $1,000?" },
      { delay: 1700, type: "output", text: "" },
      { delay: 1800, type: "output", text: "⟳ retrieving relevant chunks..." },
      { delay: 2200, type: "output", text: "  sources: r/movetonashville, VeryApt North Nashville guide" },
      { delay: 2400, type: "output", text: "" },
      { delay: 2500, type: "output", text: "  Studios run $750–$950 in North Nashville. Areas closest" },
      { delay: 2700, type: "output", text: "  to Fisk (Jefferson St corridor) skew higher. Students" },
      { delay: 2900, type: "output", text: "  consistently flag Atlas at Germantown and Capitol View" },
      { delay: 3100, type: "output", text: "  as the most reviewed options in that range." },
    ],
  },
  {
    id: "fendi",
    name: "Fendi: My Personal AI Assistant",
    shortName: "Fendi",
    status: "planned",
    tagline: "A JARVIS-style voice AI assistant built to run my world.",
    description:
      "A personal AI assistant that listens, thinks, and acts — voice-activated, context-aware, and built entirely around how I work. Not a chatbot. A system.",
    stack: ["Python", "OpenAI API", "Speech Recognition", "CLI"],
    github: null,
    demo: null,
    terminal: null,
  },
  {
    id: "ezresume",
    name: "EzResume",
    shortName: "EzResume",
    status: "planned",
    tagline: "Your complete experience on record. Your resume, on demand.",
    description:
      "Resume management platform where your full experience lives permanently in journals, and resumes are curated views: toggled, arranged, and exported on demand. Overleaf-style split screen editor.",
    stack: ["React", "FastAPI", "MongoDB", "React-PDF", "Tiptap", "dnd-kit"],
    github: null,
    demo: null,
    terminal: null,
    link: "https://ezresume.app",
  },
  {
    id: "ezguide",
    name: "EzGuide",
    shortName: "EzGuide",
    status: "planned",
    tagline: "The guide nobody gave you. Built by someone who needed it.",
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
    shortName: "EzFill",
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
    role: "OCPD Summer Experiential Learning Fellow",
    org: "Fisk University",
    period: "Summer 2026",
    location: "Nashville, TN",
    tags: ["Financial Analysis", "Power BI", "Data Analysis", "Professional Dev"],
    bullets: [
      "Selected for Fisk's OCPD Summer Experiential Learning cohort — structured multi-industry exposure led by practitioners across healthcare, real estate, banking, internal audit, and risk management.",
      "Led financial analysis for a capstone investment project: pulled 5 years of Apple Inc. (AAPL) financials, surfaced $416B revenue, 46.91% gross margin, 19.5% net income growth, and declining total debt — issued a formal Buy recommendation backed by three growth vectors: Apple Intelligence, India market expansion, and services margin acceleration.",
      "Completed hands-on Power BI training — from raw data ingestion through visualization and pattern analysis — and continued self-directed practice after the program ended.",
      "Co-authored and presented a formal investment recommendation to Dr. Shavonte Hammond in a live 5–7 minute presentation with Q&A, acting as junior financial analyst for a hypothetical $150K client portfolio.",
    ],
  },
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
      "Developed a Partnership Playbook with tailored outreach strategies and presented findings to executive leadership.",
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
    role: "WEB101: Intro to Web Development",
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
      "Strengthened foundational programming logic: variables, conditionals, loops, and functions.",
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
    degree: "Bachelor of Science in Computer Science",
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
    degree: "High School Diploma, Science Track",
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

// Life Journey — scroll-driven roadmap checkpoints
// types: 'milestone' | 'program' | 'experience' | 'future'
// Each checkpoint: phase (era grouping) + summary (the brief, shown on scroll)
//   + points (key bullets) + detail (the full story, shown on click) + optional links
export const lifejourney = [
  {
    id: "fisk-start", date: "Jan 2025", title: "Arrived at Fisk University",
    type: "milestone", color: "#2563EB", tag: "Origin",
    phase: "2025 · Building the Foundation",
    summary: "Flew in from Lagos a semester late — visa delays pushed my start back, and there were no CS classes that term. I'd barely landed and already felt behind.",
    points: [
      "Lagos → Nashville, on my own",
      "Spring 2025 start, zero CS courses available",
      "Chose to build my own curriculum instead of waiting",
    ],
    detail: "I landed in Nashville in January 2025 for a spring start I almost didn't get — visa delays had already pushed everything back. When I arrived, there were no CS classes offered that semester. On paper my degree hadn't even started, and I was watching everyone else move ahead of me.\n\nInstead of treating it as lost time, I decided the gap was mine to fill. That single decision — to build my own curriculum and manufacture momentum nobody handed me — is the reason every checkpoint after this one exists.",
  },
  {
    id: "stanford", date: "Apr 2025", title: "Stanford Code in Place",
    type: "program", color: "#EF4444", tag: "Program",
    phase: "2025 · Building the Foundation",
    summary: "Stanford's introductory Python course — live lectures, guided exercises, a global cohort. Where structured CS thinking actually began.",
    points: [
      "Variables, conditionals, loops, functions",
      "Live Stanford lectures + global community",
      "My first real programming foundation",
    ],
    detail: "Stanford's Code in Place was my formal entry into programming. Live lectures, weekly sections, and a global cohort all working the same problems gave me the structure I'd been improvising on my own.\n\nIt's where loops, conditionals, and functions stopped being syntax and started being tools. By the end I wasn't following tutorials — I was writing programs because I wanted to see whether I could.",
  },
  {
    id: "web101", date: "Apr 2025", title: "CodePath WEB101",
    type: "program", color: "#10B981", tag: "Program",
    phase: "2025 · Building the Foundation",
    summary: "CodePath's hands-on intro to web development. HTML, CSS, JavaScript — and the first website I built with my own hands.",
    points: [
      "Responsive layouts + interactive UI",
      "Built a personal website from scratch",
      "The frontend journey officially started",
    ],
    detail: "WEB101 took me from \"I can write Python\" to \"I can build something people open in a browser.\" HTML structure, CSS layout, and JavaScript interactivity — taught live and hands-on.\n\nThe capstone was my first real website: responsive, interactive, mine. It's the moment the frontend half of my skill set started, and it pointed straight at the full-stack work I do now.",
  },
  {
    id: "oracle", ongoing: true, date: "May 2025", title: "Oracle REACH",
    type: "program", color: "#F59E0B", tag: "Program",
    phase: "2025 · Building the Foundation",
    summary: "Selected for Oracle's REACH — a professional development initiative for underrepresented students in technology.",
    points: [
      "Early industry exposure",
      "Professional development + mentorship",
    ],
    detail: "Oracle's REACH is a professional development initiative for underrepresented students in tech. Getting selected was early proof that the work I was doing on my own was visible to people outside my own head.\n\nIt added a professional layer — how the industry actually operates — on top of the technical foundation I was building in parallel.",
  },
  {
    id: "pwc", date: "Jul 2025", title: "Remote Extern",
    type: "experience", color: "#EF4444", tag: "Experience",
    phase: "2025 · Building the Foundation",
    summary: "Consulted for a social-impact startup working to give 1.5M women of color and non-binary people leadership access. Real client work, real deliverables.",
    points: [
      "Qualified 5 high-value donor organizations",
      "Built a Partnership Playbook with outreach strategy",
      "Presented findings to executive leadership",
    ],
    detail: "Through Extern I consulted for a social-impact startup whose mission was to put 1.5 million women of color and non-binary people into leadership pipelines. This wasn't a simulation — it was real client work with a real deliverable.\n\nI researched and qualified five high-value donor organizations by mission alignment, built a Partnership Playbook with tailored outreach strategies, and presented the findings to executive leadership. My first taste of turning research into something a team could actually act on.",
  },
  {
    id: "summer-build", date: "Summer 2025", title: "15+ Python Projects in One Summer",
    type: "milestone", color: "#2563EB", tag: "Build Sprint",
    phase: "2025 · Building the Foundation",
    summary: "No CS classes meant no excuse. I taught myself Python and shipped 15+ projects in a single summer — CLI tools, GUIs, and live API integrations. No cohort. Just me.",
    points: [
      "ATM simulator, Snake, Blackjack, Coffee Machine (OOP)",
      "OpenWeatherMap, Alpha Vantage, NewsAPI, Twilio integrations",
      "Proof I could move on my own",
    ],
    detail: "With no CS classes that first semester, the summer of 2025 became my proving ground. I taught myself Python from scratch and shipped more than fifteen projects — an ATM simulator, Snake, Blackjack, a Coffee Machine built with OOP, Tkinter and Turtle GUIs, and live integrations with OpenWeatherMap, Alpha Vantage, NewsAPI, and Twilio.\n\nNo cohort, no deadline, no one watching. Just a list of things I wanted to understand and the discipline to build each one until it worked. Everything full-stack I've done since stands on that summer.",
    links: [{ label: "Python CLI Suite", href: "https://github.com/fortdominz/python-cli-suite" }],
  },
  {
    id: "codepath-ai", ongoing: true, date: "Feb 2026", title: "CodePath AI Engineering Fellow",
    type: "program", color: "#8B5CF6", tag: "Fellowship",
    phase: "2026 · Acceleration",
    summary: "Building, evaluating, and debugging production-ready AI applications — RAG systems built with LangChain and vector databases.",
    points: [
      "RAG pipelines · LangChain · Pinecone / ChromaDB",
      "Designing complex system prompts",
      "Deploying AI features into real web apps",
    ],
    detail: "CodePath's AI Engineering fellowship is where I started building production-grade AI instead of toy demos. The work centers on RAG — retrieval-augmented generation with LangChain and vector databases like Pinecone and ChromaDB.\n\nDesigning system prompts that hold up, evaluating and debugging model behavior, and deploying AI features into real web apps. It's directly upstream of projects like MusicTasteMatch and the planned NorthStar and Outfitch agents.",
  },
  {
    id: "codepath-tip", ongoing: true, date: "Feb 2026", title: "Technical Interview Prep",
    type: "program", color: "#06B6D4", tag: "Fellowship",
    phase: "2026 · Acceleration",
    summary: "An intensive DSA fellowship — dynamic programming, backtracking, advanced graphs — practiced under real interview pressure.",
    points: [
      "UMPIRE framework for problem-solving",
      "Space / time complexity optimization",
      "Live pair-programming + peer review",
    ],
    detail: "Technical Interview Prep is the algorithms crucible — dynamic programming, backtracking, and advanced graph problems, drilled under real interview conditions.\n\nI use the UMPIRE framework to reason out loud, optimize for time and space, and survive live pair-programming and peer review. It's the least glamorous and most necessary preparation for the rooms I'm trying to get into.",
  },
  {
    id: "ey", ongoing: true, date: "Mar 2026", title: "Expedition EY",
    type: "program", color: "#06B6D4", tag: "Accelerator",
    phase: "2026 · Acceleration",
    summary: "A competitive accelerator for high-potential CS students — exploring AI, cybersecurity, and data analytics inside EY's digital transformation frameworks.",
    points: [
      "Technical modules + leadership workshops",
      "Direct insight from EY technology leaders",
      "Enterprise software + consulting methods",
    ],
    detail: "Expedition EY is a competitive accelerator for high-potential CS and Information Systems students. The program runs through AI, cybersecurity, and data analytics inside EY's actual digital-transformation frameworks.\n\nTechnical modules, leadership workshops, and direct conversations with EY technology leaders — exposure to how enterprise software and tech consulting work at scale, not from a textbook but from the people doing it.",
  },
  {
    id: "propel", ongoing: true, date: "2026", title: "Propel2Excel Fellow",
    type: "program", color: "#8B5CF6", tag: "Fellowship",
    phase: "2026 · Acceleration",
    summary: "Selected as a fellow in Propel2Excel, a program built to accelerate the careers of high-potential students.",
    points: [
      "Career readiness + professional polish",
      "Leadership development",
    ],
    detail: "Propel2Excel selected me as a fellow in its program for accelerating the careers of high-potential students. It's the connective tissue between the technical work and the professional world — career readiness, leadership, and the polish that turns raw capability into opportunity.",
  },
  {
    id: "fisk-ocpd", ongoing: true, date: "Summer 2026", title: "Fisk OCPD Experiential Learning",
    type: "program", color: "#F59E0B", tag: "Fellowship",
    phase: "2026 · Acceleration",
    summary: "Fisk's OCPD experiential cohort — multi-industry exposure. I led financial analysis on an Apple capstone and issued a formal Buy recommendation.",
    points: [
      "AAPL: $416B revenue, 46.91% gross margin",
      "Hands-on Power BI training",
      "Presented an investment recommendation to Dr. Hammond",
    ],
    detail: "Fisk's OCPD Summer Experiential Learning cohort put me in front of practitioners across healthcare, real estate, banking, internal audit, and risk. For the capstone I acted as junior financial analyst on a hypothetical $150K portfolio.\n\nI pulled five years of Apple (AAPL) financials — $416B revenue, 46.91% gross margin, 19.5% net income growth, declining total debt — and issued a formal Buy recommendation backed by three vectors: Apple Intelligence, India expansion, and services-margin acceleration. I learned Power BI hands-on and presented the recommendation live to Dr. Shavonte Hammond with Q&A.",
  },
  {
    id: "internship", date: "Soon", title: "First Internship",
    type: "future", color: null, tag: "Next Chapter",
    phase: "Ahead",
    summary: "The next checkpoint. Everything so far has been preparation for this one.",
    points: [
      "Open for Summer 2026",
      "Ready to build inside a real team",
    ],
    detail: "This is the checkpoint that's still empty — the first internship. Everything before it has been preparation: the self-teaching, the fellowships, the shipped projects, the interview reps.\n\nI'm open for Summer 2026 and ready to do the work inside a real team. When this one fills in, the whole map changes.",
  },
]

// Open World — explorable map of regions (`worlds`). Each region holds PROGRAMS
// (a program, fellowship, place, event…). Clicking a region lists its programs BY
// NAME; clicking a program OPENS it (its own view) with an optional `description`,
// optional `photos`, and optional `activities` (sub-tracks within one program —
// e.g. CodePath has several). Each activity has its own name/description/photos.
//
// Program: { id, world, name, description?, photos?, activities?: [Activity] }
// Activity: { id, name, description?, photos? }
// Photo:    { src, caption, tag? }   ← tag is an optional activity/sub-label
//
// Photos are OPTIONAL — omit them entirely and a program/activity just shows text.
// To add one: drop the image in /public and set src (e.g. "/openworld/ey.jpg").
export const worlds = [
  { id: "school",      label: "School Life",            accent: "#8FB8FF", blurb: "Life on campus at Fisk — the grind, the wins, the people." },
  { id: "work",        label: "Work & Internships",     accent: "#7EE0BE", blurb: "What the work actually feels like from the inside." },
  { id: "programs",    label: "Programs & Fellowships", accent: "#A9A6FF", blurb: "Inside the rooms I've earned a seat in." },
  { id: "conferences", label: "Conferences",            accent: "#F2C879", blurb: "Talks, people, and getting out of my own head." },
  { id: "hackathons",  label: "Hackathons",             accent: "#F29CA8", blurb: "Build sprints, late nights, shipping under pressure." },
]

export const openworld = [
  {
    id: "codepath",
    world: "programs",
    name: "CodePath",
    description: "Intensive, project-based fellowships that bridge coursework and industry. I've gone through several of their tracks.",
    activities: [
      { id: "ai",     name: "AI Engineering Fellowship",   description: "Building, evaluating, and debugging production-ready AI — RAG systems with LangChain and vector databases." },
      { id: "tip",    name: "Technical Interview Prep",     description: "Advanced DSA — dynamic programming, backtracking, and graphs — drilled under real interview pressure with the UMPIRE framework." },
      { id: "web101", name: "WEB101 · Intro to Web Dev",    description: "My first hands-on HTML, CSS, and JavaScript — where the frontend journey officially started." },
    ],
  },
  {
    id: "ey-expedition",
    world: "programs",
    name: "EY Expedition",
    description: "Competitive accelerator for high-potential CS students — AI, cybersecurity, and data analytics inside EY's digital-transformation frameworks. Week one already pushed me: a room full of hungry people hits different.",
  },
]

// Open World — "Field Notes": the motivations / philosophy behind the work.
// Used by the Explorer's Dossier (open-world page).
export const fieldnotes = [
  { label: "The thesis", text: "I build tools I actually need. Then I ship them for everyone who needs them too." },
  { label: "On pace", text: "My pace doesn't have to match anyone else's. I create my own opportunities by being consistent, curious, and proactive." },
  { label: "On starting late", text: "I arrived at Fisk a semester late with no CS classes that term. Instead of waiting, I built my own curriculum. That summer, I locked in." },
  { label: "Why I build", text: "Every tool starts as something I personally need. I keep building until others can use it too." },
  { label: "Origin discipline", text: "Five years teaching math in Lagos taught me to break hard things down until they make sense. That's still how I engineer." },
]

// Touching Grass — life outside coding, as a social feed.
// grassProfile = the "account". grassHighlights = the story-highlight categories.
// Each post: { id, category, date, location, caption, images:[], tags:[], likes, comments, stats? }
//   - `category` must match a highlight id (used by the filter bubbles).
//   - `stats` (optional) = a little stat strip for game/activity posts: [{label, value}].
//   - Drop photos in /public (e.g. /grass/fc-mobile.jpg) and add paths to `images`.
export const grassProfile = {
  handle: "fortdominz",
  name: "Dominion Eze",
  bio: "CS @ Fisk · I build things, then I log off 🌱\n⚽ football · 🎮 mobile games · 🍿 anime & k-dramas",
}

export const grassHighlights = [
  { id: "football", label: "Football", emoji: "⚽" },
  { id: "gaming",   label: "Gaming",   emoji: "🎮" },
  { id: "anime",    label: "Anime",    emoji: "🍿" },
  { id: "kdrama",   label: "K-Dramas", emoji: "📺" },
  { id: "travel",   label: "Travel",   emoji: "✈️" },
  { id: "friends",  label: "Friends",  emoji: "🤝" },
]

export const touchinggrass = [
  {
    id: "nashville-first-look",
    category: "travel",
    date: "Spring 2025",
    location: "Nashville, TN",
    caption: "Lagos to Nashville is a big jump. Took a while, but the city has its own energy once you stop comparing it to what you came from. Slowly making this home.",
    images: [],
    tags: ["nashville", "newcity", "exploring"],
    likes: 38,
    comments: 5,
  },
  {
    id: "sunday-league",
    category: "football",
    date: "Recently",
    location: "Nashville, TN",
    caption: "Sunday league with the squad. We lost, but I'm choosing to only remember the goal I scored 🙂 worth the sore legs.",
    images: [],
    tags: ["football", "sundayleague", "thebeautifulgame"],
    likes: 47,
    comments: 9,
  },
  {
    id: "fc-mobile-grind",
    category: "gaming",
    date: "This week",
    location: null,
    caption: "Ranked grind this week. Locked in (the other kind of locked in). // stats are placeholders — swap in your real ones.",
    images: [],
    tags: ["mobilegames", "ranked", "grind"],
    likes: 29,
    comments: 3,
    stats: [
      { label: "Main", value: "FC Mobile" },
      { label: "This week", value: "22 matches" },
      { label: "Win rate", value: "63%" },
    ],
  },
  {
    id: "current-rotation",
    category: "anime",
    date: "Lately",
    location: null,
    caption: "Current rotation 🍿 also taking k-drama recommendations — my watchlist is criminally short.",
    images: [],
    tags: ["anime", "kdrama", "watchlist"],
    likes: 41,
    comments: 12,
  },
  {
    id: "the-people",
    category: "friends",
    date: "Always",
    location: null,
    caption: "These ones keep me sane. The building hits different when you've got people to log off with.",
    images: [],
    tags: ["friends", "irl", "gratitude"],
    likes: 58,
    comments: 7,
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
