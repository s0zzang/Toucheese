/** @jsxImportSource @emotion/react */

import Header from '@components/Header/Header';
import ReservationNavigator from '@components/Navigator/ReservationNavigator';
import ReservationCard from '@components/ReservationCard/ReservationCard';
import { css } from '@emotion/react';
import { useGetReservationList } from '@hooks/useGetReservationList';
import {
  MyPageContentStyle,
  MyPageHeaderContainerStyle,
  MyPageSectionStyle,
} from '@pages/Reservation/ReservationList';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoBodyMdM } from '@styles/Common';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface MyReviewStatus {
  statusKor: '리뷰 남기기' | '나의 리뷰';
  statusEng: 'DEFAULT' | 'COMPLETED';
}

const MyReviews = () => {
  const STATUS: MyReviewStatus[] = [
    { statusKor: '리뷰 남기기', statusEng: 'COMPLETED' },
    { statusKor: '나의 리뷰', statusEng: 'COMPLETED' },
  ];
  const [resStatus, setResStatus] = useState<MyReviewStatus>({
    statusKor: '리뷰 남기기',
    statusEng: 'COMPLETED',
  });
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });

  const { data } = useGetReservationList('COMPLETED');

  return (
    <main>
      <MyPageHeaderContainerStyle>
        {isPc ? (
          <h1 className="pcLayout">내 리뷰</h1>
        ) : (
          <Header title="내 리뷰" backTo="/user/mypage" />
        )}

        <div
          css={css`
            ${mqMin(breakPoints.pc)} {
              width: 20.7rem;
            }
          `}
        >
          <ReservationNavigator<MyReviewStatus>
            STATUS={STATUS}
            status={resStatus}
            setStatus={setResStatus}
          />
        </div>
      </MyPageHeaderContainerStyle>

      <MyPageSectionStyle>
        {data && (
          <MyPageContentStyle>
            <h2 css={TypoBodyMdM}>총 {data.length}건</h2>
            <div className="content-box">
              {data
                .sort((a, b) => {
                  // 1. date 비교
                  if (a.date !== b.date) {
                    return a.date < b.date ? -1 : 1; // date가 빠른 순으로 정렬
                  }

                  // 2. startTime 비교 (date가 같을 때)
                  return a.startTime < b.startTime ? -1 : 1;
                })
                .map((item) => (
                  <ReservationCard key={item.reservationId} data={item} />
                ))}
            </div>
          </MyPageContentStyle>
        )}
      </MyPageSectionStyle>
    </main>
  );
};

export default MyReviews;
