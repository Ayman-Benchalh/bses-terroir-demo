# Rapport de Déploiement & Configuration Runtime — TERROIR
> **Standards de Conteneurisation Docker, Validation d'Exécution & Déploiement Vercel**

---

## 1. Architecture du Déploiement Docker

### Fichiers de Déploiement :
- `Dockerfile` : Multi-stage build (Base → Deps → Builder → Runner) utilisant l'image officielle sécurisée `node:20-alpine`.
- `compose.yaml` : Déclaration de service avec mapping de ports `3103:3000`, environnement de production et sonde de santé active.
- `.dockerignore` : Filtrage strict du contexte de build pour minimiser l'empreinte de l'image (exclusion de `node_modules`, `.next`, `test-results`, etc.).
- `.env.example` : Modèle documenté des variables d'environnement.

### Spécifications & Performance Runtime :
- **Mode Standalone Next.js** : Compilation optimisée isolant le serveur Node minimal et les dépendances nécessaires dans `.next/standalone`.
- **Utilisateur Système Dédié** : Exécution sous l'utilisateur non-root `nextjs:nodejs` (UID/GID 1001) pour une sécurité maximale en conteneur.
- **Port d'Écoute Interne** : `3000`
- **Port Mappé sur l'Hôte** : `3103` (URL d'accès : `http://localhost:3103`)
- **Sonde de Vitalité (Healthcheck)** :
  ```yaml
  test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://127.0.0.1:3000/api/health"]
  interval: 15s
  timeout: 5s
  retries: 3
  start_period: 10s
  ```

### Vérification de la Sonde de Vitalité (`/api/health`) :
```json
{
  "status": "ok",
  "app": "bses-terroir-demo",
  "studio": "BSES — Benchalh Solution E-commerce System",
  "timestamp": "2026-11-22T22:35:47.380Z",
  "locales": ["fr", "en", "ar"],
  "productsCount": 50
}
```

---

## 2. Déploiement Vercel (Production Cloud)

L'application est conçue pour un déploiement continu fluide sur **Vercel** :
- **URL Publique de Démonstration** : `https://bses-terroir-demo.vercel.app/fr`
- **Dépôt Git Officiel** : `https://github.com/Ayman-Benchalh/bses-terroir-demo.git`
- **Branche de Production** : `main`
- **Framework Preset Vercel** : `Next.js`
- **Commande de Build** : `npm run build`
- **Dossier de Sortie** : `.next`
- **Runtime Node.js** : `Node.js 20.x`
- **Variables d'Environnement Configurées** :
  - `NEXT_PUBLIC_APP_URL` : `https://bses-terroir-demo.vercel.app`
  - `NEXT_PUBLIC_STUDIO_NAME` : `BSES — Benchalh Solution E-commerce System`
  - `NEXT_PUBLIC_STUDIO_EMAIL` : `Bses47113@gmail.com`
  - `NEXT_PUBLIC_STUDIO_WHATSAPP` : `+212694991485`

---

## 3. Guide de Reproduction Locale

Pour démarrer et tester localement l'application sous Docker :

```bash
# 1. Cloner le dépôt officiel
git clone https://github.com/Ayman-Benchalh/bses-terroir-demo.git
cd bses-terroir-demo

# 2. Construire et lancer le conteneur en arrière-plan
docker compose build
docker compose up -d

# 3. Accéder à l'application
# URL : http://localhost:3103/fr
# Sonde : http://localhost:3103/api/health
```
