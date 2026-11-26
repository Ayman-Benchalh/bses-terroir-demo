'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, ShieldCheck } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { TerroirLogo } from '@/components/brand/TerroirLogo';

export function Footer() {
  const { locale, t } = useLocale();
  const { showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      showToast('Merci ! Votre inscription à la lettre d’information a été enregistrée.', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#193F30] text-[#F6F7F1] border-t border-[#122E23] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4 text-start">
            <Link href={`/${locale}`} className="block">
              <TerroirLogo variant="full" theme="light" />
            </Link>

            <p className="text-sm text-[#F6F7F1]/80 opacity-90 leading-relaxed max-w-sm">
              {t('brand.tagline')} {t('sections.story_desc')}
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                📬 Lettre des Récoltes & Produits Frais
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Votre adresse email..."
                  className="flex-1 px-3.5 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#B7DB75]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#B7DB75] text-[#193F30] font-bold text-xs rounded-lg hover:bg-[#a6cb64] transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>S’inscrire</span>
                </button>
              </form>
            </div>
          </div>

          {/* Col 2: Univers & Catalogue */}
          <div className="space-y-3 text-start">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('sections.categories_title')}
            </h4>
            <ul className="space-y-2 text-sm text-[#F6F7F1]/75">
              <li>
                <Link href={`/${locale}/shop?cat=fruits-frais`} className="hover:text-white transition-colors">
                  Fruits Frais de Saison
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/shop?cat=legumes-frais`} className="hover:text-white transition-colors">
                  Légumes du Potager
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/shop?cat=huiles-argan`} className="hover:text-white transition-colors">
                  Huiles d’Olive & Argan
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/shop?cat=miels-amlou`} className="hover:text-white transition-colors">
                  Miels Purs & Amlou
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/shop?cat=epices-aromates`} className="hover:text-white transition-colors">
                  Épices & Safran
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/shop?cat=dattes-fruits-secs`} className="hover:text-white transition-colors">
                  Dattes Mejhoul & Fruits Secs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Expérience */}
          <div className="space-y-3 text-start">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Expérience TERROIR
            </h4>
            <ul className="space-y-2 text-sm text-[#F6F7F1]/75">
              <li>
                <Link href={`/${locale}/build-a-basket`} className="hover:text-white transition-colors">
                  {t('nav.build_basket')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/shopping-list`} className="hover:text-white transition-colors">
                  {t('nav.shopping_list')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/order-tracking`} className="hover:text-white transition-colors">
                  {t('nav.order_tracking')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/admin-demo`} className="hover:text-white transition-colors">
                  {t('nav.admin')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/design-system`} className="hover:text-white transition-colors">
                  {t('nav.design_system')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & BSES Flagship */}
          <div className="space-y-3 text-start">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact & Studio BSES
            </h4>
            <div className="space-y-2.5 text-xs text-[#F6F7F1]/80">
              <a
                href="https://wa.me/212694991485"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#B7DB75] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#B7DB75] shrink-0" />
                <span>WhatsApp : +212 694 991 485</span>
              </a>

              <a
                href="mailto:Bses47113@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#F1C94A] shrink-0" />
                <span>Bses47113@gmail.com</span>
              </a>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-[#B7DB75] shrink-0 mt-0.5" />
                <span>Livraison : Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir.</span>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-[11px] text-[#F6F7F1]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B7DB75]" />
                  <span>Démonstration E-commerce BSES</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F6F7F1]/60">
          <p>
            © {new Date().getFullYear()} TERROIR. {t('common.rights_reserved')}
          </p>
          <p className="flex items-center gap-1">
            <span>Conçu & développé par</span>
            <strong className="text-white">BSES — Benchalh Solution E-commerce System</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
