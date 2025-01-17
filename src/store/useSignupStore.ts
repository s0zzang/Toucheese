import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface PersistedSignupState {
  name?: string;
  phone?: string;
  setSignupData: (data: Partial<PersistedSignupState>) => void;
  clearSignupData: () => void;
  _persist?: {
    options: {
      name: string;
      storage: Storage;
    };
  };
}

const useSignupStore = create<PersistedSignupState>()(
  persist(
    (set) => ({
      name: '',
      phone: '',
      setSignupData: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),
      clearSignupData: () => {
        /** 화면 표시값 삭제 */
        set({
          name: '',
          phone: '',
        });

        /** local Storage의 데이터 삭제 */
        const persistOprions = useSignupStore.getState()._persist?.options;
        if (persistOprions?.storage) {
          persistOprions.storage.removeItem(persistOprions.name || 'signup-storage');
        }
      },
    }),
    {
      name: 'signup-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useSignupStore;
