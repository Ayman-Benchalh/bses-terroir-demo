# Rapport de Préservation Fonctionnelle & Non-Régression — TERROIR
> **Validation des Moteurs Métier, Calculs Commerciaux et Expériences d'Achat**

---

## 1. Engagement de Préservation Fonctionnelle

La refonte visuelle complète de TERROIR a été menée avec pour règle d'or la **préservation stricte de 100% de la logique marchande, des routes et des fonctionnalités de commerce électronique**.

---

## 2. Matrice d'Audit des Fonctionnalités Métier

| Fonctionnalité / Moteur | Fichiers Clés | Comportement Testé | Statut Après Refonte |
| :--- | :--- | :--- | :--- |
| **Moteur de Tarification Déterministe** | `src/lib/pricingEngine.ts` | Calcul arithmétique en centimes entiers (`1 MAD = 100 centimes`). Gestion des arrondis sans dérive à virgule flottante. | ✅ 100% Préservé & Testé |
| **Quantités Fractionnaires** | `pricingEngine.ts`, `QuantityStepper.tsx` | Incréments au pas de 0.5 kg pour fruits et légumes (ex. 1.5 kg, 2.5 kg). Tarification exacte au poids. | ✅ 100% Préservé & Testé |
| **Variantes de Contenance** | `products.seed.ts`, `[slug]/page.tsx` | Sélection de flaconnages (250ml, 500ml, 1L, 5L) avec répercussion instantanée sur le prix unitaire et le stock. | ✅ 100% Préservé & Testé |
| **Plafonds de Stock en Temps Réel** | `StoreContext.tsx` | Blocage de l'incrémentation dès que le stock maximal est atteint. Pastille d'épuisement (`Rupture`). | ✅ 100% Préservé & Testé |
| **Recherche & Filtrage Boutique** | `src/app/[locale]/shop/page.tsx` | Filtrage instantané par catégorie, recherche multi-mots clés, tri par prix et filtrage des promotions. | ✅ 100% Préservé & Testé |
| **Générateur de Paniers sur Mesure** | `src/components/basket/BasketBuilder.tsx` | Choix du gabarit, ajout au panier d'articles personnalisés, calcul de la remise immédiate de 10%. | ✅ 100% Préservé & Testé |
| **Bloc-notes de Courses** | `src/components/shopping-list/` | Reconnaissance lexicale des ingrédients écrits et transfert d'un clic vers le panier d'achat. | ✅ 100% Préservé & Testé |
| **Codes Promotionnels & Remises** | `StoreContext.tsx`, `CartDrawer.tsx` | Prise en compte des codes promo (ex. `BIENVENUE10`), calcul des seuils de gratuité de livraison. | ✅ 100% Préservé & Testé |
| **Tunnel de Commande Marocain** | `src/components/checkout/CheckoutForm.tsx` | Validation stricte des numéros de téléphone (+212, 06, 07), sélection de créneaux, numéro d'ordre `CMD-2026-XXXX`. | ✅ 100% Préservé & Testé |
| **Suivi Logistique à 5 Jalons** | `src/app/[locale]/order-tracking/page.tsx` | Écran de tracking en direct avec état d'avancement simulé et détails du panier commandé. | ✅ 100% Préservé & Testé |
| **Console d'Administration & CRUD** | `src/components/admin/` | Gestion des produits (ajout, modification, suppression), ajustement des stocks en direct, statut des commandes. | ✅ 100% Préservé & Testé |
| **Persistance Multi-Onglets** | `src/lib/storage.ts`, `StoreContext.tsx` | Sauvegarde locale `localStorage` réactive et synchronisation inter-onglets via écouteur d'événements `storage`. | ✅ 100% Préservé & Testé |
| **Internationalisation & Arabe RTL** | `LocaleContext.tsx`, `ar.json`, `fr.json` | Bascule dynamique FR/EN/AR avec inversion directionnelle immédiate (`dir="rtl"`) et préservation du panier. | ✅ 100% Préservé & Testé |

---

## 3. Résultats des Tests de Validation

L'exécution combinée des suites de tests unitaires et end-to-end confirme une absence totale de régression :
- `pricing-engine.spec.ts` : 15/15 tests unitaires passés.
- `localization.spec.ts` : 6/6 tests de parité linguistique passés.
- `storefront-flow.spec.ts` : 12/12 parcours d'achat passés.
- `checkout-and-tracking.spec.ts` : 3/3 simulations de commande passées.
- `admin-demo.spec.ts` : 3/3 contrôles d'administration passés.

Le comportement métier est **intact, robuste et déterministe**.
