/** @jsxImportSource @emotion/react */
import Bookmark from '@components/Bookmark/Bookmark';
import NoPic from '@components/NoPic/NoPic';
import ImageSwiper from '@components/Swiper/ImageSwiper';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoTitleSmS } from '@styles/Common';
import variables from '@styles/Variables';
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

const StudioItem = ({
  item,
  isFirst,
  isLast,
}: {
  item: IStudioItem;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const navigate = useNavigate();
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });

  // 스튜디오 클릭 시 navigate
  const handleClick = () => {
    navigate(`/studio/${item.id}`);
  };

  // 이미지 5개 불러오기
  const getImages = (photos: IPortfolio[]) => {
    let images: string[] = [];
    const portfolios = isPc ? photos.slice(0, 7) : photos.slice(0, 5);

    portfolios.forEach((photo: IPortfolio) => {
      images.push(photo.url.replace(/\.jpeg$/, '.webp'));
    });

    return images;
  };

  return (
    <DivStyle isFirst={isFirst} isLast={isLast} onClick={handleClick}>
      <ItemImageStyle>
        {item.portfolios.length >= 4 ? (
          isPc ? (
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
                  `}
                  src={image}
                  alt={`이미지 ${index + 1}`}
                />
              ))}
            </div>
          ) : (
            <ImageSwiper
              images={item.portfolios}
              imageStyle={css`
                width: 100%;
                aspect-ratio: 94 / 118;
                object-fit: cover;

                ${mqMin(breakPoints.pc)} {
                  aspect-ratio: 141 / 177;
                }
              `}
            />
          )
        ) : (
          <NoPic />
        )}
      </ItemImageStyle>

      <ItemContentStyle>
        <ItemInfoStyle>
          <TitleStyle css={TypoTitleSmS}>{`${item.name}`}</TitleStyle>
          <InfoContainerStyle>
            <div>
              <img src="/img/icon-rating.svg" alt="평점" />
              <p>
                {item.rating}
                <span>{` (${item.review_count}개의 평가)`}</span>
              </p>
            </div>
            <div>
              <img className="price" src="/img/icon-price.svg" alt="가격" />
              <p>{`${getMinPrice(item.menus)}원~`}</p>
            </div>
          </InfoContainerStyle>
          <InfoContainerStyle>
            <div>
              <img className="location" src="/img/icon-location.svg" alt="주소" />
              <p className="location">{`${item.addressGu} ${item.address}`}</p>
            </div>
            <div>
              <img src="/img/icon-clock.svg" alt="영업 시간" />
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
    </DivStyle>
  );
};

const DivStyle = styled.div<{ isFirst: boolean; isLast: boolean }>`
  width: 100%;
  padding: 1.6rem 0;
  border-bottom: 1px solid ${variables.colors.gray300};

  ${({ isLast }) =>
    isLast &&
    `
      border-bottom: unset;
  `}

  &:hover {
    cursor: pointer;
  }

  ${mqMin(breakPoints.pc)} {
    padding: unset;
    padding-bottom: 3.4rem;
    border-bottom: unset;

    ${({ isFirst }) =>
      isFirst &&
      `
        padding-top: 3rem;
    `}

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

const TitleStyle = styled.p`
  margin-bottom: 0.5rem;
`;

const InfoContainerStyle = styled.div`
  flex-shrink: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.4rem;

  & > div {
    display: flex;
    align-items: center;
    gap: 3px;

    & > img {
      flex-shrink: 0;
      width: 1.3rem;
      height: 1.3rem;

      &.price {
        width: 1.3rem;
        height: 1.1rem;
      }

      &.location {
        width: 1.1rem;
        height: 1.3rem;
      }
    }

    & > p {
      line-height: 2rem;

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
