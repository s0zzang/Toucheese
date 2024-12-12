/** @jsxImportSource @emotion/react */
import ImageSwiper from '@components/ImageSwiper/ImageSwiper';
import styled from '@emotion/styled';
import { Hidden, TypoTitleSmS } from '@styles/Common';
import variables from '@styles/Variables';
import { useNavigate } from 'react-router-dom';
import { IMenus, IPortfolio, IStudioItem } from 'types/types';

const StudioItem = ({ item, isFirst, isLast }: { item: IStudioItem; isFirst: boolean; isLast: boolean }) => {
  const navigate = useNavigate();
  // 북마크 설정/해제 api 호출
  const handleClickBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    console.log(`북마크 ${item.bookmark ? '해제' : '설정'}`);
  };

  // 스튜디오 클릭 시 navigate
  const handleClickStudio = () => {
    navigate(`/studio/${item.id}`);
  };

  // 최저가 계산 함수
  const getMinPrice = (menu: IMenus[]) => {
    let minPrice = 1e9;

    menu.forEach((item) => {
      if (item.price < minPrice) minPrice = item.price;
    });

    return minPrice;
  };

  // 이미지 5개 불러오기
  const getImages = (portfolio: IPortfolio[]) => {
    let images: string[] = [];
    const porfolios = portfolio.slice(0, 5);

    if (porfolios.length) {
      porfolios.forEach((portfolio: IPortfolio) => {
        images.push(portfolio.url);
      });
    } else {
      images.push('/img/img-nopic.png');
    }

    return images;
  };

  return (
    <DivStyle isFirst={isFirst} isLast={isLast} onClick={handleClickStudio}>
      <ImageSwiper images={getImages(item.portfolios)} />

      <ItemContentStyle>
        <ItemInfoStyle>
          <TitleStyle css={TypoTitleSmS}>{`${item.name}`}</TitleStyle>
          <InfoContainerStyle>
            <div>
              <img src="/img/icon-rating.svg" />
              <p>
                {item.rating}
                <span>{` (${item.review_count}개의 평가)`}</span>
              </p>
            </div>
            <div>
              <img src="/img/icon-price.svg" />
              <p>{`${getMinPrice(item.menus)}원~`}</p>
            </div>
          </InfoContainerStyle>
          <InfoContainerStyle>
            <div>
              <img src="/img/icon-location.svg" />
              <p className="location">{`${item.addressGu} ${item.address}`}</p>
            </div>
            <div>
              <img src="/img/icon-time.svg" />
              <p>{`${item.open_time.slice(0, -3)} - ${item.close_time.slice(0, -3)}`}</p>
            </div>
          </InfoContainerStyle>
        </ItemInfoStyle>
        <BookmarkStyle>
          <button onClick={handleClickBookmark}>
            <img src={`/img/icon-bookmark-${item.bookmark ? 'active' : 'inactive'}.svg`} alt={`북마크 ${item.bookmark ? '해제' : '등록'}`} />
            <span css={Hidden}>북마크 {`${item.bookmark ? '해제' : '등록'}하기`}</span>
          </button>
          <p>{item.bookmark_count}</p>
        </BookmarkStyle>
      </ItemContentStyle>
    </DivStyle>
  );
};

const DivStyle = styled.div<{ isFirst: boolean; isLast: boolean }>`
  padding: 1.6rem 0;
  border-bottom: 0.1rem solid ${variables.colors.gray300};

  ${({ isLast }) =>
    isLast &&
    `
      border-bottom: unset;
  `}

  &:hover {
    cursor: pointer;
  }
`;

const ItemContentStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 1.6rem;
`;

const ItemInfoStyle = styled.div`
  flex-grow: 1;
  max-width: 30rem;
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
    gap: 0.3rem;

    & > img {
      width: 1.3rem;
      height: 1.3rem;
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
