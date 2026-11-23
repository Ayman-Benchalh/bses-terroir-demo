'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Gift,
  Plus,
  Trash2,
  Sparkles,
  ShoppingBag,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Modal } from '@/components/ui/Modal';
import { formatCurrencyMAD, cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface BasketItemState {
  productId: string;
  quantity: number;
}

export function BasketBuilder() {
  const { locale, t } = useLocale();
  const { state, addBasketToCart, showToast } = useStore();

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('tmpl-famille');
  const [basketItems, setBasketItems] = useState<BasketItemState[]>([
    { productId: 'prod-fruit-01', quantity: 2 },
    { productId: 'prod-legume-01', quantity: 2 },
    { productId: 'prod-legume-02', quantity: 1.5 },
    { productId: 'prod-legume-04', quantity: 2 },
    { productId: 'prod-legume-05', quantity: 1 },
    { productId: 'prod-huile-01', quantity: 1 },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addSearch, setAddSearch] = useState('');

  const currentTemplate = state.basketTemplates.find((tmpl) => tmpl.id === selectedTemplateId);
  const discountPercent = currentTemplate ? currentTemplate.discountPercent : 10;

  // Handle template selection
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    if (templateId === 'custom') {
      setBasketItems([]);
      return;
    }
    const template = state.basketTemplates.find((tmpl) => tmpl.id === templateId);
    if (template) {
      setBasketItems(template.items.map((it) => ({ productId: it.productId, quantity: it.quantity })));
    }
  };

  // Modify item quantity
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setBasketItems((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  // Remove item
  const handleRemoveItem = (productId: string) => {
    setBasketItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  // Add product to bundle
  const handleAddProduct = (productId: string) => {
    const product = state.products.find((p) => p.id === productId);
    if (!product || !product.inStock) {
      showToast('Ce produit est en rupture de stock.', 'warning');
      return;
    }

    if (basketItems.some((item) => item.productId === productId)) {
      showToast('Ce produit est déjà dans votre panier.', 'info');
      return;
    }

    const initialQty = product.minQuantity || (product.unitStep || 1);
    setBasketItems((prev) => [...prev, { productId, quantity: initialQty }]);
    setIsAddModalOpen(false);
    showToast(`${product.name[locale]} ajouté à votre composition !`, 'success');
  };

  // Calculations in integer centimes
  let rawSubtotal = 0;
  let allInStock = true;

  const resolvedItems = basketItems.map((item) => {
    const product = state.products.find((p) => p.id === item.productId);
    const unitPrice = product ? (product.isPromo && product.promoPrice ? product.promoPrice : product.pricePerUnit) : 0;
    const lineTotal = Math.round(unitPrice * item.quantity * 100) / 100;
    rawSubtotal += lineTotal;

    const isAvailable = product ? product.inStock && product.stockQuantity >= item.quantity : false;
    if (!isAvailable) allInStock = false;

    return {
      ...item,
      product,
      unitPrice,
      lineTotal,
      isAvailable,
      maxStock: product ? product.stockQuantity : 0,
    };
  });

  const discountAmount = Math.round(((rawSubtotal * discountPercent) / 100) * 100) / 100;
  const finalTotal = Math.max(0, Math.round((rawSubtotal - discountAmount) * 100) / 100);

  // Commit to main cart
  const handleAddToCart = () => {
    if (basketItems.length === 0) {
      showToast('Veuillez ajouter au moins un produit à votre panier.', 'warning');
      return;
    }

    const templateName = currentTemplate ? currentTemplate.name[locale] : 'Panier Sur-Mesure';
    const result = addBasketToCart(basketItems, templateName, discountPercent);

    if (result.success) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  const filteredCatalogProducts = state.products.filter(
    (p) =>
      p.name[locale].toLowerCase().includes(addSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(addSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 text-start">
      {/* Step 1: Template Selection */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#252820] uppercase tracking-wider flex items-center gap-2">
          <Gift className="w-4 h-4 text-[#233C2E]" />
          <span>{t('basket_builder.choose_template')}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {state.basketTemplates.map((template) => {
            const isSelected = selectedTemplateId === template.id;
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => handleTemplateChange(template.id)}
                className={cn(
                  'flex flex-col items-start p-3.5 rounded-2xl border transition-all text-start cursor-pointer',
                  isSelected
                    ? 'border-[#233C2E] bg-[#233C2E]/5 shadow-xs ring-2 ring-[#233C2E]/20'
                    : 'border-[#E5DEC9] bg-white hover:bg-[#FAF8F2]'
                )}
              >
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D58B51]/15 text-[#9C5A25] mb-2">
                  {template.badge[locale]} • -{template.discountPercent}%
                </span>
                <span className="font-heading font-semibold text-sm text-[#252820] line-clamp-1">
                  {template.name[locale]}
                </span>
                <span className="text-[11px] text-[#5C6053] line-clamp-2 mt-1">
                  {template.description[locale]}
                </span>
              </button>
            );
          })}

          {/* Custom Template Card */}
          <button
            type="button"
            onClick={() => handleTemplateChange('custom')}
            className={cn(
              'flex flex-col items-start p-3.5 rounded-2xl border transition-all text-start cursor-pointer',
              selectedTemplateId === 'custom'
                ? 'border-[#233C2E] bg-[#233C2E]/5 shadow-xs ring-2 ring-[#233C2E]/20'
                : 'border-[#E5DEC9] bg-white hover:bg-[#FAF8F2]'
            )}
          >
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D7E4C5] text-[#252820] mb-2">
              Libre • -10%
            </span>
            <span className="font-heading font-semibold text-sm text-[#252820]">
              {t('basket_builder.custom_template')}
            </span>
            <span className="text-[11px] text-[#5C6053] line-clamp-2 mt-1">
              {t('basket_builder.custom_desc')}
            </span>
          </button>
        </div>
      </div>

      {/* Step 2: Customize Items & Quantities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#252820] uppercase tracking-wider">
              {t('basket_builder.customize_items')} ({basketItems.length})
            </h3>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#233C2E] text-white text-xs font-semibold hover:bg-[#1C3025] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('basket_builder.add_item')}</span>
            </button>
          </div>

          {/* Items Container */}
          <div className="space-y-3">
            {resolvedItems.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-white border border-[#E5DEC9] text-xs text-[#5C6053]">
                Votre panier est vide. Cliquez sur &quot;Ajouter un produit&quot; pour commencer à composer.
              </div>
            ) : (
              resolvedItems.map((item) => {
                if (!item.product) return null;
                return (
                  <div
                    key={item.productId}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F7F4EB] shrink-0 border border-[#E5DEC9]">
                      <Image
                        src={item.product.image}
                        alt={item.product.name[locale]}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-semibold text-[#252820] truncate">
                            {item.product.name[locale]}
                          </h4>
                          <p className="text-xs text-[#5C6053]">
                            {item.product.originRegion[locale]} • {formatCurrencyMAD(item.unitPrice, locale)} / {item.product.pricingUnit}
                          </p>
                        </div>

                        <span className="text-sm font-bold text-[#233C2E] shrink-0">
                          {formatCurrencyMAD(item.lineTotal, locale)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2.5">
                        <QuantityStepper
                          size="sm"
                          value={item.quantity}
                          step={item.product.unitStep || 1}
                          min={item.product.minQuantity || (item.product.unitStep || 1)}
                          max={item.maxStock}
                          unit={item.product.pricingUnit}
                          onChange={(newQty) => handleQuantityChange(item.productId, newQty)}
                        />

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.productId)}
                          className="p-1.5 text-black/40 hover:text-[#DC2626] transition-colors cursor-pointer"
                          aria-label="Supprimer l'article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {!item.isAvailable && (
                        <p className="flex items-center gap-1 text-[11px] font-semibold text-[#DC2626] mt-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Quantité indisponible (Max: {item.maxStock} {item.product.pricingUnit})</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Step 3: Bundle Summary Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 p-5 rounded-2xl bg-white border border-[#E5DEC9] shadow-sm space-y-4">
            <h4 className="font-heading font-bold text-lg text-[#252820]">
              {t('basket_builder.total_bundle')}
            </h4>

            <div className="space-y-2 text-xs text-[#5C6053]">
              <div className="flex justify-between">
                <span>Articles ({basketItems.length})</span>
                <span className="font-semibold text-[#252820]">
                  {formatCurrencyMAD(rawSubtotal, locale)}
                </span>
              </div>

              <div className="flex justify-between text-[#2E7D32] font-semibold">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D58B51]" />
                  <span>Remise panier ({discountPercent}%)</span>
                </span>
                <span>-{formatCurrencyMAD(discountAmount, locale)}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#252820] pt-2 border-t border-[#E5DEC9]">
                <span>Total estimé</span>
                <span className="text-[#233C2E]">
                  {formatCurrencyMAD(finalTotal, locale)}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#EFF5E8] text-[#252820] text-xs space-y-1">
              <p className="font-semibold flex items-center gap-1.5 text-[#2E7D32]">
                <Check className="w-3.5 h-3.5" />
                <span>{t('basket_builder.stock_safe')}</span>
              </p>
              <p className="text-[11px] text-[#5C6053]">
                Livraison simulée en direct de nos coopératives partenaires.
              </p>
            </div>

            <button
              type="button"
              disabled={basketItems.length === 0 || !allInStock}
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#233C2E] text-white font-semibold text-sm hover:bg-[#1C3025] disabled:bg-black/10 disabled:text-black/30 transition-colors shadow-xs cursor-pointer min-h-[48px]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t('basket_builder.add_bundle_to_cart', { count: basketItems.length })}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Ajouter un produit à votre panier"
        description="Choisissez un produit parmi notre catalogue de coopératives."
        maxWidth="lg"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={addSearch}
            onChange={(e) => setAddSearch(e.target.value)}
            placeholder="Rechercher un produit (orange, huile, amlou, épice...)"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DEC9] bg-white text-sm text-[#252820] focus:outline-none focus:border-[#233C2E]"
          />

          <div className="max-h-80 overflow-y-auto space-y-2">
            {filteredCatalogProducts.map((product) => {
              const alreadyAdded = basketItems.some((it) => it.productId === product.id);
              return (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-[#E5DEC9] bg-white hover:bg-[#FAF8F2] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#F7F4EB] shrink-0 border border-[#E5DEC9]">
                      <Image
                        src={product.image}
                        alt={product.name[locale]}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#252820]">
                        {product.name[locale]}
                      </h5>
                      <p className="text-[11px] text-[#5C6053]">
                        {formatCurrencyMAD(product.pricePerUnit, locale)} / {product.pricingUnit}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={alreadyAdded || !product.inStock}
                    onClick={() => handleAddProduct(product.id)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer',
                      alreadyAdded
                        ? 'bg-black/10 text-black/40'
                        : !product.inStock
                        ? 'bg-[#FEE2E2] text-[#DC2626]'
                        : 'bg-[#233C2E] text-white hover:bg-[#1C3025]'
                    )}
                  >
                    {alreadyAdded ? 'Déjà ajouté' : !product.inStock ? 'Rupture' : 'Ajouter'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
}
