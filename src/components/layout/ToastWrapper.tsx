'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ToastContainer } from '@/components/ui/Toast';

export function ToastWrapper() {
  const { toasts, removeToast } = useStore();
  return <ToastContainer toasts={toasts} onDismiss={removeToast} />;
}
