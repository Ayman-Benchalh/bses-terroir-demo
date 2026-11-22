'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Truck,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2,
  Gift,
  Leaf,
  Sun,
  Award,
} from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { CATEGORIES_SEED } from '@/data/categories.seed';
import { ProductCard } from '@/components/shop/ProductCard';
import { formatCurrencyMAD } from '@/lib/utils';

export default function HomePage() {
  const { locale, t } = useLocale();
  const { state } = useStore();

  const featuredProduce = state.products
    .filter((p) => p.category === 'fruits-frais' || p.category === 'legumes-frais')
    .slice(0, 4);

  const featuredTerroir = state.products
    .filter((p) => p.category === 'huiles-argan' || p.category === 'miels-amlou' || p.category === 'epices-aromates')
    .slice(0, 4);

  const featuredBaskets = state.products
    .filter((p) => p.category === 'paniers-coffrets')
    .slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO CAMPAIGN SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F0DF]/60 via-[#FFFCF5] to-[#FFFCF5] pt-8 sm:pt-14 pb-12 sm:pb-20 border-b border-[#E8E1CF]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#315B3C]/10 text-[#315B3C] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('hero.badge')}</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#282E23] leading-[1.15] tracking-tight">
                {t('hero.title')}
              </h1>

              <p className="text-base sm:text-lg text-[#5D6855] leading-relaxed max-w-2xl font-normal">
                {t('hero.subtitle')}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/${locale}/shop`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#315B3C] text-white font-semibold text-sm hover:bg-[#264930] transition-all shadow-md hover:shadow-lg cursor-pointer min-h-[48px]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('hero.cta_shop')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={`/${locale}/build-a-basket`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#E7A84C] text-[#282E23] font-bold text-sm hover:bg-[#d89635] transition-all shadow-sm cursor-pointer min-h-[48px]"
                >
                  <Gift className="w-4 h-4" />
                  <span>{t('hero.cta_basket')}</span>
                </Link>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E8E1CF]/80 text-start">
                <div>
                  <span className="block font-heading text-2xl font-extrabold text-[#315B3C]">48+</span>
                  <span className="text-xs text-[#5D6855]">{t('hero.metric_coops')}</span>
                </div>
                <div>
                  <span className="block font-heading text-2xl font-extrabold text-[#315B3C]">100%</span>
                  <span className="text-xs text-[#5D6855]">{t('hero.metric_fresh')}</span>
                </div>
                <div>
                  <span className="block font-heading text-2xl font-extrabold text-[#315B3C]">8</span>
                  <span className="text-xs text-[#5D6855]">{t('hero.metric_cities')}</span>
                </div>
                <div>
                  <span className="block font-heading text-2xl font-extrabold text-[#315B3C]">4.9 / 5</span>
                  <span className="text-xs text-[#5D6855]">{t('hero.metric_rating')}</span>
                </div>
              </div>
            </div>

            {/* Visual Hero Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#F5F0DF]">
                <Image
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85"
                  alt="Panier Terroir Marocain"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />

                {/* Floating Tag Overlay */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E8E1CF] shadow-lg flex items-center justify-between text-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#315B3C] block">
                      Panier Semaine Famille
                    </span>
                    <span className="text-xs text-[#5D6855]">
                      Fruits, légumes & huiles de saison
                    </span>
                  </div>
                  <span className="text-base font-bold text-[#315B3C]">
                    220 MAD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES BROWSER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#282E23]">
              {t('sections.categories_title')}
            </h2>
            <p className="text-sm text-[#5D6855] mt-1">
              {t('sections.categories_subtitle')}
            </p>
          </div>
          <Link
            href={`/${locale}/shop`}
            className="text-xs font-semibold text-[#315B3C] hover:underline flex items-center gap-1"
          >
            <span>Voir toute la boutique</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
          {CATEGORIES_SEED.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}/shop?cat=${cat.slug}`}
              className="group flex flex-col rounded-2xl bg-white border border-[#E8E1CF] overflow-hidden p-3 hover:shadow-md hover:border-[#315B3C] transition-all"
            >
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F5F0DF] mb-2.5">
                <Image
                  src={cat.image}
                  alt={cat.name[locale]}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-heading font-semibold text-xs sm:text-sm text-[#282E23] group-hover:text-[#315B3C] transition-colors truncate">
                {cat.name[locale]}
              </h3>
              <p className="text-[10px] text-[#5D6855] line-clamp-1 mt-0.5">
                {cat.description[locale]}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED SEASON PRODUCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#282E23]">
              {t('sections.featured_title')}
            </h2>
            <p className="text-sm text-[#5D6855] mt-1">
              {t('sections.featured_subtitle')}
            </p>
          </div>
          <Link
            href={`/${locale}/shop?cat=fruits-frais`}
            className="text-xs font-semibold text-[#315B3C] hover:underline flex items-center gap-1"
          >
            <span>Voir les maraîchers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProduce.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 4. FLAGSHIP BUILD A BASKET BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#315B3C] to-[#203B27] text-white p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7A84C] text-[#282E23] text-xs font-bold">
                <Gift className="w-3.5 h-3.5" />
                <span>Fonctionnalité Phare TERROIR</span>
              </span>

              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold leading-tight">
                Composez votre panier sur-mesure et profitez de -10% immédiats.
              </h2>

              <p className="text-sm sm:text-base text-[#DDE7C8] opacity-90 leading-relaxed max-w-xl">
                Ajustez les quantités au demi-kilo près, assemblez vos fruits, légumes, huiles et douceurs beldi selon vos besoins hebdomadaires.
              </p>

              <div className="pt-2">
                <Link
                  href={`/${locale}/build-a-basket`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-[#315B3C] font-bold text-sm hover:bg-[#F5F0DF] transition-colors shadow-md min-h-[48px]"
                >
                  <span>Créer mon panier maintenant</span>
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

      {/* 5. TERROIR HERITAGE (Oils, Honey, Spices) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#282E23]">
              {t('sections.terroir_title')}
            </h2>
            <p className="text-sm text-[#5D6855] mt-1">
              {t('sections.terroir_subtitle')}
            </p>
          </div>
          <Link
            href={`/${locale}/shop?cat=huiles-argan`}
            className="text-xs font-semibold text-[#315B3C] hover:underline flex items-center gap-1"
          >
            <span>Voir les huiles & miels</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredTerroir.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 6. CURATED BASKETS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#282E23]">
              {t('sections.basket_title')}
            </h2>
            <p className="text-sm text-[#5D6855] mt-1">
              {t('sections.basket_subtitle')}
            </p>
          </div>
          <Link
            href={`/${locale}/shop?cat=paniers-coffrets`}
            className="text-xs font-semibold text-[#315B3C] hover:underline flex items-center gap-1"
          >
            <span>Tous les coffrets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBaskets.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 7. WHY CHOOSE TERROIR (6 Pillars) */}
      <section className="bg-[#F5F0DF]/60 py-16 border-y border-[#E8E1CF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#282E23]">
              {t('sections.why_title')}
            </h2>
            <p className="text-sm text-[#5D6855]">
              {t('sections.why_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-start">
            <div className="p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#315B3C]/10 text-[#315B3C] flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#282E23]">
                Coopératives Familiales Directes
              </h3>
              <p className="text-xs text-[#5D6855] leading-relaxed">
                Aucun intermédiaire superflu. Nous travaillons main dans la main avec les coopératives agricoles et apicoles de tout le Royaume.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#315B3C]/10 text-[#315B3C] flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#282E23]">
                Cueillette à Pleine Maturité
              </h3>
              <p className="text-xs text-[#5D6855] leading-relaxed">
                Nos fruits et légumes ne séjournent pas des mois en chambre froide : ils sont cueillis lorsqu’ils sont gorgés de saveurs et de vitamines.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#315B3C]/10 text-[#315B3C] flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#282E23]">
                Livraison Fraîche & Créneaux Précis
              </h3>
              <p className="text-xs text-[#5D6855] leading-relaxed">
                Véhicules isothermes et respect rigoureux de la chaîne du froid dans 8 agglomérations majeures du Maroc.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#315B3C]/10 text-[#315B3C] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#282E23]">
                Tarification au Poids Transparent
              </h3>
              <p className="text-xs text-[#5D6855] leading-relaxed">
                Moteur de calcul déterministe au centime près : vous payez exactement la quantité choisie (0.5 kg, 1 kg, ou formats économiques).
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#315B3C]/10 text-[#315B3C] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#282E23]">
                Paiement Serein à la Livraison
              </h3>
              <p className="text-xs text-[#5D6855] leading-relaxed">
                Inspectez la fraîcheur de vos produits devant votre porte avant de régler en espèces ou par carte bancaire.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#315B3C]/10 text-[#315B3C] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#282E23]">
                Fierté du Terroir National
              </h3>
              <p className="text-xs text-[#5D6855] leading-relaxed">
                Chaque achat valorise l’agriculture durable et le patrimoine culinaire marocain d’Ouezzane à Zagora.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. DELIVERY NETWORK SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-6">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#282E23]">
            {t('sections.delivery_title')}
          </h2>
          <p className="text-sm text-[#5D6855] mt-1">
            {t('sections.delivery_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {state.deliveryZones.map((z) => (
            <div
              key={z.id}
              className="p-4 rounded-2xl bg-white border border-[#E8E1CF] shadow-2xs space-y-1.5"
            >
              <span className="font-heading font-bold text-sm text-[#282E23] block">
                {z.cityName[locale]}
              </span>
              <p className="text-xs text-[#315B3C] font-semibold">
                Frais : {formatCurrencyMAD(z.deliveryFee, locale)}
              </p>
              <p className="text-[11px] text-[#5D6855]">
                Gratuit dès {z.freeDeliveryThreshold} MAD
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
