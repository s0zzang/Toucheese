import BookingSearchContainer from '@components/BookingSearchContainer/BookingSearchContainer';
import BottomSheet from '@components/BottomSheet/BottomSheet';
import Button from '@components/Button/Button';
import Filter from '@components/Filter/Filter';
import FilterTextSelector from '@components/Filter/FilterTextSelector';
import FilterPriceSlideComponent from '@components/FilterPriceSlide/FilterPriceSlide';
import ThemeNavigator from '@components/Navigator/ThemeNavigator';
import ServiceAvailability from '@components/ServiceAvailability/ServiceAvailability';
import StudioList from '@components/Studio/StudioList';
import styled from '@emotion/styled';
import useBottomSheetState from '@store/useBottomSheetStateStore';
import variables from '@styles/Variables';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface IFixedProps {
  isFixed: boolean;
}

export type SortBy = {
  VIEW_COUNT: string;
  POPULARITY: string;
  RATING: string;
  REVIEW_COUNT: string;
};

export type Options = {
  원본: string;
  주차: string;
  보정: string;
  헤메코: string;
  정장: string;
  탈의실: string;
  파우더룸: string;
};

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
console.log('접속한 기기:', isMobile ? '모바일' : '데스크톱');

const Home = () => {
  const [searchParams] = useSearchParams();
  const [isFixed, setIsFixed] = useState(false);
  const homeRef = useRef<HTMLTableSectionElement | null>(null);
  const navigate = useNavigate();
  // 스크롤에 따라 Navigator 고정
  useEffect(() => {
    const handleScroll = () => {
      if (homeRef.current) {
        const rect = homeRef.current.getBoundingClientRect();
        if (rect.top <= -78) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { openBottomSheet } = useBottomSheetState();

  const handleFilterByPopularity = () => {
    openBottomSheet(<FilterTextSelector />, '정렬');
  };

  const handleFilterByPriceRange = () => {
    openBottomSheet(<FilterPriceSlideComponent />, '가격');
  };

  const handleFilterByStoreInfo = () => {
    openBottomSheet(<ServiceAvailability />, '매장정보');
  };

  const handleReset = () => {
    navigate('/');
  };

  const sortBy: SortBy = { VIEW_COUNT: '조회순', POPULARITY: '인기순', RATING: '평점순', REVIEW_COUNT: '리뷰 많은순' };
  const options: Options = { 보정: '보정', 원본: '원본', 주차: '주차', 헤메코: '헤메코', 정장: '정장', 탈의실: '탈의실', 파우더룸: '파우더룸' };

  return (
    <>
      <section ref={homeRef}>
        <BookingSearchContainer />

        <NavigatorStyle isFixed={isFixed}>
          <ThemeNavigator />
          <FilterBox>
            <Button text="" type="reset" variant="gray" icon={<img src="/img/icon-reset.svg" alt="필터 초기화" />} onClick={handleReset} />
            <div className="filterScroll">
              <Filter params={window.location.search} text="인기순" paramsKeyword={sortBy} paramsName="sortBy" onClick={handleFilterByPopularity} />
              <Filter params={window.location.search} paramsName={'minPrice'} text="가격대" onClick={handleFilterByPriceRange} />
              <Filter params={window.location.search} text="매장정보" paramsKeyword={options} paramsName="options" onClick={handleFilterByStoreInfo} />
            </div>
          </FilterBox>
        </NavigatorStyle>

        <ListStyle>
          <StudioList mode="filter" searchParams={searchParams} />
        </ListStyle>
      </section>
      <BottomSheet />
    </>
  );
};

const NavigatorStyle = styled.div<IFixedProps>`
  position: ${(props) => (props.isFixed ? 'fixed' : 'absolute')};
  top: ${(props) => (props.isFixed ? '0' : '11.8rem')};
  left: 0;
  right: 0;
  z-index: 9;
`;

const FilterBox = styled.div`
  width: 100%;
  padding: 1.2rem 0rem 1.2rem 1.6rem;
  display: flex;
  gap: 0.6rem;
  box-shadow: 0 0 2px ${variables.colors.gray500};
  position: relative;

  & ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
  }

  & > Button {
    flex-shrink: 0;
    margin: auto 0;
  }

  .filterScroll {
    padding-left: 1rem;
    padding-right: 1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch; /* 모바일 스크롤 */
    scrollbar-width: thin; /* 크롬, 파이어폭스에서 스크롤바 스타일 */
    white-space: nowrap;
    display: flex;
    gap: 0.8rem;
    position: relative;
  }

  /* 크롬, 사파리 */
  .filterScroll::-webkit-scrollbar {
    display: none;
  }

  .filterScroll {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE, Edge */
  }
`;

const ListStyle = styled.div`
  padding-top: 12rem;
`;

export default Home;
