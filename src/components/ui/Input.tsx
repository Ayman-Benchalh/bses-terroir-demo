'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const generatedId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className="w-full space-y-1.5 text-start">
        {label && (
          <label htmlFor={generatedId} className="block text-sm font-medium text-[#252820]">
            {label}
          </label>
        )}
        <input
          id={generatedId}
          ref={ref}
          className={cn(
            'w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-[#E5DEC9] bg-white text-[#252820] text-base placeholder:text-[#8C9183] transition-colors',
            'focus:outline-none focus:border-[#233C2E] focus:ring-2 focus:ring-[#233C2E]/10',
            error && 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/10',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[#DC2626] mt-1 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-[#5C6053] mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
