/** @jsxImportSource @emotion/react */
import Button from '@components/Button/Button';
import Header from '@components/Header/Header';
import KakaoMap from '@components/Kakao/KakaoMap';
import Loading from '@components/Loading/Loading';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import StudioInfo from '@components/Studio/StudioInfo';
import StudioInfoDock from '@components/Studio/StudioInfoDock';
import StudioOptions from '@components/Studio/StudioOptions';
import { css } from '@emotion/react';
import { useGetStudioDetail } from '@hooks/useGetStudioDetail';
import useStudioDataStore from '@store/useStudioDataStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoBodyMdM, TypoBodyMdR, TypoCapSmM, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router-dom';

const StudioMain = () => {
  const { _id } = useParams();
  const { data, error } = useGetStudioDetail(`${_id}`);
  const [isOpened, setIsOpened] = useState(false);
  const [isWebPSupported, setIsWebPSupported] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [scrollY, setScrollY] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => navigate(`/studio/${_id}/menu`);
  const { studioDetail, setStudioDetail } = useStudioDataStore();
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });

  /** 스튜디오 데이터 session Storage에 저장 */
  useEffect(() => {
    if (!studioDetail[`${_id}`] && data) {
      setStudioDetail(`${_id}`, data);
    }
  }, [data, _id, studioDetail, setStudioDetail]);

  /** 스튜디오 소개 텍스트 길이 */
  const hasMore: boolean | undefined = data && data.description.length > 100;

  /** 스크롤 이벤트 핸들러 */
  const handleScroll = () => {
    // 스크롤이 200px 이상일 때 scrollY를 true로 설정
    if (window.scrollY >= 250) {
      setScrollY(true);
    } else {
      setScrollY(false);
    }
  };

  /** 스크롤 이벤트 리스너 */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /** webP 지원 여부 확인 후 상태값 저장 */
  useEffect(() => {
    supportsWebP().then(setIsWebPSupported);
  }, []);

  /** webP 형식을 지원하고 렌더링 할 수 있는 지 확인 */
  const supportsWebP = () => {
    if (!window.createImageBitmap) return Promise.resolve(false);
    const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    return fetch(webpData)
      .then((response) => response.blob())
      .then((blob) => createImageBitmap(blob))
      .then(
        () => true,
        () => false,
      );
  };

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <Loading size="big" phrase="스튜디오를 불러오고 있습니다." />;
  }

  /** 이미지 5개 이하일 때 대체할 이미지 */
  const placeHolderImageList = [
    '/img/img-replace-01.svg',
    '/img/img-replace-02.svg',
    '/img/img-replace-03.svg',
    '/img/img-replace-04.svg',
    '/img/img-replace-05.svg',
  ];

  /** 대체이미지 개수 정하기 */
  const missingImgCount = Math.max(5 - data.portfolios.length, 0);

  /** placeHolderImageList의 뒤에서부터 배열 채우기 */
  const portfolioWithPlaceHolders = [
    ...data.portfolios,
    ...placeHolderImageList.slice(-missingImgCount).map((url) => ({ url })),
  ];

  /** 환경별 이미지 조건부 렌더링 */
  const getImageUrl = (url: string) => {
    const webpUrl = isWebPSupported ? url.replace(/\.jpeg$/, '.webp') : url;

    const img = new Image();
    img.onerror = () => {
      console.error('WebP 이미지 로드 실패:', webpUrl);
      setImageLoadError(true);
    };
    img.src = webpUrl;

    return imageLoadError ? url : webpUrl;
  };

  const day = {
    MONDAY: '월요일',
    TUESDAY: '화요일',
    WEDNESDAY: '수요일',
    THURSDAY: '목요일',
    FRIDAY: '금요일',
    SATURDAY: '토요일',
    SUNDAY: '일요일',
  };

  return (
    <>
      <Helmet>
        <title>{`${data?.name} - 상세정보`}</title>
        <meta property="og:title" content="스튜디오 상세정보" />
        <meta property="og:url" content={`${window.location.href}`} />
        <meta property="og:description" content="스튜디오의 영업시간과 정보" />
      </Helmet>

      <main
        css={css`
          ${mqMin(breakPoints.pc)} {
            display: flex;
          }
        `}
      >
        <section
          css={css`
            ${mqMin(breakPoints.pc)} {
              flex-grow: 1;
            }
          `}
        >
          {/* 모바일 헤더 */}
          <Header title={scrollY ? data?.name : ''} fixed={true} scrollEvent={true} />

          <div css={boxLayoutStyle}>
            {/* 이미지 */}
            <div css={portfolioPreviewStyle} onClick={() => navigate(`/studio/${_id}/portfolio`)}>
              {portfolioWithPlaceHolders.slice(0, 4).map((portfolioImg, idx) => (
                <img
                  key={idx}
                  src={getImageUrl(portfolioImg.url)}
                  alt={`포트폴리오 이미지 : ${portfolioImg.url}`}
                />
              ))}
              <div css={portfolioPsitionStyle}>
                <img
                  src={portfolioWithPlaceHolders[4].url.replace(/\.jpeg$/, '.webp')}
                  alt="사진5"
                />
                <div css={DimOverlayStyle}>
                  <img src="/img/icon-morePreview.svg" alt="더보기" />
                  <span>
                    {data && data.portfolios.length >= 5 ? `+ ${data.portfolios.length - 5}` : ''}
                  </span>
                </div>
              </div>
            </div>

            <div className="mo">
              <StudioInfo data={data} id={_id} />
            </div>

            <div css={stickyNavStyle}>
              <StudioNavigator _id={_id || ''} />
            </div>
          </div>

          {/* 홈 기본 정보  - 매장소개 */}
          <div css={descriptionStyle(isOpened, hasMore)}>
            <p className="descriptionTitle">매장 소개</p>
            <p className="textDisplay">{`${data.description}`}</p>
            {hasMore && (
              <span className="textMore" onClick={() => setIsOpened(!isOpened)}>
                {isOpened ? '접기' : '더보기'}
              </span>
            )}
          </div>

          {/* 홈 기본 정보  - 영업 정보 */}
          <div css={openingHoursStyle}>
            <p className="openingHoursTitle">영업 정보</p>
            {data && data.openingHours.length === 0 ? (
              <p>수집중</p>
            ) : (
              data &&
              data.openingHours.map((openingHour) => (
                <dl key={openingHour.id}>
                  <dt>{day[openingHour.dayOfWeek as keyof typeof day]}</dt>
                  <dd>
                    {openingHour.closed ? (
                      <p>정기 휴무</p>
                    ) : (
                      <>
                        <time>{openingHour.openTime.slice(0, 5)}</time>
                        <span>-</span>
                        <time>{openingHour.closeTime.slice(0, 5)}</time>
                      </>
                    )}
                  </dd>
                </dl>
              ))
            )}
            {data.openingHours.length !== 0 ? (
              <div css={holidayStyle}>
                <p className="holidayTitle"> 정기휴무</p>
                <div className="holidayMonth">
                  {data.holidays.map((holiday) => (
                    <p key={holiday.id}>
                      {holiday.weekOfMonth === 1
                        ? '첫'
                        : holiday.weekOfMonth === 2
                          ? '둘'
                          : holiday.weekOfMonth === 3
                            ? '셋'
                            : '넷'}
                      째 주 {day[holiday.dayOfWeek as keyof typeof day]}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>

          {/* 홈 기본정보 - 위치 정보 */}
          <div css={mapStyle}>
            <p>위치 정보</p>
            <KakaoMap
              addressSi={data.addressSi}
              addressGu={data.addressGu}
              address={data.address}
            />
          </div>

          {/* 홈 기본정보 - 매장 정보 */}
          {!isPc && (
            <>
              <StudioOptions data={data} />

              <div css={reservationStyle}>
                <Button
                  type="button"
                  variant="black"
                  text="예약하기"
                  size="large"
                  width="max"
                  onClick={handleClick}
                />
              </div>
            </>
          )}
        </section>

        {/* PC용 */}
        <StudioInfoDock />
      </main>
    </>
  );
};

export default StudioMain;

const stickyNavStyle = css`
  position: sticky;
  top: 0;
  opacity: 0;
  z-index: 6;
  transform: translateY(-10px);
  animation: slideDown 0.3s ease forwards;
  padding: 0;

  ${mqMin(breakPoints.pc)} {
    width: 100%;
    background-color: ${variables.colors.white};
    width: calc(100% + ${variables.layoutPadding} * 2);
    margin-left: -1.6rem;
    padding: 0 ${variables.layoutPadding};
  }

  @keyframes slideDown {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const boxLayoutStyle = css`
  display: flex;
  flex-direction: column;

  ${mqMin(breakPoints.pc)} {
    div:nth-of-type(1) {
      order: 2;
    }
    div:nth-of-type(2) {
      order: 3;
    }
    div:nth-of-type(3) {
      order: 1;
    }
  }
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

const DimOverlayStyle = css`
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

const descriptionStyle = (isOpened: boolean, hasMore: boolean | undefined) => css`
  padding: 2rem 0;
  border-bottom: 0.1rem solid ${variables.colors.gray300};

  & > .descriptionTitle {
    ${TypoTitleXsM};
    color: ${variables.colors.black};
  }

  & > p {
    padding-top: 1rem;
    color: ${variables.colors.gray800};
    ${TypoBodyMdR};
  }

  & > .textDisplay {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: ${isOpened ? 'none' : '3'};
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  & > .textMore {
    color: ${variables.colors.gray600};
    ${TypoBodyMdR};
    border-bottom: 0.1rem solid ${variables.colors.gray600};
    cursor: pointer;
    display: ${hasMore ? 'inline' : 'none'};
  }
`;

const openingHoursStyle = css`
  padding: 2rem 0;
  border-bottom: 0.1rem solid ${variables.colors.gray300};

  & > .openingHoursTitle {
    ${TypoTitleXsM};
    margin-bottom: 0.2rem;
  }

  & > dl {
    padding-top: 1rem;
    padding-left: 0.8rem;
    display: flex;
    gap: 3rem;

    & > dt {
      ${TypoBodyMdM}
    }

    & > dd {
      display: flex;
      gap: 0.8rem;
      ${TypoBodyMdR}

      & > time {
        display: flex;
        justify-content: left;
      }

      & > time:first-of-type {
        min-width: 4rem;
        display: flex;
        justify-content: left;
      }

      & > span {
        margin-right: 0.2rem;
      }
    }
  }
`;

const holidayStyle = css`
  display: flex;
  padding-top: 1.8rem;
  padding-left: 0.8rem;
  gap: 1.8rem;

  & > .holidayTitle {
    ${TypoBodyMdM}
  }

  & > .holidayMonth {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    ${TypoBodyMdR}
  }
`;

const mapStyle = css`
  padding: 2rem 0;
  border-bottom: 0.1rem solid ${variables.colors.gray300};

  & > p {
    ${TypoTitleXsM};
    margin-bottom: 1rem;
  }
`;

const reservationStyle = css`
  border-top: 1px solid ${variables.colors.gray300};
  background-color: ${variables.colors.white};
  padding: 1rem 1.6rem 3rem 1.6rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  z-index: 9;

  & > button {
    ${TypoTitleXsM}
  }
`;
