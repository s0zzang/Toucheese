/** @jsxImportSource @emotion/react */

import Header from '@components/Header/Header';
import { convertToDateFormat, today, useSelectDateStore } from '@store/useSelectDateStore';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
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

      <Header title="예약하기" />
      <ScheduleInner _id={_id} />
    </>
  );
};

export default ReservationSchedule;
