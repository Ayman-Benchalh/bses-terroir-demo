# Système de Design — TERROIR
> **Spécifications Visuelles, Tokens & Directives d'Interaction Material Design 3**

---

## 1. Palette de Couleurs Identitaire

La palette de TERROIR a été méticuleusement composée pour évoquer la richesse agricole marocaine : oliveraies du Nord, agrumes de Berkane, arganeraies du Souss et miels sauvages de l'Atlas.

| Nom du Token | Hexadécimal | Rôle & Usage | Ratio Contraste WCAG |
| :--- | :--- | :--- | :--- |
| **Forest Green** | `#315B3C` | Couleur primaire de marque, boutons principaux, en-têtes | AAA sur `#FFFFFF` / `#FFFCF5` |
| **Forest Hover** | `#264930` | État de survol des actions primaires | AAA |
| **Cream** | `#F5F0DF` | Fond des cartes secondaires, surfaces chaleureuses | AA |
| **Honey Gold** | `#E7A84C` | Accent secondaire, badges de mise en valeur, création panier | AA avec texte sombre `#282E23` |
| **Pale Sage** | `#DDE7C8` | Badges de fraîcheur, bordures subtiles, notifications | Lisible avec texte `#315B3C` |
| **Dark Earth** | `#282E23` | Texte principal, titres d'articles, widget démo BSES | AAA |
| **Off-White** | `#FFFCF5` | Arrière-plan global de l'application | Confort visuel optimal |
| **Card White** | `#FFFFFF` | Cartes produits, conteneurs de formulaire, modales | Confort visuel |

---

## 2. Typographie

### Polices Utilisées
- **Police d'Affichage Titres** : Segoe UI / Georgia / serif chaleureux avec graisses `700` et `800`.
- **Police d'Interface Texte** : Système Sans-Serif moderne (`system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`) garantissant un chargement instantané sans blocage réseau.
- **Police Arabe** : `Traditional Arabic`, `Noto Sans Arabic`, `Tahoma`, garantissant un rendu calligraphique fluide et des ligatures parfaites en mode RTL.

---

## 3. Échelle d'Espacement & Rythme MD3

Conformément aux préconisations de **Material Design 3**, l'échelle d'espacement repose sur une grille de base de 4px :

- `4px` (0.25rem) : Espacement micro, pastilles, badges.
- `8px` (0.5rem) : Gouttières internes d'icônes, étiquettes.
- `12px` (0.75rem) : Padding des champs de formulaire compacts.
- `16px` (1rem) : Padding standard des cartes, boutons.
- `20px` (1.25rem) : Séparations internes, espacements de listes.
- `24px` (1.5rem) : Gouttières de grille produit.
- `32px` (2rem) : Espacement entre sections de formulaire.
- `48px` (3rem) : Hauteur minimale des cibles tactiles mobiles.
- `64px` (4rem) : Espacement vertical des sections d'accueil.
- `80px` - `96px` : Marges supérieures de campagne éditoriale.

---

## 4. Règles d'Accessibilité & Cibles Tactiles

1. **Taille Minimale des Cibles Tactiles** : Tout élément cliquable sur mobile (boutons, sélecteurs de quantité, triggers de tiroir, liens de navigation) respecte une hauteur minimale de **48 × 48 px** de surface interactive.
2. **Indicateurs de Focus Visibles** : Anneaux de focus contrastés (`ring-2 ring-[#315B3C]/40`) sur l'ensemble des boutons et champs de saisie pour une navigation au clavier sans faille.
3. **Support RTL Bidirectionnel Intégral** : Les icônes directionnelles (`ChevronRight`, flèches de navigation) s'inversent dynamiquement en mode arabe pour respecter la lecture de droite à gauche.
