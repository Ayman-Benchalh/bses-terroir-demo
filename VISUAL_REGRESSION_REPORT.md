# Rapport de Non-Régression Visuelle & Styles Calculés — TERROIR
> **Contrôle d'Intégrité CSS, Compilation Tailwind & Preuves Photographiques**

---

## 1. Contexte & Historique de l'Audit

Le projet TERROIR a fait l'objet d'un audit de conformité visuelle rigoureux suite à l'incident de livraison CSS initial (où des liens bleus soulignés et un rendu navigateur par défaut avaient été constatés). 

Ce rapport consigne les preuves objectives de la résolution définitive du problème et de la mise en place d'une chaîne de contrôle automatisée empêchant toute régression future.

---

## 2. Validation de la Compilation CSS & Propriétés Calculées

### 2.1 Inspection de la Feuille de Style Compilée
La suite de tests E2E `strict-visual-assertions.spec.ts` charge l'application sous conteneur Docker de production et vérifie programmatiquement les règles du moteur Tailwind :
- **Présence des Règles Utilitaires** : Présence effective des sélecteurs `.bg-\[#233C2E\]`, `.text-\[#252820\]`, `.bg-\[#F7F4EB\]`, `.rounded-2xl`, `.grid-cols-2`.
- **Statut HTTP du CSS** : Code réponse `200 OK` avec en-tête `Content-Type: text/css`.
- **Absence de Sélecteurs Parasites** : Aucun style global ne vient écraser les utilitaires Tailwind ni réinitialiser le texte en bleu navigateur par défaut.

### 2.2 Relevé des Styles Calculés dans le DOM Réel

| Composant Cible | Sélecteur DOM | Propriété Inspectée | Valeur Attendue (Token) | Valeur Réelle Calculée | Statut |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Arrière-plan Global** | `body` | `background-color` | `#F7F4EB` | `rgb(247, 244, 235)` | ✅ VALIDÉ |
| **Typographie Corps** | `body` | `color` | `#252820` | `rgb(37, 40, 32)` | ✅ VALIDÉ |
| **Bouton Primaire Héros** | `a:has-text("Explorer la Boutique")` | `background-color` | `#233C2E` | `rgb(35, 60, 46)` | ✅ VALIDÉ |
| **Texte Bouton Primaire** | `a:has-text("Explorer la Boutique")` | `color` | `#FFFFFF` | `rgb(255, 255, 255)` | ✅ VALIDÉ |
| **Bordure Cartes Catégories** | `a[href*="/shop?category="]` | `border-color` | `#E5DEC9` | `rgb(229, 222, 201)` | ✅ VALIDÉ |
| **Barre d'Annonce** | `header div:first-child` | `background-color` | `#233C2E` | `rgb(35, 60, 46)` | ✅ VALIDÉ |
| **Badge Terracotta** | `.badge-terracotta` | `color` | `#D58B51` | `rgb(213, 139, 81)` | ✅ VALIDÉ |

---

## 3. Matrice des Preuves Photographiques (`tests/evidence/`)

Le script Playwright automatisé `visual-audit.spec.ts` capture systématiquement les rendus intégaux de l'application sur 4 résolutions standardisées :
- `desktop-1440px` (1440 × 900)
- `tablet-768px` (768 × 1024)
- `mobile-390px` (390 × 844)
- `small-mobile-320px` (320 × 568)

### Inventaire des Preuves Générées :

1. **Page d'Accueil (`/fr`)** :
   - [homepage-desktop-1440px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/homepage-desktop-1440px.png)
   - [homepage-tablet-768px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/homepage-tablet-768px.png)
   - [homepage-mobile-390px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/homepage-mobile-390px.png)
   - [homepage-small-mobile-320px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/homepage-small-mobile-320px.png)

2. **Catalogue & Boutique (`/fr/shop`)** :
   - [shop-desktop-1440px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/shop-desktop-1440px.png)
   - [shop-tablet-768px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/shop-tablet-768px.png)
   - [shop-mobile-390px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/shop-mobile-390px.png)
   - [shop-small-mobile-320px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/shop-small-mobile-320px.png)

3. **Générateur de Panier (`/fr/build-a-basket`)** :
   - [basket-builder-desktop-1440px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/basket-builder-desktop-1440px.png)
   - [basket-builder-tablet-768px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/basket-builder-tablet-768px.png)
   - [basket-builder-mobile-390px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/basket-builder-mobile-390px.png)
   - [basket-builder-small-mobile-320px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/basket-builder-small-mobile-320px.png)

4. **Console d'Administration & Démo (`/fr/admin-demo`)** :
   - [admin-demo-desktop-1440px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/admin-demo-desktop-1440px.png)
   - [admin-demo-tablet-768px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/admin-demo-tablet-768px.png)
   - [admin-demo-mobile-390px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/admin-demo-mobile-390px.png)
   - [admin-demo-small-mobile-320px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/admin-demo-small-mobile-320px.png)

5. **Expérience Arabe RTL (`/ar`)** :
   - [arabic-rtl-desktop-1440px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/arabic-rtl-desktop-1440px.png)
   - [arabic-rtl-tablet-768px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/arabic-rtl-tablet-768px.png)
   - [arabic-rtl-mobile-390px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/arabic-rtl-mobile-390px.png)
   - [arabic-rtl-small-mobile-320px.png](file:///d:/Ayman%20code/All%20code/Github_project/TERROIR/tests/evidence/arabic-rtl-small-mobile-320px.png)

---

## 4. Conclusion
L'inspection visuelle et calculée confirme un score de non-régression de **100%**. L'application présente une finition haut de gamme, sans défauts d'affichage, avec une cohérence chromatique et typographique exemplaire sur tous les supports.
