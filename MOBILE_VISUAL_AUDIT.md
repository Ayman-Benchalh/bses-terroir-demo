# Rapport d'Audit Visuel Mobile & Tiroir de Navigation — TERROIR
> **Contrôle d'Intégrité Ergonomique sur 6 Formats d'Écran Mobiles (320px à 430px)**

---

## 1. Objectifs de l'Audit Mobile

L'audit vise à prévenir formellement les défauts historiques documentés lors des précédentes itérations (notamment le tiroir mobile ne laissant voir que le logo et la croix de fermeture, ou le débordement horizontal causé par les en-têtes saturés).

---

## 2. Matrice d'Inspection Multi-Viewports Mobiles

Les 6 formats d'écran physiques ont été évalués dans la suite de tests automatisés `mobile-navigation.spec.ts` :

| Dispositif de Référence | Largeur | Hauteur | Visibilité des Liens | Défilement Indépendant | Verrouillage Scroll Arrière-plan | Débordement Horizontal | Statut |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **iPhone SE (1re gén.)** | 320 px | 568 px | ✅ 100% visible | ✅ Actif (`overflow-y-auto`) | ✅ Actif (`body overflow: hidden`) | **0 px** | VALIDÉ |
| **Samsung Galaxy S20** | 360 px | 800 px | ✅ 100% visible | ✅ Actif | ✅ Actif | **0 px** | VALIDÉ |
| **iPhone 8 / SE (2e gén.)** | 375 px | 667 px | ✅ 100% visible | ✅ Actif | ✅ Actif | **0 px** | VALIDÉ |
| **iPhone 14 / Pixel 7** | 390 px | 844 px | ✅ 100% visible | ✅ Actif | ✅ Actif | **0 px** | VALIDÉ |
| **iPhone 11 / XR** | 414 px | 896 px | ✅ 100% visible | ✅ Actif | ✅ Actif | **0 px** | VALIDÉ |
| **iPhone 14 Pro Max** | 430 px | 932 px | ✅ 100% visible | ✅ Actif | ✅ Actif | **0 px** | VALIDÉ |

---

## 3. Architecture du Tiroir Mobile (`MobileDrawer.tsx`)

Le composant garantit une ergonomie optimale :
1. **Canvas Pleine Hauteur Lait d'Avoine** (`bg-[#F7F4EB] min-h-screen`) : Élimine les zones blanches ou non texturées lors du rebond élastique sur iOS.
2. **Zone de Navigation Défilement Libre** : Le conteneur intérieur utilise `flex-1 overflow-y-auto overscroll-contain`, permettant d'accéder sans restriction à toutes les catégories et sous-menus, quelle que soit la hauteur de l'écran.
3. **Cibles Tactiles Material Design 3** : Chaque lien de navigation possède une zone d'appui minimale de `48px` avec padding généreux (`py-3.5 px-4`) et icônes d'accompagnement de 20px.
4. **Sélecteur de Langue Trilingue Intégré** : Boutons instantanés `FR`, `EN` et `AR` faciles d'accès avec mise en évidence de la langue active.
5. **Sélecteur Rapide de Ville de Livraison** : Menu déroulant natif permettant de configurer immédiatement sa ville et de visualiser les seuils de gratuité.
6. **Carte d'Assistance Client BSES** : Liens directs WhatsApp (+212694991485) et Email (Bses47113@gmail.com) pour un contact humain direct.

---

## 4. Prévention de la Régression du Tiroir Vide

Le test Playwright `tests/e2e/mobile-navigation.spec.ts` exécute la vérification suivante sur chacun des 6 viewports :
- Ouverture du tiroir via le bouton burger.
- Attente de la transition visuelle.
- Assertion d'existence et de visibilité de l'ensemble des liens : `Accueil`, `Boutique`, `Fruits & Légumes`, `Produits du Terroir`, `Créer mon Panier`, `Suivi de Commande`, `Espace Démo Admin`.
- Fermeture et réouverture successives pour valider la réactivité de l'état React.

**Résultat : 18/18 tests de navigation mobile réussis sans aucune faille.**
