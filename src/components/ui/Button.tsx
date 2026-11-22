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
        'bg-[#315B3C] text-white hover:bg-[#264930] shadow-sm hover:shadow focus-visible:outline-[#315B3C]',
      secondary:
        'bg-[#DDE7C8] text-[#282E23] hover:bg-[#d0ddb5] focus-visible:outline-[#315B3C]',
      outline:
        'border border-[#315B3C] text-[#315B3C] hover:bg-[#315B3C]/5 focus-visible:outline-[#315B3C]',
      ghost:
        'text-[#282E23] hover:bg-black/5 hover:text-[#315B3C] focus-visible:outline-[#315B3C]',
      danger:
        'bg-[#DC2626] text-white hover:bg-[#B91C1C] focus-visible:outline-[#DC2626]',
      honey:
        'bg-[#E7A84C] text-[#282E23] font-semibold hover:bg-[#d89635] shadow-sm hover:shadow focus-visible:outline-[#E7A84C]',
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
