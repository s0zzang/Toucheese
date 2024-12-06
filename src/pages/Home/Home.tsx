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
import FilterPriceSlideComponent from '@components/FilterPriceSlide/FilterPriceSlide';
import ServiceAvailability from '@components/ServiceAvailability/ServiceAvailability';

const Home = () => {
  const [searchParams] = useSearchParams();

  return (
    <>
      <FilterPriceSlideComponent />
      <ServiceAvailability />
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
