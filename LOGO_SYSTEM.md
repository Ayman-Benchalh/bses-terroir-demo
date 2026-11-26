# TERROIR V6 — LOGO SYSTEM SPECIFICATION
**Brand:** TERROIR  
**Creative Concept:** Citrus Cross-Section & Regional Quadrants  
**Implementation:** `src/components/brand/TerroirLogo.tsx`

---

## 1. Symbol Rationale: The Citrus Cross-Section

The previous leaf-and-seed icon was discarded as a generic agro-supermarket cliché. 

The V6 symbol is an SVG graphic evoking a **cut citrus fruit** (Berkane clementine or orange), partitioned into 4 distinct geographic wedges:
1. **Wedge 1 (Large Aubergine):** Depth of fertile Atlas soils.
2. **Wedge 2 (Electric Citron):** Sunlight and zest of Moroccan citrus orchards.
3. **Wedge 3 (Paprika Red):** Warm spices of Taliouine safran and red clays.
4. **Wedge 4 (Mint Green):** Argan valleys of Souss and mountain springs.
5. **Center Pith (Chalk & Aubergine):** The seed / center of terroir provenance.

---

## 2. Logo Variants

### A. Full Variant (`variant="full"`)
- Symbol (36×36px) paired with Fraunces italic wordmark **TERROIR**.
- Tagline: `LES CARNETS DU MARCHÉ` in geometric uppercase Citron yellow.
- Used in main Footers, Splash screens, and large branding anchors.

### B. Compact Variant (`variant="compact"`)
- Symbol paired with wordmark **TERROIR**.
- Tagline omitted for clean header density.
- Used in sticky Header and desktop navigation.

### C. Symbol Only (`variant="symbol"`)
- Independent 36×36px SVG graphic.
- Scalable to 16px favicon or 64px app icons.
- Legible down to 18px touch targets with crisp contrast.

---

## 3. Themes
- **`dark` (default):** Designed for chalk/white surfaces (`#F8F7F0`). Wordmark in `#352B3E`.
- **`light`:** Designed for Aubergine surfaces (`#352B3E`). Wordmark in `#F8F7F0` with Citron tagline.
- **`mono`:** High-contrast black/white for receipts, shipping labels, and packaging.
