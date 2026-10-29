# Testing Strategy & Quality Assurance Matrix

**Document ID:** `DOC-06`  
**Classification:** `PROPOSED`  
**Standard:** WCAG 2.1 AA / Cross-Browser / Multi-Device Quality Assurance  

---

## 1. Functional Test Matrix

| Test ID | Feature Under Test | Test Scenario / Procedure | Expected Result | Pass / Fail Criteria |
| :--- | :--- | :--- | :--- | :--- |
| **FT-01** | **Envelope Gatefold Action** | Click/Tap "Tap to open" button on opening screen. | Envelope smoothly unfolds/scrolls to the Hero wedding decree; button indicates active state. | Folio is fully visible; no stuck viewport state. |
| **FT-02** | **Countdown Accuracy** | Verify countdown digits against target timestamp (`2026-11-20T15:30:00+05:30`). | Days, hours, minutes, and seconds decrement smoothly once per second. | Calculations remain accurate even if user changes device local timezone. |
| **FT-03** | **Countdown Expiry** | Set target timestamp to a past date in unit test. | Display gracefully switches from numerical countdown to celebration message (e.g., "Alhamdulillah • Celebrations in Progress"). | No negative numbers (`-01 days`) rendered. |
| **FT-04** | **Google Maps Deep Links** | Click "View on map" button on all 3 event cards. | Opens Google Maps in a new tab/native app with correct venue search query. | Query strings are cleanly URI-encoded (`Kamal%20Palace...`). |
| **FT-05** | **WhatsApp RSVP Link** | Tap "RSVP on WhatsApp" button. | Opens `https://api.whatsapp.com/send` with recipient number and pre-filled, editable text. | Text includes bride/groom names and editable `[ ]` guest count placeholder. |
| **FT-06** | **Calendar Integration (.ics)**| Click "Add to calendar" and select iCal / Outlook. | Triggers download of a valid `.ics` file containing all 3 ceremony events. | File passes iCalendar validator (RFC 5545). |
| **FT-07** | **Google Calendar Link** | Click "Add to calendar" and select Google Calendar. | Opens Google Calendar event creation URL with correct title, dates, and venue. | Event time parses accurately in Indian Standard Time (IST). |
| **FT-08** | **Native Share & Clipboard**| Tap "Share this invitation" on mobile (Web Share) and desktop (Clipboard). | Mobile triggers native OS share sheet; desktop copies URL and shows "Link Copied" toast for 2 seconds. | No crash if `navigator.share` is undefined. |
| **FT-09** | **Audio Play / Pause** | Tap floating music icon. | Audio begins playing on first user tap; subsequent tap pauses; icon toggles between note and muted symbol. | Audio never autoplays with sound before user tap. |
| **FT-10** | **Arabic Font & RTL Rendering**| Inspect Bismillah, Insha'Allah, and Sunnah Dua elements. | Arabic characters render with authentic ligatures using `Amiri` font; text is aligned center/right with `dir="rtl"`. | No disconnected or reversed Arabic glyphs. |

---

## 2. Responsive & Viewport Test Matrix

All views must maintain zero horizontal overflow (`document.documentElement.scrollWidth === window.innerWidth`).

| Viewport Name | Target Dimensions | Key Visual Checks |
| :--- | :--- | :--- |
| **Mobile Extra Small** | `360 x 640px` (Budget Android) | Text does not clip; 4 countdown boxes fit comfortably without wrapping into 2 rows; padding reduced to 16px. |
| **Mobile Standard** | `375 x 667px` (iPhone SE) | Optimal card proportions; touch targets >= 44x44px; arch frame maintains aesthetic curves. |
| **Mobile Large** | `390 x 844px` / `414 x 896px` (Modern iPhone) | Ample vertical whitespace; moments gallery images scale cleanly in 2x2 grid. |
| **Tablet Portrait** | `768 x 1024px` (iPad) | Centered max-width constraint (580px); background margin creates framed stationery look. |
| **Desktop / Laptop** | `1280 x 800px` / `1440 x 900px` | Centered ceremonial card folio (max-width 680px); page does not stretch across wide screen. |

---

## 3. Accessibility (a11y) & WCAG 2.1 AA Audit

| Accessibility Criterion | Testing Procedure | Expected Result |
| :--- | :--- | :--- |
| **Keyboard Navigation** | Navigate the entire page using only the `Tab` and `Shift+Tab` keys. | All buttons, links, and toggles receive focus in logical order. |
| **Visible Focus Indicator** | Observe focused elements during keyboard traversal. | Every focused element displays a distinct, high-contrast outline (`2px solid #8E4D31`). |
| **Color Contrast Ratios** | Audit using Chrome DevTools Lighthouse / axe-core. | All primary text >= 4.5:1; large titles >= 3:1 contrast against background substrates. |
| **Screen Reader Semantics** | Test with VoiceOver (iOS/macOS) or NVDA (Windows). | Images have descriptive alt text; icon-only buttons have descriptive `aria-label`. |
| **Reduced Motion Preference**| Enable "Reduce Motion" in OS settings and reload. | Falling petal canvas is disabled; star rotations and transitions are instant. |

---

## 4. Cross-Browser & Device Matrix

- [ ] **Mobile Safari (iOS 15–18):** Verify safe-area-inset padding, audio gesture handling, and share sheet.
- [ ] **Chrome for Android:** Verify WebP rendering, Google Maps intent handling, and WhatsApp URI launch.
- [ ] **Desktop Chrome & Edge:** Verify centered layout, clipboard fallback toast, and audio volume.
- [ ] **Desktop Firefox:** Verify font-rendering quality for Google Fonts (`Amiri` and `EB Garamond`).
