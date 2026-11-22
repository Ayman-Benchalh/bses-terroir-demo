# Architecture Technique — TERROIR
> **BSES Flagship Architecture Blueprint**

---

## 1. Vue d'Ensemble du Système

TERROIR est conçu selon une architecture moderne **Next.js 16 (App Router)** tirant parti du pré-rendu statique (**SSG - Static Site Generation**) pour la totalité des routes de contenu et des pages de premier niveau, complété par un bac à sable réactif côté client pour la gestion dynamique du panier, des commandes et de l'administration.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Next.js 16 App Router                         │
├───────────────────┬────────────────────────────────────────────────────┤
│ Root Layout       │ Head Injection (Synchronous RTL dir & lang)        │
│ Locale Layout     │ LocaleProvider + StoreProvider Context Wrappers    │
├───────────────────┼────────────────────────────────────────────────────┤
│ Static Pages      │ /[locale], /[locale]/shop, /[locale]/build-a-basket│
│                   │ /[locale]/shopping-list, /[locale]/cart            │
│                   │ /[locale]/checkout, /[locale]/order-tracking       │
│                   │ /[locale]/admin-demo, /[locale]/design-system      │
├───────────────────┼────────────────────────────────────────────────────┤
│ Dynamic Pages     │ /[locale]/product/[slug]                           │
├───────────────────┼────────────────────────────────────────────────────┤
│ API Endpoints     │ /api/health (Docker/Orchestration Healthcheck)     │
└───────────────────┴────────────────────────────────────────────────────┘
```

---

## 2. Gestion de l'État & Persistance

### LocaleContext (`src/context/LocaleContext.tsx`)
- Fournit la locale active (`fr`, `en`, `ar`).
- Synchronise les attributs `document.documentElement.lang` et `document.documentElement.dir`.
- Expose la fonction `t(key, params)` avec repli automatique sur le dictionnaire français en cas de clé manquante.
- Signale la fin de l'hydratation React en injectant `data-hydrated="true"` sur le tag `<body>`, éliminant les conditions de course dans les tests E2E.

### StoreContext (`src/context/StoreContext.tsx`)
- Gère l'état global du catalogue, des stocks, du panier, des zones de livraison et des commandes simulées.
- **Persistance LocalStorage Versionnée** : utilise la clé `terroir_store_state_v3`. Lors d'une corruption de données ou d'un changement de schéma, le magasin restaure gracieusement les données d'origine sans bloquer le rendu.
- **Synchronisation Multi-Onglets en Temps Réel** : écoute les événements `window.addEventListener('storage')` pour répercuter instantanément les commandes et modifications d'inventaire entre différents onglets ouverts.

---

## 3. Moteur de Calcul Déterministe (`src/lib/pricingEngine.ts`)

Pour éliminer rigoureusement les erreurs de précision en virgule flottante inhérentes à JavaScript, toutes les opérations financières sont exécutées en **centimes entiers** :

$$\text{Montant en Centimes} = \operatorname{round}(\text{Montant en MAD} \times 100)$$
$$\text{Ligne Total Centimes} = \operatorname{round}(\text{Prix Unitaire Centimes} \times \text{Quantité})$$
$$\text{Montant Final MAD} = \frac{\text{Total Centimes}}{100}$$

### Capacités du Moteur :
1. **Support des Quantités Fractionnaires** : calcul précis pour les pas de 0.5 kg (ex. fruits et légumes frais).
2. **Support des Variantes de Contenance** : substitution du prix unitaire par le tarif de la variante choisie (250ml, 500ml, 1L, 5L).
3. **Application Cohérente des Réductions** :
   - Pourcentage : plafonné et arrondi au centime près.
   - Montant fixe : ne peut pas excéder le sous-total.
   - Livraison offerte : appliquée si le code promo le stipule OU si le panier dépasse le seuil de livraison gratuite de la ville (ex. 250 MAD à Casablanca).

---

## 4. Matrice des Routes & Stratégie de Rendu

| Route | Type de Rendu | Rôle Métier |
| :--- | :--- | :--- |
| `/` | Redirection Statique | Redirige vers la locale par défaut (`/fr`) |
| `/[locale]` | SSG (`fr`, `en`, `ar`) | Page d'accueil éditoriale, hero, carrousels, univers |
| `/[locale]/shop` | SSG avec Suspense | Catalogue interactif avec filtres et recherche |
| `/[locale]/product/[slug]` | Dynamic Server | Fiche produit détaillée, sélection de variantes, step fractionnaire |
| `/[locale]/build-a-basket` | SSG | Constructeur de paniers personnalisés avec jauge |
| `/[locale]/shopping-list` | SSG | Bloc-notes de courses avec extraction et ajout rapide |
| `/[locale]/cart` | SSG | Récapitulatif du panier, coupon promo, sélection de ville |
| `/[locale]/checkout` | SSG | Formulaire de commande marocaine avec validation Zod |
| `/[locale]/order-tracking` | SSG | Suivi de commande en temps réel avec timeline dynamique |
| `/[locale]/admin-demo` | SSG | Console d'administration et bac à sable de gestion |
| `/[locale]/design-system` | SSG | Présentation visuelle de la charte et des composants |
| `/api/health` | Route Handler JSON | Vérification de santé pour Docker et monitoring |
