# TERROIR V7 — Product Card Layout & Commerce Audit
> **BSES — Benchalh Solution E-commerce System**  
> **Brand:** TERROIR · Les Carnets du Marché  
> **Component:** `ProductCard.tsx`  
> **Date:** November 2026 · Release V7  

---

## 1. Issues Identified in Previous Builds

1. **Price Collision & Wrapping:** In previous iterations, prices were rendered in large italic Fraunces fonts with floating currency indicators squeezed into the same flex row as quantity steppers. On narrow cards (240px to 280px), prices wrapped onto 2 or 3 lines (`14,00 \n MAD / kg`), resulting in broken typographic baseline alignment.
2. **Variable Title Heights:** Product titles varied between 1 line ("Clémentines") and 3 lines ("Huile d'olive extra-vierge Ouezzane"), causing irregular card heights in grid rows.
3. **Quantity Stepper Clipping:** Fractional step buttons (`- 0.5kg +`) were often truncated or covered by add-to-cart buttons on mobile viewports.
4. **Poor Visual Hierarchy:** The badges, price tags, and origins lacked a cohesive design token system.

---

## 2. V7 Product Card Architecture

### Card Surface & Framing
- **Background:** Pure White (`#FFFFFF`).
- **Border:** Soft Herb Border (`#D9E2D7`), 1px solid.
- **Corner Radius:** `rounded-xl` (12px) for a contemporary, organic feel.
- **Elevation / Shadow:** `shadow-xs` resting, transitioning to `hover:shadow-md hover:border-[#193F30]` on hover.
- **Aspect Ratio:** `aspect-square` (1:1) photographic container with `overflow-hidden` and `rounded-t-xl`.

### Typography & Layout Rules
1. **Category & Origin Breadcrumb:**
   - Text: `text-[11px] font-bold uppercase tracking-wider text-[#193F30]`.
   - Accompanied by region dot in brand Forest Green.
2. **2-Line Clamped Title:**
   - Font: `var(--font-display)` (Fraunces serif), semi-bold, `leading-snug`.
   - Height: `line-clamp-2 min-h-[2.5rem]`.
   - **Benefit:** Every card in a grid row maintains the exact same title block height regardless of word count.
3. **Non-Wrapping Tabular Pricing (`.price-tag`):**
   - Style: `tabular-nums font-bold whitespace-nowrap text-lg text-[#193F30]`.
   - Example: `14,00 MAD` with unit in subtle neutral `text-xs font-normal text-[#66756B]`.
   - Strike-through original price for promo items in `text-xs text-[#66756B] line-through`.
   - Dedicated row above action controls, guaranteeing that currency and unit never collide or wrap.
4. **Stepped Action Row:**
   - **Quantity Stepper:** Compact, tactile stepper (`-` / `+`) with formatted current value. Step increments automatically match product base units (`0.5kg` for produce, `1 unit` for packaged items).
   - **Add Button:** Full-height (min 44px) button with shopping bag icon and clear "Ajouter" label.
   - Smooth animated success feedback upon add.
5. **Stock & Promo Indicators:**
   - Fresh Lime badge (`bg-[#B7DB75] text-[#193F30]`) for promotional discounts (`-15%`, `-20%`).
   - Out of stock state: Grayscale image overlay, disabled button, and clear text warning.

---

## 3. Playwright Assertions Passed
- Computed background color: `rgb(255, 255, 255)` (Pure White).
- Card width: `> 200px` on desktop and mobile.
- Card height: `> 250px`, consistent across 4-column desktop and 2-column mobile grids.
- Fractional unit addition works accurately without floating point arithmetic errors.
- Image lazy loading with verified 200 OK source images.
