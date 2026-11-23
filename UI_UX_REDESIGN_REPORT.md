# Rapport de Refonte Visuelle & Transformation UX — TERROIR
> **Projet Phare BSES — Modern Moroccan Harvest : Direction Artistique, Système Graphique & Expérience Marchande**

---

## 1. Vision Créative & Direction Artistique

### 1.1 Contexte & Objectifs
La refonte visuelle globale de **TERROIR** marque l'avènement du concept **"Modern Moroccan Harvest"** (La Récolte Marocaine Moderne). Contrairement aux interfaces de supermarchés génériques aux aplats froids ou surchargés de mentions promotionnelles agressives, TERROIR incarne désormais l'élégance sobre, l'authenticité agricole et le raffinement gastronomique du terroir marocain.

L'objectif créatif était de marier la rigueur fonctionnelle d'un système de commerce électronique de pointe (moteur de calcul déterministe en centimes, pas fractionnaires, gestion multi-villes et bilinguisme avec Arabe RTL) à une identité visuelle digne d'une épicerie fine artisanale contemporaine (inspirée des meilleures références internationales telles que *Daylesford Organic*, *Oddbox* et *CrowdFarming*).

### 1.2 Piliers Fondamentaux de la Refonte
1. **Élégance Organique & Clarté** : Abandon des contrastes criards et des bordures saturées au profit d'une harmonie chromatique naturelle dominée par l'Olive Profond (`#233C2E`) et le Lait d'Avoine chaud (`#F7F4EB`).
2. **Honnêteté de Démonstration & Transparence** : Suppression de tous les avis clients préfabriqués (ex. faux "4.9/5 étoiles sur 38 avis") et mentions marketing trompeuses. Valorisation de badges d'origine authentiques (`📍 Berkane • Terroir Oriental`, `📍 Taliouine • Récolte Manuelle`).
3. **Hiérarchie Typographique Contrastée** : Duo typographique mariant la chaleur terrienne de la serif contemporaine **Fraunces** pour les titres et l'excellence de lisibilité de la sans-serif géométrique **Plus Jakarta Sans** pour l'interface marchande.
4. **Ergonomie Mobile & Décongestion** : Éradication totale des débordements horizontaux, suppression de la surcharge de l'en-tête via des paliers adaptatifs stricts (`hideBelowXl`, `hideBelow2xl`), et création d'un tiroir mobile immersif à forte valeur perçue.

---

## 2. Système d'Identité Visuelle & Logo

### 2.1 Emblème & Architecture Vectorielle
Un emblème original complet a été conçu sous format SVG vectoriel pur (`public/brand/`) :
- **logo-symbol.svg** : Synthèse géométrique représentant les terrasses agricoles de l'Atlas, la courbure d'une feuille d'olivier d'argent, la graine nourricière en terre cuite et l'astre solaire matinal.
- **logo-horizontal-dark.svg** & **logo-horizontal-light.svg** : Combinaison de l'emblème, du logotype typographique et du sous-titre de marque *"RÉCOLTE DU MAROC"*.
- **favicon.svg** : Version optimisée pour la barre d'onglets du navigateur et les favoris mobiles.

### 2.2 Composant React Unifié (`TerroirLogo.tsx`)
Le composant `src/components/brand/TerroirLogo.tsx` prend en charge :
- **Variantes de forme** : `'full'` (emblème + wordmark + sous-titre), `'compact'` (emblème + wordmark) et `'symbol'` (emblème seul).
- **Variantes chromatiques** : `'dark'` (Olive Profond & Terracotta sur fond clair), `'light'` (Blanc Pur & Terracotta Dorée sur fond sombre) et `'mono'` (version monochrome adaptative).
- **Accessibilité** : Attributs `aria-label="TERROIR — Accueil"` et navigation intégrée via `next/link`.

---

## 3. Système Graphique & Tokens de Design

### 3.1 Palette Chromatique "Modern Moroccan Harvest"

| Rôle | Nom du Token | Hexadécimal | Valeur RGB | Application |
| :--- | :--- | :--- | :--- | :--- |
| **Primaire** | Deep Olive | `#233C2E` | `rgb(35, 60, 46)` | Boutons d'action majeurs, en-têtes, pied de page, accents forts |
| **Fond & Canvas** | Oat Milk | `#F7F4EB` | `rgb(247, 244, 235)` | Arrière-plan global du site, tiroirs, cartes secondaires |
| **Surfaces Neutres** | Pure White | `#FFFFFF` | `rgb(255, 255, 255)` | Fiches produits, modales, formulaires de saisie |
| **Accent Chaud** | Terracotta | `#D58B51` | `rgb(213, 139, 81)` | Badges de terroirs, pastilles promotionnelles, accents visuels |
| **Accent Frais** | Fresh Sage | `#D7E4C5` | `rgb(215, 228, 197)` | Notifications de succès, badges d'état, barres de progression |
| **Texte Principal** | Charcoal Olive | `#252820` | `rgb(37, 40, 32)` | Typographie de lecture principale (ratio contraste > 10:1) |
| **Texte Secondaire**| Muted Earth | `#5C6053` | `rgb(92, 96, 83)` | Métadonnées, unités, descriptions secondaires |
| **Bordures** | Natural Sand | `#E5DEC9` | `rgb(229, 222, 201)` | Séparateurs, bordures de cartes, contours de formulaires |

### 3.2 Composants d'Interface Refondus
- **Boutons (`Button.tsx`)** : 4 variantes (`primary`, `secondary`, `outline`, `ghost`) avec cibles tactiles respectant Material Design 3 (hauteur minimale 48px), micro-animations de clic et états de chargement fluides.
- **Badges (`Badge.tsx`)** : Micro-pastilles arrondies (`rounded-full`) à typographie fine pour signaler l'origine géographique (`📍 Berkane`), les modes de récolte (`Artisanal`), ou les paliers de livraison gratuite.
- **Champs de Formulaire (`Input.tsx`)** : États de focus aux anneaux Olive Profond (`ring-[#233C2E]`), bordures naturelles et labels clairs avec gestion des messages d'erreur accessibles.
- **Sélecteur de Quantité (`QuantityStepper.tsx`)** : Contrôle pas à pas tactile avec affichage dynamique de l'unité (`kg`, `pièce`, `bouteille`), support des incréments fractionnaires (0.5 kg) et respect des plafonds de stock en temps réel.

---

## 4. Parcours Marchand & Pages Clés

### 4.1 En-tête Adaptatif & Tiroir Mobile
- **Barre d'Annonce Supérieure** : Bannière Olive Profond présentant la promesse de service avec sélecteur direct de ville de livraison et lien d'assistance direct. Gestion stricte du texte tronqué pour interdire tout débordement sur les écrans étroits (320px).
- **Navigation Principale** : Intégration du nouveau logo vectoriel, liens de navigation décongestionnés avec masque sélectif (`hidden xl:flex` / `hidden 2xl:flex`), recherche instantanée et accès panier avec badge dynamique.
- **Tiroir Mobile (`MobileDrawer.tsx`)** : Canvas Lait d'Avoine complet, navigation par catégorie avec icônes terriennes, sélecteur trilingue (`FR / EN / AR`), réglage de ville de livraison et carte d'assistance officielle BSES WhatsApp / Email.

### 4.2 Page d'Accueil & Univers de Catégories
- **Héros Campagne** : Composition immersive mettant en avant la terre marocaine, titrage éditorial en Fraunces, indicateurs concrets de démonstration (`8 Terroirs marocains`, `100% Démo Interactive BSES`, `50+ Produits Artisanaux`, `Livraison Simulée 2h-24h`), et double bouton d'action.
- **Grille de Catégories Découverte** : Cartes 1:1 épurées avec photographie de terroir pleine surface, typographie contrastée et transition fluide vers le catalogue filtré.
- **Section Panier sur Mesure** : Présentation du générateur de paniers personnalisés avec jauge d'économie en temps réel.
- **Pied de Page Institutionnel (`Footer.tsx`)** : Traitement majestueux sur fond Olive Profond, logo clair, mentions d'assistance officielles BSES, liens rapides et clause de non-responsabilité transparente indiquant la nature de prototype interactif du site.

### 4.3 Fiche Produit & Carte Marchande (`ProductCard.tsx`)
- **Éradication de l'Encombrement** : Suppression des descriptions verbeuses et des faux avis clients.
- **Valorisation du Terroir** : Affichage systématique de l'origine (`📍 Berkane`, `📍 Souss-Massa`, `📍 Taliouine`, etc.).
- **Calcul Déterministe Instantané** : Affichage du prix unitaire clair en Dirham marocain, contrôle de quantité fractionnaire direct et bouton d'ajout au panier tactile.

### 4.4 Tunnel de Commande & Suivi en Direct
- **Tunnel de Commande Marocain (`CheckoutForm.tsx`)** : Formulaire à 3 étapes claires (Coordonnées & Adresse, Créneau de livraison, Mode de paiement à la livraison COD). Validation stricte des numéros marocains (+212, 06, 07).
- **Écran de Confirmation Fictif** : Numéro de commande formalisé (`CMD-2026-XXXX`), récapitulatif détaillé et animation de confettis légers pour célébrer l'expérience utilisateur.
- **Suivi en Direct (`order-tracking`)** : Timeline à 5 jalons réactive simulant l'avancement logistique de la commande.

### 4.5 Console Démo d'Administration (`AdminDashboard.tsx`)
- Refonte complète de la console de gestion avec typographie sobre, KPIs arithmétiquement synchronisés, gestion en direct du stock, des zones de livraison et des statuts de commandes.
- Avertissement explicite rappelant le fonctionnement en bac à sable 100% navigateur (`localStorage`).

---

## 5. Bilan & Conformité aux Objectifs
La refonte visuelle globale a permis de métamorphoser TERROIR en une vitrine d'exception, parfaitement alignée sur les standards du luxe alimentaire et les exigences d'ingénierie logicielle les plus rigoureuses.
