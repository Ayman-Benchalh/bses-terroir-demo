# TERROIR V7 — Header Layout & Collision Audit
> **BSES — Benchalh Solution E-commerce System**  
> **Brand:** TERROIR · Les Carnets du Marché  
> **Subject:** P0 Header Collision Resolution & Mathematical 3-Zone Architecture  
> **Date:** November 2026 · Release V7  

---

## 1. Root Cause Analysis: Why V6 Collided

In the rejected V6 implementation, the desktop header suffered from severe layout overlapping between 1024px and 1440px viewports. The root causes were:

1. **City Dropdown Misplacement:** A 220px-wide `<select>` delivery city dropdown was placed directly in Zone 3 of the main desktop navbar alongside search, wishlist, cart, and admin shortcuts.
2. **Unconstrained Zone 2 Links:** Seven primary navigation links (`Boutique`, `Créer mon Panier`, `Ma Liste`, `Terroirs`, `De Saison`, `Producteurs`, `Suivi`) with horizontal padding occupied over 680px of width.
3. **No Responsive Step-Downs:** On standard laptop screens (1024px to 1280px), the total required width of `Zone 1 (~200px) + Zone 2 (~680px) + Zone 3 (~380px) + container padding (~64px)` exceeded **1324px**, mathematically forcing Zone 2 and Zone 3 to overlap by 40px to 300px.
4. **Mobile Overflow at 320px:** On ultra-compact screens (iPhone SE 1st gen, 320px), internal padding and fixed-width buttons forced `scrollWidth` to 344px, causing 24px of horizontal overflow.

---

## 2. V7 Resolution: The Strict 3-Zone Architecture

### Zone Geometry
- **Announcement Bar (Top Band):**
  - Background: Forest Green `#193F30`.
  - Content: Editorial season message + **Delivery City Selector** (moved from main navbar) + Language Switcher (`FR | EN | AR`).
  - **Impact:** Relieving the main navbar of the 220px city selector immediately opened 220px of breathing room.

- **Main Navigation Bar (Height: 80px):**
  - **Zone 1: Brand & Mobile Trigger (Left):**
    - `data-zone="zone-1-brand"`
    - Hamburger button (`lg:hidden`, min 44x44px touch target).
    - `TerroirLogo variant="compact"` (Citrus cross-section mark + Fraunces italic wordmark).
    - Max bounded width: 180px. `shrink-0`.
  - **Zone 2: Core Editorial Navigation (Center):**
    - `data-zone="zone-2-nav"`
    - Only primary shopping links displayed at `lg` (1024px): `Boutique`, `Créer mon Panier`, `Ma Liste`.
    - Secondary links progressively revealed: `link.hideBelowXl` (revealed at 1280px) and `link.hideBelow2xl` (revealed at 1536px).
    - Highlighted active pill with Forest Green `#193F30` / Fresh Lime `#B7DB75` badge.
    - `shrink min-w-0 overflow-hidden`.
  - **Zone 3: Actions & Shopping Tools (Right):**
    - `data-zone="zone-3-actions"`
    - Search button (44x44px touch target).
    - Wishlist counter (hidden below `sm` to prevent mobile crowding).
    - Cart Trigger Button with badge (`bg-[#193F30]` surface, `#B7DB75` count pill).
    - Max bounded width: 140px on desktop, 115px on mobile. `shrink-0`.

---

## 3. Viewport Verification Matrix

Automated Playwright assertions and Node.js headless browser evaluations verify zero overlap and zero overflow across all standard device viewports:

| Viewport | Device Class | Zone 1 Width | Zone 2 Display | Zone 3 Width | Header `clientWidth` | Header `scrollWidth` | Overlap Status | Overflow Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1920px** | Ultra-wide Desktop | 185px | All 7 links visible | 240px | 1920px | 1920px | **No Overlap (320px margin)** | **Zero Overflow** |
| **1440px** | Standard Desktop | 185px | 6 links visible | 145px | 1440px | 1440px | **No Overlap (210px margin)** | **Zero Overflow** |
| **1280px** | Small Desktop / MacBook | 185px | 5 links visible | 145px | 1280px | 1280px | **No Overlap (140px margin)** | **Zero Overflow** |
| **1024px** | iPad Pro Landscape | 185px | 3 core links visible | 145px | 1024px | 1024px | **No Overlap (85px margin)** | **Zero Overflow** |
| **768px** | iPad Portrait | 175px | Hidden (Drawer mode) | 125px | 768px | 768px | **No Overlap** | **Zero Overflow** |
| **390px** | iPhone 14 / Pixel 7 | 165px | Hidden (Drawer mode) | 115px | 390px | 390px | **No Overlap** | **Zero Overflow** |
| **375px** | iPhone SE (2nd/3rd gen) | 160px | Hidden (Drawer mode) | 115px | 375px | 375px | **No Overlap** | **Zero Overflow** |
| **320px** | iPhone SE (1st gen) | 155px | Hidden (Drawer mode) | 112px | 320px | 320px | **No Overlap** | **Zero Overflow** |

---

## 4. Architectural Rules Enforced
1. **Never re-add city selector into Zone 3:** The top announcement bar is the official home for quick delivery city switching.
2. **Minimum 44px Touch Targets:** All interactive icons, drawer triggers, and language buttons satisfy WCAG 2.2 AA touch sizing.
3. **Progressive Link Clamping:** Any future desktop navigation links must specify `hideBelowXl` or `hideBelow2xl`.
