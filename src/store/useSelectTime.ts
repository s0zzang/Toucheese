import { create } from 'zustand';

interface TimeState {
  time: Set<string>;
  setTime: (date: string, type: string) => void;
}

export const useSelectTimeStore = create<TimeState>((set) => ({
  time: new Set(),
  setTime: (newTime: string, type: string) =>
    set((state) => {
      const updatedTime = new Set(state.time);

      if (type === 'filter') {
        if (newTime === '') updatedTime.clear();
        if (updatedTime.has(newTime)) updatedTime.delete(newTime);
        else updatedTime.add(newTime);
      }

      if (type === 'reservation') {
        updatedTime.clear();
        updatedTime.add(newTime);
      }

      return { time: updatedTime };
    }),
}));
