/** @jsxImportSource @emotion/react */

import Calendar from '@components/Calendar/Calendar';
import Header from '@components/Header/Header';
import SelectTime from '@pages/Home/components/SelectTime';
import { DividerStyle, Hidden } from '@styles/Common';
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { getDay, useSelectDateStore } from '@store/useSelectDate';
import { useSelectTimeStore } from '@store/useSelectTime';

const ReservationSchedule = () => {
  const { time } = useSelectTimeStore();
  const { date } = useSelectDateStore();
  const [_, month, day] = date.split('-');

  return (
    <>
      <Header title="예약하기" />

      <Calendar style={DividerStyle} />
      <SelectTime type="reservation" />

      <div css={fixedBox}>
        <div css={finalDate}>
          <dl>
            <dt css={Hidden}>날짜</dt>
            <dd>{`${month}.${day}.(${getDay(new Date(date))})`}</dd>
          </dl>
          <dl className="timeBox">
            <dt css={Hidden}>시간</dt>
            <dd>{time.size ? time : '시간을 선택해주세요'}</dd>
          </dl>
        </div>
        예약하기 버튼이 들어갈 자리
      </div>
    </>
  );
};

export default ReservationSchedule;

const fixedBox = css`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid ${variables.colors.gray300};
`;

const finalDate = css`
  padding: 1rem 1.6rem;
  display: flex;
  gap: 1.4rem;
  align-items: center;

  dl {
    padding-left: 2rem;
    background: url(/img/icon-calendar-black.svg) no-repeat center left / 1.4rem;

    &.timeBox {
      background-image: url(/img/icon-clock-black.svg);
      position: relative;

      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: -0.7rem;
        transform: translateY(-50%);
        width: 1px;
        height: 1.8rem;
        background: ${variables.colors.gray300};
      }
    }
  }
`;
