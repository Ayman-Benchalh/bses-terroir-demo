# Audit de la Navigation Mobile — TERROIR
> **Prévention des Régressions et Validation Multi-Écrans**

---

## 1. Contexte & Historique des Risques (Retour d'Expérience VELORA / LUMÉA)

Les projets de démonstration précédents ont mis en évidence un écueil récurrent :
- Le tiroir mobile s'ouvrait avec seulement le logo et l'icône de fermeture visibles.
- Les liens de navigation étaient masqués par des problèmes de `z-index`, de débordement (`overflow: hidden`), de hauteur non calculée ou de conflits de contexte d'empilement.

---

## 2. Solutions Techniques Appliquées dans TERROIR

1. **Conteneur Pleine Hauteur avec Scroll Indépendant** :
   - Hauteur dynamique `h-[100dvh]` prenant en compte les barres de navigation des navigateurs mobiles iOS et Android.
   - `overflow-y-auto` sur le corps du tiroir pour garantir le défilement complet des 9 liens de navigation et du sélecteur de langue.
2. **Contexte d'Empilement Isolé** :
   - Le tiroir utilise `fixed inset-0 z-[100]` avec un fond semi-transparent flouté (`bg-black/60 backdrop-blur-xs`).
   - L'en-tête principal utilise `sticky top-0 z-50` évitant toute collision avec les images du flux principal.
3. **Gestion Rigoureuse du Focus & Clavier** :
   - Écoute de la touche Échap (`Escape`) pour fermeture immédiate.
   - Blocage du défilement du document d'arrière-plan (`document.body.style.overflow = 'hidden'`) lors de l'ouverture et restauration propre lors de la fermeture.
4. **Verrouillage des Effets de Route** :
   - Comparaison explicite du chemin précédent (`prevPathname.current !== pathname`) pour fermer le tiroir uniquement lors d'une véritable navigation, évitant les fermetures prématurées au montage.

---

## 3. Matrice de Validation par Largeur d'Écran

| Largeur | Hauteur | Dispositif Référence | Résultat Visibilité Liens | Résultat Fermeture Échap / Croix |
| :--- | :--- | :--- | :--- | :--- |
| **320 px** | 568 px | iPhone SE (1re génération) | Conforme (100% visible) | Conforme |
| **360 px** | 800 px | Samsung Galaxy S20 | Conforme (100% visible) | Conforme |
| **375 px** | 667 px | iPhone 8 / SE 2020 | Conforme (100% visible) | Conforme |
| **390 px** | 844 px | iPhone 14 / Pixel 7 | Conforme (100% visible) | Conforme |
| **414 px** | 896 px | iPhone 11 / XR | Conforme (100% visible) | Conforme |
| **430 px** | 932 px | iPhone 14 Pro Max | Conforme (100% visible) | Conforme |
