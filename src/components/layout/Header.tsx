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
  Shield,
} from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { MobileDrawer } from './MobileDrawer';
import { TerroirLogo } from '@/components/brand/TerroirLogo';
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
    { href: `/${locale}/shop?cat=epicerie-fine`, label: t('nav.epicerie'), hideBelowXl: true },
    { href: `/${locale}/shop?cat=paniers-coffrets`, label: t('nav.paniers'), hideBelow2xl: true },
    { href: `/${locale}/build-a-basket`, label: t('nav.build_basket'), highlight: true },
    { href: `/${locale}/shop?promo=true`, label: t('nav.promotions'), hideBelow2xl: true },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const handleLanguageChange = (newLocale: SupportedLocale) => {
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
      <header className="sticky top-0 z-50 w-full max-w-full overflow-x-clip bg-[#F7F4EB]/95 backdrop-blur-md border-b border-[#E5DEC9]">
        {/* Announcement Bar */}
        <div className="bg-[#233C2E] text-white text-xs py-2 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 min-w-0">
            <p className="truncate font-medium flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#D58B51] shrink-0" aria-hidden="true" />
              <span className="truncate">{t('announcement.message')}</span>
            </p>

            <div className="hidden md:flex items-center gap-4 shrink-0">
              <span className="text-[#D7E4C5] font-medium text-[11px] tracking-wide">
                {t('announcement.free_shipping')}
              </span>
              <div className="h-3 w-px bg-white/20" />
              {/* Language Switcher */}
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#D7E4C5]" />
                <div className="flex items-center gap-1 text-[11px] font-semibold">
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
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl text-[#252820] hover:bg-[#FAF8F2] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label={t('nav.menu')}
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link href={`/${locale}`} className="block">
                <TerroirLogo variant="compact" />
              </Link>
            </div>

            {/* Zone 2: Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-2 shrink min-w-0"
              aria-label="Navigation principale"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-2.5 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all duration-150 whitespace-nowrap',
                      link.hideBelowXl && 'hidden xl:inline-block',
                      link.hideBelow2xl && 'hidden 2xl:inline-block',
                      isActive
                        ? 'bg-[#233C2E] text-white shadow-xs'
                        : link.highlight
                        ? 'bg-[#D58B51]/15 text-[#9C5A25] hover:bg-[#D58B51]/25 font-semibold'
                        : 'text-[#252820] hover:bg-black/5'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Zone 3: Actions (Search, City, Wishlist, Cart, Admin) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Delivery City Selector (Desktop wide screen) */}
              <div className="hidden 2xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E5DEC9] shadow-2xs text-xs max-w-[220px]">
                <MapPin className="w-3.5 h-3.5 text-[#233C2E] shrink-0" />
                <select
                  value={state.selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-[#252820] focus:outline-none cursor-pointer truncate max-w-[170px]"
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
                className="p-2.5 rounded-xl text-[#252820] hover:bg-black/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label={t('nav.search_placeholder')}
              >
                <Search className="w-5 h-5 text-[#252820]" />
              </button>

              {/* Wishlist Link (Desktop/Tablet) */}
              <Link
                href={`/${locale}/shop?wishlist=true`}
                className="hidden sm:flex relative p-2.5 rounded-xl text-[#252820] hover:bg-black/5 transition-colors min-h-[44px] min-w-[44px] items-center justify-center"
                aria-label={t('nav.wishlist')}
              >
                <Heart className="w-5 h-5 text-[#252820]" />
                {state.wishlist.length > 0 && (
                  <span className="absolute top-1.5 end-1.5 w-4 h-4 rounded-full bg-[#D58B51] text-white text-[10px] font-bold flex items-center justify-center">
                    {state.wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={openCartDrawer}
                className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#233C2E] text-white hover:bg-[#1C3025] shadow-xs transition-all min-h-[44px] cursor-pointer"
                aria-label={`${t('nav.cart')} (${cartCount})`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-[#D58B51] text-white">
                  {cartCount}
                </span>
                <span className="hidden md:inline text-sm font-semibold">
                  {t('nav.cart')}
                </span>
              </button>

              {/* Discreet Admin Demo Button */}
              <Link
                href={`/${locale}/admin-demo`}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#233C2E] border border-[#233C2E]/25 bg-white hover:bg-[#233C2E]/5 min-h-[44px] transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            </div>
          </div>

          {/* Expandable Live Search Bar */}
          {isSearchOpen && (
            <div className="py-3 px-2 border-t border-[#E5DEC9] animate-in fade-in slide-in-from-top-2 duration-200">
              <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('nav.search_placeholder')}
                  className="w-full h-12 ps-12 pe-24 rounded-2xl border border-[#233C2E] bg-white text-base text-[#252820] focus:outline-none focus:ring-2 focus:ring-[#233C2E]/20 shadow-xs"
                />
                <button
                  type="submit"
                  className="absolute end-2 top-2 h-8 px-4 rounded-xl bg-[#233C2E] text-white text-xs font-semibold hover:bg-[#1C3025] transition-colors cursor-pointer"
                >
                  {t('common.search')}
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Accessible Full-Height Mobile Drawer */}
      <MobileDrawer isOpen={isMobileMenuOpen} onClose={handleCloseMobileMenu} />
    </>
  );
}
