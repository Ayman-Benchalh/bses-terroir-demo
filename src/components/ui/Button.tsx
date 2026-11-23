'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'honey';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none rounded-xl active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2';

    const variants = {
      primary:
        'bg-[#233C2E] text-white hover:bg-[#1C3025] shadow-xs hover:shadow-sm focus-visible:outline-[#233C2E]',
      secondary:
        'bg-[#D7E4C5] text-[#252820] hover:bg-[#c9d8b3] focus-visible:outline-[#233C2E]',
      outline:
        'border border-[#233C2E] text-[#233C2E] hover:bg-[#233C2E]/5 focus-visible:outline-[#233C2E]',
      ghost:
        'text-[#252820] hover:bg-black/5 hover:text-[#233C2E] focus-visible:outline-[#233C2E]',
      danger:
        'bg-[#DC2626] text-white hover:bg-[#B91C1C] focus-visible:outline-[#DC2626]',
      honey:
        'bg-[#D58B51] text-white font-semibold hover:bg-[#c37a40] shadow-xs hover:shadow-sm focus-visible:outline-[#D58B51]',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm min-h-[36px]',
      md: 'h-11 px-5 text-base min-h-[44px]',
      lg: 'h-13 px-7 text-lg min-h-[48px]', // Material 3 recommended touch target
      icon: 'h-11 w-11 p-0 min-h-[44px] min-w-[44px] rounded-xl',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span>{children}</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
