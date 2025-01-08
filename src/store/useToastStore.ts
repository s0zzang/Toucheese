import { create } from 'zustand';

export interface ToastType {
  id: number;
  content: string;
}

interface ToastState {
  toasts: ToastType[];
  setToast: (toast: ToastType) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  setToast: (toast) =>
    set((state) => ({
      ...state,
      toasts: [...state.toasts, toast],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
