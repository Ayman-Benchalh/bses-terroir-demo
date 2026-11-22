import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'honey' | 'sage' | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'default', size = 'sm', children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full select-none';

  const variants = {
    default: 'bg-[#315B3C]/10 text-[#315B3C] border border-[#315B3C]/20',
    success: 'bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/20',
    warning: 'bg-[#FEF3C7] text-[#D97706] border border-[#D97706]/20',
    error: 'bg-[#FEE2E2] text-[#DC2626] border border-[#DC2626]/20',
    honey: 'bg-[#E7A84C]/20 text-[#855113] border border-[#E7A84C]/30',
    sage: 'bg-[#DDE7C8] text-[#282E23] border border-[#282E23]/10',
    outline: 'border border-[#E8E1CF] text-[#5D6855] bg-white/60',
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
