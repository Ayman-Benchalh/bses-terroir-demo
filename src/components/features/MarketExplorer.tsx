'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';
import { Product } from '@/lib/types';

/**
 * TERROIR V6 — Market Explorer
 *
 * A lightweight editorial region selector. Users pick a Moroccan
 * agricultural region to filter catalog products associated with it.
 *
 * Visual approach:
 *  – A typographic "index" layout of Moroccan regions with visual stamps
 *  – Clicking a region reveals an inline list of associated products
 *  – An accessible <select> fallback for screen readers / keyboard users
 *  – No heavy map library; just SVG stamps and editorial typography
 */

interface MarketRegion {
  id: string;
  key: string;    // matches originRegion fields in products seed
  color: string;  // brand accent
  bg: string;     // subtle bg
  coords: { x: number; y: number };  // relative % on abstract SVG map
}

const REGIONS: MarketRegion[] = [
  { id: 'berkane',   key: 'Berkane',   color: '#C75E3E', bg: '#FDF0EB', coords: { x: 82, y: 20 } },
  { id: 'souss',     key: 'Souss',     color: '#352B3E', bg: '#F0EBF4', coords: { x: 18, y: 68 } },
  { id: 'ouezzane',  key: 'Ouezzane',  color: '#1D5FAB', bg: '#EAF1FA', coords: { x: 28, y: 22 } },
  { id: 'taliouine', key: 'Taliouine', color: '#2A6B40', bg: '#EBF5F0', coords: { x: 38, y: 72 } },
  { id: 'tafilalet', key: 'Tafilalet', color: '#C47B28', bg: '#FDF3E3', coords: { x: 68, y: 62 } },
  { id: 'sefrou',    key: 'Sefrou',    color: '#4A4555', bg: '#F0EBF4', coords: { x: 54, y: 32 } },
  { id: 'atlas',     key: 'Atlas',     color: '#8BBCAA', bg: '#EDF5F2', coords: { x: 48, y: 50 } },
];

interface MarketExplorerProps {
  products: Product[];
  className?: string;
}

export function MarketExplorer({ products, className = '' }: MarketExplorerProps) {
  const { locale, t } = useLocale();
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const selectId = useId();

  const regionProducts = activeRegion
    ? products.filter((p) => {
        const origin = p.originRegion?.[locale as 'fr' | 'en' | 'ar'] || '';
        return origin.toLowerCase().includes(activeRegion.toLowerCase()) ||
          REGIONS.find((r) => r.id === activeRegion)?.key.toLowerCase().split(/[,\s]+/).some(
            (k) => origin.toLowerCase().includes(k)
          );
      }).slice(0, 6)
    : [];

  const selectedRegion = REGIONS.find((r) => r.id === activeRegion);

  return (
    <section className={`${className}`} aria-labelledby="explorer-heading">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--t-border)] pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--t-aubergine)] mb-1 flex items-center gap-2">
              <span className="inline-block w-4 h-px bg-[var(--t-aubergine)]" aria-hidden="true" />
              {locale === 'ar' ? 'خريطة المواسم' : locale === 'en' ? 'Harvest Map' : 'Carte des Récoltes'}
            </p>
            <h2
              id="explorer-heading"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
              className="text-2xl sm:text-3xl font-black text-[var(--t-ink)] leading-tight"
            >
              {locale === 'ar'
                ? 'استكشف بالمنطقة الجغرافية'
                : locale === 'en'
                ? 'Explore by Moroccan Region'
                : "L'Arpenteur des Terroirs"}
            </h2>
            <p className="text-sm text-[var(--t-ink-muted)] mt-1 max-w-xl">
              {locale === 'ar'
                ? 'اختر منطقة لاكتشاف منتجاتها الموسمية.'
                : locale === 'en'
                ? 'Select a region to discover its seasonal products.'
                : 'Choisissez un terroir pour découvrir ses récoltes du moment.'}
            </p>
          </div>

          {/* Accessible fallback select */}
          <div className="sm:shrink-0">
            <label htmlFor={selectId} className="sr-only">
              {locale === 'ar' ? 'اختر منطقة' : locale === 'en' ? 'Select region' : 'Choisir une région'}
            </label>
            <select
              id={selectId}
              value={activeRegion || ''}
              onChange={(e) => setActiveRegion(e.target.value || null)}
              className="text-xs font-semibold border border-[var(--t-border)] rounded-sm px-3 py-2 bg-white text-[var(--t-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--t-aubergine)] cursor-pointer"
            >
              <option value="">
                {locale === 'ar' ? '— كل المناطق —' : locale === 'en' ? '— All regions —' : '— Tous les terroirs —'}
              </option>
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.key}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Region Stamp Grid */}
      <div
        role="list"
        aria-label={locale === 'ar' ? 'مناطق تيروار' : locale === 'en' ? 'TERROIR regions' : 'Régions TERROIR'}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-8"
      >
        {REGIONS.map((region) => {
          const isActive = activeRegion === region.id;
          return (
            <button
              key={region.id}
              role="listitem"
              onClick={() => setActiveRegion(isActive ? null : region.id)}
              aria-pressed={isActive}
              className="group flex flex-col items-center gap-2 p-3 rounded-sm border transition-all duration-200 cursor-pointer text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-aubergine)]"
              style={{
                borderColor: isActive ? region.color : 'var(--t-border)',
                backgroundColor: isActive ? region.bg : 'var(--t-ticket)',
              }}
            >
              {/* SVG Stamp */}
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Outer stamp ring */}
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  stroke={region.color}
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  fill={isActive ? region.bg : 'transparent'}
                  opacity={isActive ? 1 : 0.6}
                />
                {/* Inner circle */}
                <circle
                  cx="24"
                  cy="24"
                  r="14"
                  stroke={region.color}
                  strokeWidth="1.5"
                  fill="none"
                  opacity={isActive ? 1 : 0.4}
                />
                {/* Region initial letter */}
                <text
                  x="24"
                  y="28"
                  textAnchor="middle"
                  fill={region.color}
                  fontSize="14"
                  fontWeight="800"
                  fontFamily="Georgia, serif"
                  fontStyle="italic"
                  opacity={isActive ? 1 : 0.65}
                >
                  {region.key[0]}
                </text>
              </svg>

              <span
                className="text-[11px] font-bold uppercase tracking-wide leading-tight"
                style={{ color: isActive ? region.color : 'var(--t-ink-muted)' }}
              >
                {region.key}
              </span>
            </button>
          );
        })}
      </div>

      {/* Products Panel */}
      {activeRegion && (
        <div
          className="rounded-sm border border-[var(--t-border)] bg-[var(--t-ticket)] p-5"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Panel header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: selectedRegion?.color }}
                aria-hidden="true"
              />
              <span
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                className="text-base font-black text-[var(--t-ink)]"
              >
                {locale === 'ar' ? `منتجات ${selectedRegion?.key}` : locale === 'en' ? `${selectedRegion?.key} Harvest` : `Récoltes de ${selectedRegion?.key}`}
              </span>
            </div>
            <Link
              href={`/${locale}/shop`}
              className="text-xs font-semibold text-[var(--t-aubergine)] hover:underline"
            >
              {locale === 'ar' ? 'عرض الكل' : locale === 'en' ? 'View all' : 'Voir tout'}
            </Link>
          </div>

          {regionProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {regionProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/product/${product.slug}`}
                  className="group block"
                >
                  <div
                    className="market-ticket p-2 hover:border-[var(--t-aubergine)] transition-colors duration-200"
                  >
                    {/* Product image */}
                    <div className="aspect-square w-full overflow-hidden bg-[var(--t-chalk)] mb-2 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${product.image}&w=200&q=70`}
                        alt={product.name[locale as 'fr' | 'en' | 'ar']}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-[11px] font-bold text-[var(--t-ink)] leading-snug line-clamp-2 mb-1">
                      {product.name[locale as 'fr' | 'en' | 'ar']}
                    </p>
                    <p className="price-tag text-sm">
                      {product.isPromo && product.promoPrice
                        ? product.promoPrice
                        : product.pricePerUnit}
                      <span className="price-unit"> MAD/{product.baseUnit}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--t-ink-muted)] py-4 text-center">
              {locale === 'ar'
                ? 'لا توجد منتجات متاحة لهذه المنطقة حالياً.'
                : locale === 'en'
                ? 'No products currently listed for this region.'
                : 'Aucun produit référencé pour ce terroir pour le moment.'}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
