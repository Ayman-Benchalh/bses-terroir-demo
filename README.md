# TERROIR — Marché d’Exception & Produits du Terroir Marocain
> **Studio BSES — Benchalh Solution E-commerce System**  
> *Le meilleur de nos terres, chez vous.* | *Fresh from our land, delivered to you.* | *أجود ما جادت به أرض المغرب، طازجاً على مائدتكم.*

---

## 🌾 Présentation du Projet Flagship

**TERROIR** est une démonstration technologique et commerciale de premier ordre conçue par le studio **BSES**. Elle illustre l'excellence dans le commerce électronique de produits frais et du terroir marocain, alliant authenticité régionale, efficacité logistique moderne et raffinement visuel.

Destiné aux coopératives agricoles, supermarchés premium, épiceries fines et entrepreneurs du terroir au Maroc, TERROIR offre une expérience utilisateur ultra-rapide, bilingue avec support natif de l'arabe RTL, et un moteur de calcul de prix déterministe en centimes entiers.

---

## ✨ Points Forts & Innovations Clés

1. **Architecture Next.js 16 App Router & React 19** :
   - Mode `standalone` ultra-léger pour conteneurisation Docker.
   - 34 routes SSG pré-rendues avec génération statique des locales.
   - Zéro dépendance à une base de données distante pour la démonstration : bac à sable haute fidélité synchronisé dans le navigateur avec `localStorage` versionné et écoute multi-onglets en direct.

2. **Moteur Déterministe en Centimes (1 MAD = 100 Centimes)** :
   - Élimination absolue des erreurs de virgule flottante JavaScript (`0.1 + 0.2`).
   - Prise en charge des unités fractionnaires (poids au 0.5 kg, 1 kg) et des variantes de contenance (bouteilles 250ml, 500ml, 1L, bidons 5L).
   - Validation stricte des plafonds de stock et des commandes minimales par ville marocaine.

3. **Internationalisation Trilingue avec RTL Authentique** :
   - Parité totale de 100% des clés entre le Français (`fr`), l'Anglais (`en`) et l'Arabe (`ar`).
   - Inversion bidirectionnelle native (`dir="rtl"`) avec typographie arabe adaptée.

4. **Design System Inspiré de Material Design 3** :
   - Cibles tactiles mobiles confortables conformes au standard MD3 (minimum 48 × 48 px).
   - Palette de couleurs nobles : Vert Forêt (`#315B3C`), Crème (`#F5F0DF`), Miel Doré (`#E7A84C`), Sauge Tendre (`#DDE7C8`), Terre Profonde (`#282E23`), Blanc Cassé (`#FFFCF5`).

5. **Expériences E-commerce Métier Riches** :
   - **Générateur de Paniers sur-mesure** (`/build-a-basket`) : composition interactive guidée avec barre de progression de fraîcheur.
   - **Liste de Courses Rapide** (`/shopping-list`) : saisie en vrac et conversion instantanée en panier.
   - **Tunnel de Commande Marocain Simulé** (`/checkout`) : sélection de villes (Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir, Meknès, Salé), validation stricte des numéros marocains (+212 / 06 / 07), créneaux de livraison.
   - **Suivi de Commande en Temps Réel** (`/order-tracking`) : timeline dynamique à 5 étapes.
   - **Espace Démo Administration Rénovée** (`/admin-demo`) : tableau de bord opérationnel, KPIs cohérents, édition des produits, gestion des stocks et réinitialisation instantanée.

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 20+ ou Docker
- npm 10+

### Installation Locale
```bash
# Cloner le dépôt officiel
git clone https://github.com/Ayman-Benchalh/bses-terroir-demo.git
cd bses-terroir-demo

# Installer les dépendances
npm install

# Lancer le serveur de développement local
npm run dev
# L'application est accessible sur http://localhost:3000
```

### Build de Production & Test Local
```bash
# Compiler le build optimisé standalone
npm run build

# Copier les assets statiques pour le runtime standalone
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

# Lancer le serveur de production sur le port 3103
PORT=3103 node .next/standalone/server.js
# Accessible sur http://localhost:3103
```

---

## 🐳 Déploiement Conteneurisé avec Docker

Le projet intègre un `Dockerfile` multi-stage haute sécurité et un fichier `compose.yaml` configuré selon les standards BSES :

```bash
# Construire et démarrer le conteneur en arrière-plan
docker compose up --build -d

# Vérifier la santé du conteneur (route /api/health)
curl http://localhost:3103/api/health

# Consulter les logs du conteneur
docker compose logs -f

# Arrêter le conteneur
docker compose down
```

- **Port Hôte** : `3103`
- **Port Conteneur** : `3000`
- **Utilisateur d'exécution** : `nextjs` (non-root UID 1001)

---

## 🧪 Stratégie de Test & Assurance Qualité

Le projet applique une suite de tests automatisés exhaustive via Playwright :
- **Tests Unitaires** : validation mathématique du pricing engine en centimes, conversion fractionnaire, et 100% de parité lexicale inter-langues.
- **Porte de Qualité Navigation Mobile** : tests de régression préventifs sur 6 largeurs d'écran critiques (`320px`, `360px`, `375px`, `390px`, `414px`, `430px`).
- **Tests Parcours Utilisateur E2E** : navigation boutique, filtres, sélection de variantes, tunnel de commande marocain et suivi en direct.
- **Audit Visuel Automatisé** : 20 captures d'écran pleine résolution archivées dans `tests/evidence/`.

```bash
# Exécuter les tests unitaires
npx playwright test tests/unit/

# Exécuter la suite complète de tests Playwright
npx playwright test
```

---

## 🏢 Contact & Attribution Studio

**BSES — Benchalh Solution E-commerce System**  
- **Email Officiel** : [Bses47113@gmail.com](mailto:Bses47113@gmail.com)  
- **WhatsApp Officiel** : [+212694991485](https://wa.me/212694991485)  
- **Dépôt GitHub** : [https://github.com/Ayman-Benchalh/bses-terroir-demo.git](https://github.com/Ayman-Benchalh/bses-terroir-demo.git)  

*TERROIR est une démonstration frontend haute fidélité créée exclusivement à des fins d'exposition portfolio et commerciale.*
