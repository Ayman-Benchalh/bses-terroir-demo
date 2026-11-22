'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import {
  CartItem,
  DeliveryZone,
  Order,
  OrderCustomer,
  OrderStatus,
  Product,
  Promotion,
  ShoppingList,
  StoreState,
} from '@/lib/types';
import {
  calculateCartTotals,
  calculateItemPrice,
  validateQuantity,
  CartTotalsResult,
} from '@/lib/pricingEngine';
import {
  loadStoreState,
  saveStoreState,
  resetStoreState,
  STORAGE_KEY,
} from '@/lib/storage';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  text: string;
}

interface StoreContextType {
  state: StoreState;
  isHydrated: boolean;
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
  showToast: (text: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  // Cart
  cartCount: number;
  cartTotals: CartTotalsResult;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  addToCart: (product: Product, quantity?: number, variantId?: string) => { success: boolean; message: string };
  updateCartQuantity: (itemId: string, newQuantity: number) => { success: boolean; message?: string };
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  // Wishlist
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  // City & Promo
  selectedCity: string;
  setSelectedCity: (cityKey: string) => void;
  currentDeliveryZone: DeliveryZone | null;
  activePromo: Promotion | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  // Shopping Lists
  createShoppingList: (name: string) => ShoppingList;
  deleteShoppingList: (listId: string) => void;
  renameShoppingList: (listId: string, newName: string) => void;
  addProductToShoppingList: (listId: string, productId: string, quantity?: number) => void;
  removeProductFromShoppingList: (listId: string, productId: string) => void;
  addShoppingListToCart: (listId: string) => { addedCount: number; outOfStockCount: number };
  // Basket Builder
  addBasketToCart: (
    items: { productId: string; quantity: number }[],
    bundleName?: string,
    bundleDiscountPercent?: number
  ) => { success: boolean; message: string };
  // Order Placement
  placeOrder: (
    customer: OrderCustomer,
    deliverySlot: string
  ) => { success: boolean; order?: Order; error?: string };
  // Admin Operations
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (productId: string, newStock: number, variantId?: string) => void;
  updateDeliveryZone: (id: string, updates: Partial<DeliveryZone>) => void;
  updatePromotion: (id: string, updates: Partial<Promotion>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  resetToSeedData: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>(loadStoreState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Safe SSR Hydration + Cross-Tab Synchronization
  useEffect(() => {
    const loaded = loadStoreState();
    setState(loaded);
    setIsHydrated(true);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          setState(updated);
        } catch (err) {
          console.error('[TERROIR] Failed to parse cross-tab storage sync:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync state changes to localStorage
  const updateState = useCallback((updater: (prev: StoreState) => StoreState) => {
    setState((prev) => {
      const next = updater(prev);
      saveStoreState(next);
      return next;
    });
  }, []);

  // Toast notifications
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((text: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  // Derived current delivery zone
  const currentDeliveryZone = useMemo(() => {
    return state.deliveryZones.find((z) => z.cityKey === state.selectedCity) || null;
  }, [state.deliveryZones, state.selectedCity]);

  // Derived active promo
  const activePromo = useMemo(() => {
    if (!state.activePromoCode) return null;
    return (
      state.promotions.find(
        (p) => p.code.toUpperCase() === state.activePromoCode?.toUpperCase() && p.isActive
      ) || null
    );
  }, [state.promotions, state.activePromoCode]);

  // Derived cart totals with deterministic pricing engine
  const cartTotals = useMemo(() => {
    return calculateCartTotals(state.cart, activePromo, currentDeliveryZone);
  }, [state.cart, activePromo, currentDeliveryZone]);

  const cartCount = useMemo(() => {
    return state.cart.reduce((sum, item) => sum + (item.quantity > 0 ? 1 : 0), 0);
  }, [state.cart]);

  // Cart operations
  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const addToCart = useCallback(
    (product: Product, quantity?: number, variantId?: string): { success: boolean; message: string } => {
      const liveProduct = state.products.find((p) => p.id === product.id) || product;
      const desiredQty = quantity !== undefined ? quantity : (liveProduct.unitStep || 1);
      const itemId = variantId ? `${liveProduct.id}_${variantId}` : liveProduct.id;

      const existingItem = state.cart.find((item) => item.id === itemId);
      const currentCartQty = existingItem ? existingItem.quantity : 0;

      const validation = validateQuantity(liveProduct, desiredQty, currentCartQty, variantId);
      if (!validation.isValid && validation.adjustedQuantity <= 0) {
        showToast(validation.error || 'Quantité non disponible.', 'warning');
        return { success: false, message: validation.error || 'Erreur stock' };
      }

      const addAmount = validation.adjustedQuantity;
      const totalNewQuantity = currentCartQty + addAmount;

      let variantObj = undefined;
      if (variantId && liveProduct.variants) {
        variantObj = liveProduct.variants.find((v) => v.id === variantId);
      }

      const pricing = calculateItemPrice(liveProduct, totalNewQuantity, variantId);

      updateState((prev) => {
        const itemIndex = prev.cart.findIndex((item) => item.id === itemId);
        let updatedCart = [...prev.cart];

        if (itemIndex > -1) {
          updatedCart[itemIndex] = {
            ...updatedCart[itemIndex],
            quantity: totalNewQuantity,
            unitPrice: pricing.unitPrice,
            lineTotal: pricing.lineTotal,
          };
        } else {
          const newItem: CartItem = {
            id: itemId,
            productId: liveProduct.id,
            product: liveProduct,
            quantity: totalNewQuantity,
            selectedVariantId: variantId,
            selectedVariantName: variantObj?.name,
            unitPrice: pricing.unitPrice,
            lineTotal: pricing.lineTotal,
          };
          updatedCart.push(newItem);
        }

        return {
          ...prev,
          cart: updatedCart,
        };
      });

      showToast(`${liveProduct.name.fr} ajouté au panier !`, 'success');
      return { success: true, message: 'Ajouté au panier' };
    },
    [state.products, state.cart, showToast, updateState]
  );

  const updateCartQuantity = useCallback(
    (itemId: string, newQuantity: number): { success: boolean; message?: string } => {
      if (newQuantity <= 0) {
        removeFromCart(itemId);
        return { success: true };
      }

      const existingItem = state.cart.find((item) => item.id === itemId);
      if (!existingItem) return { success: false, message: 'Article introuvable' };

      const liveProduct = state.products.find((p) => p.id === existingItem.productId);
      if (!liveProduct) return { success: false, message: 'Produit introuvable' };

      const validation = validateQuantity(liveProduct, newQuantity, 0, existingItem.selectedVariantId);
      if (!validation.isValid && validation.adjustedQuantity <= 0) {
        showToast(validation.error || 'Stock insuffisant', 'warning');
        return { success: false, message: validation.error };
      }

      const finalQty = validation.isValid ? newQuantity : validation.adjustedQuantity;
      const pricing = calculateItemPrice(liveProduct, finalQty, existingItem.selectedVariantId);

      updateState((prev) => ({
        ...prev,
        cart: prev.cart.map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: finalQty,
                unitPrice: pricing.unitPrice,
                lineTotal: pricing.lineTotal,
              }
            : item
        ),
      }));

      return { success: true };
    },
    [state.cart, state.products, showToast, updateState]
  );

  const removeFromCart = useCallback((itemId: string) => {
    updateState((prev) => ({
      ...prev,
      cart: prev.cart.filter((item) => item.id !== itemId),
    }));
    showToast('Article retiré du panier.', 'info');
  }, [updateState, showToast]);

  const clearCart = useCallback(() => {
    updateState((prev) => ({
      ...prev,
      cart: [],
      activePromoCode: null,
    }));
  }, [updateState]);

  // Wishlist operations
  const toggleWishlist = useCallback((productId: string) => {
    updateState((prev) => {
      const exists = prev.wishlist.includes(productId);
      const nextWishlist = exists
        ? prev.wishlist.filter((id) => id !== productId)
        : [...prev.wishlist, productId];

      return {
        ...prev,
        wishlist: nextWishlist,
      };
    });
  }, [updateState]);

  const isWishlisted = useCallback((productId: string) => {
    return state.wishlist.includes(productId);
  }, [state.wishlist]);

  // City & Promo operations
  const setSelectedCity = useCallback((cityKey: string) => {
    updateState((prev) => ({
      ...prev,
      selectedCity: cityKey,
    }));
  }, [updateState]);

  const applyPromoCode = useCallback(
    (code: string): { success: boolean; message: string } => {
      const cleanCode = code.trim().toUpperCase();
      const promo = state.promotions.find(
        (p) => p.code.toUpperCase() === cleanCode && p.isActive
      );

      if (!promo) {
        showToast('Code promotionnel invalide ou expiré.', 'error');
        return { success: false, message: 'Code promotionnel invalide ou expiré.' };
      }

      const subtotal = state.cart.reduce((sum, item) => sum + item.lineTotal, 0);
      if (subtotal < promo.minOrder) {
        const msg = `Commande minimale de ${promo.minOrder} MAD requise pour utiliser ce code.`;
        showToast(msg, 'warning');
        return { success: false, message: msg };
      }

      updateState((prev) => ({
        ...prev,
        activePromoCode: promo.code,
      }));

      showToast(`Code ${promo.code} appliqué avec succès !`, 'success');
      return { success: true, message: 'Code appliqué !' };
    },
    [state.promotions, state.cart, showToast, updateState]
  );

  const removePromoCode = useCallback(() => {
    updateState((prev) => ({
      ...prev,
      activePromoCode: null,
    }));
    showToast('Code promo retiré.', 'info');
  }, [updateState, showToast]);

  // Shopping List operations
  const createShoppingList = useCallback((name: string): ShoppingList => {
    const newList: ShoppingList = {
      id: `list-${Date.now()}`,
      name: name.trim() || 'Ma Liste de Courses',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: [],
    };

    updateState((prev) => ({
      ...prev,
      shoppingLists: [newList, ...prev.shoppingLists],
    }));

    showToast(`Liste "${newList.name}" créée !`, 'success');
    return newList;
  }, [updateState, showToast]);

  const deleteShoppingList = useCallback((listId: string) => {
    updateState((prev) => ({
      ...prev,
      shoppingLists: prev.shoppingLists.filter((l) => l.id !== listId),
    }));
    showToast('Liste de courses supprimée.', 'info');
  }, [updateState, showToast]);

  const renameShoppingList = useCallback((listId: string, newName: string) => {
    updateState((prev) => ({
      ...prev,
      shoppingLists: prev.shoppingLists.map((l) =>
        l.id === listId
          ? { ...l, name: newName.trim(), updatedAt: new Date().toISOString() }
          : l
      ),
    }));
  }, [updateState]);

  const addProductToShoppingList = useCallback(
    (listId: string, productId: string, quantity: number = 1) => {
      updateState((prev) => ({
        ...prev,
        shoppingLists: prev.shoppingLists.map((l) => {
          if (l.id !== listId) return l;
          const existingItemIndex = l.items.findIndex((item) => item.productId === productId);
          let nextItems = [...l.items];
          if (existingItemIndex > -1) {
            nextItems[existingItemIndex] = {
              ...nextItems[existingItemIndex],
              quantity: nextItems[existingItemIndex].quantity + quantity,
            };
          } else {
            nextItems.push({ productId, quantity });
          }
          return {
            ...l,
            items: nextItems,
            updatedAt: new Date().toISOString(),
          };
        }),
      }));
      showToast('Produit ajouté à votre liste de courses.', 'success');
    },
    [updateState, showToast]
  );

  const removeProductFromShoppingList = useCallback((listId: string, productId: string) => {
    updateState((prev) => ({
      ...prev,
      shoppingLists: prev.shoppingLists.map((l) =>
        l.id === listId
          ? {
              ...l,
              items: l.items.filter((item) => item.productId !== productId),
              updatedAt: new Date().toISOString(),
            }
          : l
      ),
    }));
  }, [updateState]);

  const addShoppingListToCart = useCallback(
    (listId: string): { addedCount: number; outOfStockCount: number } => {
      const targetList = state.shoppingLists.find((l) => l.id === listId);
      if (!targetList || targetList.items.length === 0) {
        return { addedCount: 0, outOfStockCount: 0 };
      }

      let added = 0;
      let outOfStock = 0;

      for (const item of targetList.items) {
        const product = state.products.find((p) => p.id === item.productId);
        if (product && product.inStock && product.stockQuantity >= item.quantity) {
          addToCart(product, item.quantity);
          added++;
        } else {
          outOfStock++;
        }
      }

      if (outOfStock > 0) {
        showToast(
          `${added} article(s) ajouté(s). ${outOfStock} article(s) non disponible(s).`,
          'warning'
        );
      } else {
        showToast(`${added} article(s) ajouté(s) directement au panier !`, 'success');
      }

      return { addedCount: added, outOfStockCount: outOfStock };
    },
    [state.shoppingLists, state.products, addToCart, showToast]
  );

  // Basket Builder operations
  const addBasketToCart = useCallback(
    (
      items: { productId: string; quantity: number }[],
      bundleName: string = 'Panier Personnalisé',
      bundleDiscountPercent: number = 10
    ): { success: boolean; message: string } => {
      if (items.length === 0) {
        showToast('Veuillez sélectionner au moins un article pour votre panier.', 'warning');
        return { success: false, message: 'Panier vide' };
      }

      // Check stock for all items before committing
      for (const item of items) {
        const product = state.products.find((p) => p.id === item.productId);
        if (!product || !product.inStock || product.stockQuantity < item.quantity) {
          const name = product ? product.name.fr : 'Un produit';
          const msg = `Stock insuffisant pour ${name}.`;
          showToast(msg, 'error');
          return { success: false, message: msg };
        }
      }

      // Add each item to cart
      for (const item of items) {
        const product = state.products.find((p) => p.id === item.productId)!;
        addToCart(product, item.quantity);
      }

      showToast(`Le ${bundleName} a été ajouté au panier avec sa remise !`, 'success');
      return { success: true, message: 'Panier ajouté' };
    },
    [state.products, addToCart, showToast]
  );

  // Place Order Simulation
  const placeOrder = useCallback(
    (customer: OrderCustomer, deliverySlot: string): { success: boolean; order?: Order; error?: string } => {
      if (state.cart.length === 0) {
        return { success: false, error: 'Votre panier est vide.' };
      }

      // Revalidate stock
      for (const item of state.cart) {
        const live = state.products.find((p) => p.id === item.productId);
        if (!live || !live.inStock || live.stockQuantity < item.quantity) {
          return {
            success: false,
            error: `Le produit "${item.product.name.fr}" n'a plus assez de stock.`,
          };
        }
      }

      // Compute order details
      const totals = calculateCartTotals(state.cart, activePromo, currentDeliveryZone);
      if (!totals.isEligibleForDelivery) {
        return {
          success: false,
          error: totals.deliveryError || 'Conditions de livraison non remplies.',
        };
      }

      const orderNumber = `CMD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date().toISOString();

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        createdAt: now,
        customer,
        items: [...state.cart],
        subtotal: totals.subtotal,
        discountTotal: totals.discount,
        appliedPromoCode: activePromo?.code,
        deliveryFee: totals.deliveryFee,
        total: totals.total,
        paymentMethod: 'cod',
        status: 'received',
        deliverySlot,
        statusHistory: [
          {
            status: 'received',
            timestamp: now,
            note: 'Commande simulée enregistrée avec succès.',
          },
        ],
      };

      // Decrement stock for ordered items
      updateState((prev) => {
        const updatedProducts = prev.products.map((p) => {
          const cartItem = prev.cart.find((item) => item.productId === p.id);
          if (!cartItem) return p;
          const remainingStock = Math.max(0, p.stockQuantity - cartItem.quantity);
          return {
            ...p,
            stockQuantity: remainingStock,
            inStock: remainingStock > 0,
          };
        });

        return {
          ...prev,
          products: updatedProducts,
          cart: [],
          activePromoCode: null,
          orders: [newOrder, ...prev.orders],
        };
      });

      return { success: true, order: newOrder };
    },
    [state.cart, state.products, activePromo, currentDeliveryZone, updateState]
  );

  // Admin Operations
  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const id = `prod-custom-${Date.now()}`;
    const fullProduct: Product = { ...product, id };
    updateState((prev) => ({
      ...prev,
      products: [fullProduct, ...prev.products],
    }));
    showToast(`Produit "${product.name.fr}" ajouté !`, 'success');
  }, [updateState, showToast]);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    updateState((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
    showToast('Produit mis à jour.', 'success');
  }, [updateState, showToast]);

  const deleteProduct = useCallback((id: string) => {
    updateState((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
      cart: prev.cart.filter((item) => item.productId !== id),
    }));
    showToast('Produit supprimé.', 'info');
  }, [updateState, showToast]);

  const updateStock = useCallback((productId: string, newStock: number, variantId?: string) => {
    updateState((prev) => ({
      ...prev,
      products: prev.products.map((p) => {
        if (p.id !== productId) return p;
        if (variantId && p.variants) {
          const updatedVariants = p.variants.map((v) =>
            v.id === variantId ? { ...v, stock: Math.max(0, newStock) } : v
          );
          return {
            ...p,
            variants: updatedVariants,
          };
        }
        const cleanStock = Math.max(0, newStock);
        return {
          ...p,
          stockQuantity: cleanStock,
          inStock: cleanStock > 0,
        };
      }),
    }));
    showToast('Stock mis à jour en direct.', 'success');
  }, [updateState, showToast]);

  const updateDeliveryZone = useCallback((id: string, updates: Partial<DeliveryZone>) => {
    updateState((prev) => ({
      ...prev,
      deliveryZones: prev.deliveryZones.map((z) => (z.id === id ? { ...z, ...updates } : z)),
    }));
    showToast('Zone de livraison mise à jour.', 'success');
  }, [updateState, showToast]);

  const updatePromotion = useCallback((id: string, updates: Partial<Promotion>) => {
    updateState((prev) => ({
      ...prev,
      promotions: prev.promotions.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
    showToast('Promotion mise à jour.', 'success');
  }, [updateState, showToast]);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus, note?: string) => {
    const now = new Date().toISOString();
    updateState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          status,
          statusHistory: [
            ...o.statusHistory,
            {
              status,
              timestamp: now,
              note: note || `Statut mis à jour vers: ${status}`,
            },
          ],
        };
      }),
    }));
    showToast(`Statut de la commande mis à jour : ${status}`, 'success');
  }, [updateState, showToast]);

  const resetToSeedData = useCallback(() => {
    const fresh = resetStoreState();
    setState(fresh);
    showToast('Données réinitialisées aux valeurs d’origine.', 'info');
  }, [showToast]);

  return (
    <StoreContext.Provider
      value={{
        state,
        isHydrated,
        toasts,
        removeToast,
        showToast,
        cartCount,
        cartTotals,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted,
        selectedCity: state.selectedCity,
        setSelectedCity,
        currentDeliveryZone,
        activePromo,
        applyPromoCode,
        removePromoCode,
        createShoppingList,
        deleteShoppingList,
        renameShoppingList,
        addProductToShoppingList,
        removeProductFromShoppingList,
        addShoppingListToCart,
        addBasketToCart,
        placeOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        updateDeliveryZone,
        updatePromotion,
        updateOrderStatus,
        resetToSeedData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
