import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface PersistedSignupState {
  username?: string;
  phone?: string;
  setSignupData: (data: Partial<PersistedSignupState>) => void;
  clearSignupData: () => void;
  _persist?: {
    options: {
      username: string;
      storage: Storage;
    };
  };
}

const useSignupStore = create<PersistedSignupState>()(
  persist(
    (set) => ({
      username: '',
      phone: '',
      setSignupData: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      clearSignupData: () => {
        /** 화면 표시값 삭제 */
        set({ username: '', phone: '' });

        /** local Storage의 데이터 삭제 */
        const persistOptions = useSignupStore.getState()._persist?.options;
        if (persistOptions?.storage) {
          persistOptions.storage.removeItem(persistOptions.username || 'signup-storage');
        }
      },
    }),
    {
      name: 'signup-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ username: state.username, phone: state.phone }),
    },
  ),
);

export default useSignupStore;
