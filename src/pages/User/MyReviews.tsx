/** @jsxImportSource @emotion/react */

import Header from '@components/Header/Header';
import ReservationNavigator from '@components/Navigator/ReservationNavigator';
import NoResult from '@components/NoResult/NoResult';
import ReservationCard from '@components/ReservationCard/ReservationCard';
import { css } from '@emotion/react';
import { useGetReservationList } from '@hooks/useGetReservationList';
import useToast from '@hooks/useToast';
import {
  MyPageContentStyle,
  MyPageHeaderContainerStyle,
  MyPageSectionStyle,
} from '@pages/Reservation/ReservationList';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoBodyMdM } from '@styles/Common';
import { sortReservations } from '@utils/sortReservations';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { IResvItem } from 'types/types';

interface MyReviewStatus {
  statusKor: '리뷰 남기기' | '나의 리뷰';
  statusEng: 'INCOMPLETED' | 'COMPLETED';
}

const MyReviews = () => {
  const STATUS: MyReviewStatus[] = [
    { statusKor: '리뷰 남기기', statusEng: 'INCOMPLETED' },
    { statusKor: '나의 리뷰', statusEng: 'COMPLETED' },
  ];
  const [resStatus, setResStatus] = useState<MyReviewStatus>(STATUS[0]);

  const isPc = useMediaQuery({ minWidth: breakPoints.pc });
  const openToast = useToast();
  const navigate = useNavigate();

  const { data, error } = useGetReservationList('COMPLETED');
  const isReviewIncompleted = resStatus.statusEng === 'INCOMPLETED';
  const getReviewGroups = data?.filter(({ review }) => (isReviewIncompleted ? !review : review));
  const [currentReviews, setCurrentReview] = useState(getReviewGroups);

  const emptyMessage = isReviewIncompleted
    ? '작성해야 할 리뷰가 아직 없습니다.'
    : '작성 완료된 리뷰가 없습니다.';

  useEffect(() => {
    if (error) {
      if (error.message === '403') {
        openToast('로그인 세션이 만료되었습니다. 다시 로그인 해주세요!');
        navigate('/user/auth');
      } else {
        throw new Error(error.message);
      }
    }
  }, [error]);

  useEffect(() => {
    setCurrentReview(getReviewGroups);
  }, [data, isReviewIncompleted]);

  return (
    <main>
      <MyPageHeaderContainerStyle>
        {isPc ? (
          <h1 className="pcLayout">내 리뷰</h1>
        ) : (
          <Header title="내 리뷰" backTo="/user/mypage" fixed={true} />
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
        {currentReviews?.length ? (
          <MyPageContentStyle>
            <h2 css={TypoBodyMdM}>총 {currentReviews.length}건</h2>
            <div className="content-box">
              {sortReservations<IResvItem>(currentReviews).map((item) => (
                <ReservationCard key={item.reservationId} data={item} />
              ))}
            </div>
          </MyPageContentStyle>
        ) : (
          <NoResult message={emptyMessage} bg="gray100" />
        )}
      </MyPageSectionStyle>
    </main>
  );
};

export default MyReviews;
