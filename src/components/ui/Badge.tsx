import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'honey' | 'sage' | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'default', size = 'sm', children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full select-none';

  const variants = {
    default: 'bg-[#233C2E]/10 text-[#233C2E] border border-[#233C2E]/20',
    success: 'bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/20',
    warning: 'bg-[#FEF3C7] text-[#D97706] border border-[#D97706]/20',
    error: 'bg-[#FEE2E2] text-[#DC2626] border border-[#DC2626]/20',
    honey: 'bg-[#D58B51]/15 text-[#9C5A25] border border-[#D58B51]/30',
    sage: 'bg-[#D7E4C5] text-[#252820] border border-[#252820]/10',
    outline: 'border border-[#E5DEC9] text-[#5C6053] bg-white/70',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
