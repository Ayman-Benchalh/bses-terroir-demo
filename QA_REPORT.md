# Rapport d'Assurance Qualité & Tests Automatisés — TERROIR
> **Bilan Global des Tests Unitaires, Fonctionnels, E2E, Visuels & Non-Régression**

---

## 1. Synthèse Exécutive des Résultats

- **Total des Tests Exécutés** : 78
- **Succès** : 78 (100%)
- **Échecs** : 0
- **Suites Évaluées** : 7 suites complètes exécutées sous Playwright Test runner.
- **Plateformes de Test** :
  - Desktop Chrome (1440 × 900)
  - Mobile Chrome (iPhone 14 / Pixel 7 — 390 × 844)
  - Small Mobile (320 × 568 — iPhone SE 1re génération)
- **Couverture Fonctionnelle & Visuelle** : Moteur de tarification déterministe en centimes entiers, Parité des dictionnaires trilingues (FR / EN / AR), Catalogue complet de 50 produits, Navigation mobile sur 6 viewports, Parcours d'achat & filtrage, Tunnel de commande simulé marocain avec validation des coordonnées, Suivi logistique à 5 jalons, Console d'administration bac à sable, Styles CSS compilés Tailwind v4 et Audit visuel multi-résolutions.

---

## 2. Détail par Suite de Tests

### Suite 1 : Tests Unitaires (`tests/unit/`)
- `localization.spec.ts` :
  - Vérification de parité stricte des dictionnaires : 100% des clés françaises sont présentes en anglais et en arabe.
  - Validation des 50 produits du catalogue : tous possèdent leurs champs localisés (`name`, `description`, `originRegion`, `storageAdvice`).
- `pricing-engine.spec.ts` :
  - Normalisation en centimes entiers aux limites d'arrondi (`normalizeCentimes`).
  - Calcul des quantités fractionnaires sans erreurs flottantes (ex. 0.5 kg de dattes Majhoul ou d'amandes de Tafraout).
  - Tarification des variantes de contenance (ex. 250ml, 500ml, 1L, 5L pour les huiles d'olive et d'argan).
  - Validation des plafonds de stock et rejet des quantités négatives.
  - Calcul unifié du panier avec application symétrique des remises et des frais de livraison zonaux.
- **Résultat** : 21 tests passés avec succès (7 tests × 3 environnements de projet).

### Suite 2 : Assertions Visuelles Strictes & CSS Calculé (`tests/e2e/strict-visual-assertions.spec.ts`)
- Inspection de la feuille de style Tailwind compilée servie par le conteneur Docker.
- Validation des propriétés calculées du DOM :
  - Arrière-plan global `body` : `rgb(247, 244, 235)` (`#F7F4EB` Oat Milk).
  - Couleur du texte principal : `rgb(37, 40, 32)` (`#252820` Charcoal Olive).
  - Bouton d'action principal du héros : `rgb(35, 60, 46)` (`#233C2E` Deep Olive).
- Vérification du comportement responsive de la grille de catégories (2 colonnes sur mobile, multi-colonnes sur grand écran).
- Vérification de la tolérance zéro débordement horizontal à 375px (`iPhone SE`).
- **Résultat** : 9 tests passés avec succès (3 tests × 3 environnements).

### Suite 3 : Porte de Qualité Mobile Navigation (`tests/e2e/mobile-navigation.spec.ts`)
- Test systématique sur 6 viewports mobiles réels :
  - `320px` (iPhone SE 1re génération)
  - `360px` (Samsung Galaxy S20)
  - `375px` (iPhone 8 / SE)
  - `390px` (iPhone 14 / Pixel 7)
  - `414px` (iPhone 11 / XR)
  - `430px` (iPhone 14 Pro Max)
- Vérifications d'intégrité :
  - Affichage et visibilité de tous les liens de navigation (aucune troncature ou masquage CSS).
  - Verrouillage du scroll en arrière-plan lorsque le tiroir est ouvert (`overflow: hidden`).
  - Fermeture par bouton croix, par backdrop et par touche Échap.
- **Résultat** : 18 tests passés avec succès.

### Suite 4 : Parcours Utilisateur Boutique (`tests/e2e/storefront-flow.spec.ts`)
- Rendu de la page d'accueil et des univers de produits.
- Filtrage par catégorie et recherche dynamique par mot-clé (ex. *Safran Pur de Taliouine*).
- Fiche produit détaillée avec sélection de pas fractionnaire et ajout au panier.
- Mode Arabe RTL avec direction de document inversée (`html[dir="rtl"]`) et libellés en arabe.
- **Résultat** : 12 tests passés avec succès (4 tests × 3 environnements).

### Suite 5 : Tunnel de Commande & Suivi en Direct (`tests/e2e/checkout-and-tracking.spec.ts`)
- Ajout au panier d'un coffret de terroir de valeur supérieure au seuil minimum.
- Vérification de la commande minimale marocaine.
- Remplissage du formulaire de livraison (nom, adresse, téléphone marocain validé format `06XXXXXXXX`).
- Validation de la commande simulée et génération d'un numéro de référence (`CMD-2026-XXXX`).
- Transition vers l'écran de suivi en direct à 5 étapes.
- **Résultat** : 3 tests passés avec succès.

### Suite 6 : Console Démo Administration (`tests/e2e/admin-demo.spec.ts`)
- Contrôle des métriques et cohérence arithmétique des KPIs de chiffre d'affaires et de volume.
- Navigation entre les onglets opérationnels : Produits, Stocks, Zones de livraison, Commandes.
- Contrôle des actions de simulation (mise à jour du stock en direct, modification de statut).
- **Résultat** : 3 tests passés avec succès.

### Suite 7 : Audit Visuel & Preuves Photographiques (`tests/e2e/visual-audit.spec.ts`)
- Génération automatisée des captures d'écran pleine page sur 4 résolutions standardisées (`1440px`, `768px`, `390px`, `320px`) pour 5 parcours :
  - Accueil (`homepage`)
  - Boutique (`shop`)
  - Créateur de Panier (`basket-builder`)
  - Console Admin (`admin-demo`)
  - Expérience Arabe RTL (`arabic-rtl`)
- **Résultat** : 12 tests passés avec succès.

---

## 3. Matrice de Synthèse d'Exécution

```
================================================================================
Test Suites:  7 passed, 7 total
Tests:        78 passed, 78 total
Snapshots:    20 visual artifacts captured in tests/evidence/
Pass Rate:    100% GREEN
Runtime Env:  Docker Production Container (http://localhost:3103)
================================================================================
```

Toutes les exigences de test, d'assurance qualité et d'intégrité visuelle sont rigoureusement validées.
