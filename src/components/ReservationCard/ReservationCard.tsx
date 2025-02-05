/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { convertToDateFormat, getDay } from '@store/useSelectDateStore';
import { TypoBodyMdM, TypoBodySmR, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { useNavigate } from 'react-router-dom';
import RatingReview from './RatingReview';
import StatusChip from './StatusChip';
import { IResvItem } from 'types/types';

type ReservationCardType = {
  isMyPage?: boolean;
  data: IResvItem | null;
};

const ReservationCard = ({ isMyPage = false, data }: ReservationCardType) => {
  const navigate = useNavigate();

  return (
    <section>
      {data ? (
        <article css={CardStyle(isMyPage)}>
          {isMyPage && (
            <div css={AlarmStyle}>
              <img src="/img/icon-calendar-yellow.svg" alt="일정 d-day 아이콘" />
              <p>방문 1일전</p>
            </div>
          )}
          <div css={ReservationInfoStyle}>
            <div className="cardInfo">
              <StatusChip state={data.status} />
              <p className="cardName">
                <span>{data.studioName}</span> | <span>{data.menuName}</span>
              </p>
              <p className="cardDate">{`${convertToDateFormat(new Date(data.date))} (${getDay(new Date(data.date))}) ${data.startTime.split(':').slice(0, 2).join(':')}`}</p>
            </div>

            <div className="cardCover">
              <img src={data.menuImgUrl} alt="메뉴 사진" />
            </div>
          </div>
          {data.status === 'COMPLETE' && (
            <RatingReview ratingValue={data.review && data.review.rating} />
          )}
        </article>
      ) : (
        <article css={EmptyCardStyle}>
          <p>
            예약하신 사진관이 없습니다. <br />
            매장을 예약하고 인생 사진을 찍어보세요!
          </p>
          <button type="button" onClick={() => navigate('/')}>
            사진관 보러가기
          </button>
        </article>
      )}
    </section>
  );
};

export default ReservationCard;

const CardStyle = (isMyPage: boolean | undefined) => css`
  display: flex;
  flex-direction: column;
  background-color: ${variables.colors.white};
  border-radius: 0.6rem;
  gap: 0.8rem;
  ${isMyPage
    ? `border: 0.1rem solid ${variables.colors.primary600}`
    : `border: 0.1rem solid ${variables.colors.gray400}`};
  padding: 1.4rem;
`;

const ReservationInfoStyle = css`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;

  .cardInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;

    .cardName {
      ${TypoBodySmR}
      display: flex;
      gap: 0.6rem;
      color: ${variables.colors.gray800};
    }

    .cardDate {
      ${TypoTitleXsM}
    }
  }

  .cardCover {
    width: 6rem;
    aspect-ratio: 60 / 72;

    & img {
      object-fit: cover;
    }
  }
`;

const AlarmStyle = css`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  padding-bottom: 0.8rem;
  border-bottom: 0.1rem solid ${variables.colors.gray300};

  & p {
    ${TypoBodyMdM}
  }

  & img {
    width: 2rem;
    height: 2rem;
  }
`;

const EmptyCardStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  border-radius: 0.6rem;
  border: 0.1rem solid ${variables.colors.gray400};
  min-height: 14rem;
  text-align: center;

  & p {
    color: ${variables.colors.gray700};
    ${TypoBodyMdM}
  }

  & button {
    display: flex;
    gap: 0.4rem;
    padding: 0.8rem 1rem;
    border-radius: 0.6rem;
    background-color: ${variables.colors.primary50};
    border: 0.1rem solid ${variables.colors.primary600};

    &::before {
      content: '';
      width: 1.8rem;
      height: 1.8rem;
      background-image: url('/img/icon-studio-yellow.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 1.8rem;
    }
  }
`;
