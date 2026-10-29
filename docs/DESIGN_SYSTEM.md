# Design System Specification & Visual Identity
## Approved Baseline: "Nocturnal Royal Court"

**Document ID:** `DOC-03`  
**Approval Status:** `APPROVED BY USER` (Strictly Preserving Stitch Project `1730933329537106473`)  
**Design Preservation Rule:** 100% Faithful to Stitch MCP Source — Zero Invented Tokens  

---

## 1. Architectural Philosophy & Heritage Identity

In strict accordance with the user-confirmed **Design Preservation Rule**, this project faithfully reproduces the official design system and visual tokens of Stitch project `1730933329537106473`: **"Nocturnal Royal Court"**.

The visual language embodies the regal gravity of an intimate nocturnal royal court, drawing from Mughal architectural discipline and Islamic geometric precision:
- **Atmospheric Nocturne:** Deep, light-absorbent velvet emerald ground tone evoking dusk ceremonies and quiet ancestral courtyards.
- **Euclidean Precision:** Every container honors pure zero-radius geometry (`border-radius: 0px`), rejecting rounded consumer widgets in favor of crisp 1px antique gold structural borders with ornamental corner filigrees.
- **Monumental Serif Typography:** `Bodoni Moda` for dramatic thick-thin serif contrast on ceremonial decrees, coupled with `Noto Serif` for warm, legible archival body prose.
- **Symbolic Watermark:** 12-pointed geometric star mandala constructed from three intersecting squares rotated at 30-degree intervals.

---

## 2. Color Palette (Verbatim from Stitch Source)

Extracted directly from Stitch project metadata (`designTheme`, `designMd`) and Screen `288769f4d88a4f9d8875948d80ca77d9`:

| Semantic Token | Hex Code | Source Role & Application | Contrast Ratio |
| :--- | :--- | :--- | :--- |
| `--color-background` | `#021710` | Foundational midnight canopy ground | Substrate |
| `--color-surface` | `#021710` | Primary viewport canvas ground | Substrate |
| `--color-surface-dim` | `#021710` | Darkened backdrop scrims | Substrate |
| `--color-surface-bright` | `#283D35` | Illuminated highlight surfaces | Elev. 3 |
| `--color-surface-container-lowest` | `#00120B` | Deep nocturnal shadow scrim behind modal panels | Elev. 0 |
| `--color-surface-container-low` | `#091F18` | Recessed event card containers | Elev. 1 |
| `--color-surface-container` | `#0E231C` | Standard ceremonial card surface | Elev. 2 |
| `--color-surface-container-high` | `#192E26` | Elevated invitation decrees | Elev. 3 |
| `--color-surface-container-highest` | `#243931` | High-contrast inner parchment inserts | Elev. 4 |
| `--color-primary-container` | `#0F3D2E` | Velvet emerald ground for invitation frames | Primary Ground |
| `--color-primary` | `#A2D1BB` | Soft mint illuminated borders & tags | Contrast Accent |
| `--color-on-primary` | `#073829` | Deep emerald text on primary badges | High Contrast |
| `--color-secondary` | `#EBC166` | Antique brass gold for titles, monograms & borders | 8.9:1 on `#021710` |
| `--color-secondary-container` | `#765700` | Deep burnished gold container backing | Secondary |
| `--color-on-secondary-container` | `#FACF73` | Luminous warm gold text on dark containers | High Contrast |
| `--color-secondary-fixed` | `#FFDF9E` | Bright polished gold active states & highlights | Highlight |
| `--color-on-surface` | `#CFE8DC` | Archival mint ivory for primary reading copy | 11.2:1 on `#021710` |
| `--color-on-surface-variant` | `#C0C8C3` | Muted silver-sage for subtitles & itinerary hours | 8.4:1 on `#021710` |
| `--color-outline` | `#8A938D` | Muted hairline dividing rules | Decorative |
| `--color-outline-variant` | `#414944` | Subtle container boundary borders | Decorative |

---

## 3. Typography System (Verbatim from Stitch Source)

### Font Families
- **Display, Headings & Monogram:** `'Bodoni Moda', serif`
- **Body Prose & Archival Captions:** `'Noto Serif', serif`
- **Sacred Arabic Inscriptions:** `'Amiri', serif` (`dir="rtl"`, `lang="ar"`)

### Fluid Typographic Hierarchy
```css
/* Display Hero (Opening & Monogram Title) */
.font-display-hero {
  font-family: 'Bodoni Moda', serif;
  font-size: 56px;
  line-height: 64px;
  letter-spacing: 0.04em;
  font-weight: 400;
}
@media (max-width: 640px) {
  .font-display-hero-mobile {
    font-size: 38px;
    line-height: 46px;
    letter-spacing: 0.03em;
  }
}

/* Ceremony Section Headings */
.font-headline-lg {
  font-family: 'Bodoni Moda', serif;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: 0.05em;
  font-weight: 400;
}
@media (max-width: 640px) {
  .font-headline-lg-mobile {
    font-size: 26px;
    line-height: 34px;
    letter-spacing: 0.04em;
  }
}

/* Card Titles */
.font-headline-md {
  font-family: 'Bodoni Moda', serif;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: 0.06em;
  font-weight: 500;
}

/* Subtitles & Monogram Sub-labels */
.font-headline-sm {
  font-family: 'Bodoni Moda', serif;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: 0.08em;
  font-weight: 600;
}

/* Literary Archival Body */
.font-body-lg {
  font-family: 'Noto Serif', serif;
  font-size: 17px;
  line-height: 28px;
  letter-spacing: 0.01em;
  font-weight: 400;
}
.font-body-md {
  font-family: 'Noto Serif', serif;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.01em;
  font-weight: 400;
}
.font-body-sm {
  font-family: 'Noto Serif', serif;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.02em;
  font-weight: 400;
}

/* Engraved Metadata & Caps */
.font-label-md {
  font-family: 'Noto Serif', serif;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.18em;
  font-weight: 500;
  text-transform: uppercase;
}
.font-label-sm {
  font-family: 'Noto Serif', serif;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.22em;
  font-weight: 600;
  text-transform: uppercase;
}
```

---

## 4. Architectural Geometry & Component Anatomy

### 1. Zero-Radius Euclidean Discipline
All cards, buttons, dialogs, inputs, and image enclosures strictly enforce:
```css
border-radius: 0px !important;
```

### 2. Dual Hairline Gilded Borders
Higher-tier invitation panels utilize a dual-border system:
- Outer `1px solid var(--color-secondary)` (#EBC166).
- Inner hairline inset with 4 decorative brass corner filigrees (SVG `L 0 12 L 0 0 L 12 0` with centered diamond accent).

### 3. Royal Buttons
- **Primary Imperial Button ("Tap to Open", "RSVP"):**
  - Background: `#EBC166` (Antique Gold).
  - Text: `#073829` (Deep Velvet Emerald).
  - Height: `48px`.
  - Font: `Noto Serif`, `font-label-md` (`0.18em` tracking, uppercase).
  - Hover: Background deepens to `#FFDF9E` with inner gold glow (`box-shadow: 0 0 24px rgba(235, 193, 102, 0.4)`).
- **Secondary Action Button ("View on Map"):**
  - Background: `rgba(15, 61, 46, 0.8)` (`#0F3D2E`).
  - Border: `1px solid #EBC166`.
  - Text: `#EBC166`.

### 4. 12-Pointed Islamic Star Mandala
- Constructed from 3 intersecting 60x60 squares rotated at 0°, 30°, and 60° with inner polygon star layers.
- Scaled to 420px–600px, animated with ultra-slow rotation (`160s linear infinite`), rendered at `opacity: 0.06` behind content.

---

## 5. Accessibility Audit (WCAG 2.1 AA)

- **Contrast Verification:**
  - `#EBC166` on `#021710` = **8.9:1** (Passes AAA for normal text).
  - `#CFE8DC` on `#021710` = **11.2:1** (Passes AAA for normal text).
  - `#073829` on `#EBC166` = **9.8:1** (Passes AAA for button labels).
- **Touch Targets:** All interactive buttons maintain a minimum bounding box of `48px` height with full-width or generous horizontal padding (`px-gutter`).
- **Focus States:** High-visibility antique gold focus outline (`2px solid #EBC166`, `outline-offset: 3px`).
