# PROJECT SPECIFICATIONS: Anwita D Pillai Portfolio

## 1. TECH STACK & ARCHITECTURE
- **Core:** HTML5, CSS3, Vanilla JavaScript.
- **Data Architecture:** The site is fully data-driven. Content must be fetched via `fetch()` from separate `.json` files located in the `/data/` directory (`publications.json`, `experience.json`, `awards.json`, `projects.json`, `writings.json`).
- **Responsiveness:** Use CSS Flexbox, CSS Grid, and fluid typography using `clamp()`. Include `modern-normalize` via CDN for cross-browser consistency. Mobile-first approach.

## 2. DESIGN SYSTEM (Exact Specs)
- **Colors:**
  - Canvas: `#F1EFE9`
  - Ink: `#161614`
  - Redaction Accent: `#BF3928`
  - Archive Accent: `#C5A059`
- **Typography (Google Fonts):**
  - Serif: `Newsreader` (Hero Name: Weight 700, Size 200px, Letter-spacing -0.06em).
  - Sans-Serif: `Space Grotesk` (Nav: Weight 400, Size 20px, Letter-spacing 0.1em. Tagline: Weight 500, Size 35px).
  - Script: `Estonia` (Captions: Weight 400, Size 40px).
- **Specific Elements:**
  - Nav Divider: 1px solid `#161614`.
  - Red Line: 5px solid `#BF3928`, slightly rotated (-0.38deg).
  - Monogram: 174px by 45px, centered in the nav.

## 🚨 CRITICAL DEVELOPMENT RULE
DO NOT use `position: absolute` or hardcoded `left/top` values for layout. The Figma export uses absolute positioning, but the website MUST use CSS Flexbox and Grid to ensure full responsiveness across all screen sizes.

## 3. ASSETS (Relative Paths)
- Monogram: `./assets/Monogram.png` (Nav center, width 174px, height 45px).
- Hero Character: `./assets/base-character.png`
- Footer Character: `./assets/smile-me-leaning-forward.png`
- Photo Frame Bracket: `./assets/Minimalist Futuristic HUD Frame Overlay.png`
- Ornate 404 Frame: `./assets/Ornate Gold Vintage Plaque Frame.png`
- Profile Photo: `./assets/profile-picture.jpg`

## 4. SECTION LAYOUTS & MOTION
- **Sticky Nav:** Left: `INDEX` (Space Grotesk). Center: Monogram. Right: `ABOUT`. On hover, links get a red underline (`#BF3928`).
- **Hero:** Flex layout. Left: Character illustration + "Currently alphabetising footnotes". Right: Massive `Newsreader` Name + "I make the familiar strange." + Red down arrow.
- **About:** Text left, Photo right (framed with HUD bracket). Text has gold (`#C5A059`) background highlights that reveal on scroll. Quote box has a vertical gold border.
- **Data Tables (Publications, Awards, Recent Writings):** CSS Grid. 1px solid `#161614` borders. No background color. Hovering over a row turns the text gold (`#C5A059`).
- **Experience:** Accordion format. Click to expand. 
- **Projects:** Fanned card deck. Desktop: Slow continuous marquee that pauses on hover. Mobile: Horizontal scroll-snap carousel.
- **Footer:** Massive `Newsreader` "Get in Touch". Gold button `[ SAY HELLO ]`. Illustration leaning on the text. 
- **404 Page:** Ornate gold frame asset containing a massive "404" with a textured red strike-through, and a `[ GO HOME ]` button.

## 5. MOBILE RESPONSIVENESS (< 768px)
- Stack all columns vertically.
- Tables convert to single-column lists: Title (bold header) -> Publisher -> Year.
- Project deck becomes a touch-friendly horizontal swipe carousel.

## 6. LINKS
- Email: anwitadpillai007@gmail.com
- Instagram: https://www.instagram.com/nirmaathri/
- LinkedIn: https://www.linkedin.com/in/anwita-d-pillai/
- GitHub: https://github.com/AnwitaDPillai
- Substack: https://anwitadpillai.substack.com/