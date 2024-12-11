import { create } from 'zustand';

interface ModalState {
  modals: Record<number, boolean>;
  setOpen: (modalId: number, open: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modals: {},
  setOpen: (modalId, open) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: open },
    })),
}));
