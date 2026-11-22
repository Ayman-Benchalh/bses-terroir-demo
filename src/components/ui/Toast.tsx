'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { ToastMessage } from '@/context/StoreContext';
import { cn } from '@/lib/utils';

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 end-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0" />,
          info: <Info className="w-5 h-5 text-[#0284C7] shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0" />,
        };

        const bgStyles = {
          success: 'bg-[#E8F5E9] border-[#2E7D32]/30 text-[#1B5E20]',
          info: 'bg-[#E0F2FE] border-[#0284C7]/30 text-[#075985]',
          warning: 'bg-[#FEF3C7] border-[#D97706]/30 text-[#92400E]',
          error: 'bg-[#FEE2E2] border-[#DC2626]/30 text-[#991B1B]',
        };

        return (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-lg transition-all animate-in fade-in slide-in-from-bottom-2 duration-300',
              bgStyles[toast.type]
            )}
          >
            <div className="flex items-center gap-3">
              {icons[toast.type]}
              <span className="text-sm font-medium">{toast.text}</span>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 text-black/40 hover:text-black/80 rounded transition-colors"
              aria-label="Fermer la notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
