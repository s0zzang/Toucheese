/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { convertToDateFormat, getDay } from '@store/useSelectDateStore';
import { TypoBodyMdM, TypoBodySmR, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { useLocation } from 'react-router-dom';
import { IResvItem } from 'types/types';
import RatingReview from './RatingReview';
import StatusChip from './StatusChip';

type ReservationCardType = {
  isMyPage?: boolean;
  isReviewWritePage?: boolean;
  data: IResvItem | null;
};

const ReservationCard = ({
  isMyPage = false,
  isReviewWritePage = false,
  data,
}: ReservationCardType) => {
  const { pathname } = useLocation();

  //방문 날짜 계산 함수
  const getDaysDifference = (ResDay: string) => {
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date(ResDay).toISOString().split('T')[0];

    let diffDays =
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24);

    return diffDays;
  };

  return (
    <>
      {data ? (
        <a href={`/reservation/${data?.reservationId}`} css={CardStyle(isMyPage)}>
          {isMyPage && (
            <div css={CardTopStyle}>
              <img src="/img/icon-calendar-yellow.svg" alt="일정 d-day 아이콘" />
              <p>방문 {getDaysDifference(data?.date)}일전</p>
            </div>
          )}
          {isReviewWritePage && (
            <div css={CardTopStyle}>
              <p className="studioName"> {data.studioName}</p>
            </div>
          )}
          <div css={ReservationInfoStyle}>
            <div className="infoTop">
              {isReviewWritePage ? (
                <p css={TypoTitleXsM}>{data.menuName}</p>
              ) : (
                <StatusChip state={data.status} />
              )}
              <p className="infoMiddle">
                {isReviewWritePage && data.additionalOptionNames ? (
                  data.additionalOptionNames.join(' | ')
                ) : (
                  <>
                    {data.studioName} <span>|</span> {data.menuName}
                  </>
                )}
              </p>
              {isReviewWritePage || (
                <p className="infoBottom">
                  {`${convertToDateFormat(new Date(data.date))} (${getDay(new Date(data.date))}) ${data.startTime
                    .split(':')
                    .slice(0, 2)
                    .join(':')}`}
                </p>
              )}
            </div>

            <div className="cardCover">
              <img src={data.menuImgUrl} alt="메뉴 사진" />
            </div>
          </div>
          {data.status === 'COMPLETED' && !pathname.includes('/review/write') && (
            <RatingReview
              ratingValue={data.review && data.review.rating}
              reservaionData={data && data}
            />
          )}
        </a>
      ) : (
        <div css={EmptyCardStyle}>
          <p>
            예약하신 사진관이 없습니다. <br />
            매장을 예약하고 인생 사진을 찍어보세요!
          </p>
          <a href="/">사진관 보러가기</a>
        </div>
      )}
    </>
  );
};

export default ReservationCard;

const CardStyle = (isMyPage: boolean | undefined) => css`
  display: block;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: ${variables.colors.white};
  border-radius: ${variables.borderRadius};
  gap: 0.8rem;
  ${isMyPage
    ? `border: 1px solid ${variables.colors.primary600}`
    : `border: 1px solid ${variables.colors.gray400}`};
  padding: 1.4rem;
`;

const ReservationInfoStyle = css`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;

  .infoTop {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
    flex-grow: 1;

    .infoMiddle {
      ${TypoBodySmR}
      display: flex;
      gap: 0.6rem;
      color: ${variables.colors.gray800};

      & span {
        color: ${variables.colors.gray400};
      }
    }

    .infoBottom {
      ${TypoTitleXsM}
    }
  }

  .cardCover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6rem;
    flex-shrink: 0;
    & img {
      aspect-ratio: 60 / 72;
      object-fit: cover;
    }
  }
`;

const CardTopStyle = css`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid ${variables.colors.gray300};

  & p {
    ${TypoBodyMdM}
  }

  & img {
    width: 2rem;
    height: 2rem;
  }

  .studioName {
    ${TypoBodySmR}
    color:${variables.colors.gray800};
  }
`;

const EmptyCardStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  border-radius: ${variables.borderRadius};
  border: 1px solid ${variables.colors.gray400};
  min-height: 14rem;
  text-align: center;

  & p {
    color: ${variables.colors.gray700};
    ${TypoBodyMdM}
  }

  & a {
    display: flex;
    gap: 0.4rem;
    padding: 0.8rem 1rem;
    border-radius: ${variables.borderRadius};
    background-color: ${variables.colors.primary50};
    border: 1px solid ${variables.colors.primary600};

    &::before {
      content: '';
      width: 1.8rem;
      height: 1.8rem;
      background-image: url('/img/icon-studio-gray.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 1.8rem;
    }
  }
`;
