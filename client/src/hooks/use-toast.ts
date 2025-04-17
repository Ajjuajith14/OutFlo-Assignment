"use client";

import { useState } from "react";

type ToastType = "success" | "error" | "info";

interface ToastOptions {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Array<ToastOptions & { id: string }>>([]);

  const toast = (options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...options, id };

    setToasts((prev) => [...prev, newToast]);

    if (options.duration !== Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, options.duration || 3000);
    }

    return id;
  };

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toast, dismiss, toasts };
}