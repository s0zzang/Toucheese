/** @jsxImportSource @emotion/react */

import Header from '@components/Header/Header';
import { css } from '@emotion/react';
import { convertToDateFormat, today, useSelectDateStore } from '@store/useSelectDateStore';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import { breakPoints, mqMax, mqMin } from '@styles/BreakPoint';
import variables from '@styles/Variables';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import ReservationInfo from './components/ReservationInfo';
import ScheduleInner from './components/ScheduleInner';

const ReservationSchedule = () => {
  const { _id } = useParams() as { _id: string };
  const { setDate } = useSelectDateStore();
  const { setTime } = useSelectTimeStore();

  // 필터링 시 날짜, 시간 초기화
  useEffect(() => {
    setDate(convertToDateFormat(today));
    setTime('reset');
  }, []);

  return (
    <>
      <Helmet>
        <title>{`터치즈 - 예약하기`}</title>
        <meta property="og:title" content="터치즈 - 예약하기" />
        <meta property="og:url" content={`${window.location.href}`} />
        <meta property="og:description" content="터치즈 - 예약하기" />
      </Helmet>

      <Header title="예약하기" fixed={true} />

      <div css={[pcFlexLayout, scheduleLayout]}>
        <div className="left-box">
          <ReservationInfo />
        </div>
        <div className="right-box">
          <ScheduleInner _id={_id} />
        </div>
      </div>
    </>
  );
};

export default ReservationSchedule;

export const pcFlexLayout = css`
  ${mqMax(breakPoints.moMax)} {
    padding-top: ${variables.headerHeight};
    padding-bottom: 5rem;
  }

  ${mqMin(breakPoints.pc)} {
    margin-bottom: -3rem;
    display: flex;
    gap: 3.5rem;
    align-content: flex-start;

    .left-box {
      width: 40%;
      max-width: 50.4rem;
      position: sticky;
      height: calc(100vh - ${variables.headerHeight} - ${variables.headerBottomPadding});
      top: calc(${variables.headerHeight} + ${variables.headerBottomPadding});
    }
    .right-box {
      flex-grow: 1;

      .content-box {
        min-height: calc(100vh - ${variables.headerHeight} - 8.1rem);
        padding: ${variables.headerBottomPadding} ${variables.layoutPadding};
      }
    }
  }
`;

const scheduleLayout = css`
  ${mqMax(breakPoints.moMax)} {
    .left-box {
      display: none;
    }
  }
`;
