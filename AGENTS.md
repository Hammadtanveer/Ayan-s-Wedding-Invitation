# Agent Instructions & Development Rules
**Project:** Islamic Wedding Invitation Website  
**Scope:** Mohd. Ayan Siddiqui & Sumaira Khan  
**Applicability:** All autonomous and human-supervised coding agents contributing to this codebase.

---

## 1. MANDATORY DESIGN PRESERVATION RULE

> [!IMPORTANT]
> **Use the original design system and colour palette retrieved directly from Stitch MCP for the “Islamic Wedding Invitation” project (`1730933329537106473`).**  
> - **Do not invent, replace, reinterpret, or modify the palette.**  
> - **Do not apply a new theme.**  
> - **Inspect the actual Stitch screen styles and design tokens, preserve the original typography and visual identity, and document any conflicts between Stitch metadata and screen implementations before making a decision.**  
> - **If a conflict cannot be resolved from the source, ask for confirmation rather than guessing.**  
> - **All implementation work must faithfully reproduce the approved Stitch designs.**

---

## 2. Core Operating Principles

### Principle 1: `/ponytail` (Minimalism, Simplicity, & Reliability)
- **Do not add npm dependencies for problems native web standards solve.** No massive framework installs (Next.js, React, Webpack) unless explicitly demanded.
- **The best code is the code never written.** Solve the core problem with the least new code.
- **No speculative abstraction.** No generic wrappers, superfluous config files, or "future-proofing" architecture that nobody asked for.
- **Single-line justification for shortcuts.** If a shortcut is taken, document it strictly as: `shortcut: <limit>, <when to upgrade>`.
- **Never cut essentials:** Never omit validation, accessibility semantics (`aria-*`, keyboard focus), error boundaries, or mobile responsiveness.

### Principle 2: `/ui-ux-pro-max` (Visual Hierarchy & Accessibility)
- **Ceremonial Visual Dignity:** Maintain heirloom-grade aesthetics. Treat the browser viewport as archival cotton rag parchment or velvet court folios, strictly reproducing the Stitch layouts.
- **Zero Emoji as Icons:** Never use Unicode emojis as UI icons. Use clean inline SVGs matching the Stitch source screens.
- **Touch Targets:** Interactive controls must maintain a minimum bounding box of `44x44px` on touch devices with >= 8px spacing.
- **Contrast & Legibility:** Text must meet WCAG 2.1 AA standards: minimum 4.5:1 contrast for regular copy, 3:1 for large display titles.
- **Motion Safety:** Strictly wrap CSS animations and JavaScript motion generators in `@media (prefers-reduced-motion: no-preference)`.

---

## 3. Information Integrity & Religious Content Rules

1. **Sacred Arabic Text Integrity:**
   - Never generate, autocomplete, or modify Quranic text or Sunnah Duas from memory or AI hallucination.
   - All Arabic text must match authenticated orthography (Uthmani naskh or certified mushaf standard) and pair with verified translations.
   - Arabic text elements must specify `dir="rtl"` and `lang="ar"`, with primary typography assigned to `font-family: 'Amiri', 'Noto Naskh Arabic', serif`.
2. **Family Lineage & Names:**
   - Preserve exact spelling and honorifics: "Mohd. Ayan Siddiqui", "Sumaira Khan", "Late Mrs. and Mr. Haji Iftakhar Ahmad", "Mrs. and Mr. Haji Iqtadar Ahmad", "Mrs. and Mr. Mujahid Ali Khan".
   - Do not alter family titles or relationships without explicit user authorization.

---

## 4. Strict Technical Prohibitions

Any agent editing this project is strictly forbidden from:
- [x] **Introducing any custom or modern color theme outside the exact Stitch MCP tokens.**
- [x] **Introducing client-side heavy frameworks (React, Vue, Angular)** when modern standard semantic HTML5, CSS custom properties, and vanilla JS fulfill 100% of the requirements.
- [x] **Autoplaying audio with sound enabled.** Browser autoplay policies will block it, causing console errors. Audio playback must strictly be user-gesture initiated.
- [x] **Hardcoding raw coordinates without verification.** All venue mapping links must follow standardized Google Maps Search URLs with encoded venue and city queries.
- [x] **Committing live secrets or personal contact numbers.** Phone numbers for RSVP and WhatsApp must be configured as configurable variables or placeholders until verified.
- [x] **Breaking zero horizontal scroll on mobile viewports (360px–430px).** Every container must be checked against `overflow-x: hidden` / responsive sizing.
