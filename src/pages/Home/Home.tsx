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
import useBottomSheetState from '@store/useBottomSheetStateStroe';
import variables from '@styles/Variables';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LocalDateSelectionModal from './components/LocalDateSelectionModal';

interface IFixedProps {
  isFixed: boolean;
}

const Home = () => {
  const [searchParams] = useSearchParams();
  const [isFixed, setIsFixed] = useState(false);
  const homeRef = useRef<HTMLTableSectionElement | null>(null);

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
    console.log('인기순 바텀시트');
    openBottomSheet(<FilterTextSelector />, '정렬');
  };

  const handleFilterByPriceRange = () => {
    console.log('가격대');
    openBottomSheet(<FilterPriceSlideComponent />, '가격');
  };

  const handleFilterByStoreInfo = () => {
    console.log('매장정보');
    openBottomSheet(<ServiceAvailability />, '매장정보');
  };

  return (
    <>
      <section ref={homeRef}>
        <BookingSearchContainer />

        <NavigatorStyle isFixed={isFixed}>
          <ThemeNavigator />
          <FilterBox>
            <Button text="" type="reset" variant="gray" icon={<img src="/img/icon-reset.svg" alt="필터 초기화" />} />
            <Filter text="인기순" onClick={handleFilterByPopularity} />
            <Filter text="가격대" onClick={handleFilterByPriceRange} />
            <Filter text="매장정보" onClick={handleFilterByStoreInfo} />
          </FilterBox>
        </NavigatorStyle>

        <ListStyle>
          <StudioList mode="filter" searchParams={searchParams} />
        </ListStyle>
      </section>
      <LocalDateSelectionModal modalId={1} />
      <BottomSheet />
    </>
  );
};

const NavigatorStyle = styled.div<IFixedProps>`
  width: 100%;
  position: ${(props) => (props.isFixed ? 'fixed' : 'absolute')};
  top: ${(props) => (props.isFixed ? '0' : '11.8rem')};
  left: 0;
  right: 0;
  z-index: 9;
`;

const FilterBox = styled.div`
  padding: 1.2rem 0rem 1.2rem 1.6rem;
  display: flex;
  gap: 0.6rem;
  box-shadow: 0 0 2px ${variables.colors.gray500};
  background-color: ${variables.colors.white};

  button:first-of-type {
    margin-right: 1rem;
  }
`;

const ListStyle = styled.div`
  padding-top: 12rem;
`;

export default Home;
