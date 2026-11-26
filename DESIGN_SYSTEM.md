# TERROIR Design System Specification — V7 Fresh Organic
> **BSES — Benchalh Solution E-commerce System**  
> **Brand:** TERROIR · Les Carnets du Marché  
> **Design Tokens, Components, and Responsive Spacing Standards**  
> **Date:** November 2026 · V7 Release  

---

## 1. Color Palette Tokens

```css
:root {
  /* Core V7 Fresh Organic Tokens */
  --t-forest:        #193F30; /* Primary brand forest green */
  --t-forest-dark:   #133226; /* Deep shadow forest green */
  --t-forest-subtle: #EEF3EC; /* Soft tinted surface for sections */
  
  --t-lime:          #B7DB75; /* Primary vitality accent (lime) */
  --t-lime-hover:    #A5CF5D; /* Interactive hover lime */
  --t-lime-subtle:   #F3F9EA; /* Ultra-light lime wash */

  --t-harvest:       #F1C94A; /* Warm harvest gold (accents, stars, stamps) */
  --t-sage:          #A0BBAA; /* Supporting muted foliage green */

  --t-ivory:         #F6F7F1; /* Primary page background canvas */
  --t-white:         #FFFFFF; /* Pure white surface for cards and drawers */
  
  --t-border:        #D9E2D7; /* Soft organic border */
  --t-border-subtle: #E8EFE6; /* Hairline divider */

  --t-ink:           #242D26; /* Primary text — deep organic black */
  --t-ink-muted:     #66756B; /* Secondary metadata text */
  --t-ink-subtle:    #93A398; /* Placeholder and disabled text */

  /* Aliases for backward-compatibility */
  --t-aubergine:     var(--t-forest);
  --t-citron:        var(--t-lime);
  --t-chalk:         var(--t-ivory);
  --t-ticket:        var(--t-white);
}
```

---

## 2. Typography Hierarchy

| Role | Font Family | Size Range | Weight & Style | Line Height | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | Fraunces (serif) | `clamp(3.2rem, 10vw, 8.5rem)` | Black (900), Italic | `0.92` | `-0.03em` | Magazine cover headline |
| **Section Title** | Fraunces (serif) | `24px – 36px` | Black (900), Italic | `1.1` | `-0.02em` | Section headers (`h2`) |
| **Product Title** | Fraunces (serif) | `14px – 16px` | Semi-bold (700), Italic | `1.25` | `-0.01em` | Product card headings (2-line clamped) |
| **Price Tag** | Inter / System (sans) | `16px – 20px` | Bold (700), Tabular | `1.0` | `0` | Pricing figures (`.price-tag`) |
| **Body / Description** | Inter / System (sans) | `14px – 16px` | Regular (400) / Medium (500) | `1.5` | `0` | Editorial descriptions, paragraphs |
| **Category Pill / Badge**| Inter / System (sans) | `11px – 12px` | Bold (700), Uppercase | `1.0` | `+0.08em` | Section badges, promo tags |

---

## 3. Spacing & Touch Target Compliance (Material Design 3 & WCAG 2.2 AA)

- **Minimum Touch Targets:** All interactive elements (`<button>`, `<a href>`, `<select>`) enforce a minimum of **44px × 44px** clickable bounds.
- **Button Standards:**
  - Primary CTA: `min-h-[48px] px-6 py-3.5 rounded-xl font-bold bg-[#B7DB75] text-[#193F30]`.
  - Secondary CTA: `min-h-[48px] px-5 py-3.5 rounded-xl font-semibold border border-white/30 text-white`.
  - Stepper Controls: `min-h-[44px] min-w-[36px] flex items-center justify-center rounded-lg border border-[#D9E2D7]`.
- **Card Spacing:**
  - Desktop Grid: `gap-6` (24px).
  - Tablet Grid: `gap-4` (16px).
  - Mobile Grid: `gap-3` (12px).
- **Page Container Margins:**
  - Desktop: `max-w-7xl mx-auto px-8`.
  - Tablet: `px-6`.
  - Mobile (390px): `px-4`.
  - Compact Mobile (320px): `px-2.5` to eliminate horizontal clipping.
