/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { convertToDateFormat, lessThan10Add0, useSelectDateStore } from '@store/useSelectDate';
import { Hidden } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';

interface Days {
  dayOfYear: number;
  dayOfMonth: number;
  day: number;
}

const Calendar = () => {
  const { date: activeDay, setDate: setActiveDay } = useSelectDateStore();
  const [currentDay, setCurrentDay] = useState(new Date());
  const [days, setDays] = useState<Days[]>();

  const year = currentDay.getFullYear();
  const month = currentDay.getMonth();
  const today = new Date();

  const getDays = (startDay: Date, endDay: Date) => {
    const current = new Date(startDay);
    const newDays = [];
    while (current <= endDay) {
      newDays.push({ dayOfYear: current.getFullYear(), dayOfMonth: current.getMonth() + 1, day: current.getDate() });
      current.setDate(current.getDate() + 1);
    }
    return newDays;
  };

  const createCalendar = () => {
    // 현재 달의 첫 날
    const firstDayOfMonth = new Date(year, month, 1);
    // 달력 시작 날짜를 현재 달의 첫 날의 주의 일요일로 설정
    const startDay = new Date(firstDayOfMonth);
    startDay.setDate(1 - firstDayOfMonth.getDay());

    // 현재 달의 마지막 날
    const lastDayOfMonth = new Date(year, month + 1, 0);
    // 달력 끝 날짜를 현재 달의 마지막 날의 주의 토요일로 설정
    const endDay = new Date(lastDayOfMonth);
    endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

    setDays(getDays(startDay, endDay));
  };

  const changeMonth = (direction: number) => {
    setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() + direction, 1));
  };

  const toToday = () => {
    setCurrentDay(today);
    setActiveDay(convertToDateFormat(today));
  };

  const handleDayClick = (year: number, month: number, day: number) => {
    const currentMonth = currentDay.getMonth() + 1;
    const value = `${year}-${lessThan10Add0(month)}-${lessThan10Add0(day)}`;
    setActiveDay(value);

    // 12월, 1월 예외처리
    if (month === 12 && currentMonth === 1) return changeMonth(-1);
    if (month === 1 && currentMonth === 12) return changeMonth(1);

    // 클릭한 달과 현재 달을 비교하여 Month 변경
    if (month > currentMonth) changeMonth(1);
    if (month < currentMonth) changeMonth(-1);
  };

  useEffect(() => {
    createCalendar();
  }, [currentDay]);

  return (
    <CalendarWrStyle>
      <TopStyle>
        <TodayStyle onClick={() => toToday()}>오늘</TodayStyle>
        <TitleStyle>
          <button onClick={() => changeMonth(-1)}>
            <span css={Hidden}>이전 달로</span>
          </button>
          <div>
            {year}년 {month + 1}월
          </div>
          <button
            css={css`
              transform: rotate(180deg);
            `}
            onClick={() => changeMonth(1)}
          >
            <span css={Hidden}>다음 달로</span>
          </button>
        </TitleStyle>
      </TopStyle>
      <CalendarStyle>
        <DayOfWeekStyle>
          <li>일</li>
          <li>월</li>
          <li>화</li>
          <li>수</li>
          <li>목</li>
          <li>금</li>
          <li>토</li>
        </DayOfWeekStyle>
        <ul>
          {days &&
            days.map(({ dayOfYear, day, dayOfMonth }) => (
              <li
                // 순서대로 1. 활성화 스타일, 2. 다음달인 경우 스타일, 3. 오늘보다 이전 날짜 스타 일 지정
                css={css`
                  ${activeDay === `${dayOfYear}-${lessThan10Add0(dayOfMonth)}-${lessThan10Add0(day)}` && activeStyle};
                  ${dayOfMonth != month + 1 && nextMonthStyle};
                  ${today > new Date(dayOfYear, dayOfMonth - 1, day + 1) && disabledStyle}
                `}
                key={`${dayOfMonth} - ${day}`}
              >
                <button type="button" onClick={() => handleDayClick(dayOfYear, dayOfMonth, day)}>
                  {day}
                </button>
              </li>
            ))}
        </ul>
      </CalendarStyle>
    </CalendarWrStyle>
  );
};

export default Calendar;

const CalendarWrStyle = styled.article`
  max-width: 500px;
  margin: 0 auto;
`;

const TopStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const TodayStyle = styled.button`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: calc(100% / 7);
  text-align: center;
  font-size: 1.4rem;
  color: ${variables.colors.primary800};
  text-decoration: underline;
`;

const TitleStyle = styled.div`
  display: flex;
  gap: 1.2rem;
  font-size: 1.8rem;
  font-weight: 500;

  button {
    width: 2.4rem;
    aspect-ratio: 1/1;
    background: url(/img/icon-arrow-gray.svg) no-repeat center;
  }
`;

const CalendarStyle = styled.div`
  ul {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-size: 1.6rem;

    li {
      aspect-ratio: 1/1;
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        width: 100%;
        aspect-ratio: 1 / 1;
        text-align: center;
      }
    }
  }
`;

const DayOfWeekStyle = styled.ul`
  li {
    font-size: 1.2rem;
    color: ${variables.colors.gray700};
  }
`;

export const activeStyle = css`
  position: relative;
  &::before {
    content: '';
    display: block;
    background-color: ${variables.colors.primary500};
    width: 3.6rem;
    aspect-ratio: 1/1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    border-radius: 50%;
  }
`;

export const nextMonthStyle = css`
  color: ${variables.colors.gray600};
`;

export const disabledStyle = css`
  color: ${variables.colors.gray400};

  button {
    cursor: default;
    pointer-events: none;
  }
`;
