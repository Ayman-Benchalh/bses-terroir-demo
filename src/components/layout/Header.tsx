'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  ShoppingBag,
  Search,
  Heart,
  Globe,
  MapPin,
  Sparkles,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { MobileDrawer } from './MobileDrawer';
import { SupportedLocale } from '@/lib/types';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, setLocale, isRTL, t } = useLocale();
  const {
    cartCount,
    openCartDrawer,
    state,
    setSelectedCity,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleCloseMobileMenu = React.useCallback(() => setIsMobileMenuOpen(false), []);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { href: `/${locale}/shop`, label: t('nav.shop') },
    { href: `/${locale}/shop?cat=fruits-frais`, label: t('nav.fruits_legumes') },
    { href: `/${locale}/shop?cat=huiles-argan`, label: t('nav.terroir') },
    { href: `/${locale}/shop?cat=epicerie-fine`, label: t('nav.epicerie') },
    { href: `/${locale}/shop?cat=paniers-coffrets`, label: t('nav.paniers') },
    { href: `/${locale}/build-a-basket`, label: t('nav.build_basket'), highlight: true },
    { href: `/${locale}/shop?promo=true`, label: t('nav.promotions') },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const handleLanguageChange = (newLocale: SupportedLocale) => {
    // Preserve current path while replacing locale segment
    const segments = pathname.split('/');
    if (segments[1] === locale) {
      segments[1] = newLocale;
      const targetPath = segments.join('/') || `/${newLocale}`;
      setLocale(newLocale);
      router.push(targetPath);
    } else {
      setLocale(newLocale);
      router.push(`/${newLocale}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#FFFCF5]/95 backdrop-blur-md border-b border-[#E8E1CF]">
        {/* Announcement Bar - Cleanly separated from main navigation */}
        <div className="bg-[#315B3C] text-white text-xs py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <p className="truncate font-medium flex items-center gap-1.5">
              <span>🌾</span>
              <span>{t('announcement.message')}</span>
            </p>

            <div className="hidden md:flex items-center gap-4 shrink-0">
              <span className="text-[#DDE7C8] font-medium">
                {t('announcement.free_shipping')}
              </span>
              <div className="h-3 w-px bg-white/20" />
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#DDE7C8]" />
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  {(['fr', 'en', 'ar'] as SupportedLocale[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={cn(
                        'uppercase px-1.5 py-0.5 rounded transition-colors cursor-pointer',
                        locale === lang
                          ? 'bg-white/20 text-white font-bold'
                          : 'text-white/70 hover:text-white'
                      )}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Desktop & Mobile Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Zone 1: Brand Logo & Mobile Trigger */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-xl text-[#282E23] hover:bg-[#F5F0DF] transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer"
                aria-label={t('nav.menu')}
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link
                href={`/${locale}`}
                className="flex items-center gap-3 group text-start"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#315B3C] text-white flex items-center justify-center font-heading text-2xl font-bold shadow-md transition-transform group-hover:scale-105">
                  T
                </div>
                <div>
                  <span className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-[#315B3C] block leading-none">
                    {t('brand.name')}
                  </span>
                  <span className="text-[11px] font-medium text-[#5D6855] hidden sm:block tracking-wide mt-1">
                    {t('brand.tagline')}
                  </span>
                </div>
              </Link>
            </div>

            {/* Zone 2: Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-2"
              aria-label="Navigation principale"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 whitespace-nowrap',
                      isActive
                        ? 'bg-[#315B3C] text-white shadow-xs'
                        : link.highlight
                        ? 'bg-[#E7A84C]/15 text-[#855113] hover:bg-[#E7A84C]/25 font-semibold'
                        : 'text-[#282E23] hover:bg-[#F5F0DF]'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Zone 3: Actions (Search, City, Wishlist, Cart, Admin) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Delivery City Selector (Desktop) */}
              <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8E1CF] shadow-2xs text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#315B3C] shrink-0" />
                <select
                  value={state.selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-[#282E23] focus:outline-none cursor-pointer"
                  aria-label={t('nav.city_label')}
                >
                  {state.deliveryZones.map((zone) => (
                    <option key={zone.cityKey} value={zone.cityKey}>
                      {zone.cityName[locale]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Trigger Button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-xl text-[#282E23] hover:bg-[#F5F0DF] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label={t('nav.search_placeholder')}
              >
                <Search className="w-5 h-5 text-[#282E23]" />
              </button>

              {/* Wishlist Link */}
              <Link
                href={`/${locale}/shop?wishlist=true`}
                className="relative p-2.5 rounded-xl text-[#282E23] hover:bg-[#F5F0DF] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={t('nav.wishlist')}
              >
                <Heart className="w-5 h-5 text-[#282E23]" />
                {state.wishlist.length > 0 && (
                  <span className="absolute top-1.5 end-1.5 w-4 h-4 rounded-full bg-[#E7A84C] text-[#282E23] text-[10px] font-bold flex items-center justify-center">
                    {state.wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={openCartDrawer}
                className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#315B3C] text-white hover:bg-[#264930] shadow-sm transition-all min-h-[44px] cursor-pointer"
                aria-label={`${t('nav.cart')} (${cartCount})`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-[#E7A84C] text-[#282E23]">
                  {cartCount}
                </span>
                <span className="hidden md:inline text-sm font-semibold">
                  {t('nav.cart')}
                </span>
              </button>

              {/* Admin Sandbox Button */}
              <Link
                href={`/${locale}/admin-demo`}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#315B3C] border border-[#315B3C]/30 bg-white hover:bg-[#315B3C]/5 min-h-[44px] transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            </div>
          </div>

          {/* Expandable Live Search Bar */}
          {isSearchOpen && (
            <div className="py-3 px-2 border-t border-[#E8E1CF] animate-in fade-in slide-in-from-top-2 duration-200">
              <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('nav.search_placeholder')}
                  className="w-full h-12 ps-12 pe-24 rounded-2xl border border-[#315B3C] bg-white text-base text-[#282E23] focus:outline-none focus:ring-2 focus:ring-[#315B3C]/20 shadow-sm"
                />
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5D6855]" />
                <button
                  type="submit"
                  className="absolute end-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#315B3C] text-white text-xs font-semibold rounded-xl hover:bg-[#264930] transition-colors"
                >
                  OK
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Critical Quality Gate: Verified Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
      />
    </>
  );
}
