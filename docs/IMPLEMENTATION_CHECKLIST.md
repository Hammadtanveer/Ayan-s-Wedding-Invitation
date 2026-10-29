# Phased Implementation Checklist

**Document ID:** `DOC-09`  
**Classification:** `PROPOSED`  
**Tracking Status:** Readiness Baseline (0% Code Built, 100% Planning Complete)  

---

## Task Hierarchy & Dependency Map

```
[Task 01: Project Discovery & Planning] (COMPLETED)
                     │
                     ▼
[Task 02: Core Foundation & Semantic HTML Scaffold]
                     │
                     ▼
[Task 03: Styling, Tokens & Responsive Layout]
                     │
                     ▼
[Task 04: Interactive Engines (Countdown, Calendar, WhatsApp, Audio)]
                     │
                     ▼
[Task 05: Visual Polish, Accessibility & End-to-End QA]
                     │
                     ▼
[Task 06: Production Deployment & Verification]
```

---

## Phase 1: Planning Baseline (Task 01 — COMPLETED)

- [x] **T1.1:** Inspect workspace environment and verify tools. (`VERIFIED`)
- [x] **T1.2:** Access Google Stitch project `1730933329537106473` and extract all 7 screens. (`VERIFIED`)
- [x] **T1.3:** Cross-check family lineage, event schedules, and Arabic inscriptions. (`VERIFIED`)
- [x] **T1.4:** Reconcile dual-theme discrepancy (The Heirloom Letter vs Nocturnal Royal Court). (`VERIFIED`)
- [x] **T1.5:** Write comprehensive planning documentation suite (`docs/`). (`VERIFIED`)

---

## Phase 2: Project Scaffold & Semantic Foundation (Task 02 — COMPLETED)

- [x] **T2.1: Directory & Asset Structure Setup**
  - Initialized `css/`, `js/`, and `assets/` directories.
  - Linked Google Fonts preconnect and optimized stylesheets for `Bodoni Moda`, `Noto Serif`, and `Amiri`.
- [x] **T2.2: CSS Design Tokens & Architecture**
  - Implemented `css/design-tokens.css` with 100% verified Nocturnal Royal Court tokens from Stitch MCP.
  - Implemented `css/typography.css` with Bodoni Moda / Noto Serif hierarchy and Amiri Arabic RTL calligraphy.
  - Implemented `css/components.css` with zero-radius Euclidean geometry, dual 1px gold hairline framing, 4 corner filigrees, and the 12-pointed Islamic star mandala watermark.
  - Aggregated via `css/styles.css`.
- [x] **T2.3: Semantic HTML5 Scaffold & Foundation Preview (`index.html`)**
  - Created semantic HTML5 entry point (`<main role="main">`, `<article class="decree-envelope">`).
  - Added verified Bismillah formula, A & S monogram crest, Bodoni Moda display title, couple names, and imperial seal trigger.
- [x] **T2.4: Foundation Script (`js/main.js`)**
  - Added lightweight foundation script for design initialization and accessible button state.
- [x] **T2.5: Cross-Device & Visual Verification**
  - Verified CSS tokens with zero missing variables.
  - Verified HTML syntax with zero unclosed or mismatched tags.
  - Verified WCAG contrast: `#CFE8DC` on `#021710` = 14.33:1; `#EBC166` on `#021710` = 10.91:1.
  - Captured rendered preview screenshot with headless Edge and confirmed visual fidelity against Stitch Screen 1.

---

## Phase 3: Multi-Screen Layout Expansion & Section Architecture (Task 03 — COMPLETED)

*Prerequisite: Completion of Task 02.*

- [x] **T3.1: Top & Bottom Navigation Framework**
  - Implemented `.royal-top-header` fixed blur header with A & S monogram crest, "20 Nov 2026" date badge, ambient audio trigger, and imperial guest seal.
  - Implemented `.royal-bottom-nav` fixed bottom navigation bar with Roman numerals (I to VII), smooth scroll targeting, and `IntersectionObserver` active tab tracking.
- [x] **T3.2: Seven-Screen Architectural Expansion (`index.html`)**
  - **Screen 1 — Gatefold Opening:** Preserved authentic envelope decree, sacred Bismillah scepter, A & S monogram crest, and "Tap to Open" smooth trigger.
  - **Screen 2 — Hero Wedding Decree:** Bismillah in Amiri calligraphy, verified couple lineage (Mohd. Ayan Siddiqui & Sumaira Khan), ampersand badge, 20 Nov 2026 date badge, Hasanpur & Seohara locations, bridal mehndi visual miniature, and acoustic raag accompaniment strip.
  - **Screen 3 — Celestial Countdown:** Archival parchment card, Insha'Allah calligraphy, 4-box countdown grid (Days, Hours, Minutes, Seconds), Surah Ar-Rum 30:21 quote panel, and calendar action buttons.
  - **Screen 4 — Ceremonial Events:** 3 distinct event cards with dual gold hairlines and corner accents:
    1. *Baraat & Nikah* (Friday, 20 Nov 2026 — 3:30 PM Baraat, 6:30 PM Nikah, 7:30 PM Dinner @ Kamal Palace, Hasanpur).
    2. *Dawat-e-Walima Lunch* (Saturday, 21 Nov 2026 — 12:30 PM onwards @ Evergreen Banquet Hall, Seohara).
    3. *Dawat-e-Walima Dinner* (Sunday, 22 Nov 2026 — 6:30 PM onwards @ Mangal Lipi Farm House, Seohara-Moradabad Road).
  - **Screen 5 — Cherished Moments:** 2x2 fine-art gallery grid with Rasm (Mehndi), Nikah (Zardozi regalia), Muntazir (Ancestral courtyard), and Paiman (Rings in roses) with hover zooms and caption bars.
  - **Screen 6 — Imperial Family:** Ancestral blessings from Grandparents (Late Mrs. & Mr. Haji Iftakhar Ahmad), Groom's parents (Mrs. & Mr. Haji Iqtadar Ahmad), Bride's parents (Mrs. & Mr. Mujahid Ali Khan), weds flourish ❦, portrait vignettes, Cordial Hosts banner, and Send Du'a benediction trigger.
  - **Screen 7 — RSVP & Closing:** Sunnah calligraphy blessing (`بَارَكَ اللَّهُ لَكُمَا...`), translation, Best Compliments list, attendee counter stepper, and WhatsApp RSVP / Share buttons.
- [x] **T3.3: Component Styling & Design Tokens (`css/components.css`)**
  - Extended component architecture using 100% verified Nocturnal Royal Court tokens (zero missing variables).
  - Enforced Euclidean zero-radius geometry (`border-radius: 0px`) across all cards, buttons, frames, and images.
  - Enforced responsive container widths (`max-width: 680px` centered) and touch targets >= 44x44px.
- [x] **T3.4: Visual & Responsive Verification**
  - Verified across mobile (360px–412px), tablet (768px), and desktop (1280px–1440px) viewports with zero horizontal scroll (`overflow-x: hidden`).
  - Generated mobile and desktop visual screenshots in `docs/preview-mobile.png` and `docs/preview-desktop.png`.

---

## Phase 4: Functional Integrations & Configuration (Task 04 — COMPLETED)

*Prerequisite: Completion of Task 03.*

- [x] **T4.1: Central Configuration (`js/config.js`)**
  - Created central `WEDDING_CONFIG` separating configuration data from application logic.
  - Specified confirmed couple, family, event dates, and `Asia/Kolkata` (+05:30) timezone.
  - Strictly marked unconfirmed fields as `null` / unverified (ceremony times, venue GPS pins, RSVP phone number, audio asset).
  - Provided feature accessors (`isRsvpEnabled()`, `isAudioEnabled()`, `isMapVerified()`).
- [x] **T4.2: Timezone-Aware Countdown Engine (`js/countdown.js`)**
  - Implemented timezone-accurate math targeting start of auspicious day (`2026-11-20T00:00:00+05:30`).
  - Added zero-padding helper (`padZero`).
  - Handled elapsed targets safely with zero-flooring (no negative numbers).
  - Throttled DOM updates to once per second (`setInterval` with cleanup handle).
- [x] **T4.3: Calendar Integration (`js/calendar.js`)**
  - Implemented RFC 5545 compliant `.ics` calendar generator with strict CRLF line endings and text escaping.
  - Implemented confirmed all-day reservation format for the 3 wedding events (Baraat & Nikah, Walima Lunch, Walima Dinner).
  - Implemented 1-click Google Calendar URL generator for individual events.
  - Added design-consistent modal dialog (`#royalCalendarModal`) for calendar downloads and Google Calendar links.
- [x] **T4.4: WhatsApp RSVP Module (`js/rsvp.js`)**
  - Implemented guest counter stepper (bounds 1 to 10) with accessible ARIA spinbutton attributes.
  - Implemented pre-composed RSVP message generator with couple names and attendee count.
  - Enforced safe disabled state (`aria-disabled="true"`, `.btn-royal-disabled`) while host phone number is unconfirmed.
  - Wired interactive toast explaining that WhatsApp RSVP phone number is awaiting family confirmation.
- [x] **T4.5: Ambient Audio Controller (`js/audio.js`)**
  - Implemented user-gesture-only HTML5 Audio player with play/pause sync across header and hero controls.
  - Enforced safe disabled state while audio asset remains unapproved/unsupplied by the family.
  - Added support for `prefers-reduced-motion` to suppress equalizer wave animations.
- [x] **T4.6: Native Sharing & Feedback Toast (`js/share.js`)**
  - Implemented progressive enhancement: Web Share API (`navigator.share`) with fallback to Clipboard API (`navigator.clipboard.writeText`).
  - Implemented floating accessible feedback toast (`#royalToastNotice`) in Nocturnal Royal Court styling.
- [x] **T4.7: Venue Map Actions Discipline**
  - Verified each venue against `isMapVerified` flag; safely disabled unverified navigation pins with informative feedback toasts.

---

## Phase 5: Verification, Accessibility & Quality Assurance (Task 05)

*Prerequisite: Completion of Task 04.*

- [x] **T5.1: Accessibility Audit**
  - Verified WCAG 2.2 AA compliance across all 12 color pairings with zero failures (11 pairings achieve AAA >= 7.0:1; gold on parchment achieves AA 5.18:1 >= 4.5:1).
  - Verified touch target sizing (all buttons >= 44x44px min-dimension).
  - Corrected semantic headings across all 7 sections (`h1` -> `h2` -> `h3` -> `h4`) with zero skipping.
  - Added `lang="ar"` and `dir="rtl"` to all Quranic and Arabic calligraphy elements.
  - Verified `aria-hidden="true"` across all 21 decorative SVGs and filigree corner accents.
  - Wired Escape key handling and focus restoration to the calendar modal (`js/calendar.js`).
  - Added WAI-ARIA `role="spinbutton"` keyboard navigation (`ArrowUp`, `ArrowDown`, `Home`, `End`) to the attendee stepper (`js/rsvp.js`).
  - Verified `@media (prefers-reduced-motion)` suppression of animations.
- [x] **T5.2: Cross-Device & Responsive Verification**
  - Audited across 7 standard viewports (360x640, 375x667, 390x844, 412x915, 768x1024, 1280x800, 1440x900).
  - Verified zero horizontal scrolling (`scrollWidth === innerWidth`) at all breakpoints.
  - Verified dual cross-browser rendering parity in headless Google Chrome and Microsoft Edge.
- [x] **T5.3: Deep Link & Map Verification**
  - Confirmed map buttons for Kamal Palace, Evergreen Banquet Hall, and Mangal Lipi Farm House safely report disabled status with informative toasts pending family GPS verification.
  - Confirmed WhatsApp RSVP link remains safely disabled without routing to dummy/fake numbers until the host phone number is verified.
  - Added clarifying micro-caption for countdown timer (*Countdown marks the dawn of the wedding day 00:00 IST).
- [x] **T5.4: Test Suite Verification**
  - Executed Node.js module test suite (`test_modules.js`) covering central config, countdown engine, RFC 5545 iCalendar serialization, and RSVP encoder: 100% PASS.

---

## Phase 6: Deployment Preparation & Handover (Task 06)

*Prerequisite: Completion of Task 05.*

- [x] **T6.1: Static Hosting Compatibility & Hardcoded Path Audit**
  - Confirmed 100% build-free, zero-dependency static architecture.
  - Verified all CSS, JS, and image assets use clean relative paths with zero hardcoded local Windows file paths.
  - Validated local production-like HTTP server (`http://127.0.0.1:8765/`) with 100% HTTP 200 OK responses across all 13 core files.
- [x] **T6.2: Social Media Open Graph Artwork & Metadata**
  - Created high-fidelity 1200 × 630 px Open Graph social card at `assets/images/og-preview.png` in Nocturnal Royal Court aesthetics.
  - Added semantic Open Graph (`og:type`, `og:site_name`, `og:title`, `og:description`, `og:image`, `og:image:width`, `og:image:height`, `og:image:alt`) and Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) metadata to `index.html`.
  - Added `<meta name="theme-color" content="#021710">` to match approved palette.
- [x] **T6.3: Production Configuration Discipline**
  - Verified `js/config.js` maintains explicit `null` values and disabled states for unconfirmed ceremony times, host WhatsApp phone number, and venue GPS coordinates.
- [ ] **T6.4: Public Deployment (GATE: Awaiting Explicit User Approval)**
  - Requires user authorization before publishing to Cloudflare Pages or GitHub Pages.
  - Requires family confirmation of WhatsApp RSVP contact and map pins before final public broadcast.
