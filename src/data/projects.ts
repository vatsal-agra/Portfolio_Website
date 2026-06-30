import {
  GraduationCap, Megaphone, Cpu, Newspaper, Dices, Bot, Smartphone,
  Rocket, Route, Blocks, Car, Gamepad2, type LucideIcon,
} from 'lucide-react';

export type GameKey = 'space-invaders' | 'brick-breaker' | 'traffic-rider' | 'tic-tac-toe' | 'pathfinder';

export interface Project {
  title: string;
  repoName: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  /** short status pill, e.g. "Live", "GDG 2nd Place", "Co-Founder" */
  tag?: string;
  featured: boolean;
  icon: LucideIcon;
  /** present when the project can be played live in the browser */
  gameKey?: GameKey;
  /** image path; when empty the card renders a branded gradient cover instead */
  thumbnail: string;
  readme: string;
}

export const GITHUB_USERNAME = 'vatsal-agra';
export const GITHUB_PROFILE = 'https://github.com/vatsal-agra';

export const getProjectImage = (p: { thumbnail?: string; repoName: string }) =>
  p.thumbnail || `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${p.repoName}`;

export const projects: Project[] = [
  // ===== FEATURED — current flagship work =====
  {
    title: 'AISkillBench',
    repoName: 'aiskillbench',
    description:
      'EdTech platform (live) that generates personalized AI-skill learning paths across 640+ courses, 50+ roles and 180+ skills, with QR-verified certifications and three production AI agents.',
    tech: ['React', 'TypeScript', 'Supabase', 'FastAPI', 'Python', 'LLM Agents'],
    github: GITHUB_PROFILE,
    tag: 'Live · Co-Founder',
    featured: true,
    icon: GraduationCap,
    thumbnail: '/project-covers/aiskillbench.svg',
    readme: `# AISkillBench
**AI Skills Learning & Certification Platform — co-founded & built end-to-end.**

A live EdTech platform that turns a goal into a personalized path: **Fields → Roles → Skills → Courses**, ranked by a goal-weighted scoring algorithm across **640+ courses, 50+ roles, and 180+ skills**, with QR-verified certifications.

## Production AI Agents
- **Learning coach** grounded in each user's live path
- **Support bot** — TF-IDF + ChromaDB RAG with deterministic payment/progress lookups
- **Multi-LLM email agent** (Gemini / OpenAI / DeepSeek) with classifier + reviewer sub-agents

## Engineering
- 5-layer **LLM guardrail framework** with a regression suite
- Multi-currency payments (Razorpay, PhonePe, Stripe)
- Deployed on an Ubuntu VPS (nginx, systemd) across separate dev/production Supabase environments

## Stack
React · TypeScript · Supabase · Python · FastAPI`,
  },
  {
    title: 'AUTOTING — Autonomous AI Marketing Platform',
    repoName: 'autoting',
    description:
      "Full-stack marketing SaaS that crawls a company's site to infer a structured \"Brand Soul\" (Golden Circle), then runs an agentic content + image pipeline and a 9-tool SEO suite.",
    tech: ['Next.js', 'FastAPI', 'Supabase', 'Gemini', 'AI Agents', 'SEO'],
    github: GITHUB_PROFILE,
    tag: 'AI SaaS',
    featured: true,
    icon: Megaphone,
    thumbnail: '/project-covers/autoting.svg',
    readme: `# AUTOTING — Autonomous AI Marketing Platform

A full-stack marketing SaaS with a brand-strategy layer most AI tools lack: it crawls a company's site to infer a structured **"Brand Soul"** (belief, audience, voice, visual identity) via Simon Sinek's Golden Circle, then generates on-brand content led by the brand's WHY.

## Highlights
- **Agentic content pipeline** — brand-archaeology → strategist → copywriter → film-director
- **Two-stage image engine** on Gemini 3 Pro Image, with a vision-judge scoring best-of-N outputs and automated brand compositing
- **9-tool SEO suite** — on-page auditor with Core Web Vitals, JSON-LD article writer, AI-citability scorer
- **Multi-channel publishing** (Buffer, X, Instagram, Medium), SSRF-guarded crawling, free-tier LLM key rotation

## Stack
Next.js · FastAPI · Supabase · Gemini`,
  },
  {
    title: 'Verified Code-Optimization Engine (From-Scratch SLM)',
    repoName: 'verified-code-optimizer',
    description:
      'A 33.9M-parameter decoder-only transformer built from scratch in PyTorch (BPE, RoPE, RMSNorm, SwiGLU), wrapped in a verification engine that proves each code rewrite is behaviorally identical and faster.',
    tech: ['Python', 'PyTorch', 'Transformers', 'Compilers'],
    github: GITHUB_PROFILE,
    tag: 'From Scratch',
    featured: true,
    icon: Cpu,
    thumbnail: '/project-covers/slm-optimizer.svg',
    readme: `# Verified Code-Optimization Engine
### From-Scratch Small Language Model

A **33.9M-parameter decoder-only transformer** built from scratch in PyTorch — **no HuggingFace, no pretrained weights**.

## The Model
- Custom **BPE tokenizer**, **RoPE**, multi-head causal attention, **RMSNorm**, and **SwiGLU**
- Trained to **0.157 loss** on a 4GB laptop GPU with fp16, gradient accumulation, and cosine LR scheduling

## The Verification Engine
- Model-agnostic: **proves each rewrite is behaviorally identical and faster**
- Runs candidates against the original across hundreds of fuzzed inputs in isolated subprocesses
- Fits complexity curves to benchmark timings before accepting a rewrite

## Productized
AST-based hotspot scanner with pluggable proposers (local SLM, Claude API, or rule-based), repo-wide scanning, safe auto-fix, HTML evidence reports, and GitHub Actions CI.`,
  },
  {
    title: 'Autonomous AI Newsletter Platform',
    repoName: 'ai-newsletter',
    description:
      'A LangGraph multi-agent pipeline (Scout → Anchor → Copy Editor → Publisher) that researches, writes, adversarially reviews, and publishes weekly newsletters autonomously.',
    tech: ['Next.js', 'FastAPI', 'LangGraph', 'Supabase', 'RAG'],
    github: GITHUB_PROFILE,
    tag: 'Live',
    featured: true,
    icon: Newspaper,
    thumbnail: '/project-covers/ai-newsletter.svg',
    readme: `# Autonomous AI Newsletter Platform

A **LangGraph multi-agent pipeline** — **Scout → Anchor → Copy Editor → Publisher** — that researches, writes, adversarially reviews, and publishes weekly newsletters with no human in the loop.

## How It Works
- **Scout** scores live stories from Hacker News, RSS, and Reddit
- **Anchor** drafts the issue
- **Copy Editor** loops drafts back until they pass quality thresholds
- **Publisher** ships it

## Shipped With
- Next.js subscriber site
- Gemini + DeepSeek fallback routing
- **ChromaDB cross-issue memory** to avoid repetition
- AI hero images, category-filtered email via Resend
- Admin panel with scheduling and spend tracking

## Stack
Next.js · FastAPI · LangGraph · Supabase`,
  },
  {
    title: 'Dice Alley — Real-Time Multiplayer Platform',
    repoName: 'dice-alley',
    description:
      'Browser game-night platform with 9 multiplayer games synced via a host-authoritative engine over Supabase Realtime, plus from-scratch WebRTC voice chat, XP, achievements, and leaderboards.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'WebRTC', 'Realtime'],
    github: GITHUB_PROFILE,
    tag: 'Live',
    featured: true,
    icon: Dices,
    thumbnail: '/project-covers/dice-alley.svg',
    readme: `# Dice Alley — Real-Time Multiplayer Game Platform

A browser-based game-night platform with **9 multiplayer games**, each an independent TypeScript state machine + React board with AI bots, synced via a **host-authoritative engine over Supabase Realtime** (move sync, late-join resync, reconnect-from-snapshot).

## Built From Scratch
- **Peer-to-peer voice chat** — WebRTC full mesh, Supabase signaling, STUN/TURN
- XP / leveling, daily streaks, 30+ achievements, a live leaderboard, and spectator mode
- Guest play via anonymous auth, secured with Postgres row-level security

## Stack
Next.js · TypeScript · Supabase · WebRTC`,
  },
  {
    title: 'Jarvis — AI Voice Assistant & Autonomous Agent',
    repoName: 'jarvis-agent',
    description:
      'A ~5,300-line Windows desktop agent exposing ~100 callable tools across voice, vision, web automation (Playwright), and desktop control — running on Gemini free tier at zero cost.',
    tech: ['Python', 'Gemini', 'Playwright', 'Automation'],
    github: GITHUB_PROFILE,
    tag: 'Agentic',
    featured: true,
    icon: Bot,
    thumbnail: '/project-covers/jarvis.svg',
    readme: `# Jarvis — AI Voice Assistant & Autonomous Agent (Windows)

A **~5,300-line desktop agent** exposing **~100 callable tools** across voice, vision, web automation, desktop control, and memory — running on **Gemini 2.5 (free tier)** via OpenAI-compatible function calling with multi-key/multi-model rotation, **at zero cost and never touching the local GPU**.

## Capabilities
- Drives any website via **Playwright** using an indexed-DOM snapshot with vision-based verification
- Controls native Windows apps via **UI-Automation**
- Long-term **RAG memory**, runtime self-extension, Telegram phone control, and a live SSE HUD

## Stack
Python · Gemini · Playwright`,
  },
  {
    title: 'MockMate — Multimodal AI Interview Coach',
    repoName: 'MockMate',
    description:
      'Multimodal mock-interview app that generates role-specific questions from a CV/JD via Gemini, records video answers, and uses ML Kit to analyze facial expression and vocal confidence.',
    tech: ['Flutter', 'Gemini AI', 'ML Kit', 'Multimodal'],
    github: 'https://github.com/vatsal-agra/MockMate',
    tag: 'GDG 2nd Place',
    featured: true,
    icon: Smartphone,
    thumbnail: '/project-covers/mockmate.svg',
    readme: `# MockMate — Multimodal AI Interview Coach
### 🏆 2nd Place — GDG FlutterSprint Hackathon

A multimodal mock-interview app that bridges preparation and real interview success.

## What It Does
- Generates **role-specific questions** from a user's CV/JD via **Gemini**
- Records video answers and uses **Google ML Kit** to analyze facial expression and vocal confidence
- Produces structured, **per-answer improvement reports**

## Stack
Flutter · Gemini API · Google ML Kit · Firebase`,
  },

  // ===== ARCADE — browser-playable games (Python, ported to the web) =====
  {
    title: 'Space Invaders',
    repoName: 'space-invaders-pygame',
    description:
      'Feature-complete Space Invaders arcade game — multi-level progression, coin economy, speed upgrades, and full sound effects built with Python and Pygame.',
    tech: ['Python', 'Pygame'],
    github: 'https://github.com/vatsal-agra/space-invaders-pygame',
    featured: false,
    icon: Rocket,
    gameKey: 'space-invaders',
    thumbnail: '/portfolio thumbnails/p_01_space_invaders.png',
    readme: `# Space Invaders

A fully featured Space Invaders arcade game built from scratch in Python — home screen, multiple levels, a coin economy, and an in-game shop.

## Features
- **Multiple Levels** — enemies increase in number and speed as you progress
- **Coin Economy** — earn coins by defeating enemies, spend on upgrades
- **2x Bullet Speed Upgrade** — purchasable in the shop
- **Sound Effects** — shooting, explosion, and background music
- Game Over & Win states

## Stack
Python · Pygame`,
  },
  {
    title: 'A* Pathfinder Visualiser',
    repoName: 'astar-pathfinding-visualiser',
    description:
      'Interactive real-time visualisation of the A* search algorithm — place a start, end, and barriers on a grid, then watch A* find the shortest path step by step.',
    tech: ['Python', 'Pygame', 'Algorithms'],
    github: 'https://github.com/vatsal-agra/astar-pathfinding-visualiser',
    featured: false,
    icon: Route,
    gameKey: 'pathfinder',
    thumbnail: '/portfolio thumbnails/p_07_astar.png',
    readme: `# A* Pathfinding Visualiser

An interactive real-time visualisation of the A* search algorithm — place a start, an end, and barriers on a grid, then watch A* find the shortest path step by step.

## Controls
- **Left click** — place start, then end, then barriers
- **Right click** — remove a node
- **Spacebar** — run the algorithm
- **C** — clear the grid

## Stack
Python · Pygame`,
  },
  {
    title: 'Brick Breaker',
    repoName: 'brick-breaker-game',
    description:
      'Classic breakout-style arcade game with colorful bricks, paddle physics, and progressive difficulty.',
    tech: ['Python', 'Pygame'],
    github: 'https://github.com/vatsal-agra/brick-breaker-game',
    featured: false,
    icon: Blocks,
    gameKey: 'brick-breaker',
    thumbnail: '/portfolio thumbnails/p_11_brickbreaker.png',
    readme: `# Brick Breaker

A retro-style Brick Breaker arcade game built with Python and Pygame — colorful rows of bricks, smooth paddle control, angle-based ball physics, and progressive difficulty.

## Stack
Python · Pygame`,
  },
  {
    title: 'Traffic Rider',
    repoName: 'traffic-rider-game',
    description:
      'Fast-paced top-down car racing game where you dodge oncoming traffic and cover as much distance as possible.',
    tech: ['Python', 'Pygame'],
    github: 'https://github.com/vatsal-agra/traffic-rider-game',
    featured: false,
    icon: Car,
    gameKey: 'traffic-rider',
    thumbnail: '/portfolio thumbnails/p_12_trafficrider.png',
    readme: `# Traffic Rider

A fast-paced top-down car racing game built with Python and Pygame. Dodge oncoming traffic and survive as long as possible while your distance meter climbs.

## Stack
Python · Pygame`,
  },
  {
    title: 'Modern Tic Tac Toe',
    repoName: 'modern-tic-tac-toe',
    description:
      'Beautifully designed two-player Tic Tac Toe with persistent score tracking across rounds.',
    tech: ['Python', 'Tkinter'],
    github: 'https://github.com/vatsal-agra/modern-tic-tac-toe',
    featured: false,
    icon: Gamepad2,
    gameKey: 'tic-tac-toe',
    thumbnail: '/portfolio thumbnails/p_13_tictactoe.png',
    readme: `# Modern Tic Tac Toe

A clean, modern two-player Tic Tac Toe built with Python and Tkinter — persistent score tracking, full win/draw detection, and an elegant minimal design.

## Stack
Python · Tkinter`,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const playableProjects = projects.filter((p) => p.gameKey);
