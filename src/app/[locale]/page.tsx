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
    <div className="pb-16 bg-[#F6F7F1] text-[#242D26]">

      {/* ============================================================
          § 01 — EDITORIAL COVER (Fresh Organic Editorial)
          Magazine cover opening anchored in Forest Green (#193F30),
          Warm Ivory (#F6F7F1), and Fresh Lime (#B7DB75) accents.
          Edge-to-edge cinematic harvest imagery.
         ============================================================ */}
      <section
        className="relative overflow-hidden bg-[#193F30] text-[#F6F7F1]"
        aria-label={locale === 'ar' ? 'غلاف الموسم' : locale === 'en' ? 'Seasonal Cover' : 'Couverture de Saison'}
      >
        {/* Upper typographic band */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-8">
          <div className="flex flex-col gap-6">

            {/* Issue marker */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div
                className="season-pill inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border border-white/20 bg-white/5 text-[#F6F7F1]"
              >
                <span>TERROIR</span>
                <span className="text-[#B7DB75]">✦</span>
                <span>
                  {locale === 'ar'
                    ? 'خريف–شتاء ٢٠٢٦ · حصاد المواسم'
                    : locale === 'en'
                    ? 'Autumn–Winter 2026 · Season Harvest'
                    : 'Automne–Hiver 2026 · Numéro des Récoltes'}
                </span>
              </div>
              <div
                className="text-[11px] font-semibold uppercase tracking-widest text-[#F6F7F1]/60 font-sans"
              >
                BSES · {locale === 'ar' ? 'المغرب' : 'Maroc'}
              </div>
            </div>

            {/* Giant editorial headline */}
            <div className="relative">
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  lineHeight: '0.92',
                  letterSpacing: '-0.03em',
                }}
                className="text-[clamp(3.2rem,10vw,8.5rem)] font-black leading-none text-[#F6F7F1]"
              >
                {t('hero.title')}
              </h1>
              {/* Fresh Lime underline accent */}
              <div
                className="mt-3.5 h-1.5 w-24 sm:w-36 bg-[#B7DB75] rounded-full"
                aria-hidden="true"
              />
            </div>

            {/* Subtitle + CTA in a responsive row */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 pt-2">
              <p
                className="text-sm sm:text-base leading-relaxed max-w-xl text-[#F6F7F1]/80 font-sans"
              >
                {t('hero.subtitle')}
              </p>

              <div className="sm:ml-auto flex items-center gap-3 shrink-0">
                <Link
                  href={`/${locale}/shop`}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 font-bold text-sm transition-all duration-200 cursor-pointer min-h-[48px] bg-[#B7DB75] text-[#193F30] hover:bg-[#a5cf5d] active:scale-[0.98] rounded-xl shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('hero.cta_shop')}</span>
                </Link>
                <Link
                  href={`/${locale}/build-a-basket`}
                  className="inline-flex items-center gap-2 px-5 py-3.5 font-semibold text-sm transition-all duration-200 cursor-pointer min-h-[48px] text-[#F6F7F1] border border-white/30 hover:border-white hover:bg-white/10 active:scale-[0.98] rounded-xl"
                >
                  <span>{t('hero.cta_basket')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width cinematic harvest image */}
        <div className="relative w-full" style={{ height: 'clamp(240px, 42vw, 520px)' }}>
          <Image
            src="https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1600&q=85"
            alt={locale === 'ar' ? 'حصاد الموسم — ثمار طازجة من المغرب' : locale === 'en' ? 'Seasonal Harvest — Fresh Moroccan Produce' : 'Récolte de Saison — Produits Frais du Maroc'}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{ filter: 'saturate(1.08) contrast(1.02)' }}
          />
          {/* Bottom gradient fade into warm ivory */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, #F6F7F1)' }}
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ============================================================
          § 02 — MARKET INDEX (Category Discovery)
          6 key harvest categories presented with authentic imagery,
          Fraunces titles, and product counts.
         ============================================================ */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20"
        aria-labelledby="categories-heading"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-5 border-b border-[#D9E2D7]">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#193F30] mb-1 flex items-center gap-2">
              <span className="inline-block w-4 h-0.5 bg-[#193F30]" aria-hidden="true" />
              {locale === 'ar' ? 'الفئات' : locale === 'en' ? 'Categories' : 'Univers'}
            </p>
            <h2
              id="categories-heading"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
              className="text-2xl sm:text-3xl font-black text-[#242D26] leading-tight"
            >
              {t('sections.categories_title')}
            </h2>
          </div>
          <Link
            href={`/${locale}/shop`}
            className="text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all text-[#193F30] hover:text-[#133226]"
          >
            <span>{t('sections.categories_view_all')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {curatedCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}/shop?cat=${cat.slug}`}
              className="group flex flex-col overflow-hidden text-start rounded-xl border border-[#D9E2D7] bg-white hover:border-[#193F30] hover:shadow-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#193F30]"
            >
              {/* Image panel */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#EDF3EB]">
                <Image
                  src={cat.image}
                  alt={cat.name[locale as 'fr' | 'en' | 'ar']}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Label zone */}
              <div className="p-3">
                <h3
                  className="font-bold text-sm leading-tight group-hover:text-[#193F30] transition-colors"
                  style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: '#242D26' }}
                >
                  {cat.name[locale as 'fr' | 'en' | 'ar']}
                </h3>
                <p className="text-[11px] font-semibold mt-1 text-[#66756B]">
                  {cat.productCount} {locale === 'ar' ? 'منتج' : locale === 'en' ? 'products' : 'produits'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================
          § 03 — SEASONAL SELECTION
          4 seasonal harvest product cards on soft herbal background
         ============================================================ */}
      <section
        className="py-12 sm:py-16 bg-[#EEF3EC] border-y border-[#D9E2D7]"
        aria-labelledby="seasonal-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-5 border-b border-[#D9E2D7]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#193F30] mb-1 flex items-center gap-2">
                <span className="inline-block w-4 h-0.5 bg-[#193F30]" aria-hidden="true" />
                {locale === 'ar' ? 'الموسم' : locale === 'en' ? 'In Season' : 'De Saison'}
              </p>
              <h2
                id="seasonal-heading"
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                className="text-2xl sm:text-3xl font-black text-[#242D26] leading-tight"
              >
                {t('sections.featured_title')}
              </h2>
            </div>
            <Link
              href={`/${locale}/shop?cat=fruits-frais`}
              className="text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all text-[#193F30] hover:text-[#133226]"
            >
              <span>{t('sections.featured_view_all')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
          Signature custom basket callout in deep Forest Green (#193F30)
          and Fresh Lime CTA.
         ============================================================ */}
      <section
        className="py-12 sm:py-16 bg-[#193F30] text-[#F6F7F1] rounded-2xl mx-4 sm:mx-6 lg:mx-8 my-8 shadow-lg"
        aria-labelledby="basket-builder-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 text-[#B7DB75]"
              >
                <span className="inline-block w-4 h-0.5 bg-[#B7DB75]" aria-hidden="true" />
                {locale === 'ar' ? 'الميزة المميزة' : locale === 'en' ? 'Signature Feature' : 'Fonctionnalité Phare'}
              </p>
              <h2
                id="basket-builder-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  letterSpacing: '-0.02em',
                  lineHeight: '1.05',
                }}
                className="text-3xl sm:text-5xl font-black text-[#F6F7F1]"
              >
                {t('sections.basket_title')}
              </h2>
              <p className="text-sm sm:text-base mt-4 leading-relaxed max-w-2xl text-[#F6F7F1]/80 font-sans">
                {t('sections.basket_subtitle')}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                href={`/${locale}/build-a-basket`}
                className="inline-flex items-center gap-2.5 px-8 py-4 font-bold text-sm transition-all min-h-[52px] cursor-pointer bg-[#B7DB75] text-[#193F30] hover:bg-[#a5cf5d] active:scale-[0.98] rounded-xl shadow-md"
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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-5 border-b border-[#D9E2D7]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#193F30] mb-1 flex items-center gap-2">
                <span className="inline-block w-4 h-0.5 bg-[#193F30]" aria-hidden="true" />
                {locale === 'ar' ? 'خصائص المنطقة' : locale === 'en' ? 'Local Specialties' : 'Spécialités Locales'}
              </p>
              <h2
                id="specialties-heading"
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                className="text-2xl sm:text-3xl font-black text-[#242D26] leading-tight"
              >
                {t('sections.terroir_title')}
              </h2>
            </div>
            <Link
              href={`/${locale}/shop?cat=huiles-argan`}
              className="text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all text-[#193F30] hover:text-[#133226]"
            >
              <span>{t('sections.terroir_view_all')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {specialtyProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          § 07 — EDITORIAL STORY STRIP
          Two-column editorial: left image, right narrative & pillars.
         ============================================================ */}
      <section
        className="py-14 sm:py-20 bg-[#EEF3EC] border-y border-[#D9E2D7]"
        aria-labelledby="story-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Image — framed with soft border */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#D9E2D7] shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80"
                alt={locale === 'ar' ? 'بستان الزيتون المغربي' : locale === 'en' ? 'Moroccan Olive Grove' : 'Oliveraie Marocaine'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Text */}
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#193F30] flex items-center gap-2">
                <span className="inline-block w-4 h-0.5 bg-[#193F30]" aria-hidden="true" />
                {t('sections.story_badge')}
              </p>
              <h2
                id="story-heading"
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', letterSpacing: '-0.02em' }}
                className="text-3xl sm:text-4xl font-black text-[#242D26] leading-tight"
              >
                {t('sections.story_title')}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#66756B]">
                {t('sections.story_desc')}
              </p>
              {/* 3 pillars as compact typographic cards */}
              <ul className="space-y-3 pt-3 border-t border-[#D9E2D7]">
                {[
                  { title: t('sections.story_pillar_1_title'), desc: t('sections.story_pillar_1_desc') },
                  { title: t('sections.story_pillar_2_title'), desc: t('sections.story_pillar_2_desc') },
                  { title: t('sections.story_pillar_3_title'), desc: t('sections.story_pillar_3_desc') },
                ].map((pillar, i) => (
                  <li key={i} className="flex items-start gap-3.5 p-2.5 rounded-xl bg-white border border-[#D9E2D7]/60">
                    <span
                      className="shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5 rounded-lg bg-[#193F30] text-[#B7DB75]"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-[#242D26]">{pillar.title}</p>
                      <p className="text-xs text-[#66756B] leading-snug mt-0.5">{pillar.desc}</p>
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
          Interactive city delivery calculator
         ============================================================ */}
      <section
        className="py-14 sm:py-20"
        aria-labelledby="delivery-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#193F30] mb-2 flex items-center gap-2">
                <span className="inline-block w-4 h-0.5 bg-[#193F30]" aria-hidden="true" />
                {t('sections.delivery_badge')}
              </p>
              <h2
                id="delivery-heading"
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', letterSpacing: '-0.02em' }}
                className="text-2xl sm:text-3xl font-black text-[#242D26] leading-tight mb-4"
              >
                {t('sections.delivery_title')}
              </h2>
              <p className="text-sm leading-relaxed text-[#66756B]">
                {t('sections.delivery_desc')}
              </p>
            </div>

            {/* City simulator card */}
            <div
              className="p-6 rounded-2xl bg-white border border-[#D9E2D7] shadow-sm space-y-4 max-w-md"
            >
              <div className="space-y-1.5">
                <label
                  htmlFor="home-city-select"
                  className="block text-xs font-bold uppercase tracking-wide text-[#242D26]"
                >
                  {t('sections.delivery_city_select')}
                </label>
                <div className="flex items-center gap-2 p-3 rounded-xl border border-[#D9E2D7] bg-[#F6F7F1]">
                  <MapPin className="w-4 h-4 shrink-0 text-[#193F30]" />
                  <select
                    id="home-city-select"
                    value={state.selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-[#242D26] focus:outline-none cursor-pointer"
                  >
                    {state.deliveryZones.map((z) => (
                      <option key={z.cityKey} value={z.cityKey}>
                        {z.cityName[locale as 'fr' | 'en' | 'ar']}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#D9E2D7] bg-[#EEF3EC]">
                <div>
                  <span className="text-xs font-bold text-[#242D26] block">
                    {formatCurrencyMAD(activeZone.deliveryFee, locale)}
                    {' '}·{' '}
                    <span className="font-normal text-[#66756B]">
                      {locale === 'ar' ? 'مجاني من' : locale === 'en' ? 'Free from' : 'Gratuit dès'} {activeZone.freeDeliveryThreshold} MAD
                    </span>
                  </span>
                </div>
                <span
                  className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#193F30]/10 text-[#193F30]"
                >
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {activeZone.estimatedDeliveryHours}
                </span>
              </div>

              <Link
                href={`/${locale}/shop`}
                className="w-full flex items-center justify-center gap-2 py-3.5 font-bold text-xs transition-all cursor-pointer rounded-xl bg-[#193F30] text-[#F6F7F1] hover:bg-[#133226] active:scale-[0.98] shadow-sm"
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
