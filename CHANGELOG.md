# Journal des Modifications — TERROIR
> **Historique des Versions & Jalons d'Ingénierie BSES**

---

## [3.2.0] - 2026-11-26 (Master Recovery V5 Release)

### Refonte de l'Architecture de la Page d'Accueil (10 Sections Stricte)
- **Héros Campagne Épuré** : Intégration du titre officiel *"Le meilleur de nos terres, chez vous."*, paragraphe concis, CTAs *"Découvrir les produits"* et *"Composer mon panier"*. Suppression complète de tous les compteurs marketing artificiels et faux avis clients.
- **Section Découverte par Univers (Section 04)** : Sélection soignée de 6 catégories phares en grille 1:1 sans paragraphes encombrants, avec lien direct *"Voir toutes les catégories"*.
- **Sélection de Saison (Section 05)** : Présentation de 4 produits maraîchers frais de saison propulsés par le nouveau composant `ProductCard` compact.
- **Histoire du Terroir Marocain (Section 06)** : Création d'une section éditoriale photographique chaleureuse avec 3 piliers concrets (*Cueillette à Pleine Maturité*, *Terroirs Géographiques Précis*, *Tarification Déterministe*).
- **Créateur de Panier Phare (Section 07)** : Bannière distinctive mettant en valeur l'avantage de -10% immédiats et CTA opérationnel vers `/build-a-basket`.
- **Spécialités Locales (Section 08)** : Mise en lumière de 4 trésors emblématiques (Huile d'Argan de Taroudant, Huile d'Olive d'Ouezzane, Miel Sauvage de Thym de l'Atlas, Amlou de Tafraout).
- **Expérience de Livraison Condensée (Section 09)** : Remplacement de l'ancienne matrice 4 colonnes par un simulateur interactif dynamique avec sélecteur de ville.

### Nouveau Composant ProductCard
- **Format Compact & Épuré** : Élimination des faux avis par étoiles, des notes numériques invérifiées et des descriptions verbeuses en grille.
- **Origine & Transparence** : Pastille géographique fine (`📍 Berkane`, `📍 Taroudant`), tarification en MAD / unité claire, pas à pas `QuantityStepper` et bouton d'ajout au panier direct tactile (40px).

### Assainissement des Dictionnaires Trilingues
- **Purge Intégrale des Revendications Non Fondées** : Élimination définitive des clés `metric_coops` ("48+ Coopératives") et `metric_rating` ("4.9/5 Avis Clients") dans `fr.json`, `en.json` et `ar.json`.
- **Harmonisation des Titres & CTAs** dans les 3 langues avec parité stricte vérifiée par test automatisé.

### DevOps & Assurance Qualité
- **Docker Production Reconstruit & Actif** : Conteneur `bses-terroir-app` déployé en standalone sur le port hôte 3103 avec healthcheck actif.
- **78/78 Tests Playwright Validés** à 100% sur 3 plateformes (Desktop 1440px, Mobile 390px, Small Mobile 320px).
- **20 Preuves Photographiques Pleine Page** régénérées dans `tests/evidence/`.

---

## [3.1.0] - 2026-11-23

### Direction Artistique & Refonte Visuelle Majeure
- **Identité Visuelle "Modern Moroccan Harvest"** : Remplacement complet de l'identité graphique générique par une direction artistique artisanale haut de gamme.
- **Nouveau Système de Logo Vectoriel** : Création de la suite SVG complète dans `public/brand/` et du composant adaptatif `TerroirLogo.tsx`.
- **Palette Chromatique Organique** : Harmonisation globale autour de l'Olive Profond (`#233C2E`), du Lait d'Avoine chaud (`#F7F4EB`), du Blanc Pur (`#FFFFFF`), du Terracotta (`#D58B51`) et de la Sauge Fraîche (`#D7E4C5`).

---

## [3.0.0] - 2026-11-22

### Architecture & Système
- Initialisation du projet flagship **TERROIR** avec Next.js 16.4.6, React 19, Tailwind CSS v4 et TypeScript 5.
- Conception et intégration du **moteur de tarification déterministe** opérant en centimes de Dirham marocain entiers (`1 MAD = 100 Centimes`).
- Prise en charge des unités fractionnaires (0.5 kg, 1 kg) et des variantes de contenance (250ml à 5L).
