import { create } from 'zustand';

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

export const changeformatDateForUi = ({ date, time }: { date: string; time: string }) => {
  const [year, month, day] = date.split('-');
  const dayOfWeek = getDay(new Date(date));

  // UI를 위한 포맷 변경
  const selectedDateForUi = `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
  const selectedTimeForUi = `${time.split(':')[0]}시`;

  return `${selectedDateForUi} ${selectedTimeForUi === '00시' ? '' : selectedTimeForUi}`;
};

export const useSelectDateStore = create<DateState>((set) => ({
  date: convertToDateFormat(today),
  setDate: (newDate) => set({ date: newDate }),
}));
