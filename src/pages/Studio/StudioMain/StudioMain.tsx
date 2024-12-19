/** @jsxImportSource @emotion/react */
import BackButton from '@components/BackButton/BackButton';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import { css } from '@emotion/react';
import { useGetStudioDetail } from '@hooks/useGetStudioDetail';
import { TypoBodyMdR, TypoBodyMdSb, TypoCapSmR, TypoTitleMdSb } from '@styles/Common';
import variables from '@styles/Variables';
import { useParams } from 'react-router-dom';

///studio/detail/{studioId}

const StudioMain = () => {
  const { _id } = useParams();
  const { data, isLoading, error } = useGetStudioDetail(`${_id}`);
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>로딩</div>;
  }
  return (
    <>
      <BackButton />
      {/* 이미지 들어갈자리 */}
      <div>이미지</div>

      {/* 스튜디오 정보 */}
      <div css={StudioInfoTitleStyle}>
        <div>
          <h2>{`${data.name}`}</h2>
          <div>
            <img src="/img/icon-star-yellow.svg" alt="리뷰 평점" />
            <p>{`${data.rating}`}</p>
            <p>{`(${data.review_count}개의 평가)`}</p>
          </div>
        </div>
        <div css={SocialActionsStyle}>
          <p>공유</p>
          <p>좋아요</p>
        </div>
      </div>

      <div css={StudioInfoStyle}>
        <dl>
          <div>
            <dt>
              <img src="/img/icon-clock.svg" alt="영업시간" />
            </dt>
            <dd>
              <p className="highlight">영업중</p>
              <p>{`${data.open_time} - ${data.close_time}`}</p>
            </dd>
          </div>
          <div>
            <dt>
              <img src="/img/icon-map.svg" alt="주소" />
            </dt>
            <dd>
              <p>{`${data.adress}` === 'undefined' ? '주소 수집중' : `${data.adress}`}</p>
            </dd>
          </div>
          <div>
            <dt>
              <img src="/img/icon-call.svg" alt="연락처" />
            </dt>
            <dd>
              <p>{`${data.phone}`}</p>
            </dd>
          </div>
        </dl>
      </div>

      {/* gray 여백 들어갈 자리 */}
      {/* 네비게이션 바 */}
      <StudioNavigator _id={_id || ''} />
      {/* 홈 기본 정보 */}
      <div css={descriptionStyle}>
        <p className="descriptionTitle">매장소개</p>
        <p>{`${data.description}`}</p>
      </div>
    </>
  );
};

export default StudioMain;

const StudioInfoTitleStyle = css`
  display: flex;
  justify-content: space-between;

  & > div {
    margin-bottom: 1rem;
    & > h2 {
      ${TypoTitleMdSb}
      margin-bottom: 0.4rem;
    }

    & > div {
      display: flex;
      & > img {
        align-items: center;
        justify-content: center;
        margin-right: 0.4rem;
        width: 2rem;
        height: 2rem;
      }

      & > p + p {
        margin-left: 0.2rem;
        color: ${variables.colors.gray800};
      }
    }
  }
`;

const StudioInfoStyle = css`
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
          width: 2rem;
          height: 2rem;
        }
      }

      dd {
        display: flex;
        align-items: center;
        ${TypoBodyMdR}

        .highlight {
          ${TypoBodyMdSb}
          margin-right: 0.4rem;
        }
      }
    }
  }
`;

const SocialActionsStyle = css`
  display: flex;
  gap: 2.4rem;
  ${TypoCapSmR}
  color: ${variables.colors.gray700};
`;

const descriptionStyle = css``;
