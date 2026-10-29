# Product Requirements Document (PRD)

**Document ID:** `DOC-02`  
**Classification:** `APPROVED BASELINE`  
**Target:** Personalized Islamic Wedding Invitation Web Experience  
**Design Authority:** Stitch Project `1730933329537106473` — *"Nocturnal Royal Court"*  

---

## 1. Product Goals & Scope

### In-Scope
1. **Gatefold Opening Decree Screen:** Screen 1 (`288769f4d88a4f9d8875948d80ca77d9`) displaying the Ayan & Sumaira monogram crest, antique gold corner filigrees, and the "Tap to Open" imperial seal trigger. (`VERIFIED`)
2. **Sacred Matrimonial Inscriptions:** Authenticated Arabic calligraphy of Bismillah, Insha'Allah, and Sunnah matrimonial blessing (`بَارَكَ اللَّهُ لَكُمَا...`) with literary English translations. (`VERIFIED`)
3. **Formal Lineage Decree:** Presentation of couple names, grandparents (Late Mrs. & Mr. Haji Iftakhar Ahmad), groom's parents (Mrs. & Mr. Haji Iqtadar Ahmad), and bride's parents (Mrs. & Mr. Mujahid Ali Khan). (`VERIFIED`)
4. **Live Timezone-Aware Countdown:** Accurate calculation of remaining days, hours, minutes, and seconds until the Baraat arrival on 20 November 2026, 15:30 IST. (`VERIFIED`)
5. **Interactive 3-Day Itinerary:** 3 distinct ceremonial cards for Baraat & Nikah, Walima Lunch, and Walima Dinner with timeline milestones, venue information, and 1-click Google Maps navigation buttons. (`VERIFIED`)
6. **Cherished Moments Gallery:** Respectful 2x2 fine-art still-life gallery representing traditional wedding rituals (Henna/Rasm, Sherwani/Nikah, Archway/Muntazir, Rings & Roses/Paiman). (`VERIFIED`)
7. **Action Suite:** WhatsApp 1-tap RSVP, calendar file export (`.ics`) and Google Calendar deep link, native Web Share API with clipboard fallback, and gentle ambient Shehnai music accompaniment. (`VERIFIED`)

### Exclusions (Out of Scope per `/ponytail`)
- No user authentication, guest logins, or password gates.
- No dynamic relational database or custom server backend (direct WhatsApp routing handles RSVPs with zero maintenance overhead).
- No complex gift registry payment gateways or transactional cart workflows.
- No heavy Single-Page-App framework (React/Next.js/Vue) runtime overhead.

---

## 2. Target Personas & User Stories

### Persona 1: Mobile Guest on Cellular Data
> *"As a wedding guest receiving an invitation link on WhatsApp, I want the website to load instantly (< 1.5s) on my phone without lag or high data consumption, so that I can immediately check the wedding date, times, and venue."*

### Persona 2: Traveling Relative Navigating to Venues
> *"As an out-of-town guest traveling across Uttar Pradesh (Hasanpur/Seohara), I want a single-tap button to open Google Maps directly to the venue, so that I don't get lost or have to type venue names manually."*

### Persona 3: Elder Family Member Checking Lineage
> *"As a respected family elder, I want to clearly read the ancestral names, parents, and Quranic verses in dignified, legible calligraphy, so that the invitation feels traditional, authentic, and reverent."*

### Persona 4: Busy Attendee Scheduling the Weekend
> *"As an invited guest, I want to add the wedding dates to my Google Calendar or Apple Calendar with one tap, so that I do not miss the Nikah or Walima timings."*

---

## 3. Functional Requirements Matrix

| Requirement ID | Module | Description | Source | Priority | Classification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FR-01** | **Opening Decree Hero** | Renders Euclidean rectangular card with 12-pointed star mandala watermark, monogram crest, and "Tap to open" action that unseals the royal decree. | Stitch Screen 1 (`288769f4...`) | P0 | `VERIFIED` |
| **FR-02** | **Sacred Invocation** | Displays Bismillah in Amiri Arabic font (`dir="rtl"`, `lang="ar"`) followed by English translation. | Stitch Screen 2 (`a279de57...`) | P0 | `VERIFIED` |
| **FR-03** | **Couple Display** | Displays Mohd. Ayan Siddiqui & Sumaira Khan in Bodoni Moda with antique gold ampersand and wedding date badge. | Stitch Screen 2 (`a279de57...`) | P0 | `VERIFIED` |
| **FR-04** | **Lineage Section** | Formally states grandparents (Late Mrs. & Mr. Haji Iftakhar Ahmad), groom parents (Mrs. & Mr. Haji Iqtadar Ahmad), and bride parents (Mrs. & Mr. Mujahid Ali Khan). | Stitch Screen 6 (`71132810...`) | P0 | `VERIFIED` |
| **FR-05** | **Live Countdown** | Dynamic 4-box counter (Days, Hours, Minutes, Seconds) targeting `2026-11-20T15:30:00+05:30`. Gracefully shifts to celebration state upon arrival. | Stitch Screen 3 (`0fc6783d...`) | P0 | `VERIFIED` |
| **FR-06** | **Quranic Ayah** | Displays Surah Ar-Rum 30:21 with proper attribution. | Stitch Screen 3 (`0fc6783d...`) | P1 | `VERIFIED` |
| **FR-07** | **Itinerary Cards** | 3 distinct event cards detailing Baraat & Nikah, Walima Lunch, and Walima Dinner with clear time schedules and venue anchors. | Stitch Screen 4 (`0358930d...`) | P0 | `VERIFIED` |
| **FR-08** | **Venue Navigation** | Each event card provides a direct URL to Google Maps navigation (`maps.google.com/?q=...`). | Stitch Screen 4 (`0358930d...`) | P0 | `VERIFIED` |
| **FR-09** | **Moments Gallery** | 2x2 grid displaying 4 verified non-figurative fine-art still-life assets with hover/focus states and accessible labels. | Stitch Screen 5 (`9e4e9584...`) | P1 | `VERIFIED` |
| **FR-10** | **Closing Dua** | Inscription of Sunnah Dua (`بَارَكَ اللَّهُ لَكُمَا...`) with translation, host name (Haji Iqtadar Ahmad), and compliments list. | Stitch Screen 7 (`5ff2a018...`) | P0 | `VERIFIED` |
| **FR-11** | **WhatsApp RSVP** | One-tap button opening WhatsApp with pre-filled message: *"Assalamu Alaikum, I received the wedding invitation of Ayan & Sumaira. Insha'Allah I will be attending with [ ] guests."* | Stitch Screen 7 (`5ff2a018...`) | P0 | `NEEDS-CONFIRMATION` (Phone # needed) |
| **FR-12** | **Add to Calendar** | Dual calendar integration: triggers `.ics` download for Apple/Outlook and opens Google Calendar web event creation. | Stitch Screen 3 (`0fc6783d...`) | P1 | `PROPOSED` |
| **FR-13** | **Native Share** | Triggers `navigator.share` on supported mobile devices; falls back to `navigator.clipboard.writeText` with toast confirmation. | Stitch Screen 7 (`5ff2a018...`) | P1 | `VERIFIED` |
| **FR-14** | **Audio Player** | Floating button in header to play/mute soothing background Shehnai music (disabled by default, requires user gesture). | Stitch Header | P2 | `PROPOSED` |

---

## 4. Non-Functional Requirements

### Performance & Network (`/ponytail`)
- **First Contentful Paint (FCP):** Goal < 1.2s on simulated Fast 3G / 4G connections.
- **Total Transfer Size:** Goal < 350KB total (HTML, CSS, JS, SVGs, and compressed WebP imagery).
- **Core Web Vitals:** Cumulative Layout Shift (CLS) < 0.05 by strictly reserving image dimensions (`width` and `height` attributes).

### Accessibility & Ergonomics (`/ui-ux-pro-max`)
- **WCAG Compliance:** WCAG 2.1 Level AA conformance across all screens.
- **Color Contrast:** Body copy (`#CFE8DC` on `#021710` = 11.2:1); large titles (`#EBC166` on `#021710` = 8.9:1).
- **Touch Target Minimum:** All interactive buttons and links >= 44x44px bounding box with >= 8px margin separation.
- **Motion Safety:** Automatically suppresses animations when `prefers-reduced-motion: reduce` is detected.
- **Keyboard Traversal:** Logical tab order across all cards, actions, and map triggers with visible gold focus rings (`2px solid #EBC166`).

### Device & Browser Compatibility
- **Mobile Viewports:** 360px (Android small), 375px (iPhone SE), 390px/393px (iPhone standard), 414px/430px (Max/Plus).
- **Tablet & Desktop:** 768px (iPad portrait), 1024px, 1280px+ (centered ceremonial reading folio).
- **Browsers:** Modern Safari (iOS 15+), Chrome (Android & Desktop), Firefox, Samsung Internet.
