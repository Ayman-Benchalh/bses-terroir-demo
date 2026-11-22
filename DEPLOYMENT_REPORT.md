# Rapport de Déploiement & Configuration Runtime — TERROIR
> **Standards de Conteneurisation Docker & Déploiement Vercel**

---

## 1. Architecture du Déploiement Docker

### Fichiers Définis :
- `Dockerfile` : Multi-stage build (Base → Deps → Builder → Runner) utilisant `node:20-alpine`.
- `compose.yaml` : Déclaration de service avec mapping de ports `3103:3000`, environnement de production et healthcheck actif.
- `.dockerignore` : Filtrage strict du contexte de build pour minimiser l'empreinte de l'image.
- `.env.example` : Modèle de configuration d'environnement.

### Caractéristiques Runtime :
- **Taille de l'image** : Optimisée grâce au mode `standalone` de Next.js (seuls les fichiers JS nécessaires et les assets statiques sont copiés).
- **Port d'écoute Conteneur** : `3000`
- **Port d'accès Hôte** : `3103`
- **Sonde de Vitalité (Healthcheck)** :
  ```
  GET http://127.0.0.1:3000/api/health
  Intervalle : 15s | Timeout : 5s | Retries : 3
  ```

---

## 2. Déploiement Vercel (Production)

L'application est 100% compatible avec le déploiement natif Next.js sur **Vercel** :
- **Framework Preset** : `Next.js`
- **Build Command** : `npm run build`
- **Output Directory** : `.next`
- **Node.js Version** : `20.x`
- **Variables d'Environnement Recommandées** :
  - `NEXT_PUBLIC_APP_URL` : URL de production Vercel
  - `NEXT_PUBLIC_STUDIO_NAME` : `BSES — Benchalh Solution E-commerce System`
  - `NEXT_PUBLIC_STUDIO_EMAIL` : `Bses47113@gmail.com`
  - `NEXT_PUBLIC_STUDIO_WHATSAPP` : `+212694991485`
