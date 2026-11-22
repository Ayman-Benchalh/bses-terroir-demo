# Rapport de Sécurité Applicative — TERROIR
> **Défense en Profondeur, Assainissement & Frontières du Bac à Sable**

---

## 1. Principe de Cloisonnement du Bac à Sable

TERROIR est une application de démonstration interactive de haute fidélité. Elle n'intègre **aucune passerelle de paiement en direct**, **aucun traitement réel de cartes bancaires**, et **aucune base de données transactionnelle distante**.

Toutes les actions utilisateur (ajout au panier, simulation de commande, modification d'inventaire dans la console admin) s'exécutent strictement à l'intérieur du bac à sable du navigateur (`localStorage`), garantissant :
- L'absence de collecte ou de fuite de données personnelles réelles.
- L'isolation complète entre différentes sessions de navigation.
- La possibilité de restaurer les données d'origine à tout moment.

---

## 2. Validation Stricte des Entrées via Zod

Le formulaire de commande marocaine (`src/components/checkout/CheckoutForm.tsx`) utilise un schéma de validation strict empêchant la soumission de données invalides :

```typescript
const checkoutSchema = z.object({
  fullName: z.string().min(3).max(80),
  phone: z.string().regex(/^(?:\+212|0)([5-7]\d{8})$/),
  address: z.string().min(5).max(180),
  city: z.string().min(2),
  deliverySlot: z.string().min(3),
  notes: z.string().max(300).optional(),
});
```
- Le numéro de téléphone marocain est validé par regex pour correspondre aux préfixes mobiles et fixes du Royaume (+212 ou 0 suivi de 6, 7 ou 5).

---

## 3. Sécurité des En-têtes & Prévention XSS

1. **Rendu React & Échappement Natif** : Tous les contenus dynamiques (noms de produits, régions, notes de commande) sont rendus via JSX, assurant un échappement HTML automatique contre les injections XSS.
2. **Exclusion des `eval()` ou scripts arbitraires** : L'injection synchrone de la direction RTL dans le `<head>` de `RootLayout` utilise un script inline minifié strict sans dépendances externes.
3. **Conteneurisation Docker Sécurisée** :
   - Exécution sous utilisateur non-privilégié (`nextjs:nodejs`, UID 1001).
   - Image alpine minimale sans outils de compilation dans la phase finale d'exécution.
