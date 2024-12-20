/** @jsxImportSource @emotion/react */

import Header from '@components/Header/Header';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useGetStudioDetail } from '@hooks/useGetStudioDetail';
import { DividerStyle, TypoBodyMdR, TypoBodyMdSb, TypoCapSmM, TypoCapSmR, TypoTitleMdSb } from '@styles/Common';
import variables from '@styles/Variables';
import { useNavigate, useParams } from 'react-router-dom';

///studio/detail/{studioId}

const StudioMain = () => {
  const { _id } = useParams();
  const { data, error } = useGetStudioDetail(`${_id}`);
  const navigate = useNavigate();

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>로딩</div>;
  }

  /**이미지 5개 이하일때 대체할 이미지 */
  const placeHolderImage = '/img/img-nopic.png';
  const missingImgCount = data.portfolios.length < 5 ? 5 - data.portfolios.length : 0;
  const portfolioWithPlaceHolders = [...data.portfolios, ...Array(missingImgCount).fill({ url: placeHolderImage })];

  return (
    <>
      <Header customStyle={HeaderStyle} />
      {/* 이미지 */}
      <div css={portfolioPreviewStyle}>
        {portfolioWithPlaceHolders.slice(0, 4).map((v, i) => (
          <img key={i} src={v.url} alt={`Portfolio ${i}`} />
        ))}
        <div css={portfolioPsitionStyle}>
          <img src={portfolioWithPlaceHolders[4].url} alt="사진5" />
          <DimOverlayStyle onClick={() => navigate(`/studio/${_id}/portfolio`)}>
            <img src="/img/icon-morePreview.svg" alt="더보기" />
            <span>{data?.portfolios.length >= 5 ? `+ ${data?.portfolios.length - 5}` : ''}</span>
          </DimOverlayStyle>
        </div>
      </div>

      {/* 스튜디오 정보 */}
      <div css={StudioInfoTitleStyle}>
        <div>
          <h2>{`${data.name}`}</h2>
          <div>
            <img src="/img/icon-rating.svg" alt="리뷰 평점" />
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
              <img src="/img/icon-location.svg" alt="주소" />
            </dt>
            <dd>
              <p>{`${data.address}` === 'undefined' ? '주소 수집중' : `${data.address}`}</p>
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

const HeaderStyle = css`
  position: absolute;
  z-index: 1;
  padding-top: 1.8rem;
`;

const portfolioPreviewStyle = css`
  display: grid;
  gap: 0.2rem;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  width: calc(100% + 3.2rem);
  margin-left: -1.6rem;
  margin-bottom: 2rem;

  & > img {
    aspect-ratio: 1/1;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  & > img:first-of-type {
    grid-column: span 1; /* 첫 번째 이미지는 2개의 열을 차지 */
    grid-row: span 2; /* 첫 번째 이미지는 2개의 행을 차지 */
    width: 100%;
    height: 100%;
  }
`;

const portfolioPsitionStyle = css`
  position: relative;
  width: 100%;
  height: 100%;

  & > img {
    aspect-ratio: 1/1;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const DimOverlayStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & > img {
    width: 1.8rem;
    height: 1.8rem;
  }

  & > span {
    color: ${variables.colors.white};
    ${TypoCapSmM}
  }
`;

const StudioInfoTitleStyle = css`
  display: flex;
  justify-content: space-between;

  & > div {
    margin-bottom: 2rem;
    & > h2 {
      ${TypoTitleMdSb}
      margin-bottom: 0.4rem;
    }

    & > div {
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

        .highlight {
          ${TypoBodyMdSb}
          margin-right: 0.4rem;
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

const descriptionStyle = css``;
