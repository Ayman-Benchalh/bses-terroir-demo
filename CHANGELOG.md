# Journal des Modifications — TERROIR
> **Historique des Versions & Jalons d'Ingénierie BSES**

---

## [3.1.0] - 2026-11-23

### Direction Artistique & Refonte Visuelle Majeure
- **Identité Visuelle "Modern Moroccan Harvest"** : Remplacement complet de l'identité graphique générique par une direction artistique artisanale haut de gamme.
- **Nouveau Système de Logo Vectoriel** : Création de la suite SVG complète dans `public/brand/` (`logo-symbol.svg`, `logo-horizontal-dark.svg`, `logo-horizontal-light.svg`, `favicon.svg`) et du composant adaptatif `TerroirLogo.tsx`.
- **Palette Chromatique Organique** : Harmonisation globale autour de l'Olive Profond (`#233C2E`), du Lait d'Avoine chaud (`#F7F4EB`), du Blanc Pur (`#FFFFFF`), du Terracotta (`#D58B51`) et de la Sauge Fraîche (`#D7E4C5`).
- **Typographie Duale** : Association de la serif expressive **Fraunces** pour les titres et de la sans-serif géométrique **Plus Jakarta Sans** pour les interfaces de commande.
- **Transparence & Honnêteté Commerciale** : Élimination des avis clients artificiels et ajout d'indicateurs de provenance régionale authentiques (`📍 Berkane`, `📍 Taliouine`, etc.).

### Expérience Marchande & Composants
- **En-tête & Barre d'Annonce** : Décongestion visuelle avec sélecteur de ville, navigation adaptative (`hideBelowXl`, `hideBelow2xl`) et éradication de tout débordement sur les viewports étroits.
- **Tiroir Mobile Immersif (`MobileDrawer.tsx`)** : Surface complète Lait d'Avoine, cibles tactiles de 48px, sélecteur trilingue instantané et carte d'assistance BSES.
- **Fiches Produits Épurées (`ProductCard.tsx`)** : Cartes lumineuses 1:1 sans encombrement textuel, tarification claire en MAD, et bouton d'ajout au panier direct.
- **Tunnel de Commande & Suivi** : Formulaire marocain à 3 étapes avec numéros d'ordre formalisés (`CMD-2026-XXXX`) et écran de confirmation interactif.
- **Console d'Administration Démo** : Tableau de bord révisé avec KPIs arithmétiquement synchronisés et étiquette d'avertissement de bac à sable local.

### Qualité & Tests
- **78 Tests Automatisés Validés à 100%** (21 unitaires, 18 navigation mobile, 12 boutique, 9 assertions de styles calculés, 12 audits visuels, 3 checkout, 3 admin).
- **Audit de Non-Régression Visuelle** : 20 captures d'écran pleine page générées sur 4 résolutions dans `tests/evidence/`.
- **Tolérance Zéro Débordement** : `scrollWidth <= clientWidth` rigoureusement respecté de 320px à 1920px.

---

## [3.0.0] - 2026-11-22

### Architecture & Système
- Initialisation du projet flagship **TERROIR** avec Next.js 16.4.6, React 19, Tailwind CSS v4 et TypeScript 5.
- Conception et intégration du **moteur de tarification déterministe** opérant en centimes de Dirham marocain entiers (`1 MAD = 100 Centimes`).
- Prise en charge des unités fractionnaires (0.5 kg, 1 kg) et des variantes de contenance (250ml à 5L).
- Implémentation du système d'état local réactif (`StoreContext`) avec versioning `localStorage` et synchronisation multi-onglets en direct.
- Création de la sonde de santé `/api/health` et des fichiers de référencement `robots.ts` et `sitemap.ts`.

### Internationalisation
- Dictionnaires trilingues complets (`fr`, `en`, `ar`) avec parité totale de 100% des clés.
- Support natif de la direction Arabe RTL (`dir="rtl"`).
