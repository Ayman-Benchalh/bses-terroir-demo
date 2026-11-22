# Journal des Modifications — TERROIR
> **Historique des Versions & Jalons d'Ingénierie BSES**

---

## [3.0.0] - 2026-11-22

### Architecture & Système
- Initialisation du projet flagship **TERROIR** avec Next.js 16.4.6, React 19, Tailwind CSS v4 et TypeScript 5.
- Conception et intégration du **moteur de tarification déterministe** opérant en centimes de Dirham marocain entiers (`1 MAD = 100 Centimes`).
- Prise en charge des unités fractionnaires (0.5 kg, 1 kg) et des variantes de contenance (250ml à 5L).
- Implémentation du système d'état local réactif (`StoreContext`) avec versioning `localStorage` et synchronisation multi-onglets en direct (`storage` event listener).
- Création de la sonde de santé `/api/health` et des fichiers de référencement `robots.ts` et `sitemap.ts`.

### Internationalisation & Expérience Utilisateur
- Dictionnaires trilingues complets (`fr`, `en`, `ar`) avec parité totale de 100% des clés.
- Support natif de la direction Arabe RTL (`dir="rtl"`) avec script d'initialisation synchrone prévenant tout décalage d'affichage.
- Adaptation des composants Material Design 3 avec cibles tactiles de 48 × 48 px.
- Création de la page dédiée au Design System (`/[locale]/design-system`).

### Composants Métier & Expériences d'Achat
- **Générateur de Paniers Personnalisés** (`/[locale]/build-a-basket`) avec composition guidée et jauge de progression.
- **Bloc-notes de Courses** (`/[locale]/shopping-list`) avec reconnaissance d'articles et transfert direct en panier.
- **Tunnel de Commande Marocain** (`/[locale]/checkout`) avec validation Zod du format téléphonique (+212 / 06 / 07) et sélection de créneaux.
- **Suivi de Commande en Direct** (`/[locale]/order-tracking`) avec timeline dynamique à 5 jalons.
- **Console d'Administration & Bac à Sable** (`/[locale]/admin-demo`) avec gestion des produits, contrôle des stocks et KPIs consolidés.

### Qualité & Tests
- Porte de qualité mobile validée sur 6 formats d'écran (`320px`, `360px`, `375px`, `390px`, `414px`, `430px`).
- 69 tests automatisés Playwright exécutés et validés (21 unitaires, 18 navigation mobile, 12 parcours boutique, 3 checkout, 3 admin, 12 audits visuels).
- 20 captures d'écran d'audit visuel générées dans `tests/evidence/`.

### Déploiement & DevOps
- Création du `Dockerfile` multi-stage haute sécurité avec utilisateur non-root `nextjs`.
- Configuration de `compose.yaml` liant le port hôte 3103 au conteneur 3000 avec healthcheck actif.
- Pipeline GitHub Actions CI/CD configuré dans `.github/workflows/ci.yml`.
