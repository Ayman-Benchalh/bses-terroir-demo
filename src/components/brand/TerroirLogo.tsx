'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface TerroirLogoProps {
  variant?: 'full' | 'compact' | 'symbol';
  theme?: 'dark' | 'light' | 'mono';
  className?: string;
  showSubtitle?: boolean;
}

export function TerroirLogo({
  variant = 'full',
  theme = 'dark',
  className,
  showSubtitle = true,
}: TerroirLogoProps) {
  const isLight = theme === 'light';

  // Standalone Symbol
  if (variant === 'symbol') {
    return (
      <div
        className={cn(
          'w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105',
          isLight ? 'bg-[#F7F4EB] border border-[#D7E4C5]' : 'bg-[#233C2E] text-white',
          className
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          {/* Subtle terrace curve */}
          <path
            d="M6 24C12 22 20 22 26 24"
            stroke={isLight ? '#233C2E' : '#D7E4C5'}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Left curved leaf blade */}
          <path
            d="M16 22C13 17 10 13 11 8C15 9 17 13 16 22Z"
            fill={isLight ? '#233C2E' : '#D7E4C5'}
          />
          {/* Right warm terracotta seed blade */}
          <path
            d="M16 22C19 17 22 13 21 8C17 9 15 13 16 22Z"
            fill="#D58B51"
          />
          {/* Morning sun point */}
          <circle cx="16" cy="6" r="1.6" fill={isLight ? '#D58B51' : '#F7F4EB'} />
        </svg>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2.5 sm:gap-3 group select-none', className)}>
      {/* Icon Mark */}
      <div
        className={cn(
          'w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105',
          isLight ? 'bg-[#F7F4EB] border border-[#D7E4C5]' : 'bg-[#233C2E] text-white'
        )}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <path
            d="M6 24C12 22 20 22 26 24"
            stroke={isLight ? '#233C2E' : '#D7E4C5'}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 22C13 17 10 13 11 8C15 9 17 13 16 22Z"
            fill={isLight ? '#233C2E' : '#D7E4C5'}
          />
          <path
            d="M16 22C19 17 22 13 21 8C17 9 15 13 16 22Z"
            fill="#D58B51"
          />
          <circle cx="16" cy="6" r="1.6" fill={isLight ? '#D58B51' : '#F7F4EB'} />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col text-start">
        <span
          className={cn(
            'font-heading text-xl sm:text-2xl font-extrabold tracking-tight leading-none',
            isLight ? 'text-[#F7F4EB]' : 'text-[#233C2E]'
          )}
        >
          TERROIR
        </span>
        {variant === 'full' && showSubtitle && (
          <span
            className={cn(
              'text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase mt-1 leading-none',
              isLight ? 'text-[#D7E4C5]' : 'text-[#D58B51]'
            )}
          >
            Récolte du Maroc
          </span>
        )}
      </div>
    </div>
  );
}
