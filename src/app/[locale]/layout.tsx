import React from 'react';
import { notFound } from 'next/navigation';
import { SupportedLocale } from '@/lib/types';
import { LocaleProvider } from '@/context/LocaleContext';
import { StoreProvider } from '@/context/StoreContext';
import { Header } from '@/components/layout/Header';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { FloatingBsesWidget } from '@/components/layout/FloatingBsesWidget';
import { ToastWrapper } from '@/components/layout/ToastWrapper';
import { Footer } from '@/components/layout/Footer';

const validLocales: SupportedLocale[] = ['fr', 'en', 'ar'];

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'ar' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!validLocales.includes(locale as SupportedLocale)) {
    notFound();
  }

  const typedLocale = locale as SupportedLocale;

  return (
    <LocaleProvider initialLocale={typedLocale}>
      <StoreProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <FloatingBsesWidget />
          <ToastWrapper />
        </div>
      </StoreProvider>
    </LocaleProvider>
  );
}
