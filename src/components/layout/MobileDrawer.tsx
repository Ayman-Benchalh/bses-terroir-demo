'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  ShoppingBag,
  Sparkles,
  Apple,
  Carrot,
  Gift,
  Tag,
  ListTodo,
  Truck,
  Heart,
  ShieldCheck,
  Phone,
  Mail,
  ChevronRight,
  LayoutDashboard,
} from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { TerroirLogo } from '@/components/brand/TerroirLogo';
import { cn } from '@/lib/utils';
import { SupportedLocale } from '@/lib/types';

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();
  const { locale, setLocale, isRTL, t } = useLocale();
  const { state, setSelectedCity } = useStore();

  // Background scroll lock and escape listener
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Close on route change
  const prevPathname = React.useRef(pathname);
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { href: `/${locale}/shop`, label: t('nav.shop'), icon: ShoppingBag },
    { href: `/${locale}/shop?wishlist=true`, label: t('nav.wishlist'), icon: Heart },
    { href: `/${locale}/shop?cat=fruits-frais`, label: t('nav.fruits_legumes'), icon: Apple },
    { href: `/${locale}/shop?cat=huiles-argan`, label: t('nav.terroir'), icon: Sparkles },
    { href: `/${locale}/shop?cat=epicerie-fine`, label: t('nav.epicerie'), icon: Carrot },
    { href: `/${locale}/shop?cat=paniers-coffrets`, label: t('nav.paniers'), icon: Gift },
    { href: `/${locale}/build-a-basket`, label: t('nav.build_basket'), icon: Gift, highlight: true },
    { href: `/${locale}/shopping-list`, label: t('nav.shopping_list'), icon: ListTodo },
    { href: `/${locale}/order-tracking`, label: t('nav.order_tracking'), icon: Truck },
    { href: `/${locale}/shop?promo=true`, label: t('nav.promotions'), icon: Tag },
  ];

  const languages: { code: SupportedLocale; label: string }[] = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('nav.menu')}
      className="fixed inset-0 z-[100] flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        className={cn(
          'relative z-10 flex flex-col w-[88vw] max-w-sm h-[100dvh] bg-[#F6F7F1] shadow-2xl border-[#D9E2D7]',
          isRTL
            ? 'mr-auto border-l rounded-l-2xl'
            : 'ml-auto border-r rounded-r-2xl'
        )}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between p-4 border-b border-[#D9E2D7] bg-[#193F30]/5 shrink-0">
          <Link href={`/${locale}`} onClick={onClose} className="block text-start">
            <TerroirLogo variant="full" />
          </Link>

          <button
            onClick={onClose}
            aria-label={t('nav.close')}
            className="w-10 h-10 rounded-lg bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#242D26] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Zone */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Delivery City Selector */}
          <div className="p-3.5 rounded-xl bg-white border border-[#D9E2D7] shadow-xs">
            <label className="block text-xs font-bold text-[#193F30] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span>📍 {t('nav.city_label')}</span>
            </label>
            <select
              value={state.selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full text-sm font-semibold text-[#242D26] bg-transparent border-0 focus:outline-none cursor-pointer"
            >
              {state.deliveryZones.map((zone) => (
                <option key={zone.cityKey} value={zone.cityKey}>
                  {zone.cityName[locale]} ({zone.deliveryFee} MAD)
                </option>
              ))}
            </select>
          </div>

          {/* Primary Navigation Links */}
          <nav className="space-y-1" aria-label="Menu Mobile">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-medium transition-colors min-h-[48px]',
                    isActive
                      ? 'bg-[#193F30] text-white font-semibold'
                      : item.highlight
                      ? 'bg-[#B7DB75]/25 text-[#193F30] hover:bg-[#B7DB75]/40 font-bold border border-[#B7DB75]/40'
                      : 'text-[#242D26] hover:bg-black/5'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn('w-5 h-5 shrink-0', isActive ? 'text-white' : 'text-[#193F30]')} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight
                    className={cn(
                      'w-4 h-4 opacity-60',
                      isRTL && 'rotate-180'
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Special Admin & Design System Links */}
          <div className="pt-2 border-t border-[#D9E2D7] space-y-1">
            <Link
              href={`/${locale}/admin-demo`}
              onClick={onClose}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#193F30] bg-[#193F30]/10 hover:bg-[#193F30]/20 min-h-[44px]"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t('nav.admin')}</span>
            </Link>

            <Link
              href={`/${locale}/design-system`}
              onClick={onClose}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#66756B] hover:bg-black/5 min-h-[44px]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t('nav.design_system')}</span>
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="p-3.5 rounded-xl bg-white border border-[#D9E2D7]">
            <p className="text-xs font-bold text-[#66756B] uppercase tracking-wider mb-2">
              🌐 Langue / Language / اللغة
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLocale(lang.code)}
                  className={cn(
                    'py-2 px-1 text-center text-xs font-semibold rounded-lg transition-colors min-h-[38px] cursor-pointer',
                    locale === lang.code
                      ? 'bg-[#193F30] text-white shadow-xs'
                      : 'bg-[#F6F7F1] text-[#242D26] hover:bg-[#EAECE1]'
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Official BSES Contact Support Box */}
          <div className="p-3.5 rounded-xl bg-[#E9EFEA] border border-[#D9E2D7] text-xs text-[#66756B] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#193F30]">
              <span>BSES Studio Support</span>
            </div>
            <a
              href="https://wa.me/212694991485"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#193F30] font-semibold hover:underline"
            >
              <Phone className="w-3.5 h-3.5 text-[#193F30]" />
              <span>WhatsApp: +212 694 991 485</span>
            </a>
            <a
              href="mailto:Bses47113@gmail.com"
              className="flex items-center gap-2 text-[#193F30] font-semibold hover:underline"
            >
              <Mail className="w-3.5 h-3.5 text-[#193F30]" />
              <span>Bses47113@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="p-3 text-center border-t border-[#D9E2D7] bg-[#193F30]/5 text-[11px] text-[#66756B] shrink-0 font-medium">
          TERROIR v7 • Fresh Organic Editorial • BSES
        </div>
      </div>
    </div>
  );
}
