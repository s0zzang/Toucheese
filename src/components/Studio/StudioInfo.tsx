/** @jsxImportSource @emotion/react */
import Bookmark from '@components/Bookmark/Bookmark';
import Button from '@components/Button/Button';
import ShareButton from '@components/Share/ShareButton';
import { css } from '@emotion/react';
import { breakPoints } from '@styles/BreakPoint';
import {
  DividerStyle,
  TypoBodyMdR,
  TypoBodyMdSb,
  TypoCapSmR,
  TypoTitleMdSb,
  TypoTitleXsM,
} from '@styles/Common';
import variables from '@styles/Variables';
import { useMediaQuery } from 'react-responsive';
import { IStudioDetail } from 'types/types';

interface IStudioInfo {
  id: string | undefined;
  data: IStudioDetail;
}

const StudioInfo = ({ data, id }: IStudioInfo) => {
  let today = new Date();
  const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });

  const option = {
    CHANGING_ROOM: '탈의실',
    DRESSING_ROOM: '파우더룸',
    HAIR_MAKEUP: '헤어, 메이크업 수정',
    INDIVIDUAL_EDITING: '1:1 보정',
    SUIT_RENTAL_FREE: '정장 대여',
    ORIGINAL_FILES: '원본파일 제공',
    PARKING_AREA: '주차',
  };

  const optionIcon = {
    CHANGING_ROOM: '/img/icon-room.svg',
    DRESSING_ROOM: '/img/icon-powder.svg',
    HAIR_MAKEUP: '/img/icon-makeup.svg',
    INDIVIDUAL_EDITING: '/img/icon-photo-edit.svg',
    SUIT_RENTAL_FREE: '/img/icon-suit.svg',
    ORIGINAL_FILES: '/img/icon-original-file.svg',
    PARKING_AREA: '/img/icon-park.svg',
  };

  return (
    <>
      {/* 스튜디오 정보 */}
      <div css={StudioInfoTitleStyle}>
        <div>
          <h2>{`${data.name}`}</h2>
          <div className="rating">
            <img src="/img/icon-rating.svg" alt="리뷰 평점" />
            <p>{`${data.rating}`}</p>
            <p>{`(${data.review_count}개의 평가)`}</p>
          </div>
        </div>
        <div css={SocialActionsStyle}>
          <ShareButton
            title={data.name}
            description={data.description}
            imageUrl={data.portfolios[0]?.url}
            webUrl={window.location.href}
          />
          <Bookmark id={Number(id)} count={data.bookmark_count} isBookmarked={false} />
        </div>
      </div>
      <div css={StudioInfoStyle}>
        <dl>
          <div>
            <dt>
              <img src="/img/icon-clock.svg" alt="영업시간" />
            </dt>
            <dd>
              <div className="openStatus">
                {data && data.open ? (
                  <>
                    <p>영업중</p>
                    <time>
                      {data.openingHours[dayIndex].openTime.slice(0, 5)} -{' '}
                      {data.openingHours[dayIndex].closeTime.slice(0, 5)}
                    </time>
                  </>
                ) : (
                  <p>영업 종료</p>
                )}
              </div>
            </dd>
          </div>

          <div>
            <dt>
              <img src="/img/icon-location.svg" alt="주소" />
            </dt>
            <dd>
              <p>
                {`${data.address}` === 'undefined'
                  ? '주소 수집중'
                  : `${data.addressSi} ${data.addressGu} ${data.address}`}
              </p>
            </dd>
          </div>
          <div>
            <dt>
              <img src="/img/icon-call-gray700.svg" alt="연락처" />
            </dt>
            <dd>
              <p>{`${data.phone}`}</p>
            </dd>
          </div>
        </dl>
      </div>

      {/* 홈 기본정보 - 매장 정보 */}
      {isPc && (
        <div css={optionsStyle}>
          <p>매장 정보</p>
          <div>
            {data.options.length === 0
              ? '수집중'
              : data.options.map((optionItem) => (
                  <Button
                    key={optionItem}
                    text={option[optionItem]}
                    size="xsmall"
                    width="fit"
                    variant="white"
                    iconSizeWidth="1.5rem"
                    iconSizeHeight="1.5rem"
                    icon={<img src={optionIcon[optionItem]} alt="매장정보" />}
                  />
                ))}
          </div>
        </div>
      )}
    </>
  );
};

export default StudioInfo;

const StudioInfoTitleStyle = css`
  display: flex;
  justify-content: space-between;

  & > div {
    margin-bottom: 2rem;
    & > h2 {
      ${TypoTitleMdSb}
      margin-bottom: 0.4rem;
    }

    & > .rating {
      display: flex;
      align-items: center;
      & > img {
        margin-right: 0.4rem;
        width: 1.6rem;
        height: 1.6rem;
      }

      & > p + p {
        margin-left: 0.2rem;
        color: ${variables.colors.gray800};
      }
    }
  }
`;

const StudioInfoStyle = css`
  position: relative;

  dl {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    div {
      display: flex;
      align-items: center;

      dt {
        display: flex;
        margin-right: 1rem;

        img {
          width: 1.7rem;
          height: 1.7rem;
        }
      }

      dd {
        display: flex;
        align-items: center;
        ${TypoBodyMdR}

        & > .openStatus {
          display: flex;

          & > p {
            ${TypoBodyMdSb}
            margin-right: 0.8rem;
          }

          & > time {
            ${TypoBodyMdR}
          }
        }
      }
    }

    ${DividerStyle}
  }
`;

const SocialActionsStyle = css`
  display: flex;
  gap: 2.4rem;
  ${TypoCapSmR}
  color: ${variables.colors.gray700};
`;

const optionsStyle = css`
  padding: 2rem 0;
  margin-bottom: 5rem;

  & > p {
    ${TypoTitleXsM};
    margin-bottom: 1rem;
  }

  & > div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }
`;
