import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TimeState {
  time: string[];
  setTime: (date: string, type?: string) => void;
}

export const useSelectTimeStore = create(
  persist<TimeState>(
    (set) => ({
      time: [],
      setTime: (newTime: string, type?: string) =>
        set((state) => {
          const updatedTime = new Set(state.time);

          if (newTime === 'reset') updatedTime.clear();

          if (type === 'filter') {
            if (newTime === '') updatedTime.clear();
            if (updatedTime.has(newTime)) updatedTime.delete(newTime);
            else updatedTime.add(newTime);
          }

          if (type === 'reservation') {
            updatedTime.clear();
            updatedTime.add(newTime);
          }

          return { time: [...updatedTime] };
        }),
    }),
    { name: 'selectTimeStore', storage: createJSONStorage(() => sessionStorage) },
  ),
);
