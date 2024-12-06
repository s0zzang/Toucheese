import ThemeNavigator from '@components/Navigator/ThemeNavigator';
import StudioList from '@components/Studio/StudioList';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { useSearchParams } from 'react-router-dom';
import useModal from '@hooks/useModal';
import LocalDateSelectionModal from './LocalDateSelectionModal';
import BookingSearchContainer from '@components/BookingSearchContainer/BookingSearchContainer';
import BottomSheet from '@components/BottomSheet/BottomSheet';
import FilterPriceSlideComponent from '@components/FilterPriceSlide/FilterPriceSlide';
import useBottomSheetState from '@store/useBottomSheetStateStroe';
import ServiceAvailability from '@components/ServiceAvailability/ServiceAvailability';

const Home = () => {
  const [searchParams] = useSearchParams();
  const modal = useModal();

  const { openBottomSheet } = useBottomSheetState();

  return (
    <>
      <ServiceAvailability />
    </>
  );
};

const NavigatorStyle = styled.div`
  box-shadow: inset 0 0 10px red;
  width: calc(100% + 2 * ${variables.layoutPadding});
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  margin-left: calc(-1 * ${variables.layoutPadding});
`;

export default Home;
