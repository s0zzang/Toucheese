import BookingSearchContainer from '@components/BookingSearchContainer/BookingSearchContainer';
import BottomSheet from '@components/BottomSheet/BottomSheet';
import Button from '@components/Button/Button';
import Filter from '@components/Filter/Filter';
import ThemeNavigator from '@components/Navigator/ThemeNavigator';
import StudioList from '@components/Studio/StudioList';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LocalDateSelectionModal from './LocalDateSelectionModal';

interface IFixedProps {
  isFixed: boolean;
}

const Home = () => {
  const [searchParams] = useSearchParams();
  const [isFixed, setIsFixed] = useState(false);
  const navigatorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navigatorRef.current) {
        const rect = navigatorRef.current.getBoundingClientRect();
        const initialTop = rect.top;
        if (rect.top <= 0) setIsFixed(true);
        else if (rect.top >= initialTop) setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SectionStyle>
        <BookingSearchContainer />

        <NavigatorStyle id="navigator" ref={navigatorRef} isFixed={isFixed}>
          <ThemeNavigator />
          <FilterBox>
            <Button text="" type="reset" variant="gray" icon={<img src="/img/icon-reset.svg" alt="필터 초기화" />} />
            <Filter text="인기순" />
            <Filter text="가격대" />
            <Filter text="매장정보" />
          </FilterBox>
        </NavigatorStyle>

        <ListStyle>
          <StudioList mode="filter" searchParams={searchParams} />
        </ListStyle>
      </SectionStyle>
      <LocalDateSelectionModal modalId={1} />
      <BottomSheet />
    </>
  );
};

const SectionStyle = styled.section``;

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
