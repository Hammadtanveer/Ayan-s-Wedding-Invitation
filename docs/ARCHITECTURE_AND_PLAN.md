# Technical Architecture & Implementation Plan
## Approved Baseline: "Nocturnal Royal Court"

**Document ID:** `DOC-05`  
**Classification:** `APPROVED ARCHITECTURE BASELINE`  
**Methodology:** Architectural trade-off analysis under `/ponytail` and `/ui-ux-pro-max` constraints  

---

## 1. Architectural Stack Evaluation

We evaluated three potential technical paths for this digital invitation website:

```
+---------------------------------------------------------------------------------------------------+
| CRITERIA           | OPTION 1: Full Framework   | OPTION 2: Astro / Vite Static | OPTION 3: Modern Vanilla|
|                    | (Next.js / React / TS)     | Static Site Generator         | HTML5 / CSS3 / ES-Next  |
+--------------------+----------------------------+-------------------------------+-------------------------+
| Initial Page Weight| 180 KB – 350 KB JS runtime | 40 KB – 70 KB JS runtime      | < 12 KB JS runtime      |
| Build Pipeline     | Heavy (npm, Webpack/Turbopack) Medium (Node, Vite build)  | Zero required (or micro)|
| Mobile 3G FCP      | 2.2s – 3.5s                | 1.1s – 1.6s                   | 0.8s – 1.1s             |
| Deployment Friction| Node server or Vercel SSR  | Static Host (Pages/Netlify)   | Any static server/host  |
| Maintenance Lifespan| High (dependency updates) | Low-Medium                    | Infinite (standard web) |
| Recommendation     | REJECTED (Bloated/YAGNI)   | ACCEPTABLE ALTERNATIVE        | **STRONGLY RECOMMENDED**|
+---------------------------------------------------------------------------------------------------+
```

### Architectural Rationale (`/ponytail`)
1. **Why Plain Modern HTML5 + CSS + Vanilla JS Wins:**
   - **Zero Build / Zero Dependency Risk:** An invitation website has no complex dynamic server state. Family members open it simultaneously over wedding weekends. A static HTML file cannot crash, suffers zero bundle rot, and costs nothing to host forever.
   - **Native Web Standards:** Browser APIs handle all requirements natively:
     - `new Audio()` for ambient audio.
     - `Date` & `requestAnimationFrame` / `setInterval` for the countdown.
     - `navigator.share` / `navigator.clipboard` for sharing.
     - `data:text/calendar` URI generation for calendar downloads.
   - **Blazing Performance:** Loads instantly on 3G rural mobile connections in Uttar Pradesh, preventing blank white screens while guests travel.

---

## 2. Project File Structure

```
islamic-wedding-invitation/
├── index.html                  # Main semantic HTML5 document (faithful to Nocturnal Royal Court)
├── css/
│   ├── design-tokens.css       # CSS custom properties (colors, typography, spacing from Stitch)
│   ├── typography.css          # Bodoni Moda, Noto Serif, Amiri font definitions
│   ├── components.css          # Euclidean boxes, 1px gold borders, filigrees, mandala watermark
│   └── animations.css          # Subtle mandala rotation & reduced-motion overrides
├── js/
│   ├── countdown.js            # Timezone-aware countdown module (target: 2026-11-20T15:30:00+05:30)
│   ├── calendar.js             # RFC 5545 .ics generator & Google Calendar link builder
│   ├── share.js                # Web Share API & clipboard fallback toast
│   └── audio.js                # Ambient music play/pause toggle with user gesture handling
├── assets/
│   ├── images/                 # Optimized WebP assets (archway, rings, henna, sherwani)
│   ├── audio/                  # Lightweight ambient wedding audio loop (.mp3, < 800KB)
│   └── icons/                  # Clean SVGs for navigation, calendar, audio, and map
├── docs/                       # Complete planning & architecture documentation suite
├── README.md                   # Repository overview & setup guide
└── AGENTS.md                   # Autonomous agent engineering constraints
```

---

## 3. End-to-End Feature Flows

### Flow A: The Royal Decree Reveal Experience
```
[User arrives on site] 
       │
       ▼
[Opening Decree Screen — Screen 1] 
   - Displays centered 12-pointed star mandala & "A & S" monogram crest
   - "Wedding Invitation" in Bodoni Moda italic script
   - "Tap to Open" sealed imperial decree button
       │ (User taps button)
       ▼
[Folio Smooth Unseal Transition]
   - Subtle golden shimmer & scale animation
   - Smooth reveal / scroll into the 6 ceremonial sections
   - Audio prompt (optional gentle play if sound unmuted)
```

### Flow B: Timezone-Aware Countdown Engine
```
Target: 2026-11-20T15:30:00+05:30 (Friday 3:30 PM Indian Standard Time)
       │
       ▼
[Calculate Delta]: Math.max(0, TargetEpoch - CurrentEpoch)
       │
       ├─ If Delta > 0:
       │    Days    = Math.floor(Delta / 86400000)
       │    Hours   = Math.floor((Delta % 86400000) / 3600000)
       │    Minutes = Math.floor((Delta % 3600000) / 60000)
       │    Seconds = Math.floor((Delta % 60000) / 1000)
       │    Update DOM elements smoothly via requestAnimationFrame
       │
       └─ If Delta === 0:
            Display celebratory status: "Today is the Auspicious Day • Mubarak!"
```

### Flow C: 1-Click WhatsApp RSVP Engine
```
[User taps "RSVP on WhatsApp"]
       │
       ▼
[Sanitize Parameters]
   - Phone: Validated host number (E.164 standard, e.g. 919XXXXXXXXX)
   - Message: encodeURIComponent("Assalamu Alaikum, I received the wedding invitation of Ayan & Sumaira. Insha'Allah I will be attending with [ ] guests.")
       │
       ▼
[Construct Deep Link]: `https://api.whatsapp.com/send?phone=${phone}&text=${message}`
       │
       ▼
[Dispatch]: Native WhatsApp opens on mobile; WhatsApp Web opens on desktop
```

---

## 4. Phased Implementation Roadmap

```
+-----------------------------------------------------------------------------------+
| PHASE 1: DISCOVERY & ARCHITECTURE (COMPLETED IN TASK 01)                          |
| - Stitch MCP project audited (screens, tokens, assets).                           |
| - Conflict resolved & approved: "Nocturnal Royal Court".                          |
| - Complete planning documents written & verified.                                 |
+-----------------------------------------------------------------------------------+
                                          │
                                          ▼
+-----------------------------------------------------------------------------------+
| PHASE 2: DESIGN FOUNDATION & SCAFFOLD (TASK 02)                                   |
| - Initialize folder structure and asset directories.                              |
| - Connect Google Fonts (Bodoni Moda, Noto Serif, Amiri).                          |
| - Build semantic HTML skeleton faithful to Stitch Screens 1–7.                    |
| - Implement exact Stitch CSS design tokens and Euclidean zero-radius geometry.    |
+-----------------------------------------------------------------------------------+
                                          │
                                          ▼
+-----------------------------------------------------------------------------------+
| PHASE 3: INTERACTIVE MODULES & UTILITY SCRIPTS (TASK 03)                          |
| - Implement timezone-accurate countdown in countdown.js.                          |
| - Implement calendar generator (.ics download + Google Calendar URL).             |
| - Implement WhatsApp RSVP link builder & Web Share clipboard fallback.            |
| - Implement user-gesture ambient audio player.                                    |
+-----------------------------------------------------------------------------------+
                                          │
                                          ▼
+-----------------------------------------------------------------------------------+
| PHASE 4: VERIFICATION, ACCESSIBILITY & AUDIT (TASK 04)                            |
| - Execute test matrix from docs/TESTING.md (viewports 360px–1440px).             |
| - Verify WCAG 2.1 AA contrast ratios across dark velvet emerald & gold palette.   |
| - Validate zero horizontal scroll and touch targets >= 44x44px.                   |
| - Package deployment checklist in docs/DEPLOYMENT.md.                             |
+-----------------------------------------------------------------------------------+
```

---

## 5. Performance Strategy

1. **HTML Size Budget:** < 30 KB raw HTML.
2. **CSS Size Budget:** < 35 KB total CSS (zero unused framework utility bloat).
3. **JS Size Budget:** < 15 KB unminified, zero external npm runtime.
4. **Image Optimization:** All fine-art assets served as modern WebP with explicit `width`, `height`, and `loading="lazy"` on below-the-fold assets.
5. **Font Loading Strategy:** `font-display: swap` to prevent FOIT, with preconnect hints for `fonts.googleapis.com` and `fonts.gstatic.com`.
