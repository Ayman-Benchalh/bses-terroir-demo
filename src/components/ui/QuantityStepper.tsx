'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface QuantityStepperProps {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 999,
  step = 1,
  unit,
  disabled = false,
  size = 'md',
  className,
}: QuantityStepperProps) {
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextVal = Math.round((value - step) * 100) / 100;
    if (nextVal >= min) {
      onChange(nextVal);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextVal = Math.round((value + step) * 100) / 100;
    if (nextVal <= max) {
      onChange(nextVal);
    }
  };

  const isMin = value <= min;
  const isMax = value >= max;

  const sizeClasses = {
    sm: 'h-9 text-sm',
    md: 'h-11 text-base', // Material 3 standard min 44px
    lg: 'h-13 text-lg', // 48px+ touch target
  };

  const btnSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-xl border border-[#E5DEC9] bg-white p-1 select-none',
        sizeClasses[size],
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || isMin}
        aria-label="Diminuer la quantité"
        className={cn(
          'flex items-center justify-center rounded-lg text-[#252820] transition-colors hover:bg-[#F7F4EB] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer',
          btnSizes[size]
        )}
      >
        <Minus className="w-4 h-4" />
      </button>

      <span className="min-w-[48px] px-2 text-center font-semibold text-[#252820]">
        {value} {unit && <span className="text-xs font-normal text-[#5C6053]">{unit}</span>}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || isMax}
        aria-label="Augmenter la quantité"
        className={cn(
          'flex items-center justify-center rounded-lg text-[#252820] transition-colors hover:bg-[#F7F4EB] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer',
          btnSizes[size]
        )}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
