# Changelog — TERROIR Project
All notable changes to this project are documented in this file.

---

## [7.0.0] - 2026-11-26 — Fresh Organic Editorial Release (V7)

### Added
- **Fresh Organic Editorial Design System:**
  - Introduced Forest Green (`#193F30`), Fresh Lime (`#B7DB75`), Warm Ivory (`#F6F7F1`), Harvest Yellow (`#F1C94A`), Soft Border (`#D9E2D7`), and Deep Ink (`#242D26`).
  - Retained backward-compatible CSS token aliases.
- **Strict 3-Zone Header Architecture:**
  - Zone 1: Bounded Brand & Mobile Trigger with 44px min touch targets (`data-zone="zone-1-brand"`).
  - Zone 2: Progressively clamped Navigation Links (`data-zone="zone-2-nav"`, hidden on mobile, responsive hiding below `xl` and `2xl`).
  - Zone 3: Compact utility actions (`data-zone="zone-3-actions"`).
  - Delivery City Selector moved to the Forest Green Announcement Bar, completely freeing 220px of navbar space.
- **Audited Photographic Manifest:**
  - 50 products audited and validated via HTTP 200 OK Node.js testing.
  - Replaced city photo for Taounate fresh figs with authentic fresh black figs.
  - Replaced supermarket photo for Panier Semaine with authentic farm harvest crate.
  - Added dedicated photography for distinct honeys, spices, and olive oils.
- **Product Card Engineering:**
  - 2-line clamped titles with fixed min-height (`min-h-[2.5rem]`).
  - Tabular non-wrapping price formatting (`.price-tag`).
  - Unclipped quantity steppers and full-height Add CTA buttons.
  - Pure White card surface with Soft Herb Border.
- **Documentation Suite:**
  - `IMAGE_ASSET_MANIFEST.md`, `HEADER_LAYOUT_AUDIT.md`, `PRODUCT_CARD_AUDIT.md`, `UI_UX_REFINEMENT_V7.md`, `DESIGN_SYSTEM.md`, `BRAND_IDENTITY.md`, `MOBILE_RESPONSIVE_AUDIT.md`, `VISUAL_ACCEPTANCE_REPORT.md`, `QA_REPORT.md`.

### Fixed
- Fixed P0 header overlapping and collision across 1024px to 1440px viewports.
- Fixed 24px horizontal overflow on 320px viewports (iPhone SE 1st gen).
- Fixed price tag wrapping onto 2-3 lines on narrow card widths.
- Fixed stepper control truncation in mobile viewports.
- Replaced 404 image URLs for lavender honey and paprika with verified 200 OK assets.

### Retained
- 100% preservation of centime math pricing engine, cart rules, delivery zones, checkout simulation, tracking, admin sandbox, and trilingual i18n (FR, EN, AR + RTL).
