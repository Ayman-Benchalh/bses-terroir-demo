# TERROIR — Design System Architecture & Token Specifications

**Design System Name:** Modern Moroccan Harvest UI  
**Target Platform:** Next.js 16 (App Router) / Tailwind CSS v4  
**Design Standards:** Material Design 3 (M3) + WCAG 2.2 Level AA  
**Version:** 3.5  

---

## 1. Design Philosophy

The TERROIR UI system is engineered to provide an unhurried, editorial food-shopping experience. It trades crowded supermarket banners for spacious layout rhythms, warm daylight photography, and tactile interaction design.

### Core Principles
1. **Material Design 3 Ergonomics:** All interactive touch targets (buttons, drawer triggers, quantity steppers, inputs) strictly enforce `>= 48 × 48px` physical height or tap-box boundaries.
2. **Restrained Color Hierarchy:** A single dominant primary color (`#233C2E` Deep Olive), spacious warm canvas (`#F7F4EB` Oat Milk), and purposeful accents (`#D58B51` Terracotta).
3. **Deterministic Commerce Calculations:** All monetary and inventory numbers are rounded via integer centime arithmetic, preventing floating-point discrepancies across cards, basket builder, and checkout.
4. **Logical Directionality (RTL Parity):** All layouts adapt smoothly between French/English (LTR) and Arabic (RTL) via CSS logical properties (`ms-`, `me-`, `ps-`, `pe-`, `text-start`, `text-end`).

---

## 2. Design Tokens Manifest

### 2.1 Color Tokens
```css
/* Core Brand Tokens */
--terroir-green: #233C2E;         /* Deep Olive */
--terroir-green-hover: #1C3025;
--terroir-green-light: #335542;
--terroir-green-subtle: #EDF3EE;

--terroir-cream: #F7F4EB;         /* Oat Milk Canvas */
--terroir-cream-light: #FAF8F2;
--terroir-cream-dark: #EDE8D8;

--terroir-honey: #D58B51;         /* Terracotta Editorial Accent */
--terroir-honey-hover: #C37A40;
--terroir-honey-subtle: #FAF0E6;

--terroir-sage: #D7E4C5;          /* Fresh Sage Structure */
--terroir-sage-light: #EFF5E8;
--terroir-sage-dark: #BACCA3;

--terroir-earth: #252820;         /* Charcoal Typography */
--terroir-earth-muted: #5C6053;
--terroir-earth-light: #8C9183;

--terroir-card: #FFFFFF;          /* Pure White Elevated Surfaces */
--terroir-border: #E5DEC9;        /* Warm Natural Outline */
--terroir-border-dark: #C8BFAB;
```

### 2.2 Spacing & Grid System (4px Baseline)
| Token | Pixels | Application |
| :--- | :---: | :--- |
| `space-1` | 4px | Micro padding, badge gaps |
| `space-2` | 8px | Button item gap, chip padding |
| `space-3` | 12px | Card compact spacing, small margins |
| `space-4` | 16px | Standard padding, mobile gutter |
| `space-6` | 24px | Section inner spacing, card padding |
| `space-8` | 32px | Grid gap, desktop margins |
| `space-12`| 48px | Material 3 minimum tactile height target |
| `space-16`| 64px | Section separation |
| `space-24`| 96px | Large editorial block whitespace |

### 2.3 Radii & Elevation
- **Cards & Banners:** `rounded-2xl` (16px) or `rounded-3xl` (24px) for expansive hero panels.
- **Controls & Inputs:** `rounded-xl` (12px).
- **Badges & Pills:** `rounded-full` (9999px).
- **Shadows:** Minimalist soft diffuse ambient shadows (`shadow-xs`, `shadow-sm`) avoiding harsh black dropshadows.

---

## 3. UI Primitives Inventory

1. **`TerroirLogo` (`src/components/brand/TerroirLogo.tsx`):**
   Scalable vector logo system supporting `'full'`, `'compact'`, and `'symbol'` variants across dark and light palettes.
2. **`Button` (`src/components/ui/Button.tsx`):**
   - Variants: `primary` (Deep Olive), `honey` (Terracotta), `secondary` (Fresh Sage), `outline`, `ghost`, `danger`.
   - Sizes: `sm` (36px), `md` (44px), `lg` (48px Touch Target M3), `icon` (44×44px).
3. **`Badge` (`src/components/ui/Badge.tsx`):**
   - High-contrast pill badges: `default`, `success` (In stock), `warning` (Low stock), `error` (Sold out), `honey` (Terracotta highlight), `sage` (Organic farming), `outline`.
4. **`Input` (`src/components/ui/Input.tsx`):**
   - 48px standard height, warm `#E5DEC9` resting border, `#233C2E` active outline ring, built-in validation error states.
5. **`QuantityStepper` (`src/components/ui/QuantityStepper.tsx`):**
   - Accessible fractional stepper supporting 0.5kg increments, explicit integer centime bounds, and keyboard tap targets.
6. **`Modal` (`src/components/ui/Modal.tsx`):**
   - WAI-ARIA compliant dialog with focus trap, backdrop blur, `Escape` key capture, and background scroll locking.
