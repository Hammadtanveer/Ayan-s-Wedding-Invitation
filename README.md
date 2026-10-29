# Ayan Wedding Invitation — Web Platform

**Couple:** Mohd. Ayan Siddiqui & Sumaira Khan  
**Status:** `Task 01: Project Discovery & Planning (COMPLETED)` — **NO APPLICATION CODE WRITTEN**  
**Core Principles:** `/ponytail` (minimal dependencies, simplicity, reliability) & `/ui-ux-pro-max` (visual hierarchy, typography, accessibility)

---

## 1. Project Overview

This repository contains the comprehensive product discovery, technical architecture, design system audit, verification matrices, and delivery checklists for the personalized **Ayan Wedding Invitation Website** for **Mohd. Ayan Siddiqui** and **Sumaira Khan** (celebrated on 20–22 November 2026).

The goal of this project is to translate the creative direction established in Google Stitch project `1730933329537106473` into an ultra-reliable, mobile-first, ceremonial web invitation that family, relatives, and distinguished guests can access worldwide across diverse network conditions.

---

## 2. Planning Status & Critical Rule

> [!IMPORTANT]
> **CRITICAL RULE APPLIED: PLANNING ONLY.**  
> In accordance with Task 01 directives, no production code, HTML/CSS/JS files, frameworks, build tooling, or deployment assets have been generated. Implementation will only begin after explicit user approval of this planning baseline.

---

## 3. Documentation Index

The complete planning documentation suite is maintained in the [`docs/`](docs/) directory and project root:

| Document | Purpose | Key Focus |
| :--- | :--- | :--- |
| **[`AGENTS.md`](AGENTS.md)** | Agent Engineering Guidelines | Prohibited shortcuts, fidelity mandates, `/ponytail` & `/ui-ux-pro-max` rules |
| **[`docs/PROJECT_DISCOVERY.md`](docs/PROJECT_DISCOVERY.md)** | Workspace & Stitch Audit | Stitch MCP inspection, asset extraction, theme discrepancy, unresolved questions |
| **[`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md)** | Product Requirements (PRD) | User stories, feature matrix, functional/non-functional criteria, exclusions |
| **[`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md)** | Design Tokens & System Audit | Dual-palette audit (Parchment vs Royal Emerald), typography, Khatim star, RTL/Arabic rules |
| **[`docs/CONTENT_AND_EVENTS.md`](docs/CONTENT_AND_EVENTS.md)** | Content, Lineage & Sacred Text | Verified vs unverified family lineage, 3-day itinerary, authenticated Quranic text & Duas |
| **[`docs/ARCHITECTURE_AND_PLAN.md`](docs/ARCHITECTURE_AND_PLAN.md)** | Technical Architecture | Architectural evaluation, vanilla stack rationale, state flows, performance targets |
| **[`docs/TESTING.md`](docs/TESTING.md)** | Quality Assurance & Test Matrix | Timezone testing, responsive breakpoints, audio policies, WCAG AA audits |
| **[`docs/SECURITY_AND_PRIVACY.md`](docs/SECURITY_AND_PRIVACY.md)** | Security, Privacy & Integrity | Data minimization, phone number protection, XSS prevention, third-party sandboxing |
| **[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)** | Production Deployment Guide | Static hosting comparisons (Cloudflare/GitHub/Vercel), domain routing, release checklist |
| **[`docs/IMPLEMENTATION_CHECKLIST.md`](docs/IMPLEMENTATION_CHECKLIST.md)** | Phased Task Breakdown | Step-by-step prioritized tasks with explicit prerequisites and acceptance criteria |

---

## 4. Key Discovery Findings

1. **Stitch Accessibility:** Successfully accessed and inspected via Stitch MCP (`projects/1730933329537106473`). Extracted 7 primary screen layouts, HTML code, design theme metadata, and fine-art still-life assets.
2. **Dual-Theme Discrepancy Identified:**
   - The Stitch metadata specifies a dark royal theme: *"Nocturnal Royal Court"* (Velvet Emerald `#0F3D2E`, Antique Gold `#C9A24B`, Ivory `#F7F1E1`, Bodoni Moda, sharp Euclidean 0-radius geometry).
   - The actual generated screens in Stitch render a warm daylight theme: *"The Heirloom Letter"* (Warm Sand `#FEF9F1`, Terracotta `#8E4D31`, Antique Brass `#745A37`, EB Garamond + Amiri, soft 16px-20px rounded cards).
   - *Status:* Logged as `NEEDS-CONFIRMATION` for user theme preference.
3. **Information Integrity:** Exact family lineages, venue names, ceremony hours, and sacred Quranic verses have been cross-referenced between user prompts and the Stitch source HTML, with all unverified fields clearly labeled.

---

## 5. Next Recommended Step

Review the planning documents (specifically [`docs/PROJECT_DISCOVERY.md`](docs/PROJECT_DISCOVERY.md) and [`docs/IMPLEMENTATION_CHECKLIST.md`](docs/IMPLEMENTATION_CHECKLIST.md)). Upon user review and approval of the design theme and technical stack, proceed to **Task 02: Core Foundation & Scaffold**.
