import { create } from 'zustand';

interface TempUserData {
  tempUsername: string | null;
  tempUserPhone: string | null;
  setTempData: (data: { username: string; phone: string }) => void;
  clearTempData: () => void;
}

export const useTempStore = create<TempUserData>((set) => ({
  tempUsername: null,
  tempUserPhone: null,
  setTempData: ({ username, phone }) => set({ tempUsername: username, tempUserPhone: phone }),
  clearTempData: () => set({ tempUsername: null, tempUserPhone: null }),
}));
