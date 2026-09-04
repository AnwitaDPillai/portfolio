# ANWITA D PILLAI — PORTFOLIO WIREFRAME
---

## OVERVIEW

**Concept:** Anwita D Pillai — Portfolio  
**Structure:** Single-page, 11 viewport experiences  
**Governing metaphor:** A scholarly archive whose documents have started moving  
**Visual language:** Editorial / archival / literary / slightly strange  
**Deployment:** Static site (HTML/CSS/JS) via GitHub Pages

---

## CORE IDENTITY

**Typography**
- Display / identity: Instrument Sans (variable `wdth` 75–100)
- Literary / editorial voice: Instrument Serif
- Archival metadata: IBM Plex Mono

**Colours**
| Role | Value |
|------|-------|
| Paper | `#F2F0E9` |
| Ink | `#171715` |
| Graphite | `#575650` |
| Ochre (accent) | `#A88B6B` |
| Archive Black | `#101315` |
| Archive Blue | `#536B78` |
| Research Green | `#53685B` |
| Annotation Red | `#B44D3C` |

**Materials**
- Paper + ink + documents + annotations
- Photographs: almost none (only portrait, once)
- Mascot: small marginal narrator (transparent PNGs, individual poses)
- Logos: none — textual provenance only

---

## ASSET DIRECTORY

```
assets/
├── brand/
│   └── profile-picture.jpg
├── mascot/
│   ├── reading.png
│   ├── thinking.png
│   ├── typing.png
│   ├── researching.png
│   ├── confused.png
│   ├── celebrating.png
│   ├── presenting.png
│   ├── walking.png
│   └── graph.png
├── projects/
│   ├── craft-project-ucla.jpg
│   ├── igem-project-slide.jpg
│   ├── nethernet.jpg
│   ├── offtrack.jpg
│   ├── phenotype.jpg
│   ├── research-log.jpg
│   └── stanford-molecular-imaging-slides.png
└── textures/
    ├── archival-texture.png
    ├── dark-texture.png
    ├── fine-grain.png
    └── imperfection.png
```

---

## DATA FILES

```
data/
├── site-config.js      # identity, contact, links, quote
├── affiliations.js     # institutions, programmes
├── experience.js       # research & programs (9 items)
├── projects.js         # all projects including Research Log
├── publications.js     # published works
├── awards.js           # honours & awards
└── research.js         # papers + grant proposals
```

**Note:** The Research Log is a separate project (standalone website). It appears as one project card within the Projects section, linking out to the live site.

---

## THE 11 VIEWPORTS

### 01 — OPENING (The Title Page)

**Purpose:** Immediate identity. Typography is the hero.

**Background:** `#F2F0E9` + `fine-grain.png` overlay

**Content:**
- Name: From `site-config.js` (`identity.name`)
- Subtitle: From `site-config.js` (`identity.title`)
- Metadata: `01 / 11`
- Mascot: `mascot/reading.png`
- Scroll cue: "SCROLL TO READ ↓"

**Interactions:**
- Kinetic typography: variable `wdth` expands on scroll
- Fixed viewport until cue reached
- Mascot fades in from bottom
- Metadata fades in after load

**Effects:** Fixed viewport, kinetic typography, variable typography, type effect, fade-in, parallax

**Transition:** Composition lifts, revealing About.

---

### 02 — ABOUT (The Margin)

**Purpose:** Introduce personality. Existing copy remains verbatim.

**Background:** `#F2F0E9`

**Content:**
- Paragraphs: From `site-config.js` (`about.paragraphs`)
- Poetry line: From `site-config.js` (`about.poetry`)
- Portrait: `profile-picture.jpg` (once, small, archival caption)
- CTA: "Read the Substack →" (links to `site-config.js` `about.substackUrl`)

**Interactions:**
- Text reveals progressively
- Self-highlighting text (ochre) on key phrases
- Poetry line: large Instrument Serif, italic, subtle animation
- Parallax: mascot at different speed
- Portrait: fades in with vignette

**Effects:** Text reveal, self-highlighting, parallax, fade-in

**Transition:** Fades into Affiliations.

---

### 03 — AFFILIATIONS (Provenance)

**Purpose:** Show institutional credibility without logos.

**Background:** `#F2F0E9`

**Content:**
- Names: From `data/affiliations.js`
- Format: Horizontal, typographic-only marquee

**Interactions:**
- Horizontal scrolling: vertical scroll drives horizontal movement
- Peek & pop: hover reveals context (`affiliations[i].context`)
- Magnetic hover: name expands/weight changes

**Effects:** Horizontal scroll, scrolling text, peek & pop, magnetic hover

**Transition:** Background darkens.

---

### 04 — EXPERIENCE (The Stack)

**Purpose:** Showcase major research experiences.

**Background:** `#F2F0E9` → `#EAE6DD` (warmer)

**Content:**
- Items: From `data/experience.js`
- Each with: title, organization, status, description, optional image

**Interactions:**
- Stacker sections: each pins to viewport as it arrives
- Fixed viewport: current card centers, next rises
- Parallax: images slightly slower than text
- Document treatment: paper texture, subtle shadow
- Mascot: appears in "researching" pose

**Effects:** Stacker sections, fixed viewports, parallax, document aesthetics, mascot integration

**Transition:** Background darkens into dark archive.

---

### 05 — PROJECTS (The Shuffle)

**Purpose:** Show major intellectual projects.

**Background:** `#EAE6DD` (warm paper)

**Content:**
- Projects: From `data/projects.js`
- Gold as Grammar: special document treatment
- Research Log: project card linking to external site

**Interactions:**
- Shuffling cards: deterministic rearrangement on scroll
- Peek & pop: hover reveals more details
- Parallax: cards at different speeds
- Mascot: "presenting" pose
- Gold as Grammar: title page as physical document

**Effects:** Shuffling cards, peek & pop, parallax, mascot integration, document treatment

**Transition:** Background lightens into Publications.

---

### 06 — PUBLICATIONS (The Ledger)

**Purpose:** Show published writing.

**Background:** `#F2F0E9`

**Content:**
- Publications: From `data/publications.js`
- Each with: title, work, result, detail

**Interactions:**
- Sticky rows: each pins to top as it arrives
- Peek & pop: hover expands to show detail
- Fade-in text: rows fade in on scroll
- Editorial typography: Instrument Serif for titles, Plex Mono for metadata

**Effects:** Sticky rows, peek & pop, fade-in text

**Transition:** Vertical continuation into Awards.

---

### 07 — AWARDS (The Honours Ledger)

**Purpose:** Show honours and awards chronologically.

**Background:** `#F2F0E9`

**Content:**
- Awards: From `data/awards.js`
- Grouped by year

**Interactions:**
- Sticky rows: years stick to top
- Text reveal: awards appear line by line
- Self-highlighting: key distinctions in ochre
- Mascot: "celebrating" pose near significant award

**Effects:** Sticky rows, text reveal, self-highlighting, mascot integration

**Transition:** Page darkens abruptly.

---

### 08 — RESEARCH PAPERS & GRANTS (The Dark Archive)

**Purpose:** Show deep research output. Dramatic colour transition.

**Background:** `#101315` (Archive Black) — text: `#F2F0E9`, accent: `#788895`

**Content:**
- Papers: From `data/research.js` (`researchPapers`)
- Grants: From `data/research.js` (`grantProposals`)

**Interactions:**
- Colour change: paper → dark
- Type effect: titles type themselves out
- Fade-in text: descriptions fade in
- Parallax: subtle background texture movement
- Mascot: "thinking" or "confused" pose

**Effects:** Colour-change sections, type effect, fade-in text, parallax, mascot integration

**Transition:** Darkness lifts, returns to paper.

---

### 09 — HOBBYIST PROJECTS (The Playground)

**Purpose:** Show playful, technical, experimental side.

**Background:** `#F2F0E9`

**Content:**
- Projects: From `data/projects.js` (category: "Hobbyist")
- Each with: title, screenshot, description, link

**Interactions:**
- Shuffling cards: rearrange on scroll
- Content trail: cursor leaves trail of project names
- Peek & pop: hover reveals details
- Parallax: cards move independently
- Mascot: "typing" or "graph" pose

**Effects:** Shuffling cards, content trail, peek & pop, parallax, mascot integration

**Transition:** Shuffling slows into Recent Writing.

---

### 10 — RECENT WRITING (The Content Trail)

**Purpose:** Show latest Substack posts dynamically.

**Background:** `#F2F0E9`

**Content:**
- Live RSS feed from Substack (5 most recent posts)
- Titles + dates

**Interactions:**
- Content trail: posts appear along curved path
- Fade-in: each post fades in
- Scrolling text: section title scrolls horizontally

**Effects:** Content trail, fade-in text, scrolling text

**Transition:** Trail narrows into Contact.

---

### 11 — CONTACT (The Colophon)

**Purpose:** Quiet ending. Reach out.

**Background:** `#F2F0E9`

**Content:**
- Heading: From `site-config.js` (`contact.heading`)
- Message: From `site-config.js` (`contact.message`)
- Links: From `site-config.js` (`contact.links`)
- Button: From `site-config.js` (`contact.buttonLabel`)
- Email: From `site-config.js` (`contact.email`)
- Mascot: `smiling-chin-on-palm.png` or `smile-me-leaning-forward.png`
- Footer: From `site-config.js` (`footer.text`)

**Interactions:**
- Almost completely still
- Mascot: sits calmly
- Button: subtle pulse or underline animation

**Effects:** Fixed viewport, subtle button animation

**Transition:** End of page.

---

## INTERACTION VOCABULARY MAP

| Effect | Location |
|--------|----------|
| Shuffling cards | Projects, Hobbyist Projects |
| Self-highlighting text | About, Awards |
| Horizontal scroll | Affiliations |
| Fixed viewports | Opening, Experience |
| Text reveals itself | About, Experience, Awards |
| Colour-change sections | Experience → Research, Research → Hobbyist |
| Lenis / parallax | Throughout (subtle) |
| Content trail | Hobbyist Projects, Recent Writing |
| Stacker sections | Experience |
| Scrolling text | Affiliations, Recent Writing |
| Fade-in text | Publications, Research |
| Type effect | Research Papers & Grants (titles only) |
| Sticky rows | Publications, Awards |
| Peek & pop | Affiliations, Publications, Hobbyist Projects |
| Subtle text emphasis (replaces swinging) | About (poetry), Projects, Hobbyist, Contact button |

---

## ADDITIONAL POLISH ELEMENTS

1. **Scroll-Triggered Progress Indicator:** Thin line tracking progress through sections (IBM Plex Mono, tiny).
2. **"Magnetic" Cursor (Desktop):** Contextual states: "READ" (publications), "VIEW" (projects), "FIELD NOTE" (Research Log).
3. **Archive "Stamps":** "DRAFT COMPLETE", "PUBLISHED", "ACTIVE" — applied to cards from data status fields.
4. **Subtle Paper Texture:** `fine-grain.png` overlay on all light sections.
5. **Editorial "Crop" Transitions:** Reveal artefacts through scrolling crop (Gold as Grammar title page).
6. **Mascot as Marginal Narrator:** Appears in different poses at key moments (`reading.png`, `researching.png`, `celebrating.png`, etc.).
7. **Quiet Mode:** Toggle (`MOTION ON/OFF`) disables all animations, parallax, smooth scrolling.

---

## ARCHITECTURE PRINCIPLES

1. **Motion reveals information.** If an effect doesn't reveal chronology, hierarchy, research process, provenance, personality, or materiality — delete it.
2. **Content is canonical.** Existing copy preserved verbatim. Redesign changes presentation, not voice.
3. **Content lives in data files.** Design lives in HTML/CSS/JS. Adding a project = one entry in `projects.js`.
4. **Scroll-first interaction.** No click-heavy navigation. The scroll itself is the interaction.
5. **Motion is progressive enhancement.** Quiet mode disables all animations — site remains functional and beautiful.
6. **Typography is the hero.** Not WebGL, not 3D, not effects. Typography.
7. **The archive breathes.** Visual rhythm: quiet → intimate → institutional → intense → intellectual → playful → personal → quiet.
8. **No tilted text.** All text remains level. Use subtle underlines, scale, or weight changes for emphasis.

---

## TECHNICAL STACK

**Core:** HTML5, CSS3, JavaScript (ES6+)

**Libraries:**
- Lenis (smooth scrolling)
- GSAP + ScrollTrigger (animation orchestration)
- SplitType (text splitting for kinetic typography)

**Fonts:** (Google Fonts)
- Instrument Sans
- Instrument Serif
- IBM Plex Mono

**Deployment:** GitHub Pages (static site)

**No frameworks.** No React, Vue, Svelte, Vite, or build tools. Static HTML/CSS/JS only.

---

## IMPLEMENTATION ORDER

1. **`index.html`** — structural skeleton with all 11 sections, data references, CDN links.
2. **`style.css`** — design system (colours, typography, grid, textures, utilities).
3. **`script.js`** — data loader, section renderer, Lenis + GSAP/ScrollTrigger orchestration.
4. **Section rendering** — each section reads its data file and renders HTML accordingly.
5. **Motion layer** — assign interactions per the vocabulary map above.
6. **Polish** — cursor, quiet mode, progress indicator, stamps, mascot integration.
7. **Test** — desktop, tablet, mobile, quiet mode, reduced motion preference.

---

## DESIGN RULE

> Every interaction must answer the question: *what does this reveal?*