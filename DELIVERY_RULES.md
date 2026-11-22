# Règles de Livraison Régionales — TERROIR
> **Logistique Urbaine & Zones Marocaines Desservies**

---

## 1. Matrice des 8 Grandes Villes Marocaines

TERROIR dessert les principaux pôles urbains du Royaume avec des règles tarifaires et logistiques adaptées aux distances et aux coopératives productrices régionales :

| Ville & Zone | Frais Forfaitaires | Commande Minimale | Seuil Livraison Gratuite | Délai Estimé | Créneaux Disponibles |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Casablanca** (Grand Casablanca) | 20 MAD | 100 MAD | 250 MAD | 2h - 4h | Matin, Après-midi, Soir |
| **Rabat & Agdal** | 20 MAD | 100 MAD | 250 MAD | 2h - 4h | Matin, Après-midi, Soir |
| **Salé & Marina** | 20 MAD | 100 MAD | 250 MAD | 3h - 5h | Matin, Après-midi |
| **Marrakech** (Guéliz, Hivernage) | 25 MAD | 120 MAD | 300 MAD | 3h - 5h | Matin, Après-midi, Soir |
| **Fès** (Ville Nouvelle, Médina) | 25 MAD | 120 MAD | 300 MAD | 4h - 6h | Matin, Après-midi |
| **Meknès** (Hamria, Al Bassatine) | 25 MAD | 120 MAD | 300 MAD | 4h - 6h | Matin, Après-midi |
| **Tanger** (Malabata, Centre, Baie) | 30 MAD | 150 MAD | 350 MAD | 4h - 6h | Matin, Après-midi |
| **Agadir** (Baie, Founty, Sonaba) | 30 MAD | 150 MAD | 350 MAD | 4h - 6h | Matin, Après-midi |

---

## 2. Règles Métier de Livraison

1. **Commande Minimale Obligatoire** : Le tunnel de commande (`/checkout`) bloque la soumission si le sous-total d'achats est inférieur au seuil fixé pour la ville du client (ex. 100 MAD pour Casablanca, 150 MAD pour Tanger).
2. **Franchise de Port Automatique** : Dès que le montant du panier atteint le seuil de gratuité de la ville, les frais de livraison s'annulent automatiquement sans nécessiter de code promotionnel.
3. **Sélection de Créneau Horaire** : Le client choisit son créneau parmi les options disponibles selon la ville :
   - *Matin* : 09h00 - 13h00
   - *Après-midi* : 14h00 - 18h00
   - *Soir* : 18h00 - 21h00
