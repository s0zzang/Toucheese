import { Dispatch, SetStateAction } from 'react';

interface Day {
  year: number;
  month: number;
  date: number;
}

const createCalendar = (
  baseYear: number,
  baseMonth: number,
  setCalendar: Dispatch<SetStateAction<Day[] | undefined>>,
) => {
  const addDateToCalendar = (startDay: Date, endDay: Date) => {
    const standard = new Date(startDay);
    const dates = [];
    while (standard <= endDay) {
      const year = standard.getFullYear();
      const month = standard.getMonth() + 1;
      const date = standard.getDate();
      dates.push({ year, month, date });
      standard.setDate(date + 1);
    }
    return dates;
  };

  // 기준 달의 첫 날
  const firstDayOfMonth = new Date(baseYear, baseMonth, 1);
  // 달력 시작 날짜 설정 : 기준 달의 첫 날의 주의 일요일
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(1 - firstDayOfMonth.getDay());

  // 기준 달의 마지막 날
  const lastDayOfMonth = new Date(baseYear, baseMonth + 1, 0);
  // 달력 끝 날짜 설정 : 기준 달의 마지막 날의 주의 토요일
  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  setCalendar(addDateToCalendar(startDay, endDay));
};

export default createCalendar;
