/* Site content. Edit this file to update copy, projects, experience, and skills, then run `npm run build`. */

export const PROFILE = {
  name: 'Ryan Chen', location: 'New York, NY',
  email: 'ryancwork10@gmail.com', phone: '646-247-6870', site: 'https://ryanchen.xyz',
  github: 'https://github.com/ryan-c07', linkedin: 'https://linkedin.com/in/ryanchen07',
  resume: 'Ryan_Chen_Resume.pdf',
  // Shown in the hero status pill. Add the season once it is fixed, e.g. 'Open to Summer 2027 SWE internships'.
  status: 'Open to software engineering internships',
};

// Real, resume-backed numbers shown in the strip directly under the hero.
export const PROOF = [
  { v: '219 votes', l: 'Live in production on Bao-bae' },
  { v: 'Hackathon win', l: 'Nue-Trivia, GPT-written quizzes' },
  { v: '3.67 GPA', l: "Dean's List, Stony Brook CS" },
  { v: '500+ students', l: 'Surveyed for NYC DOE leadership' },
];

// Add more { src, caption } entries to get a clickable thumbnail strip under the photo.
export const PHOTOS = [
  { src: 'images/me.jpg', caption: 'Portrait of Ryan Chen' },
];

// 'github' renders live activity from the public GitHub API instead of static text.
export const NOW = [
  { label: 'Now listening to', tag: 'On repeat', title: 'Disillusioned', body: 'Daniel Caesar' },
  { label: 'Now working on', tag: null, title: 'Midterms', body: 'Heads down studying for midterms at Stony Brook.' },
  { label: 'Now building', tag: 'Live from GitHub', github: true },
];

// shots: real screenshots in images/projects. layout 'duo' overlays a phone shot on a desktop shot in the card preview.
export const PROJECTS = [
  {
    id: 'baobae', tag: 'Next.js', title: 'Bao-bae', badge: '219 live votes', date: 'Apr 2026',
    desc: 'Co-developed, mobile-first live voting app for a bachelor-style campus show run by the Cantonese Club (CTC) at Stony Brook. Audience members sign in with Google and get one vote per round, while production runs the show from an admin dashboard.',
    stack: ['Next.js', 'React 19', 'TypeScript', 'Supabase', 'PostgreSQL'],
    links: [
      { label: 'Live site', href: 'https://baobae-kappa.vercel.app/' },
      { label: 'Admin view', href: 'https://baobae-kappa.vercel.app/admin' },
      { label: 'Code', href: 'https://github.com/ryan-c07/baobae' },
    ],
    layout: 'duo',
    shots: [
      { src: 'images/projects/baobae-ballot.jpg', alt: 'Bao-bae Round 2 elimination ballot on a phone', caption: 'Round 2 elimination ballot (audience view on a phone)', bg: '#fbeee9' },
      { src: 'images/projects/baobae-results.jpg', alt: 'Bao-bae production dashboard with live vote totals', caption: 'Live Round 2 results in the production dashboard', bg: '#fbeee9' },
    ],
    highlights: [
      'Co-developed and deployed mobile-first voting platform for a live campus show, processing 219 votes across 3 elimination rounds with Google OAuth authentication.',
      'Enforced one-vote-per-round integrity via composite unique constraints and Row-Level Security policies, converting PostgreSQL constraint violations into user-facing error states.',
      'Delivered near-real-time results by polling a PostgreSQL aggregate view at 1.5s intervals, avoiding websocket infrastructure while supporting live vote totals.',
    ],
    arch: [
      ['Server-checked voting API', 'Votes go through a Next.js route handler that verifies the Supabase Google session, checks the live phase and ballot, then writes the vote with a server-only client.'],
      ['Fairness enforced by the database', 'A duplicate vote hits the unique constraint (Postgres error 23505), which the API turns into a friendly message. Row Level Security lets the public read state and contestants only.'],
      ['Two ways into the control room', 'Admins sign in with an allowlisted Google account or a master password. Password sessions use an HMAC-signed cookie checked with a constant-time compare.'],
      ['Live without websockets', 'The audience view polls event state every 5 seconds, and the dashboard polls totals every 1.5 seconds from a vote_totals aggregate view.'],
    ],
  },
  {
    id: 'pharmacy', tag: 'PostgreSQL', title: 'Pharmacy Refill Database', badge: 'Contract', date: 'Oct 2025',
    desc: 'Owned the data layer on a remote team building a prescription refill platform: a normalized PostgreSQL schema covering every refill from request through pickup.',
    stack: ['PostgreSQL', 'SQL', 'Bash', 'Twilio API'],
    links: [
      { label: 'Schema diagram', href: 'https://drawsql.app/teams/personal-3758/diagrams/pharmacy-rx' },
    ],
    codePrivate: true,
    shots: [
      { src: 'images/projects/pharmacy-schema.jpg', alt: 'Pharmacy Rx database schema diagram', caption: 'Schema outline on drawSQL', fit: 'cover', pos: 'center 20%', bg: '#f7f7f8' },
    ],
    highlights: [
      'Owned the data layer on a remote team building a prescription refill platform, designing a normalized 6-table PostgreSQL schema modeling the full refill lifecycle from request through pickup.',
      'Enforced referential integrity across 5 foreign-key relationships and prevented duplicate prescriptions per patient with a composite unique constraint, backing status and request-source fields with lookup tables.',
      'Optimized read paths with composite indexes on patient-prescription and name-DOB lookups, exposing a denormalized view joining patients, refills, and status for application queries.',
    ],
    arch: [
      ['Patients at the center', 'Patients holds name, date of birth, phone, and email. App accounts, refills, and Twilio sessions all link back to it by patient_id.'],
      ['Refill lifecycle', 'Refills track the Rx number, medication, requested and ready dates, pickup time, and notes. Status and request origin live in the RefillStatus and RequestSource lookup tables.'],
      ['Fast reads for the app', 'Composite indexes cover patient-prescription and name-and-birthdate lookups, and a denormalized view joins patients, refills, and status for application queries.'],
      ['Twilio conversation log', 'TwilioSessions records each Twilio session ID, channel, and start and end time, tied to a patient and the refill it concerns.'],
    ],
  },
  {
    id: 'nuetrivia', tag: 'Java', title: 'Nue-Trivia', badge: 'Hackathon winner', date: 'Oct 2024',
    desc: 'Top-down pixel-art nutrition game built by a hackathon team. Walk up to food characters and they quiz you with multiple-choice questions written live by OpenAI.',
    stack: ['Java', 'Swing / JFrame', 'OpenAI API (GPT-4o mini)'],
    links: [
      { label: 'Demo video', href: 'https://youtu.be/_xb2x3qkbf0' },
      { label: 'Code', href: 'https://github.com/Christian-Wan/Hackathon_Game' },
    ],
    shots: [
      { src: 'images/projects/nuetrivia.jpg', alt: 'Nue-Trivia game frame with the Pear character', caption: "Frame rebuilt from the game's own sprites and map", fit: 'cover', pos: 'center 30%', bg: '#00ab00' },
    ],
    highlights: [
      'Designed educational nutrition game featuring custom sprites and AI-generated questions for young audiences.',
      'Constructed interactive Q&A gameplay with point-based reward system to enhance child learning engagement.',
    ],
    arch: [
      ['Swing game loop', 'A fixed 60 FPS loop repaints a 1280 by 640 JFrame panel. A shared Engine object gives every class access to the player, stage, input, and sound.'],
      ['Data-driven maps', 'Four pixel maps are scaled up 10 times. Plain-text map files list each food character and its hitbox, and walking off an edge loads the next map.'],
      ['Questions written by GPT', 'Each food character asks GPT-4o mini for a question about itself in a fixed format, then parses out the correct letter, a hint, and an explanation.'],
      ['Answers, hints, feedback', 'Players answer with A to D buttons or ask for a hint. A right answer shows "You are correct!", and a wrong one shows the correct letter with an explanation.'],
    ],
  },
  {
    id: 'pantry', tag: 'Next.js', title: 'Pantry Tracker', badge: 'Headstarter', date: 'Aug 2024',
    desc: 'Pantry inventory app with instant search and Gemini recipe ideas. Each person signs in with Google and gets a private pantry.',
    stack: ['JavaScript', 'React.js', 'Material-UI', 'Gemini API', 'Next.js', 'Firebase'],
    links: [
      { label: 'Live site', href: 'https://pantry-tracker-bay-xi.vercel.app/' },
      { label: 'Demo video', href: 'https://youtu.be/1xDUebEPZEA' },
      { label: 'Code', href: 'https://github.com/ryan-c07/pantry-tracker' },
    ],
    shots: [
      { src: 'images/projects/pantry-app.jpg', alt: 'Pantry Tracker with five items and three Gemini recipe ideas', caption: 'Signed-in pantry with Gemini recipe ideas', fit: 'cover', pos: 'center top', bg: '#f5f2ec' },
      { src: 'images/projects/pantry.jpg', alt: 'Pantry Tracker Google sign-in screen', caption: 'Google sign-in screen', fit: 'cover', pos: 'center', bg: '#f5f2ec' },
    ],
    highlights: [
      'Developed responsive web app to track pantry inventory and provide AI-powered recipe suggestions.',
      'Implemented dynamic search and modals for inventory management with fully mobile-optimized UI.',
    ],
    arch: [
      ['Next.js and Material-UI', 'A Next.js app with Material-UI dialogs for adding and editing items and a layout that works on phones.'],
      ['Private data per user', 'Items live under users/{uid}/inventory in Firestore, and security rules only let the signed-in owner read or write them.'],
      ['Instant search', 'The inventory filters in memory as you type, with clear empty states for an empty pantry or no matches.'],
      ['Protected recipe route', 'A server route verifies the Firebase ID token, caps the item list, and calls Gemini 2.5 Flash with a 60-second limit to avoid timeouts.'],
    ],
  },
];

export const STACK = {
  'Languages': [
    { n: 'Java', icon: 'openjdk' }, { n: 'Python', icon: 'python' }, { n: 'C', icon: 'c' }, { n: 'TypeScript', icon: 'typescript' },
    { n: 'JavaScript', icon: 'javascript' }, { n: 'Kotlin', icon: 'kotlin' }, { n: 'Swift', icon: 'swift' }, { n: 'SQL', icon: 'postgresql' },
    { n: 'HTML/CSS', icon: 'html5' }, { n: 'Assembly', mono: 'ASM' },
  ],
  'Frameworks & Libraries': [
    { n: 'React.js', icon: 'react' }, { n: 'Next.js', icon: 'nextdotjs' }, { n: 'Material-UI', icon: 'mui' },
  ],
  'Developer Tools': [
    { n: 'Git', icon: 'git' }, { n: 'PostgreSQL', icon: 'postgresql' }, { n: 'Supabase', icon: 'supabase' }, { n: 'Vercel', icon: 'vercel' },
    { n: 'VS Code', mono: '</>' }, { n: 'PyCharm', icon: 'pycharm' }, { n: 'IntelliJ', icon: 'intellijidea' }, { n: 'Android Studio', icon: 'androidstudio' },
    { n: 'Xcode', icon: 'xcode' }, { n: 'Bash', icon: 'gnubash' },
  ],
  'APIs & Services': [
    { n: 'OpenAI API', mono: 'AI' }, { n: 'Gemini API', icon: 'googlegemini' }, { n: 'Twilio API', mono: 'Tw' }, { n: 'Firebase', icon: 'firebase' },
  ],
  'Certifications': [
    { n: 'Google Cybersecurity (Coursera)', icon: 'google' }, { n: 'Meta Front-End Developer (Coursera)', icon: 'meta' },
  ],
};

// Everything except certifications, de-duplicated by name, for the scrolling logo strip.
export const MARQUEE_ITEMS = Object.entries(STACK).filter(([g]) => g !== 'Certifications').flatMap(([, v]) => v)
  .filter((s, i, a) => a.findIndex(o => o.n === s.n) === i);

export const EXPERIENCE = [
  { org: 'Headstarter AI', role: 'Software Engineering Fellow', when: 'Jul 2024 - Sept 2024', loc: 'New York, NY',
    bullets: ['Engineered AI-driven projects including Pantry Tracker, AI flashcards, and an AI customer support system using Next.js, Material-UI, and the OpenAI and Gemini APIs.'] },
  { org: 'NYCDOE Division of Instructional and Information Technology', role: 'Intern', when: 'Jul 2024 - Aug 2024', loc: 'Brooklyn, NY',
    bullets: ['Presented key insights to CIO and executive team, influencing strategic decisions.', 'Analyzed TeachHub usage and surveyed 500+ K-12 students to improve functionality for the largest U.S. school district (912,064 students).'] },
  { org: 'NYCDOE Division of Instructional and Information Technology', role: 'Project Intern', when: 'Apr 2024 - May 2024', loc: 'Brooklyn, NY',
    bullets: ['Standardized official transcript processes across NYC DOE systems by designing detailed UML diagrams and workflow proposals.', 'Documented edge cases and created scenarios to ensure accurate record delivery across departments.', 'Examined student records including transcripts, IEPs, 504s, and PSAL documentation to inform recommendations.'] },
];

export const EDUCATION = {
  school: 'Stony Brook University', degree: 'B.S. in Computer Science', when: 'Expected May 2029',
  bullets: ['GPA: 3.67 / 4.00', "Dean's List: Fall 2025, Spring 2026", 'Coursework: Data Structures, Discrete Mathematics, Principles of Programming Languages, Systems Fundamentals (C, Assembly).'],
};
