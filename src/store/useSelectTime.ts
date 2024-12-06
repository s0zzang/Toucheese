import { create } from 'zustand';

interface TimeState {
  time: string;
  setTime: (date: string) => void;
}

export const useSelectTimeStore = create<TimeState>((set) => ({
  time: '',
  setTime: (newTime) => set({ time: newTime }),
}));
