/** @jsxImportSource @emotion/react */
import Bookmark from '@components/Bookmark/Bookmark';
import ShareButton from '@components/Share/ShareButton';
import { css } from '@emotion/react';
import { breakPoints } from '@styles/BreakPoint';
import { DividerStyle, TypoBodyMdR, TypoBodyMdSb, TypoCapSmR, TypoTitleMdSb } from '@styles/Common';
import variables from '@styles/Variables';
import { useMediaQuery } from 'react-responsive';
import { IStudioDetail } from 'types/types';
import StudioOptions from './StudioOptions';

interface IStudioInfo {
  id: string | undefined;
  data: IStudioDetail;
}

const StudioInfo = ({ data, id }: IStudioInfo) => {
  let today = new Date();
  const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });
  console.log(data);

  return (
    <div
      css={css`
        box-shadow: inset 0 0 10px red;
      `}
    >
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
      <div css={StudioInfoStyle({ isPc })}>
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
      {isPc && <StudioOptions data={data} />}
    </div>
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

const StudioInfoStyle = ({ isPc }: { isPc: boolean }) => css`
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

    ${!isPc && DividerStyle}
  }
`;

const SocialActionsStyle = css`
  display: flex;
  gap: 2.4rem;
  ${TypoCapSmR}
  color: ${variables.colors.gray700};
`;
