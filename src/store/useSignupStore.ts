import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SignupState {
  name: string;
  phone: string;
  setSignupData: (data: Partial<SignupState>) => void;
  clearSignupData: () => void;
}

const useSignupStore = create<SignupState>()(
  persist(
    (set) => ({
      name: '',
      phone: '',
      setSignupData: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),
      clearSignupData: () =>
        set({
          name: '',
          phone: '',
        }),
    }),
    {
      name: 'signup-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useSignupStore;
