/** @jsxImportSource @emotion/react */
import BookingSearchContainer from '@components/BookingSearchContainer/BookingSearchContainer';
import Button from '@components/Button/Button';
import Filter from '@components/Filter/Filter';
import ThemeNavigator from '@components/Navigator/ThemeNavigator';
import StudioList from '@components/Studio/StudioList';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { useSearchParams } from 'react-router-dom';
import LocalDateSelectionModal from './LocalDateSelectionModal';

const Home = () => {
  const [searchParams] = useSearchParams();

  return (
    <>
      <SectionStyle>
        <BookingSearchContainer />

        <NavigatorStyle>
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
    </>
  );
};

const SectionStyle = styled.section``;

const NavigatorStyle = styled.div`
  width: 100%;
  position: absolute;
  top: 11.8rem;
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
