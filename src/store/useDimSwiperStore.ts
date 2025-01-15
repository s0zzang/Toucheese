import { create } from 'zustand';

interface DimSwiperState {
  selectedId: number;
  setSelectedId: (id: number, direction?: number) => void;
}

export const useDimSwiperStore = create<DimSwiperState>((set) => ({
  selectedId: 0,
  setSelectedId: (id, direction) => set(() => ({ selectedId: id + (direction || 0) })),
}));
