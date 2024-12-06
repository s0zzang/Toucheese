import { create } from 'zustand';

interface DateState {
  date: string;
  setDate: (date: string) => void;
}

const today = new Date();
export const lessThan10Add0 = (num: number) => (num < 10 ? `0${num}` : num);
export const convertToDateFormat = (day: Date) => `${day.getFullYear()}-${lessThan10Add0(day.getMonth() + 1)}-${lessThan10Add0(day.getDate())}`;

export const useSelectDateStore = create<DateState>((set) => ({
  date: convertToDateFormat(today),
  setDate: (newDate) => set({ date: newDate }),
}));
