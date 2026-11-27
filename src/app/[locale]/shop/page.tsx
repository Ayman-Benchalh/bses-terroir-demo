'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { FilterSidebar, FilterState } from '@/components/shop/FilterSidebar';
import { Modal } from '@/components/ui/Modal';
import { CATEGORIES_SEED } from '@/data/categories.seed';

function ShopContent() {
  const { locale, t } = useLocale();
  const { state } = useStore();
  const searchParams = useSearchParams();

  const initialCat = searchParams.get('cat') || '';
  const initialQuery = searchParams.get('q') || '';
  const initialPromo = searchParams.get('promo') === 'true';
  const initialWishlist = searchParams.get('wishlist') === 'true';

  const [filters, setFilters] = useState<FilterState>({
    category: initialCat,
    maxPrice: 600,
    inStockOnly: false,
    promoOnly: initialPromo,
    searchQuery: initialQuery,
    sortBy: 'popular',
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('cat') || '';
    const q = searchParams.get('q') || '';
    const promo = searchParams.get('promo') === 'true';

    setFilters((prev) => {
      if (
        prev.category === cat &&
        prev.searchQuery === q &&
        prev.promoOnly === promo
      ) {
        return prev;
      }
      return {
        ...prev,
        category: cat,
        searchQuery: q,
        promoOnly: promo,
      };
    });
  }, [searchParams]);

  const handleResetFilters = () => {
    setFilters({
      category: '',
      maxPrice: 600,
      inStockOnly: false,
      promoOnly: false,
      searchQuery: '',
      sortBy: 'popular',
    });
  };

  const filteredProducts = useMemo(() => {
    let result = [...state.products];

    if (initialWishlist) {
      result = result.filter((p) => state.wishlist.includes(p.id));
    }

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name[locale].toLowerCase().includes(q) ||
          p.description[locale].toLowerCase().includes(q) ||
          p.originRegion[locale].toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock && p.stockQuantity > 0);
    }

    if (filters.promoOnly) {
      result = result.filter((p) => p.isPromo);
    }

    result = result.filter((p) => {
      const price = p.isPromo && p.promoPrice ? p.promoPrice : p.pricePerUnit;
      return price <= filters.maxPrice;
    });

    if (filters.sortBy === 'price_asc') {
      result.sort((a, b) => {
        const pA = a.isPromo && a.promoPrice ? a.promoPrice : a.pricePerUnit;
        const pB = b.isPromo && b.promoPrice ? b.promoPrice : b.pricePerUnit;
        return pA - pB;
      });
    } else if (filters.sortBy === 'price_desc') {
      result.sort((a, b) => {
        const pA = a.isPromo && a.promoPrice ? a.promoPrice : a.pricePerUnit;
        const pB = b.isPromo && b.promoPrice ? b.promoPrice : b.pricePerUnit;
        return pB - pA;
      });
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [state.products, state.wishlist, filters, locale, initialWishlist]);

  const activeCategoryName = CATEGORIES_SEED.find((c) => c.slug === filters.category)?.name[locale];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-start">
      {/* Title & Top Sorting Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E1CF] pb-6">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#282E23]">
            {initialWishlist ? t('nav.wishlist') : t('nav.shop')}
          </h1>
          <p className="text-sm text-[#5D6855] mt-1">
            {t('common.results_count', { count: filteredProducts.length })}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#315B3C] text-[#315B3C] text-xs font-semibold hover:bg-[#315B3C]/5 min-h-[44px]"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{t('common.filters')}</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 flex-1 sm:flex-none">
            <span className="text-xs text-[#5D6855] hidden sm:inline whitespace-nowrap">
              {t('common.sort_by')} :
            </span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="w-full sm:w-auto h-11 px-3 py-2 rounded-xl border border-[#E8E1CF] bg-white text-xs font-semibold text-[#282E23] focus:outline-none focus:border-[#315B3C]"
            >
              <option value="popular">{t('common.sort_popular')}</option>
              <option value="price_asc">{t('common.sort_price_asc')}</option>
              <option value="price_desc">{t('common.sort_price_desc')}</option>
              <option value="rating">{t('common.sort_rating')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(filters.category || filters.searchQuery || filters.promoOnly || filters.inStockOnly) && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#5D6855] font-medium">Filtres actifs :</span>

          {filters.category && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#315B3C]/10 text-[#315B3C] font-semibold">
              <span>{activeCategoryName || filters.category}</span>
              <button
                onClick={() => setFilters({ ...filters, category: '' })}
                className="hover:opacity-75"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7A84C]/20 text-[#855113] font-semibold">
              <span>Recherche: &quot;{filters.searchQuery}&quot;</span>
              <button
                onClick={() => setFilters({ ...filters, searchQuery: '' })}
                className="hover:opacity-75"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {filters.promoOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] font-semibold">
              <span>En promotion</span>
              <button
                onClick={() => setFilters({ ...filters, promoOnly: false })}
                className="hover:opacity-75"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {filters.inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-semibold">
              <span>En stock</span>
              <button
                onClick={() => setFilters({ ...filters, inStockOnly: false })}
                className="hover:opacity-75"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          <button
            onClick={handleResetFilters}
            className="text-xs text-[#DC2626] font-semibold hover:underline ms-2"
          >
            {t('common.clear_filters')}
          </button>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28 p-5 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <ProductGrid
            products={filteredProducts}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <Modal
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title={t('common.filters')}
      >
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
          isMobile
        />
        <div className="mt-6 pt-4 border-t border-[#E8E1CF]">
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="w-full py-3 rounded-xl bg-[#315B3C] text-white font-semibold text-xs min-h-[44px]"
          >
            Afficher les résultats ({filteredProducts.length})
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs text-[#5D6855]">Chargement de la boutique...</div>}>
      <ShopContent />
    </Suspense>
  );
}
