# Anwita D Pillai — Personal Portfolio

The open-source codebase for my personal digital archive & portfolio.

**Live Deployment:** [anwitadpillai.github.io/portfolio](https://anwitadpillai.github.io/portfolio/)

---

## Overview

This is not a conventional portfolio. It is a **living research archive** — a single-page editorial experience structured as 11 cinematic viewports, where documents, projects, and publications behave as physical artefacts in a scholarly collection.

The site is designed to feel like *an archive whose documents have started moving*: kinetic typography, stacker sections, horizontal provenance bands, and interactive decks work together to create a reading experience that is both editorial and alive.

---

## Design & Architecture

Unlike traditional single-column web builds, this platform uses an **asymmetric, viewport-driven layout engine** to frame writing, research, and projects as archival objects.

- **Concept:** A living research archive — scholarly, editorial, slightly strange.
- **Typography:** Set in `Instrument Sans` (variable `wdth` axis) for structural authority, `Instrument Serif` for literary voice, and `IBM Plex Mono` for archival metadata.
- **Aesthetic:** Rooted in an ivory/paper colour story (`#F2F0E9`) with a dark archive (`#101315`) for research depth. Textures and grain overlays give the digital page physical weight.
- **Motion:** Scroll-driven choreography using Lenis smooth scrolling, GSAP, and ScrollTrigger. Every animation reveals information — chronology, hierarchy, research process, or personality.
- **Development:** Hand-coded from scratch using semantic HTML5, fluid layout grids, and performance-optimised CSS3. No frameworks. Zero overhead.

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Core** | HTML5, CSS3, JavaScript (ES6+) |
| **Smooth Scrolling** | [Lenis](https://lenis.studiofreight.com/) |
| **Animation** | [GSAP](https://gsap.com/) + [ScrollTrigger](https://gsap.com/scrolltrigger/) |
| **Text Splitting** | [SplitType](https://github.com/lukePeavey/SplitType) |
| **Fonts** | Instrument Sans, Instrument Serif, IBM Plex Mono (all via Google Fonts) |
| **Deployment** | GitHub Pages (static site) |

---

## Repository Blueprint

```text
portfolio/
├── index.html          # Structural shell & 11 viewport mounts
├── style.css           # Design system, typography, grid, motion utilities
├── script.js           # Application engine, data hydration, scroll orchestration
│
├── data/               # Canonical content (single source of truth)
│   ├── site-config.js
│   ├── affiliations.js
│   ├── experience.js
│   ├── projects.js
│   ├── publications.js
│   ├── awards.js
│   └── research.js
│
├── assets/
│   ├── brand/          # Monogram, favicon, portrait
│   ├── mascot/         # Illustrated marginal narrator (PNG poses)
│   ├── projects/       # Project imagery & artefacts
│   └── textures/       # Paper grain, dark texture, archival texture
│
├── googlee401806b6a7ee250.html  # Google Search Console verification (DO NOT REMOVE)
└── README.md
```

---

## Data Architecture

Content is separated from presentation. All portfolio data lives in `data/*.js` as plain JavaScript objects. Adding a new project, award, or affiliation means editing one file — no HTML restructuring required.

```javascript
// Example: Adding a new project
// data/projects.js

{
    id: "new-project",
    title: "Project Name",
    category: "Research",
    status: "2026 · In Progress",
    description: "...",
    tags: ["Tag One", "Tag Two"],
    link: "https://..."
}
```

---

## The 11 Viewports

1. **Opening** — Kinetic typography title page
2. **About** — Personal voice with self-highlighting text
3. **Affiliations** — Horizontal rotating provenance bands
4. **Experience** — Stacking research dossier cards
5. **Projects** — Sticky stacking major projects
6. **Publications** — Archival ledger
7. **Awards** — Honours ledger
8. **Research** — Dark archive (papers + grants)
9. **Playground** — Interactive shuffling deck (hobbyist projects)
10. **Recent Writing** — Content trail from Substack RSS
11. **Colophon** — Contact & provenance

---

**Built in digital ink. Powered by raw code.**
