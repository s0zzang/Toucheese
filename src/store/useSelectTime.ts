import { create } from 'zustand';

interface TimeState {
  time: string;
  setTime: (date: string) => void;
}

export const useSelectTimeStore = create<TimeState>((set) => ({
  time: 'T00:00:00',
  setTime: (newTime) => set({ time: newTime }),
}));
