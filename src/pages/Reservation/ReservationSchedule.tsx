/** @jsxImportSource @emotion/react */

import Calendar from '@components/Calendar/Calendar';
import Header from '@components/Header/Header';
import SelectTime from '@pages/Home/components/SelectTime';
import { DividerStyle, Hidden } from '@styles/Common';
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { getDay, useSelectDateStore } from '@store/useSelectDate';
import { useSelectTimeStore } from '@store/useSelectTime';
import ReservationFooter from '@components/ReservationFooter/ReservationFooter';
import { useLocation, useNavigate } from 'react-router-dom';

const ReservationSchedule = () => {
  const { time } = useSelectTimeStore();
  const { date } = useSelectDateStore();
  const [_, month, day] = date.split('-');
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
            <dd>{time.size ? time : <span>시간을 선택해주세요</span>}</dd>
          </dl>
        </div>

        <ReservationFooter
          text="다음"
          type="button"
          onClick={() => navigate(`${pathname}/payment`)}
          disabled={!(time.size > 0)}
        />
      </div>
    </>
  );
};

export default ReservationSchedule;

const fixedBox = css`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 8.1rem;
  border-top: 1px solid ${variables.colors.gray300};
  background: #fff;
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

    dd {
      span {
        color: ${variables.colors.gray600};
      }
    }
  }
`;
