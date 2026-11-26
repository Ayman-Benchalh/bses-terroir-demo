'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ShoppingBag,
  Gift,
  MapPin,
  Clock,
  Sparkles,
  Sun,
  Scale,
} from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { CATEGORIES_SEED } from '@/data/categories.seed';
import { ProductCard } from '@/components/shop/ProductCard';
import { formatCurrencyMAD } from '@/lib/utils';

export default function HomePage() {
  const { locale, t } = useLocale();
  const { state, setSelectedCity } = useStore();

  // Curated 6 categories for Category Discovery (Section 04)
  const curatedCategories = CATEGORIES_SEED.filter((cat) =>
    ['fruits-frais', 'legumes-frais', 'huiles-argan', 'miels-amlou', 'epices-aromates', 'dattes-fruits-secs'].includes(cat.slug)
  );

  // Curated 4 seasonal products (Section 05)
  const seasonalProducts = state.products
    .filter((p) => p.category === 'fruits-frais' || p.category === 'legumes-frais')
    .slice(0, 4);

  // Curated 4 local specialty terroir products (Section 08)
  const specialtyProducts = state.products
    .filter((p) =>
      ['huiles-argan', 'miels-amlou', 'epices-aromates', 'dattes-fruits-secs'].includes(p.category)
    )
    .slice(0, 4);

  // Selected delivery zone for Section 09
  const activeZone =
    state.deliveryZones.find((z) => z.cityKey === state.selectedCity) ||
    state.deliveryZones[0];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* =========================================================================
          03 — HERO CAMPAIGN SECTION
          "Le meilleur de nos terres, chez vous."
          No decorative statistics, no cooperative counts, no review ratings.
         ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EDE8D8]/50 via-[#F7F4EB] to-[#F7F4EB] pt-8 sm:pt-14 pb-12 sm:pb-20 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-7 space-y-6 text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#233C2E]/10 text-[#233C2E] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#D58B51]" aria-hidden="true" />
                <span>{t('hero.badge')}</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#252820] leading-[1.12] tracking-tight">
                {t('hero.title')}
              </h1>

              <p className="text-base sm:text-lg text-[#5C6053] leading-relaxed max-w-2xl font-normal">
                {t('hero.subtitle')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/${locale}/shop`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#233C2E] text-white font-semibold text-sm hover:bg-[#1C3025] transition-all shadow-xs hover:shadow-sm cursor-pointer min-h-[48px]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('hero.cta_shop')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={`/${locale}/build-a-basket`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#D58B51] text-white font-bold text-sm hover:bg-[#c37a40] transition-all shadow-xs cursor-pointer min-h-[48px]"
                >
                  <Gift className="w-4 h-4" />
                  <span>{t('hero.cta_basket')}</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Immersive Moroccan Harvest Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#EDE8D8]">
                <Image
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85"
                  alt="Récolte Terroir Marocain"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />

                {/* Floating Harvest Spotlight Card */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E5DEC9] shadow-lg flex items-center justify-between text-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#233C2E] block">
                      Panier Semaine du Terroir
                    </span>
                    <span className="text-xs text-[#5C6053]">
                      Fruits, légumes & huiles de saison
                    </span>
                  </div>
                  <span className="text-base font-bold text-[#233C2E]">
                    220 MAD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          04 — CATEGORY DISCOVERY
          Curated selection of category cards with beautiful photography.
          No long text-heavy blocks. Includes "Voir toutes les catégories" link.
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E5DEC9] pb-4">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#252820]">
              {t('sections.categories_title')}
            </h2>
            <p className="text-sm text-[#5C6053] mt-1">
              {t('sections.categories_subtitle')}
            </p>
          </div>
          <Link
            href={`/${locale}/shop`}
            className="text-xs font-semibold text-[#233C2E] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>{t('sections.categories_view_all')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {curatedCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}/shop?cat=${cat.slug}`}
              className="group flex flex-col rounded-2xl bg-white border border-[#E5DEC9] overflow-hidden p-3 hover:shadow-md hover:border-[#233C2E]/60 transition-all text-start"
            >
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F7F4EB] mb-3">
                <Image
                  src={cat.image}
                  alt={cat.name[locale]}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-heading font-bold text-sm text-[#252820] group-hover:text-[#233C2E] transition-colors truncate">
                {cat.name[locale]}
              </h3>
              <span className="text-[11px] font-medium text-[#5C6053] mt-0.5 block">
                {cat.productCount} produits
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          05 — SEASONAL SELECTION
          Curated selection of four seasonal products with compact premium cards.
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E5DEC9] pb-4">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#252820]">
              {t('sections.featured_title')}
            </h2>
            <p className="text-sm text-[#5C6053] mt-1">
              {t('sections.featured_subtitle')}
            </p>
          </div>
          <Link
            href={`/${locale}/shop?cat=fruits-frais`}
            className="text-xs font-semibold text-[#233C2E] hover:underline flex items-center gap-1 shrink-0"
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
      </section>

      {/* =========================================================================
          06 — MOROCCAN TERROIR STORY
          One beautiful editorial photographic section with concise text.
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-[#E5DEC9] p-6 sm:p-10 lg:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6 text-start">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#233C2E]/10 text-[#233C2E] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#D58B51]" />
                <span>{t('sections.story_badge')}</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#252820] leading-tight">
                {t('sections.story_title')}
              </h2>

              <p className="text-sm sm:text-base text-[#5C6053] leading-relaxed">
                {t('sections.story_desc')}
              </p>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#E5DEC9]">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#233C2E]">
                    <Sun className="w-4 h-4 text-[#D58B51] shrink-0" />
                    <span>{t('sections.story_pillar_1_title')}</span>
                  </div>
                  <p className="text-[11px] text-[#5C6053] leading-snug">
                    {t('sections.story_pillar_1_desc')}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#233C2E]">
                    <MapPin className="w-4 h-4 text-[#D58B51] shrink-0" />
                    <span>{t('sections.story_pillar_2_title')}</span>
                  </div>
                  <p className="text-[11px] text-[#5C6053] leading-snug">
                    {t('sections.story_pillar_2_desc')}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#233C2E]">
                    <Scale className="w-4 h-4 text-[#D58B51] shrink-0" />
                    <span>{t('sections.story_pillar_3_title')}</span>
                  </div>
                  <p className="text-[11px] text-[#5C6053] leading-snug">
                    {t('sections.story_pillar_3_desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial Image */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden border border-[#E5DEC9] bg-[#EDE8D8]">
              <Image
                src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"
                alt="Oliveraie et Terroir du Maroc"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          07 — BASKET BUILDER FEATURE
          Distinctive promotional section for the interactive basket builder.
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#233C2E] via-[#2A4837] to-[#1C3025] text-white p-8 sm:p-12 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D58B51] text-white text-xs font-bold">
                <Gift className="w-3.5 h-3.5" />
                <span>Fonctionnalité Phare TERROIR</span>
              </span>

              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold leading-tight">
                {t('sections.basket_title')} : -10% immédiats sur votre sélection.
              </h2>

              <p className="text-sm sm:text-base text-[#D7E4C5] opacity-90 leading-relaxed max-w-xl">
                {t('sections.basket_subtitle')}
              </p>

              <div className="pt-2">
                <Link
                  href={`/${locale}/build-a-basket`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-[#233C2E] font-bold text-sm hover:bg-[#F7F4EB] transition-colors shadow-xs min-h-[48px]"
                >
                  <span>{t('hero.cta_basket')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 relative aspect-video lg:aspect-square rounded-2xl overflow-hidden border-2 border-white/20">
              <Image
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
                alt="Panier Sur Mesure"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          08 — LOCAL SPECIALTIES
          Show selected oils, honey, amlou, dates and spices.
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E5DEC9] pb-4">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#252820]">
              {t('sections.terroir_title')}
            </h2>
            <p className="text-sm text-[#5C6053] mt-1">
              {t('sections.terroir_subtitle')}
            </p>
          </div>
          <Link
            href={`/${locale}/shop?cat=huiles-argan`}
            className="text-xs font-semibold text-[#233C2E] hover:underline flex items-center gap-1 shrink-0"
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
      </section>

      {/* =========================================================================
          09 — DELIVERY EXPERIENCE
          Concise delivery simulation information with city selector.
          Does not display the entire delivery matrix as an overwhelming block.
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
        <div className="rounded-3xl bg-white border border-[#E5DEC9] p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Description */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#233C2E]/10 text-[#233C2E] text-xs font-bold">
                <Clock className="w-3.5 h-3.5 text-[#D58B51]" />
                <span>{t('sections.delivery_badge')}</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#252820]">
                {t('sections.delivery_title')}
              </h2>

              <p className="text-sm text-[#5C6053] leading-relaxed max-w-xl">
                {t('sections.delivery_desc')}
              </p>
            </div>

            {/* Right Column: Interactive City Simulator */}
            <div className="lg:col-span-5 rounded-2xl bg-[#FAF8F2] border border-[#E5DEC9] p-5 space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="home-city-select"
                  className="block text-xs font-bold text-[#252820]"
                >
                  {t('sections.delivery_city_select')}
                </label>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#E5DEC9]">
                  <MapPin className="w-4 h-4 text-[#233C2E] shrink-0" />
                  <select
                    id="home-city-select"
                    value={state.selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-[#252820] focus:outline-none cursor-pointer"
                  >
                    {state.deliveryZones.map((z) => (
                      <option key={z.cityKey} value={z.cityKey}>
                        {z.cityName[locale]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dynamic Zone Preview */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E5DEC9] text-xs">
                <div>
                  <span className="font-bold text-[#233C2E] block">
                    Frais : {formatCurrencyMAD(activeZone.deliveryFee, locale)}
                  </span>
                  <span className="text-[11px] text-[#5C6053]">
                    Gratuit dès {activeZone.freeDeliveryThreshold} MAD
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#EFF5E8] text-[#2E7D32] text-[10px] font-bold">
                  {activeZone.estimatedDeliveryHours}
                </span>
              </div>

              <Link
                href={`/${locale}/shop`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#233C2E] text-white text-xs font-bold hover:bg-[#1C3025] transition-colors"
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
