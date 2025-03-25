import { create } from 'zustand';

interface FilterStore {
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  selectedServices: string[];
  setMinPrice: (price: string) => void;
  setMaxPrice: (price: string) => void;
  setSelectedServices: (services: string[]) => void;
  resetFilter: () => void;
  setSortBy: (sortBy: string) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  minPrice: '',
  maxPrice: '',
  selectedServices: [],
  sortBy: '',
  setMinPrice: (price) => set({ minPrice: price }),
  setMaxPrice: (price) => set({ maxPrice: price }),
  setSelectedServices: (services) => set({ selectedServices: services }),
  setSortBy: (sort) => set({ sortBy: sort }),
  resetFilter: () => set({ minPrice: '', maxPrice: '', selectedServices: [] }),
}));
