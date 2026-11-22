'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, MessageCircle, Mail, ChevronUp, ChevronDown, ExternalLink, X } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { cn } from '@/lib/utils';

export function FloatingBsesWidget() {
  const pathname = usePathname();
  const { locale, isRTL, t } = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // If on checkout page on small mobile viewports, keep minimized so it never obstructs inputs
  const isCheckout = pathname.includes('/checkout');

  if (isDismissed) return null;

  const prefilledWhatsAppMessage = encodeURIComponent(
    "Bonjour BSES, j'ai découvert votre démonstration TERROIR et je souhaite créer une boutique e-commerce pour mon activité."
  );

  return (
    <aside
      aria-label="Widget de démonstration BSES"
      className={cn(
        'fixed bottom-4 z-30 transition-all duration-300 font-sans',
        isRTL ? 'left-4' : 'right-4',
        isCheckout && 'hidden sm:block' // Protect mobile checkout from any floating obstructions
      )}
    >
      {/* Minimized Pill */}
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#282E23] text-white shadow-xl hover:bg-[#315B3C] transition-all border border-white/20 select-none cursor-pointer group text-xs font-medium"
          aria-expanded="false"
          aria-label={t('bses.expand')}
        >
          <div className="w-2 h-2 rounded-full bg-[#E7A84C] animate-pulse" />
          <span className="font-semibold tracking-wide">BSES Demo</span>
          <ChevronUp className="w-3.5 h-3.5 opacity-60 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      ) : (
        /* Expanded Floating Card */
        <div className="w-80 rounded-2xl bg-[#282E23] text-white p-4 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#315B3C] text-white flex items-center justify-center font-bold text-xs">
                BS
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide">
                  BSES Flagship Project
                </h4>
                <p className="text-[10px] text-[#DDE7C8] opacity-80">
                  Benchalh Solution E-commerce
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded text-white/60 hover:text-white transition-colors"
                aria-label={t('bses.minimize')}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsDismissed(true)}
                className="p-1 rounded text-white/40 hover:text-white transition-colors"
                aria-label="Masquer le badge"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-[11px] text-white/80 leading-relaxed mb-3">
            {t('bses.description')}
          </p>

          <div className="space-y-2">
            <a
              href={`https://wa.me/212694991485?text=${prefilledWhatsAppMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-[#25D366] text-[#12361d] font-bold text-xs hover:bg-[#20ba59] transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t('bses.cta_whatsapp')}</span>
            </a>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="mailto:Bses47113@gmail.com"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-colors text-[11px]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Studio</span>
              </a>

              <Link
                href={`/${locale}/admin-demo`}
                onClick={() => setIsExpanded(false)}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#E7A84C] text-[#282E23] font-semibold hover:bg-[#d49335] transition-colors text-[11px]"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Démo Admin</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
