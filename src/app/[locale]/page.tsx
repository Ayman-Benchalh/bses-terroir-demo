'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, MapPin, Clock } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { CATEGORIES_SEED } from '@/data/categories.seed';
import { ProductCard } from '@/components/shop/ProductCard';
import { MarketExplorer } from '@/components/features/MarketExplorer';
import { formatCurrencyMAD } from '@/lib/utils';

export default function HomePage() {
  const { locale, t } = useLocale();
  const { state, setSelectedCity } = useStore();

  // Curated 6 categories for Category Discovery — Section 04
  const curatedCategories = CATEGORIES_SEED.filter((cat) =>
    ['fruits-frais', 'legumes-frais', 'huiles-argan', 'miels-amlou', 'epices-aromates', 'dattes-fruits-secs'].includes(cat.slug)
  );

  // Seasonal products — Section 05
  const seasonalProducts = state.products
    .filter((p) => p.category === 'fruits-frais' || p.category === 'legumes-frais')
    .slice(0, 4);

  // Specialty products — Section 07
  const specialtyProducts = state.products
    .filter((p) =>
      ['huiles-argan', 'miels-amlou', 'epices-aromates'].includes(p.category)
    )
    .slice(0, 4);

  // Active delivery zone
  const activeZone =
    state.deliveryZones.find((z) => z.cityKey === state.selectedCity) ||
    state.deliveryZones[0];

  return (
    <div className="pb-16">

      {/* ============================================================
          § 01 — EDITORIAL COVER
          A magazine-cover opening. The brand name is the dominant
          typographic element. No "hero pattern" (title-left / image-right).
          A full-width dark aubergine band with a large italic wordmark
          and a single bold citron CTA. The harvest image anchors the
          lower section of the cover in a wide cinematic crop.
         ============================================================ */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'var(--t-aubergine)' }}
        aria-label={locale === 'ar' ? 'غلاف الموسم' : locale === 'en' ? 'Seasonal Cover' : 'Couverture de Saison'}
      >
        {/* Upper typographic band */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6">
          <div className="flex flex-col gap-5">

            {/* Issue marker */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="season-pill text-[var(--t-chalk)]" style={{ borderColor: 'rgba(248,247,240,0.4)', color: 'rgba(248,247,240,0.85)' }}>
                <span>TERROIR</span>
                <span style={{ color: 'var(--t-citron)' }}>✦</span>
                <span>
                  {locale === 'ar'
                    ? 'خريف–شتاء ٢٠٢٦ · حصاد المواسم'
                    : locale === 'en'
                    ? 'Autumn–Winter 2026 · Season Harvest'
                    : 'Automne–Hiver 2026 · Numéro des Récoltes'}
                </span>
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: 'rgba(248,247,240,0.4)', fontFamily: 'var(--font-body)' }}>
                BSES · {locale === 'ar' ? 'المغرب' : 'Maroc'}
              </div>
            </div>

            {/* Giant editorial headline — the dominant element */}
            <div className="relative">
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  color: 'var(--t-chalk)',
                  lineHeight: '0.92',
                  letterSpacing: '-0.03em',
                }}
                className="text-[clamp(3rem,10vw,8.5rem)] font-black leading-none"
              >
                {t('hero.title')}
              </h1>
              {/* Citron underline accent */}
              <div
                className="mt-3 h-1 w-24 sm:w-32"
                style={{ background: 'var(--t-citron)' }}
                aria-hidden="true"
              />
            </div>

            {/* Subtitle + CTA in a contained row */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-5 pt-2">
              <p
                className="text-sm sm:text-base leading-relaxed max-w-lg"
                style={{ color: 'rgba(248,247,240,0.72)', fontFamily: 'var(--font-body)' }}
              >
                {t('hero.subtitle')}
              </p>

              <div className="sm:ml-auto flex items-center gap-3 shrink-0">
                <Link
                  href={`/${locale}/shop`}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 font-bold text-sm transition-all duration-200 cursor-pointer min-h-[48px]"
                  style={{
                    background: 'var(--t-citron)',
                    color: 'var(--t-aubergine)',
                    fontFamily: 'var(--font-body)',
                    borderRadius: '2px',
                  }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('hero.cta_shop')}</span>
                </Link>
                <Link
                  href={`/${locale}/build-a-basket`}
                  className="inline-flex items-center gap-1.5 px-5 py-3.5 font-semibold text-sm transition-all duration-200 cursor-pointer min-h-[48px]"
                  style={{
                    color: 'var(--t-chalk)',
                    border: '1.5px solid rgba(248,247,240,0.35)',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <span>{t('hero.cta_basket')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width cinematic harvest image — no rectangle frame, bleeds edge to edge */}
        <div className="relative w-full" style={{ height: 'clamp(220px, 42vw, 500px)' }}>
          <Image
            src="https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1600&q=85"
            alt={locale === 'ar' ? 'حصاد الموسم — ثمار طازجة من المغرب' : locale === 'en' ? 'Seasonal Harvest — Fresh Moroccan Produce' : 'Récolte de Saison — Produits Frais du Maroc'}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{ filter: 'saturate(1.1) contrast(1.03)' }}
          />
          {/* Bottom gradient fade into chalk */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--t-chalk))' }}
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ============================================================
          § 02 — MARKET INDEX (Category Discovery)
          Presented as a typographic list / market stall index rather
          than a conventional image card grid. Each entry uses a
          Citron "• " bullet, the category name in Fraunces,
          the product count as a subtle metadata note.
          Desktop shows 6 entries in a 3-col magazine index.
          Mobile shows them stacked in a clean 2-col layout.
         ============================================================ */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20"
        aria-labelledby="categories-heading"
      >
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-5 border-b border-[var(--t-border)]">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--t-aubergine)] mb-1 flex items-center gap-2">
              <span className="inline-block w-4 h-px bg-[var(--t-aubergine)]" aria-hidden="true" />
              {locale === 'ar' ? 'الفئات' : locale === 'en' ? 'Categories' : 'Univers'}
            </p>
            <h2
              id="categories-heading"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
              className="text-2xl sm:text-3xl font-black text-[var(--t-ink)] leading-tight"
            >
              {t('sections.categories_title')}
            </h2>
          </div>
          <Link
            href={`/${locale}/shop`}
            className="text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            style={{ color: 'var(--t-aubergine)' }}
          >
            <span>{t('sections.categories_view_all')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Category grid — market stall cards with image + editorial typography */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {curatedCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}/shop?cat=${cat.slug}`}
              className="group flex flex-col overflow-hidden text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-aubergine)]"
              style={{
                borderRadius: '2px',
                border: '1.5px solid var(--t-border)',
                background: 'var(--t-ticket)',
              }}
            >
              {/* Image panel — no radius, full bleed */}
              <div className="relative aspect-square w-full overflow-hidden bg-[var(--t-chalk-dark)]">
                <Image
                  src={cat.image}
                  alt={cat.name[locale as 'fr' | 'en' | 'ar']}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Label zone */}
              <div className="p-2.5">
                <h3
                  className="font-black text-sm leading-tight group-hover:text-[var(--t-aubergine)] transition-colors"
                  style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--t-ink)' }}
                >
                  {cat.name[locale as 'fr' | 'en' | 'ar']}
                </h3>
                <p className="text-[10px] font-semibold mt-0.5" style={{ color: 'var(--t-ink-light)' }}>
                  {cat.productCount} {locale === 'ar' ? 'منتج' : locale === 'en' ? 'products' : 'produits'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================
          § 03 — SEASONAL SELECTION
          4 seasonal market-ticket product cards
         ============================================================ */}
      <section
        className="py-10 sm:py-14"
        style={{ background: 'var(--t-chalk-dark)' }}
        aria-labelledby="seasonal-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-5 border-b border-[var(--t-border)]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--t-aubergine)] mb-1 flex items-center gap-2">
                <span className="inline-block w-4 h-px bg-[var(--t-aubergine)]" aria-hidden="true" />
                {locale === 'ar' ? 'الموسم' : locale === 'en' ? 'In Season' : 'De Saison'}
              </p>
              <h2
                id="seasonal-heading"
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                className="text-2xl sm:text-3xl font-black text-[var(--t-ink)] leading-tight"
              >
                {t('sections.featured_title')}
              </h2>
            </div>
            <Link
              href={`/${locale}/shop?cat=fruits-frais`}
              className="text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
              style={{ color: 'var(--t-aubergine)' }}
            >
              <span>{t('sections.featured_view_all')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {seasonalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          § 04 — L'ARPENTEUR DES TERROIRS (Market Explorer)
          Signature region exploration feature
         ============================================================ */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MarketExplorer products={state.products} />
        </div>
      </section>

      {/* ============================================================
          § 05 — BASKET BUILDER PROMO
          Minimal editorial promo strip — Aubergine horizontal band
          with large Fraunces italic text and a single Citron CTA.
          No decorative patterns, no border radius excess.
         ============================================================ */}
      <section
        className="py-12 sm:py-16"
        style={{ background: 'var(--t-aubergine)' }}
        aria-labelledby="basket-builder-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-9">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2"
                style={{ color: 'var(--t-citron)' }}
              >
                <span className="inline-block w-4 h-px bg-[var(--t-citron)]" aria-hidden="true" />
                {locale === 'ar' ? 'الميزة المميزة' : locale === 'en' ? 'Signature Feature' : 'Fonctionnalité Phare'}
              </p>
              <h2
                id="basket-builder-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  color: 'var(--t-chalk)',
                  letterSpacing: '-0.02em',
                  lineHeight: '1.0',
                }}
                className="text-3xl sm:text-5xl font-black leading-none"
              >
                {t('sections.basket_title')}
              </h2>
              <p className="text-sm mt-4 leading-relaxed max-w-2xl"
                style={{ color: 'rgba(248,247,240,0.65)' }}>
                {t('sections.basket_subtitle')}
              </p>
            </div>
            <div className="lg:col-span-3 lg:text-right">
              <Link
                href={`/${locale}/build-a-basket`}
                className="inline-flex items-center gap-2 px-7 py-4 font-bold text-sm transition-all min-h-[52px] cursor-pointer"
                style={{
                  background: 'var(--t-citron)',
                  color: 'var(--t-aubergine)',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span>{t('hero.cta_basket')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          § 06 — LOCAL SPECIALTIES
          4 specialty terroir product cards
         ============================================================ */}
      <section
        className="py-14 sm:py-20"
        aria-labelledby="specialties-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-5 border-b border-[var(--t-border)]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--t-aubergine)] mb-1 flex items-center gap-2">
                <span className="inline-block w-4 h-px bg-[var(--t-aubergine)]" aria-hidden="true" />
                {locale === 'ar' ? 'خصائص المنطقة' : locale === 'en' ? 'Local Specialties' : 'Spécialités Locales'}
              </p>
              <h2
                id="specialties-heading"
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                className="text-2xl sm:text-3xl font-black text-[var(--t-ink)] leading-tight"
              >
                {t('sections.terroir_title')}
              </h2>
            </div>
            <Link
              href={`/${locale}/shop?cat=huiles-argan`}
              className="text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
              style={{ color: 'var(--t-aubergine)' }}
            >
              <span>{t('sections.terroir_view_all')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {specialtyProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          § 07 — EDITORIAL STORY STRIP
          A horizontal two-column editorial: left image, right text.
          Mint-tinted background to break the page rhythm.
         ============================================================ */}
      <section
        className="py-14 sm:py-20"
        style={{ background: 'var(--t-mint-subtle)' }}
        aria-labelledby="story-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image — full bleed panel */}
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden" style={{ border: '2px solid var(--t-mint-dark)' }}>
              <Image
                src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80"
                alt={locale === 'ar' ? 'بستان الزيتون المغربي' : locale === 'en' ? 'Moroccan Olive Grove' : 'Oliveraie Marocaine'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Text */}
            <div className="space-y-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--t-aubergine)] flex items-center gap-2">
                <span className="inline-block w-4 h-px bg-[var(--t-aubergine)]" aria-hidden="true" />
                {t('sections.story_badge')}
              </p>
              <h2
                id="story-heading"
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--t-ink)', letterSpacing: '-0.02em' }}
                className="text-3xl sm:text-4xl font-black leading-tight"
              >
                {t('sections.story_title')}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--t-ink-muted)' }}>
                {t('sections.story_desc')}
              </p>
              {/* 3 pillars as compact typographic list */}
              <ul className="space-y-3 pt-2 border-t border-[var(--t-mint-dark)]">
                {[
                  { title: t('sections.story_pillar_1_title'), desc: t('sections.story_pillar_1_desc') },
                  { title: t('sections.story_pillar_2_title'), desc: t('sections.story_pillar_2_desc') },
                  { title: t('sections.story_pillar_3_title'), desc: t('sections.story_pillar_3_desc') },
                ].map((pillar, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="shrink-0 w-5 h-5 flex items-center justify-center text-[10px] font-black mt-0.5"
                      style={{ background: 'var(--t-aubergine)', color: 'var(--t-citron)', borderRadius: '2px' }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-[var(--t-ink)]">{pillar.title}</p>
                      <p className="text-xs text-[var(--t-ink-muted)] leading-snug mt-0.5">{pillar.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          § 08 — DELIVERY INFORMATION
          Compact city simulator on a chalk surface
         ============================================================ */}
      <section
        className="py-14 sm:py-20"
        aria-labelledby="delivery-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--t-aubergine)] mb-2 flex items-center gap-2">
                <span className="inline-block w-4 h-px bg-[var(--t-aubergine)]" aria-hidden="true" />
                {t('sections.delivery_badge')}
              </p>
              <h2
                id="delivery-heading"
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--t-ink)', letterSpacing: '-0.02em' }}
                className="text-2xl sm:text-3xl font-black leading-tight mb-4"
              >
                {t('sections.delivery_title')}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--t-ink-muted)' }}>
                {t('sections.delivery_desc')}
              </p>
            </div>

            {/* City simulator card */}
            <div
              className="market-ticket p-5 space-y-4"
              style={{ maxWidth: '420px' }}
            >
              <div className="space-y-1.5">
                <label
                  htmlFor="home-city-select"
                  className="block text-xs font-bold uppercase tracking-wide text-[var(--t-ink)]"
                >
                  {t('sections.delivery_city_select')}
                </label>
                <div className="flex items-center gap-2 p-3 border border-[var(--t-border)] bg-white">
                  <MapPin className="w-4 h-4 shrink-0" style={{ color: 'var(--t-aubergine)' }} />
                  <select
                    id="home-city-select"
                    value={state.selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-[var(--t-ink)] focus:outline-none cursor-pointer"
                    style={{ borderRadius: 0 }}
                  >
                    {state.deliveryZones.map((z) => (
                      <option key={z.cityKey} value={z.cityKey}>
                        {z.cityName[locale as 'fr' | 'en' | 'ar']}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border border-[var(--t-border)] bg-[var(--t-chalk)]">
                <div>
                  <span className="text-xs font-black text-[var(--t-ink)] block">
                    {formatCurrencyMAD(activeZone.deliveryFee, locale)}
                    {' '}·{' '}
                    <span className="font-normal text-[var(--t-ink-muted)]">
                      {locale === 'ar' ? 'مجاني من' : locale === 'en' ? 'Free from' : 'Gratuit dès'} {activeZone.freeDeliveryThreshold} MAD
                    </span>
                  </span>
                </div>
                <span
                  className="text-[10px] font-bold px-2.5 py-1"
                  style={{ background: 'var(--t-aubergine-subtle)', color: 'var(--t-aubergine)', borderRadius: '2px' }}
                >
                  <Clock className="w-3 h-3 inline mr-1" aria-hidden="true" />
                  {activeZone.estimatedDeliveryHours}
                </span>
              </div>

              <Link
                href={`/${locale}/shop`}
                className="w-full flex items-center justify-center gap-2 py-3 font-bold text-xs transition-colors cursor-pointer"
                style={{
                  background: 'var(--t-aubergine)',
                  color: 'var(--t-chalk)',
                  borderRadius: '2px',
                }}
              >
                <span>{t('sections.delivery_verify_cta')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
