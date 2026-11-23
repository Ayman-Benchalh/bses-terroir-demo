# TERROIR — Premium Photography System & Asset Manifest

**Art Direction:** Modern Moroccan Harvest  
**Photography Philosophy:** Natural Daylight, Authentic Textures, Earthy Warmth  
**Version:** 3.5  

---

## 1. Photography Art Direction

The TERROIR photographic direction departs from saturated supermarket images, sterile white studio cutouts, and generic stock vectors. Instead, every visual follows three strict stylistic pillars:

1. **Natural Warm Daylight:** Soft directional morning sunlight evoking Morocco's agricultural plains (Souss, Saïss, Gharb, Oriental, Atlas foothills).
2. **Warm Neutral Earth Backdrops:** Authentic tactile surfaces: unpolished olive wood, terracotta pottery, hand-woven palm (*doum*) fibers, raw linen, and limestone.
3. **Subject Authenticity:** Exact correspondence between catalog item and visual content. Every oil shows cold-pressed glass bottling, honey displays raw amber comb or jar textures, fresh citrus shows dew and leaf-attached stems.

---

## 2. Photographic Styles

### Style A: Campaign Photography (Hero & Storytelling)
- **Role:** Immersive full-width hero compositions and regional agricultural narratives.
- **Composition:** Generous negative space along upper and lateral axes for typography readability.
- **Lighting:** Warm golden hour sunlight (3200K–4500K equivalent).
- **Hero Image:** Curated seasonal harvest table with fresh Berkane citrus, Souss vegetables, artisan bread, cold-pressed olive oil, and ceramic cruets.

### Style B: Product Catalog Photography
- **Role:** High-clarity 1:1 square aspect ratio for storefront grids and category exploration.
- **Composition:** Frontal or 45-degree angle, consistent scale, centered subject, soft contact shadow.
- **Color Grading:** True-to-life organic tones; no unnatural oversaturation.

### Style C: Editorial & Terroir Storytelling
- **Role:** Explaining cooperative heritage, cold press extraction, hand-harvest methods, and basket composition.
- **Composition:** Human hands harvesting, woven baskets in olive orchards, traditional ceramic tagines and terracotta bowls.

---

## 3. Image Assets Manifest

| Asset Name | Target View / Section | Visual Subject | Aspect Ratio | Dimensions | Source / License |
| :--- | :--- | :--- | :---: | :---: | :--- |
| `hero-moroccan-harvest.jpg` | Homepage Hero Campaign | Sunlit Moroccan seasonal produce on natural rustic table | 16:9 / 4:3 | 1920 × 1080 | Unsplash (Free Editorial Commercial) |
| `cat-fruits-frais.jpg` | Category 1: Fruits | Fresh Moroccan oranges, clementines & pomegranates | 1:1 | 800 × 800 | Unsplash (Commercial License) |
| `cat-legumes-frais.jpg` | Category 2: Légumes | Crisp heirloom tomatoes, peppers & garden herbs | 1:1 | 800 × 800 | Unsplash (Commercial License) |
| `cat-huiles-argan.jpg` | Category 3: Huiles | Extra virgin olive oil & golden culinary argan oil | 1:1 | 800 × 800 | Unsplash (Commercial License) |
| `cat-miels-amlou.jpg` | Category 4: Miels | Atlas mountain honeycomb & stone-ground almond amlou | 1:1 | 800 × 800 | Unsplash (Commercial License) |
| `cat-epices-aromates.jpg`| Category 5: Épices | Taliouine pure saffron threads & ground spices | 1:1 | 800 × 800 | Unsplash (Commercial License) |
| `cat-dattes-secs.jpg` | Category 6: Dattes | Premium Tafilalet Mejhoul dates & sweet almonds | 1:1 | 800 × 800 | Unsplash (Commercial License) |
| `cat-laitiers.jpg` | Category 7: Laiterie | Artisanal Chefchaouen fresh goat cheese & farm butter | 1:1 | 800 × 800 | Unsplash (Commercial License) |
| `cat-epicerie-fine.jpg` | Category 8: Épicerie | Hand-rolled couscous, cured meslalla & preserved lemon | 1:1 | 800 × 800 | Unsplash (Commercial License) |
| `cat-artisanat.jpg` | Category 9: Eaux Florales | Distilled Kelaat M'Gouna rose water in glass cruets | 1:1 | 800 × 800 | Unsplash (Commercial License) |
| `cat-paniers-coffrets.jpg`| Category 10: Coffrets | Woven palm artisan basket packed with Moroccan harvest | 1:1 | 800 × 800 | Unsplash (Commercial License) |
| `basket-builder-hero.jpg` | Basket Builder Header | Top-down view of hand-picked seasonal weekly grocery basket | 16:9 | 1200 × 675 | Unsplash (Commercial License) |

---

## 4. Responsive Image Optimization Guidelines
- **Format Delivery:** Modern WebP / AVIF with Next.js Image optimization (`next/image`).
- **Responsive Sizes:** Explicit `sizes` property on all `<Image>` instances:
  `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"`
- **Layout Shift Prevention:** Standardized `aspect-square` container with `fill` and `object-cover` preventing Cumulative Layout Shift (CLS = 0).
- **Alt Text Inclusivity:** All 50 product images have descriptive localized alt text matching the active language (`fr`, `en`, `ar`).
