import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface DateState {
  date: string;
  setDate: (date: string) => void;
}

export const today = new Date();

export const lessThan10Add0 = (num: number) => (num < 10 ? `0${num}` : num);

export const convertToDateFormat = (day: Date) =>
  `${day.getFullYear()}-${lessThan10Add0(day.getMonth() + 1)}-${lessThan10Add0(day.getDate())}`;

export const getDay = (date: Date) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  return week[date.getDay()];
};

export const changeformatDateForUi = ({ date, time }: { date: string; time: Set<string> }) => {
  if (!date) return null;
  const [year, month, day] = date.split('-');
  const dayOfWeek = getDay(new Date(date));
  const sortedTimes = [...time].sort();

  // UI를 위한 포맷 변경
  const selectedDateForUi = `${year}. ${+month}. ${+day} (${dayOfWeek})`;
  const selectedTimeForUi =
    sortedTimes.length > 1
      ? `${[...sortedTimes][0]} 외 ${sortedTimes.length - 1}개`
      : sortedTimes[0];

  return `${selectedDateForUi}${time.size ? ` / ${selectedTimeForUi}` : ''}`;
};

export const useSelectDateStore = create(
  persist<DateState>(
    (set) => ({
      date: convertToDateFormat(today),
      setDate: (newDate) => set({ date: newDate }),
    }),
    {
      name: 'selectDateStore',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
