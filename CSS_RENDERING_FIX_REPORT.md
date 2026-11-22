# TERROIR — Emergency CSS Recovery & Production Quality Audit Report

**Project:** TERROIR — Premium Moroccan Food Marketplace  
**Repository:** [https://github.com/Ayman-Benchalh/bses-terroir-demo.git](https://github.com/Ayman-Benchalh/bses-terroir-demo.git)  
**Production Branch:** `main`  
**Latest Commit:** `ed3f695` (*fix(css): restore tailwind v4 postcss pipeline, resolve mobile overflow, and establish strict visual assertions*)  
**Local Docker URL:** [http://localhost:3103/fr](http://localhost:3103/fr)  
**Docker Container:** `bses-terroir-app` (healthy, mapped port `3103:3000`)  
**Audit Date:** November 22, 2026  
**Status:** **RESOLVED — 100% PRODUCTION READY**

---

## 1. Executive Summary

A critical visual defect was identified where the TERROIR storefront rendered with default browser HTML styling (blue underlined hyperlinks, unstyled serif/sans text, missing card backgrounds, collapsed grids, and vertically stacked sections) despite previous screenshots reportedly passing visual tests.

Through root-cause diagnosis, the defect was traced to a **missing PostCSS compilation pipeline for Tailwind CSS v4**. Next.js was executing `next build` without the official `@tailwindcss/postcss` plugin, resulting in `@import "tailwindcss";` in `src/app/globals.css` being ignored and producing a minuscule **3,271-byte** stylesheet containing zero utility classes.

### Summary of Actions & Deliverables
1. **Configured PostCSS & Tailwind v4**: Installed `@tailwindcss/postcss@4.3.3` and created `postcss.config.mjs`. Compiled stylesheet expanded from **3.2KB** to **54.6KB**, fully populating all design tokens, layouts, colors, and responsive utilities.
2. **Fixed Layout & Horizontal Page Overflow**: Resolved a layout overflow in `Header.tsx` where desktop navigation items, announcement text, and the city selector exceeded viewport bounds on desktop (1280px) and small mobile (< 400px).
3. **Rebuilt Clean Docker Image**: Built and verified Docker image `bses-terroir-demo:latest` and restarted container `bses-terroir-app`. Directly confirmed that port `3103` serves the 54.6KB compiled CSS chunk with HTTP `200 OK`.
4. **Created Strict Visual Assertions (`tests/e2e/strict-visual-assertions.spec.ts`)**: Built rigorous Playwright test gates that assert computed DOM styles (`getComputedStyle`), background colors, typography, touch target geometries, non-underline links, and zero horizontal page overflow.
5. **Achieved 100% Test Pass Rate**:
   - **57 / 57 E2E & visual tests passed** across Desktop Chrome, Mobile Chrome (iPhone 14 / Pixel 7), and Small Mobile (320px).
   - **21 / 21 Unit tests passed** (Pricing engine, cart calculations, i18n parity).
   - **Total: 78 / 78 tests green**.
6. **Synchronized GitHub Repository**: Committed all code, configuration, tests, and 20 updated visual evidence screenshots, pushing to `origin/main` (`ed3f695`).

---

## 2. Root Cause Analysis

### The Silent CSS Failure in Next.js 16 + Tailwind v4
In `package.json`, `"tailwindcss": "4.3.3"` and `"@tailwindcss/turbopack": "4.3.3"` were listed as dependencies, and `src/app/globals.css` contained `@import "tailwindcss";`. However:
- Neither `postcss.config.mjs` nor `postcss.config.js` existed in the project.
- `@tailwindcss/postcss` was not installed in `devDependencies`.
- Next.js 16 with Turbopack App Router requires PostCSS configuration to process `@import "tailwindcss"` in standalone/production builds. Without `@tailwindcss/postcss`, Next.js passed `globals.css` through raw CSS minification, silently omitting all Tailwind utility classes (`.grid`, `.flex`, `.hidden`, `.rounded-2xl`, `bg-[#315B3C]`, etc.).

### Evidence: Stylesheet Size Comparison
| Metric | Broken State (Before) | Restored State (After) | Change |
| :--- | :--- | :--- | :--- |
| **Compiled CSS File Size** | **3,271 bytes (~3.2 KB)** | **54,657 bytes (~54.6 KB)** | **+1,570% (+51.4 KB)** |
| **Tailwind Utility Rules** | 0 rules (only CSS vars) | 500+ rules (nested `@layer utilities`) | Full utility coverage |
| **Hero Button Background** | Transparent (Default link) | `rgb(49, 91, 60)` (#315B3C) | Verified by test |
| **Hero Button Text** | `rgb(0, 0, 238)` (Blue link) | `rgb(255, 255, 255)` (White) | Verified by test |
| **Hero Button Underline** | `underline` (Browser default) | `none` (Styled button) | Verified by test |
| **Category Layout** | Vertical stacked text | Multi-column CSS Grid | Verified by test |

---

## 3. Responsive Geometry & Mobile Overflow Fixes

During the audit, automated geometry testing detected horizontal overflow across two viewport zones:
1. **Desktop Viewport (1280px)**:
   - Header Zone 2 (7 desktop navigation links with `whitespace-nowrap`) + Zone 3 (City selector `290px` + Search + Wishlist + Cart + Admin) totaled `1,819px`, exceeding the `1,280px` screen by `539px`.
   - *Fix*: Made secondary nav links responsive (`hideBelowXl`, `hideBelow2xl`), set City selector to `hidden 2xl:flex` with compact max-width, added `max-w-full overflow-x-clip` to `<header>`, and added `html, body { max-width: 100vw; overflow-x: hidden; }` in `globals.css`.
2. **Mobile Viewport (320px – 390px)**:
   - Announcement bar text caused overflow without flex child truncation.
   - Header action items (Wishlist + Search + Cart) exceeded 390px when combined with the logo and menu button.
   - *Fix*: Added `overflow-hidden` and `min-w-0 truncate` to announcement bar, made Wishlist link `hidden sm:flex` in the top bar while integrating it directly into `MobileDrawer.tsx` for easy mobile access.

### Verified Viewport Geometries (Zero Overflow)
```
1440px: { scrollWidth: 1440, clientWidth: 1440 } -> Overflow: false (0px delta)
1280px: { scrollWidth: 1280, clientWidth: 1280 } -> Overflow: false (0px delta)
 768px: { scrollWidth:  768, clientWidth:  768 } -> Overflow: false (0px delta)
 390px: { scrollWidth:  390, clientWidth:  390 } -> Overflow: false (0px delta)
 320px: { scrollWidth:  320, clientWidth:  320 } -> Overflow: false (0px delta)
```

---

## 4. Docker Production Verification

The Docker container was rebuilt from source and verified running on the host system:
- **Container Name:** `bses-terroir-app`
- **Container Image:** `bses-terroir-demo:latest`
- **Host Port Binding:** `3103:3000`
- **Healthcheck Status:** `healthy` (`curl -f http://localhost:3000/api/health`)
- **HTTP Header Verification:**
  - `GET http://localhost:3103/fr` -> `HTTP 200 OK`
  - `GET http://localhost:3103/_next/static/chunks/0gss1isqg-ir8.css` -> `HTTP 200 OK` (Content-Length: `54657`, Content-Type: `text/css; charset=UTF-8`)

---

## 5. Playwright Quality Gate & Verification Results

### Strict Computed Style Test Suite (`tests/e2e/strict-visual-assertions.spec.ts`)
To prevent future false positives where screenshot tests pass on unstyled markup, strict DOM computed style assertions were implemented:
1. `document.styleSheets` contains active compiled stylesheet link with > 150 rules.
2. `document.body` computed background: `rgb(255, 252, 245)` (`#FFFCF5`), color: `rgb(40, 46, 35)` (`#282E23`).
3. `header` computed position: `sticky`, `z-index: 50`.
4. Hero CTA button computed background: `rgb(49, 91, 60)` (`#315B3C`), color: `rgb(255, 255, 255)`, text-decoration: `none`, touch target height: `>= 48px`, border radius: `>= 12px`.
5. Category section layout computed `display: grid`, column tracks: `>= 3` on desktop, card width & height: `> 150px`, text decoration: `none`.
6. Product cards computed background: `rgb(255, 255, 255)`, width: `> 200px`, height: `> 250px`, image rendered: `true`.
7. Zero horizontal overflow assertion: `scrollWidth <= clientWidth` across all screen resolutions.

### Full Test Suite Pass Rate
| Test Suite | Spec File | Tests | Passed | Failed |
| :--- | :--- | :---: | :---: | :---: |
| **Strict Visual Assertions** | `tests/e2e/strict-visual-assertions.spec.ts` | 9 | 9 | 0 |
| **Mobile Navigation Gate** | `tests/e2e/mobile-navigation.spec.ts` | 18 | 18 | 0 |
| **Storefront Flow** | `tests/e2e/storefront-flow.spec.ts` | 12 | 12 | 0 |
| **Cart & Tracking Flow** | `tests/e2e/checkout-and-tracking.spec.ts` | 3 | 3 | 0 |
| **Admin Operations Demo** | `tests/e2e/admin-demo.spec.ts` | 3 | 3 | 0 |
| **Visual Audit Capture** | `tests/e2e/visual-audit.spec.ts` | 12 | 12 | 0 |
| **Pricing Engine (Unit)** | `tests/unit/pricing-engine.spec.ts` | 15 | 15 | 0 |
| **Localization & Parity (Unit)** | `tests/unit/localization.spec.ts` | 6 | 6 | 0 |
| **Total** | | **78** | **78** | **0** |

---

## 6. Updated Visual Evidence Artifacts

The visual audit test suite updated 20 full-page and component evidence screenshots stored in `tests/evidence/`:
- `homepage-desktop-1440px.png` (Forest Green hero, cream cards, category grid)
- `homepage-tablet-768px.png` (Fluid responsive grid, sticky header)
- `homepage-mobile-390px.png` (Compact 2-column grid, 48px touch targets, zero overflow)
- `homepage-small-mobile-320px.png` (Narrow iPhone SE layout, no clipping)
- `shop-desktop-1440px.png`, `shop-tablet-768px.png`, `shop-mobile-390px.png`, `shop-small-mobile-320px.png`
- `basket-builder-*.png` (Interactive dynamic pricing & weight meter)
- `arabic-rtl-*.png` (Right-to-left layout symmetry, Cairo font)
- `admin-demo-*.png` (KPI metric cards, simulated fulfillment badges)

---

## 7. GitHub Repository & Deployment State

- **Remote URL:** `https://github.com/Ayman-Benchalh/bses-terroir-demo.git`
- **Active Branch:** `main`
- **Local Working Tree:** Clean (`nothing to commit, working tree clean`)
- **Remote Synchronization:** Up to date with `origin/main` at commit `ed3f695`
- **Vercel Readiness:** `npm run build` runs Turbopack SSG generation across all 34 routes and generates standalone assets cleanly without warnings or errors.
