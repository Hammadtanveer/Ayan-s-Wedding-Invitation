# Production Deployment Guide & Release Checklist

**Document ID:** `DOC-08`  
**Classification:** `PROPOSED`  
**Target:** Global Static Edge Distribution  

---

## 1. Hosting Architecture Evaluation

Because this web invitation uses modern static HTML5, CSS3, and vanilla JavaScript without a database or backend server runtime, it is compatible with leading global static hosting platforms:

| Platform | Edge CDN Network | Custom Domain + Free SSL | Setup Complexity | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **Cloudflare Pages** | 300+ Cities Worldwide | Included (Automatic SSL) | Ultra-Low (Drag & Drop or Git) | **STRONGLY RECOMMENDED** (Fastest in India) |
| **GitHub Pages** | Fastly Global CDN | Included (Let's Encrypt) | Low (Direct from repo `main` branch) | **EXCELLENT ALTERNATIVE** |
| **Vercel** | Vercel Edge Network | Included (Automatic SSL) | Low (Zero-config static) | Good |
| **Netlify** | Netlify Global Edge | Included (Automatic SSL) | Low (Drag & Drop folder) | Good |

### Why Cloudflare Pages is the Top Choice
1. **Network Performance in South Asia:** Cloudflare operates local data centers across major Indian metros (Delhi, Mumbai, Chennai, Kolkata), ensuring near-instant page load times for guests in Uttar Pradesh and Delhi NCR.
2. **Infinite Bandwidth Free Tier:** Does not penalize sudden traffic spikes when hundreds of guests open the link simultaneously from WhatsApp broadcasts.

---

## 2. Custom Domain & DNS Setup (Optional)

If the couple or family chooses a personalized domain (e.g. `ayanweds-sumaira.com` or `ayansumaira.in`):

1. **DNS Records (Cloudflare Pages Example):**
   - CNAME `ayanweds-sumaira.com` → `islamic-wedding-invitation.pages.dev`
   - CNAME `www` → `islamic-wedding-invitation.pages.dev`
2. **HTTPS & TLS Certificate:**
   - Universal SSL must be set to `Full (Strict)` with automatic HTTPS redirects enabled (`HTTP → HTTPS 301`).

---

## 3. Step-by-Step Deployment Procedure

### Path A: Instant Cloudflare Pages Deployment (Zero CLI)
1. Ensure project root contains `index.html`, `css/`, `js/`, and `assets/`.
2. Log into [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create Application** → **Pages**.
3. Select **Direct Upload** → drag and drop the `islamic-wedding-invitation/` folder.
4. Set Project Name to `ayan-weds-sumaira`.
5. Click **Deploy Site** — your live invitation is active at `https://ayan-weds-sumaira.pages.dev`.

### Path B: GitHub Pages Deployment
1. Commit the project files to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete islamic wedding invitation folio"
   git remote add origin https://github.com/<username>/islamic-wedding-invitation.git
   git push -u origin main
   ```
2. In GitHub repository settings: **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: `main` / `root`.
3. Site is deployed at `https://<username>.github.io/islamic-wedding-invitation/`.

---

## 4. Social Preview Artwork & Metadata

A dedicated 1200 × 630 px Open Graph social card has been prepared at `assets/images/og-preview.png` (and mirrored in `docs/og-preview.png`):
- **Dimensions:** 1200 × 630 pixels (standard 1.91:1 aspect ratio for WhatsApp, iMessage, Facebook, and Twitter).
- **Format:** Optimized PNG (221 KB).
- **Typography:** Bodoni Moda (Couple names), Noto Serif (Subheadings & dates), Amiri (Arabic Bismillah).
- **Palette:** Nocturnal Royal Court (`#021710` Deep Pine Obsidian, `#0F3D2E` Court Green, `#EBC166` Imperial Gold, `#CFE8DC` Ivory Cream).
- **Visual Elements:** Geometric 12-point star mandala watermark, dual gold hairline borders, Euclidean zero-radius corner filigrees, monogram badge (`A & S`), and Qur'anic verse.
- **Privacy Discipline:** Contains no personal phone numbers, private addresses, or unverified event timings.

---

## 5. Local Static Server Verification

The build-free static website was verified using a local production-like HTTP server (`http://127.0.0.1:8765`):
- `index.html`: HTTP 200 OK (63.5 KB)
- All 4 CSS stylesheets (`styles.css`, `design-tokens.css`, `typography.css`, `components.css`): HTTP 200 OK
- All 7 vanilla JavaScript modules (`config.js`, `countdown.js`, `calendar.js`, `rsvp.js`, `audio.js`, `share.js`, `main.js`): HTTP 200 OK
- Social card image (`assets/images/og-preview.png`): HTTP 200 OK (221.8 KB)
- Headless browser smoke test: PASS (All 7 sections rendered with zero JavaScript runtime errors).
- Zero hardcoded local Windows file paths found across all codebase assets.

---

## 6. Pre-Launch Release Checklist & Approval Gate

> [!IMPORTANT]
> **DEPLOYMENT APPROVAL GATE:** The website is fully prepared for static hosting but has **NOT** been published to any public server. Public deployment will only occur upon explicit user instruction.

Before sharing the final link with family and wedding guests:

- [ ] **Deployment Approval:** User confirms target hosting provider (Cloudflare Pages recommended or GitHub Pages).
- [ ] **Contact Number Verification:** Provide verified host WhatsApp phone number in `js/config.js` to enable WhatsApp RSVP.
- [ ] **Map Links Field Test:** Provide verified Google Maps links in `js/config.js` to activate venue navigation buttons.
- [ ] **Ceremony Timings:** Confirm specific start times (or retain date reminder format).
- [ ] **Audio Selection:** Optional addition of approved background instrumental audio file.
- [ ] **Domain Connection (Optional):** Attach custom domain if desired.
