'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface TerroirLogoProps {
  variant?: 'full' | 'compact' | 'symbol';
  theme?: 'dark' | 'light' | 'mono';
  className?: string;
  showSubtitle?: boolean;
}

/**
 * TERROIR V6 Logo — Les Carnets du Marché
 *
 * Design rationale:
 *  - Symbol: a stylised sectioned circle evoking a cross-section of a cut
 *    citrus fruit (orange/lemon) — a form immediately legible as produce,
 *    not a generic leaf-and-seed emblem.
 *  - Four geometric wedge segments of different widths convey terroir
 *    diversity and the idea of field partition / regional geography.
 *  - Wordmark: "TERROIR" set in tight uppercase with a custom geometric
 *    underline stroke in Citron yellow, echoing the stamp/label aesthetic.
 */
export function TerroirLogo({
  variant = 'full',
  theme = 'dark',
  className,
}: TerroirLogoProps) {
  const isLight = theme === 'light';
  const isMono = theme === 'mono';

  const inkColor = isLight ? '#F8F7F0' : '#1C1A22';
  const accentColor = isLight ? '#D4E84A' : '#D4E84A';
  const bgColor = isLight ? '#352B3E' : 'transparent';
  const symbolBg = isLight ? '#4F4059' : '#352B3E';
  const symbolAccent = '#D4E84A';

  if (variant === 'symbol') {
    return (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('shrink-0', className)}
        aria-label="TERROIR"
        role="img"
      >
        <circle cx="18" cy="18" r="18" fill={symbolBg} />
        {/* Citrus cross-section wedge segments */}
        {/* Segment 1 — large (Aubergine light) */}
        <path
          d="M18 18 L18 4 A14 14 0 0 1 29.12 10.88 Z"
          fill={isLight ? '#6B5A7A' : '#4F4059'}
        />
        {/* Segment 2 — medium (Citron) */}
        <path
          d="M18 18 L29.12 10.88 A14 14 0 0 1 32 18 Z"
          fill={symbolAccent}
        />
        {/* Segment 3 — small (Paprika) */}
        <path
          d="M18 18 L32 18 A14 14 0 0 1 24.75 29.75 Z"
          fill="#C75E3E"
        />
        {/* Segment 4 — large (mint subtle) */}
        <path
          d="M18 18 L24.75 29.75 A14 14 0 0 1 4 18 A14 14 0 0 1 18 4 Z"
          fill={isLight ? '#8BBCAA' : '#4A3D55'}
        />
        {/* Center circle — white/chalk */}
        <circle cx="18" cy="18" r="5.5" fill={isLight ? '#F8F7F0' : '#F8F7F0'} />
        {/* Center dot — Aubergine */}
        <circle cx="18" cy="18" r="2" fill={symbolBg} />
        {/* Separating lines */}
        <line x1="18" y1="18" x2="18" y2="4" stroke={isLight ? '#352B3E' : '#1C1A22'} strokeWidth="0.75" opacity="0.4" />
        <line x1="18" y1="18" x2="29.12" y2="10.88" stroke={isLight ? '#352B3E' : '#1C1A22'} strokeWidth="0.75" opacity="0.4" />
        <line x1="18" y1="18" x2="32" y2="18" stroke={isLight ? '#352B3E' : '#1C1A22'} strokeWidth="0.75" opacity="0.4" />
        <line x1="18" y1="18" x2="24.75" y2="29.75" stroke={isLight ? '#352B3E' : '#1C1A22'} strokeWidth="0.75" opacity="0.4" />
        <line x1="18" y1="18" x2="4" y2="18" stroke={isLight ? '#352B3E' : '#1C1A22'} strokeWidth="0.75" opacity="0.4" />
      </svg>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2 select-none', className)}>
        <TerroirLogo variant="symbol" theme={theme} />
        <span
          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', letterSpacing: '-0.02em' }}
          className={cn(
            'text-lg font-black leading-none',
            isLight ? 'text-[#F8F7F0]' : 'text-[#352B3E]'
          )}
        >
          TERROIR
        </span>
      </div>
    );
  }

  // Full variant
  return (
    <div className={cn('flex items-center gap-3 select-none group', className)}>
      {/* Symbol */}
      <div className="transition-transform group-hover:scale-105 duration-300">
        <TerroirLogo variant="symbol" theme={theme} />
      </div>

      {/* Wordmark + tagline */}
      <div className="flex flex-col leading-none">
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            letterSpacing: '-0.02em',
            color: isLight ? '#F8F7F0' : isMono ? '#000' : '#352B3E',
          }}
          className="text-xl font-black leading-none"
        >
          TERROIR
        </span>
        <span
          style={{ color: accentColor, fontFamily: 'var(--font-body)' }}
          className="text-[9px] font-bold uppercase tracking-widest mt-0.5 leading-none"
        >
          Les Carnets du Marché
        </span>
      </div>
    </div>
  );
}
