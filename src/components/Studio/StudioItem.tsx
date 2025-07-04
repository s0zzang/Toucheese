/** @jsxImportSource @emotion/react */
import Bookmark from '@components/Bookmark/Bookmark';
import NoPic from '@components/NoPic/NoPic';
import ImageSwiper from '@components/Swiper/ImageSwiper';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoBodyMdR, TypoTitleSmS } from '@styles/Common';
import variables from '@styles/Variables';
import { KeyboardEvent } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { IMenus, IPortfolio, IStudioItem } from 'types/types';

// 최저가 계산 함수
export const getMinPrice = (menu: IMenus[]) => {
  let minPrice = 1e9;

  menu.forEach((item) => {
    if (item.price < minPrice) minPrice = item.price;
  });

  return minPrice.toLocaleString('ko-KR');
};

const StudioItem = ({ item, isLast }: { item: IStudioItem; isLast: boolean }) => {
  const navigate = useNavigate();
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });

  // 탭 키 이동 후 Enter 시 navigate
  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (!isPc) return;

    if (e.code === 'Enter') {
      navigate(`/studio/${item.id}`);
    }
  };

  // 이미지 불러오기
  const getImages = (photos: IPortfolio[]) => {
    let images: string[] = [];
    const portfolios = isPc ? photos.slice(0, 7) : photos.slice(0, 5);

    portfolios.forEach((photo: IPortfolio) => {
      images.push(photo.url.replace(/\.jpeg$/, '.webp'));
    });

    return images;
  };

  return (
    <DivStyle isLast={isLast}>
      <a
        css={css`
          display: block;
        `}
        href={`/studio/${item.id}`}
        onKeyDown={handleKeyDown}
      >
        <ItemImageStyle>
          {isPc ? (
            <div
              css={css`
                width: 100%;
                display: flex;
                align-items: center;
                gap: 2px;
              `}
            >
              {getImages(item.portfolios).map((image, index) => (
                <img
                  key={`${item.id}-image-${index}`}
                  css={css`
                    width: calc((100% - 12px) / 7);
                    aspect-ratio: 127 / 160;
                    object-fit: cover;
                  `}
                  src={image}
                  alt={`이미지 ${index + 1}`}
                />
              ))}
              {item.portfolios.length < 7 && <NoPic type={7 - item.portfolios.length} />}
            </div>
          ) : (
            <ImageSwiper
              images={item.portfolios}
              imageStyle={css`
                width: 100%;
                aspect-ratio: 94 / 118;
                object-fit: cover;
              `}
            />
          )}
        </ItemImageStyle>
        <ItemContentStyle>
          <ItemInfoStyle>
            <TitleStyle css={TypoTitleSmS}>{item.name}</TitleStyle>
            <InfoContainerStyle>
              <div>
                <div className="icon-container">
                  <img className="rating" src="/img/icon-rating.svg" alt="평점" />
                </div>
                <p>
                  {item.rating.toFixed(1)}
                  <span>{` (${item.review_count}개의 평가)`}</span>
                </p>
              </div>
              <div>
                <div className="icon-container">
                  <img className="price" src="/img/icon-price.svg" alt="가격" />
                </div>
                <p>{`${getMinPrice(item.menus)}원~`}</p>
              </div>
            </InfoContainerStyle>
            <InfoContainerStyle>
              <div>
                <div className="icon-container">
                  <img className="location" src="/img/icon-location.svg" alt="주소" />
                </div>
                <p className="location">{`${item.addressGu} ${item.address}`}</p>
              </div>
              <div>
                <div className="icon-container">
                  <img className="time" src="/img/icon-clock.svg" alt="영업 시간" />
                </div>
                <p>{`${item.open_time.slice(0, -3)} - ${item.close_time.slice(0, -3)}`}</p>
              </div>
            </InfoContainerStyle>
          </ItemInfoStyle>
          <BookmarkStyle>
            <Bookmark
              id={item.id}
              count={item.bookmark_count}
              isBookmarked={item.bookmark}
              type="default"
            />
          </BookmarkStyle>
        </ItemContentStyle>
      </a>
    </DivStyle>
  );
};

const DivStyle = styled.div<{ isLast: boolean }>`
  width: 100%;
  padding: 1.6rem 0;
  border-bottom: 1px solid ${variables.colors.gray300};
  cursor: pointer;

  ${({ isLast }) =>
    isLast &&
    `
      border-bottom: unset;
  `}

  ${mqMin(breakPoints.pc)} {
    padding: unset;
    padding-bottom: 3.4rem;
    border-bottom: unset;

    ${({ isLast }) =>
      isLast &&
      `
      padding-bottom: unset;
  `}
  }
`;

const ItemImageStyle = styled.div`
  margin-bottom: 1.4rem;

  ${mqMin(breakPoints.pc)} {
    margin-bottom: 1rem;
    width: 100%;
  }
`;

const ItemContentStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 3rem;
`;

const ItemInfoStyle = styled.div`
  min-width: 0;
  flex-grow: 1;
`;

const TitleStyle = styled.h3`
  margin-bottom: 0.5rem;
`;

const InfoContainerStyle = styled.div`
  flex-shrink: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.4rem;
  ${TypoBodyMdR}

  & > div {
    display: flex;
    align-items: center;
    gap: 2px;

    .icon-container {
      flex-shrink: 0;
      width: 1.6rem;
      height: 1.6rem;
      display: flex;
      justify-content: center;
      align-items: center;

      & > img {
        &.rating {
          width: 1.2rem;
          height: 1.2rem;
        }

        &.price {
          width: 1.3rem;
          height: 1.1rem;
        }

        &.location {
          width: 1.1rem;
          height: 1.3rem;
        }

        &.time {
          width: 1.3rem;
          height: 1.3rem;
        }
      }

      ${mqMin(breakPoints.pc)} {
        width: 1.8rem;
        height: 1.8rem;

        & > img {
          &.rating {
            width: 1.4rem;
            height: 1.4rem;
          }

          &.price {
            width: 1.5rem;
            height: 1.2rem;
          }

          &.location {
            width: 1.2rem;
            height: 1.5rem;
          }

          &.time {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      }
    }

    & > p {
      & > span {
        color: ${variables.colors.gray800};
      }
    }

    &:first-of-type {
      flex-shrink: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      & > .location {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &:last-child {
      flex-shrink: 0;
    }
  }

  &:last-child {
    margin-bottom: unset;
  }
`;

const BookmarkStyle = styled.div`
  flex-shrink: 0;
  margin-left: auto;

  & > button {
    width: 2.4rem;
    height: 2.4rem;
    margin: 0 auto;

    & > img {
      width: 100%;
      aspect-ratio: 1/1;
      margin: 0 auto;
    }
  }

  & > p {
    color: ${variables.colors.gray600};
    margin: 0 auto;
    text-align: center;
    font-size: 1rem;
    line-height: 1.2;
  }
`;

export default StudioItem;
