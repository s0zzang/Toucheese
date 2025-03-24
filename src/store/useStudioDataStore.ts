import { IStudioDetail } from 'types/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface StudioDataState {
  studioDetail: Record<string, IStudioDetail | undefined>;
  setStudioDetail: (studioId: string, data: IStudioDetail) => void;
}

const useStudioDataStore = create<StudioDataState>()(
  persist(
    (set) => ({
      studioDetail: {},
      setStudioDetail: (studioId, data) =>
        set((state) => ({
          studioDetail: { ...state.studioDetail, [studioId]: data },
        })),
    }),
    {
      name: 'studio-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useStudioDataStore;
