'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ListTodo,
  Plus,
  Trash2,
  ShoppingBag,
  Check,
  AlertTriangle,
  FolderPlus,
} from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { Modal } from '@/components/ui/Modal';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { formatCurrencyMAD, cn } from '@/lib/utils';

export function ShoppingListManager() {
  const { locale, t } = useLocale();
  const {
    state,
    createShoppingList,
    deleteShoppingList,
    addProductToShoppingList,
    removeProductFromShoppingList,
    addShoppingListToCart,
    showToast,
  } = useStore();

  const [activeListId, setActiveListId] = useState<string>(
    state.shoppingLists.length > 0 ? state.shoppingLists[0].id : ''
  );
  const [newListName, setNewListName] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  const activeList = state.shoppingLists.find((l) => l.id === activeListId) || state.shoppingLists[0];

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListName.trim()) {
      const created = createShoppingList(newListName.trim());
      setActiveListId(created.id);
      setNewListName('');
      setIsCreateModalOpen(false);
    }
  };

  const handleAddProduct = (productId: string) => {
    if (!activeList) return;
    addProductToShoppingList(activeList.id, productId, 1);
    setIsAddProductModalOpen(false);
  };

  // Calculate list estimated total & availability
  let listEstimatedTotal = 0;
  let allAvailable = true;

  const resolvedItems = (activeList?.items || []).map((item) => {
    const product = state.products.find((p) => p.id === item.productId);
    const price = product ? (product.isPromo && product.promoPrice ? product.promoPrice : product.pricePerUnit) : 0;
    const lineTotal = Math.round(price * item.quantity * 100) / 100;
    listEstimatedTotal += lineTotal;

    const inStock = product ? product.inStock && product.stockQuantity >= item.quantity : false;
    if (!inStock) allAvailable = false;

    return {
      ...item,
      product,
      lineTotal,
      inStock,
    };
  });

  const filteredCatalogProducts = state.products.filter(
    (p) =>
      p.name[locale].toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 text-start">
      {/* Top Bar: List Tabs & Create Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#E8E1CF] shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {state.shoppingLists.map((list) => {
            const isSelected = activeList?.id === list.id;
            return (
              <button
                key={list.id}
                onClick={() => setActiveListId(list.id)}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer',
                  isSelected
                    ? 'bg-[#315B3C] text-white shadow-xs'
                    : 'bg-[#F5F0DF]/60 text-[#282E23] hover:bg-[#F5F0DF]'
                )}
              >
                {list.name} ({list.items.length})
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#E7A84C] text-[#282E23] text-xs font-bold hover:bg-[#d89635] transition-colors cursor-pointer shrink-0"
        >
          <FolderPlus className="w-3.5 h-3.5" />
          <span>{t('shopping_list.create_new')}</span>
        </button>
      </div>

      {/* Main List Body */}
      {activeList ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-[#282E23]">
                  {activeList.name}
                </h3>
                <p className="text-xs text-[#5D6855]">
                  Dernière mise à jour : {new Date(activeList.updatedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#315B3C] text-white text-xs font-semibold hover:bg-[#264930] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t('shopping_list.add_product_to_list')}</span>
                </button>

                {state.shoppingLists.length > 1 && (
                  <button
                    onClick={() => deleteShoppingList(activeList.id)}
                    className="p-1.5 text-black/40 hover:text-[#DC2626] transition-colors"
                    aria-label={t('shopping_list.delete_list')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {resolvedItems.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-white border border-[#E8E1CF] text-xs text-[#5D6855]">
                {t('shopping_list.empty_list')}
              </div>
            ) : (
              <div className="space-y-3">
                {resolvedItems.map((item) => {
                  if (!item.product) return null;
                  return (
                    <div
                      key={item.productId}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E8E1CF] shadow-xs"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#F5F0DF] shrink-0 border border-[#E8E1CF]">
                        <Image
                          src={item.product.image}
                          alt={item.product.name[locale]}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-[#282E23] truncate">
                            {item.product.name[locale]}
                          </h4>
                          <span className="text-sm font-bold text-[#315B3C] shrink-0">
                            {formatCurrencyMAD(item.lineTotal, locale)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-[#5D6855]">
                            Quantité : <strong className="text-[#282E23]">{item.quantity} {item.product.pricingUnit}</strong>
                          </span>

                          <button
                            onClick={() => removeProductFromShoppingList(activeList.id, item.productId)}
                            className="p-1.5 text-black/40 hover:text-[#DC2626] transition-colors"
                            aria-label="Supprimer du panier"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {!item.inStock && (
                          <p className="flex items-center gap-1 text-[11px] font-semibold text-[#DC2626] mt-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Actuellement en rupture de stock</span>
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Actions & Summary */}
          <div className="lg:col-span-1">
            <div className="p-5 rounded-2xl bg-white border border-[#E8E1CF] shadow-xs space-y-4">
              <h4 className="font-heading font-bold text-base text-[#282E23]">
                {t('shopping_list.estimated_total')}
              </h4>

              <div className="flex justify-between text-base font-bold text-[#315B3C] pb-3 border-b border-[#E8E1CF]">
                <span>Sous-total estimé</span>
                <span>{formatCurrencyMAD(listEstimatedTotal, locale)}</span>
              </div>

              <button
                onClick={() => addShoppingListToCart(activeList.id)}
                disabled={resolvedItems.length === 0}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#315B3C] text-white font-semibold text-xs hover:bg-[#264930] disabled:opacity-40 transition-colors shadow-sm cursor-pointer min-h-[44px]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('shopping_list.add_all_to_cart')}</span>
              </button>

              <p className="text-[11px] text-[#5D6855] leading-relaxed">
                ℹ️ Les articles en rupture seront automatiquement ignorés pour préserver l’intégrité de votre panier.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-2xl border border-[#E8E1CF]">
          Aucune liste trouvée. Créez votre première liste de courses !
        </div>
      )}

      {/* Create List Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Créer une nouvelle liste de courses"
      >
        <form onSubmit={handleCreateList} className="space-y-4">
          <input
            type="text"
            required
            autoFocus
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Ex: Courses du Ramadan, Déjeuner du dimanche..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E1CF] text-sm focus:outline-none focus:border-[#315B3C]"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl hover:bg-black/5"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#315B3C] text-white text-xs font-semibold rounded-xl hover:bg-[#264930]"
            >
              Créer la liste
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        title="Ajouter un produit à la liste"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            placeholder="Rechercher dans le catalogue..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E1CF] text-sm focus:outline-none focus:border-[#315B3C]"
          />
          <div className="max-h-72 overflow-y-auto space-y-2">
            {filteredCatalogProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-2 rounded-xl border border-[#E8E1CF] hover:bg-[#F5F0DF]/40"
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#F5F0DF] shrink-0 border border-[#E8E1CF]">
                    <Image
                      src={product.image}
                      alt={product.name[locale]}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-[#282E23]">
                      {product.name[locale]}
                    </h5>
                    <p className="text-[10px] text-[#5D6855]">
                      {formatCurrencyMAD(product.pricePerUnit, locale)} / {product.pricingUnit}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddProduct(product.id)}
                  className="px-3 py-1 bg-[#315B3C] text-white text-xs font-semibold rounded-lg hover:bg-[#264930]"
                >
                  Ajouter
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
