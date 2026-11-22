# Rapport d'Assurance Qualité & Tests Automatisés — TERROIR
> **Bilan Global des Tests Unitaires, Fonctionnels, E2E et Visuels**

---

## 1. Synthèse Exécutive des Résultats

- **Total des Tests Exécutés** : 69
- **Succès** : 69 (100%)
- **Échecs** : 0
- **Couverture** : Moteur de calcul, Dictionnaires i18n, Catalogue 50 produits, Navigation mobile 6 viewports, Parcours d'achat, Checkout marocain, Console Admin, et Audit visuel 4 résolutions.

---

## 2. Détail par Suite de Tests

### Suite 1 : Tests Unitaires (`tests/unit/`)
- `localization.spec.ts` :
  - Vérification de parité stricte des dictionnaires : 100% des clés françaises sont présentes en anglais et en arabe.
  - Validation des 50 produits du catalogue : tous possèdent leurs champs localisés (`name`, `description`, `originRegion`, `storageAdvice`).
- `pricing-engine.spec.ts` :
  - Normalisation en centimes entiers aux limites d'arrondi.
  - Calcul des quantités fractionnaires (pas de 0.5 kg).
  - Tarification des variantes de contenance.
  - Validation des plafonds de stock et rejet des quantités négatives.
  - Calcul unifié du panier avec symétrie des réductions et des frais de port.
- **Résultat** : 21 tests passés avec succès.

### Suite 2 : Porte de Qualité Mobile Navigation (`tests/e2e/mobile-navigation.spec.ts`)
- Test systématique sur 6 viewports mobiles réels :
  - `320px` (iPhone SE 1re génération)
  - `360px` (Samsung Galaxy S20)
  - `375px` (iPhone 8 / SE)
  - `390px` (iPhone 14 / Pixel 7)
  - `414px` (iPhone 11 / XR)
  - `430px` (iPhone 14 Pro Max)
- Vérifications d'intégrité :
  - Affichage et visibilité de tous les liens de navigation (aucune troncature ou masquage CSS).
  - Verrouillage du scroll en arrière-plan lorsque le tiroir est ouvert.
  - Fermeture par bouton croix, par backdrop et par touche Échap.
- **Résultat** : 18 tests passés avec succès.

### Suite 3 : Parcours Utilisateur Boutique (`tests/e2e/storefront-flow.spec.ts`)
- Rendu de la page d'accueil et des univers de produits.
- Filtrage par catégorie et recherche dynamique par mot-clé (ex. *Safran Pur de Taliouine*).
- Fiche produit détaillée avec sélection de pas fractionnaire et ajout au panier.
- Mode Arabe RTL avec direction de document inversée (`html[dir="rtl"]`) et libellés en arabe.
- **Résultat** : 12 tests passés avec succès.

### Suite 4 : Tunnel de Commande & Suivi en Direct (`tests/e2e/checkout-and-tracking.spec.ts`)
- Ajout au panier d'un coffret de terroir.
- Vérification de la commande minimale marocaine.
- Remplissage du formulaire de livraison (nom, adresse, téléphone marocain validé).
- Validation de la commande simulée et génération d'un numéro de référence (`CMD-2026-XXXX`).
- Transition vers l'écran de suivi en direct à 5 étapes.
- **Résultat** : 3 tests passés avec succès.

### Suite 5 : Console Démo Administration (`tests/e2e/admin-demo.spec.ts`)
- Contrôle des métriques et cohérence arithmétique des KPIs de chiffre d'affaires.
- Navigation entre les onglets opérationnels : Produits, Stocks, Zones de livraison, Commandes.
- Bouton de réinitialisation d'usine du bac à sable.
- **Résultat** : 3 tests passés avec succès.

### Suite 6 : Audit Visuel Régression (`tests/e2e/visual-audit.spec.ts`)
- 20 captures d'écran pleine résolution archivées dans `tests/evidence/` pour Desktop (1440px), Tablet (768px), Mobile (390px) et Small Mobile (320px).
- **Résultat** : 12 tests passés avec succès.
