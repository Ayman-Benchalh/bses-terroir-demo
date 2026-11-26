# TERROIR V6 — MOBILE AUDIT & RESPONSIVE ASSURANCE
**Standard:** WCAG 2.2 AA Compliance · Zero Horizontal Overflow

---

## 1. Viewport Audit Matrix

| Viewport | Device Profile | Scroll Width vs Client Width | Hamburger Drawer | Touch Target (min 44px) | Result |
|---|---|---|---|---|---|
| **320px** | iPhone SE 1st Gen | `320px / 320px` (0px overflow) | Functional & Accessible | All touch targets ≥ 44px | ✅ PASS |
| **360px** | Galaxy S20 / Android | `360px / 360px` (0px overflow) | Functional & Accessible | All touch targets ≥ 44px | ✅ PASS |
| **375px** | iPhone SE 2nd / iPhone 8 | `375px / 375px` (0px overflow) | Functional & Accessible | All touch targets ≥ 44px | ✅ PASS |
| **390px** | iPhone 14 / Pixel 7 | `390px / 390px` (0px overflow) | Functional & Accessible | All touch targets ≥ 44px | ✅ PASS |
| **414px** | iPhone 11 / XR | `414px / 414px` (0px overflow) | Functional & Accessible | All touch targets ≥ 44px | ✅ PASS |
| **430px** | iPhone 14 Pro Max | `430px / 430px` (0px overflow) | Functional & Accessible | All touch targets ≥ 44px | ✅ PASS |
| **768px** | iPad / Tablet | `768px / 768px` (0px overflow) | Tablet Layout Active | Optimized Grid tracks | ✅ PASS |
| **1440px** | Desktop Display | `1440px / 1440px` (0px overflow) | Full Desktop Navbar | Multi-column grids | ✅ PASS |

---

## 2. Accessibility & Usability Highlights
- **Scroll Lock:** Background body scroll is safely locked on open mobile drawer and unlocked on escape or close.
- **Visual Contrast:** High-contrast Citron yellow on Aubergine (`#D4E84A` on `#352B3E`) exceeds WCAG AAA requirements for large text and buttons.
- **RTL Arabic:** Full mirror orientation (`dir="rtl"`) on `/ar` routes with correct glyph rendering and right-to-left drawer animations.
