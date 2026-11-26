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
 * TERROIR V7 Logo — Fresh Organic Editorial
 *
 * Design rationale:
 *  - Symbol: a geometric sectioned circle evoking a cross-section of a cut
 *    citrus fruit (Berkane clementine or lemon) in organic forest & lime harmony.
 *  - Four wedges of varying angles embody regional terroir diversity:
 *    Forest Green (#193F30), Fresh Lime (#B7DB75), Harvest Yellow (#F1C94A), and Sage (#A0BBAA).
 *  - Wordmark: "TERROIR" set in refined Fraunces italic serif.
 */
export function TerroirLogo({
  variant = 'full',
  theme = 'dark',
  className,
}: TerroirLogoProps) {
  const isLight = theme === 'light';
  const isMono = theme === 'mono';

  const symbolBg = isLight ? '#245A45' : '#193F30';
  const symbolAccent = isLight ? '#B7DB75' : '#B7DB75';

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
        {/* Segment 1 — Forest Green light */}
        <path
          d="M18 18 L18 4 A14 14 0 0 1 29.12 10.88 Z"
          fill={isLight ? '#32725A' : '#245A45'}
        />
        {/* Segment 2 — Fresh Lime */}
        <path
          d="M18 18 L29.12 10.88 A14 14 0 0 1 32 18 Z"
          fill={symbolAccent}
        />
        {/* Segment 3 — Harvest Yellow */}
        <path
          d="M18 18 L32 18 A14 14 0 0 1 24.75 29.75 Z"
          fill="#F1C94A"
        />
        {/* Segment 4 — Sage / Herbal Green */}
        <path
          d="M18 18 L24.75 29.75 A14 14 0 0 1 4 18 A14 14 0 0 1 18 4 Z"
          fill={isLight ? '#88A892' : '#2F5C4A'}
        />
        {/* Center circle — Warm Ivory */}
        <circle cx="18" cy="18" r="5.5" fill="#F6F7F1" />
        {/* Center dot — Forest Green */}
        <circle cx="18" cy="18" r="2" fill={symbolBg} />
        {/* Separating lines */}
        <line x1="18" y1="18" x2="18" y2="4" stroke={isLight ? '#193F30' : '#242D26'} strokeWidth="0.75" opacity="0.3" />
        <line x1="18" y1="18" x2="29.12" y2="10.88" stroke={isLight ? '#193F30' : '#242D26'} strokeWidth="0.75" opacity="0.3" />
        <line x1="18" y1="18" x2="32" y2="18" stroke={isLight ? '#193F30' : '#242D26'} strokeWidth="0.75" opacity="0.3" />
        <line x1="18" y1="18" x2="24.75" y2="29.75" stroke={isLight ? '#193F30' : '#242D26'} strokeWidth="0.75" opacity="0.3" />
        <line x1="18" y1="18" x2="4" y2="18" stroke={isLight ? '#193F30' : '#242D26'} strokeWidth="0.75" opacity="0.3" />
      </svg>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2.5 select-none', className)}>
        <TerroirLogo variant="symbol" theme={theme} />
        <span
          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', letterSpacing: '-0.02em' }}
          className={cn(
            'text-xl font-black leading-none',
            isLight ? 'text-[#F6F7F1]' : isMono ? '#000000' : 'text-[#193F30]'
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
      <div className="transition-transform group-hover:scale-105 duration-300">
        <TerroirLogo variant="symbol" theme={theme} />
      </div>

      <div className="flex flex-col leading-none">
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            letterSpacing: '-0.02em',
            color: isLight ? '#F6F7F1' : isMono ? '#000000' : '#193F30',
          }}
          className="text-xl font-black leading-none"
        >
          TERROIR
        </span>
        <span
          style={{ color: isLight ? '#B7DB75' : '#193F30', fontFamily: 'var(--font-body)' }}
          className="text-[9px] font-bold uppercase tracking-widest mt-0.5 leading-none opacity-90"
        >
          Les Carnets du Marché
        </span>
      </div>
    </div>
  );
}
