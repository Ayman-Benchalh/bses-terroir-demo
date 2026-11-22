# Moteur de Tarification Déterministe — TERROIR
> **Spécification Mathématique & Règles de Calcul en Centimes Entiers**

---

## 1. Problématique des Nombres à Virgule Flottante

En JavaScript standard, la représentation binaire IEEE 754 introduit des erreurs d'arrondi notables :
```javascript
0.1 + 0.2 === 0.30000000000000004 // true en JS natif
```
Dans une plateforme e-commerce gérant des quantités fractionnaires (ex. 1.5 kg d'oranges à 12 MAD/kg) ou des remises en pourcentage, de telles approximations conduisent à des incohérences de caisse, des totaux divergents entre le panier et la confirmation, ou des centimes fantômes.

---

## 2. Solution Implémentée : Arithmétique des Centimes

Dans TERROIR (`src/lib/pricingEngine.ts`), chaque transaction monétaire est rigoureusement convertie en entiers représentant les **centimes de Dirham marocain** :

$$1\text{ MAD} = 100\text{ Centimes}$$

### Fonctions Clés :
```typescript
export function toCentimes(amountMAD: number): number {
  return Math.round(amountMAD * 100);
}

export function toMAD(centimes: number): number {
  return centimes / 100;
}
```

---

## 3. Calcul de Ligne d'Article avec Variantes & Fractions

Lors du calcul d'une ligne d'article :
1. **Sélection du Tarif de Référence** :
   - Si une variante est sélectionnée (ex. huile d'argan flacon 500ml à 340 MAD), le prix unitaire est extrait de la variante.
   - Si le produit bénéficie d'une promotion active (`isPromo === true`), le `promoPrice` prévaut sur le prix de base.
2. **Multiplication Scalée** :
   $$\text{Ligne Total Centimes} = \operatorname{round}(\text{Prix Unitaire Centimes} \times \text{Quantité})$$
3. **Exemple** :
   - 2.5 kg de grenades à 22 MAD/kg :
     $$\text{Prix Centimes} = 2200$$
     $$\text{Total Centimes} = \operatorname{round}(2200 \times 2.5) = 5500\text{ Centimes} = 55.00\text{ MAD}$$

---

## 4. Calcul Global du Panier (`calculateCartTotals`)

```typescript
export interface CartTotals {
  subtotal: number;       // En MAD
  discountAmount: number; // En MAD
  deliveryFee: number;    // En MAD
  total: number;          // En MAD
  itemsCount: number;
  freeShippingApplied: boolean;
}
```

### Ordre d'Exécution :
1. **Sous-Total** : Somme des centimes de chaque article du panier.
2. **Remise** :
   - Code pourcentage : $\operatorname{round}(\text{Sous-Total Centimes} \times \frac{\text{Pourcentage}}{100})$
   - Code montant fixe : $\min(\text{Sous-Total Centimes}, \text{Montant Centimes})$
3. **Frais de Livraison** :
   - Si le sous-total dépasse le `freeDeliveryThreshold` de la ville (ex. 250 MAD à Casablanca), les frais deviennent `0 MAD`.
   - Si un code promo de type `free_shipping` est appliqué, les frais deviennent `0 MAD`.
   - Sinon, le tarif forfaitaire de la ville sélectionnée est appliqué (ex. 20 MAD pour Casablanca).
4. **Total Général** :
   $$\text{Total} = \max(0, \text{Sous-Total} - \text{Remise}) + \text{Frais de Livraison}$$
