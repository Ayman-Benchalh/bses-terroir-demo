'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { SupportedLocale } from '@/lib/types';
import fr from '@/lib/i18n/fr.json';
import en from '@/lib/i18n/en.json';
import ar from '@/lib/i18n/ar.json';

const dictionaries: Record<SupportedLocale, Record<string, unknown>> = {
  fr: fr as unknown as Record<string, unknown>,
  en: en as unknown as Record<string, unknown>,
  ar: ar as unknown as Record<string, unknown>,
};

interface LocaleContextType {
  locale: SupportedLocale;
  isRTL: boolean;
  t: (path: string, params?: Record<string, string | number>) => string;
  setLocale: (locale: SupportedLocale) => void;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({
  children,
  initialLocale = 'fr',
}: {
  children: React.ReactNode;
  initialLocale?: SupportedLocale;
}) {
  const [locale, setLocaleState] = useState<SupportedLocale>(initialLocale);
  const isRTL = locale === 'ar';

  useEffect(() => {
    // Synchronize HTML dir and lang attributes & signal hydration completion
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.body.dataset.hydrated = 'true';
    }
  }, [locale, isRTL]);

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
      document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    }
  };

  const t = (path: string, params?: Record<string, string | number>): string => {
    const keys = path.split('.');
    let current: unknown = dictionaries[locale] || dictionaries.fr;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
        current = (current as Record<string, unknown>)[key];
      } else {
        // Fallback to French dictionary if key is missing in active locale
        let fallback: unknown = dictionaries.fr;
        for (const fbKey of keys) {
          if (fallback && typeof fallback === 'object' && fbKey in (fallback as Record<string, unknown>)) {
            fallback = (fallback as Record<string, unknown>)[fbKey];
          } else {
            return path; // Return raw key if not found
          }
        }
        current = fallback;
        break;
      }
    }

    if (typeof current !== 'string') {
      return path;
    }

    let result = current;
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
      });
    }

    return result;
  };

  return (
    <LocaleContext.Provider value={{ locale, isRTL, t, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
