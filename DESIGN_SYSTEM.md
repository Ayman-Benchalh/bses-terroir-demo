# TERROIR V6 — DESIGN SYSTEM SPECIFICATION
**Version:** 6.0 — *Les Carnets du Marché*  
**CSS Architecture:** Tailwind CSS v4 + Native CSS Custom Properties in `globals.css`

---

## 1. Core Component Tokens

### A. The Market Ticket (`.market-ticket`)
```css
.market-ticket {
  background: var(--t-ticket); /* #FEFDF8 */
  border: 1px solid var(--t-border); /* rgba(53, 43, 62, 0.12) */
  border-radius: 2px;
  position: relative;
}
.market-ticket::after {
  content: "";
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  background-image: repeating-linear-gradient(
    90deg,
    var(--t-aubergine) 0,
    var(--t-aubergine) 6px,
    transparent 6px,
    transparent 10px
  );
  opacity: 0.25;
}
```

### B. Price Tag (`.price-tag`)
- Dominant currency figure set in Fraunces italic serif.
- Unit indicator (`MAD / kg`) set in 11px uppercase Jakarta Sans.
- High visual salience without commercial clutter.

### C. Season Pill (`.season-pill`)
- Bordered badge in 11px uppercase tracking.
- Features four-point star separator (`✦`) in Citron yellow.

---

## 2. UI Components Overview
- **Header:** Sticky with announcement bar in Aubergine `#352B3E`, Citron highlights, discrete Admin link.
- **ProductCard:** Ticket container with square corners (`rounded-sm`), origin badge, Fraunces price, and quantity stepper.
- **MarketExplorer:** Typographic region index with SVG dashed-ring stamps and instant regional product showcase.
- **CartDrawer & MobileDrawer:** Slide-over panels styled in chalk `#F8F7F0`, Aubergine interactive controls, and free shipping progress tracker.
