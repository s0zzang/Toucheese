/** @jsxImportSource @emotion/react */
import ThemeNavigator from '@components/Navigator/ThemeNavigator';
import StudioList from '@components/Studio/StudioList';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import variables from '@styles/Variables';
import { decodeSearchParamsToString } from '@utils/decodeSearchParams';
import { useSearchParams } from 'react-router-dom';
import LocalDateSelectionModal from './LocalDateSelectionModal';
import Filter from '@components/Filter/Filter';
import Button from '@components/Button/Button';
import BookingSearchContainer from '@components/BookingSearchContainer/BookingSearchContainer';
import BottomSheet from '@components/BottomSheet/BottomSheet';
import FilterPriceSlideComponent from '@components/FilterPriceSlide/FilterPriceSlide';
import useBottomSheetState from '@store/useBottomSheetStateStroe';
import ServiceAvailability from '@components/ServiceAvailability/ServiceAvailability';


const Home = () => {
  const [searchParams] = useSearchParams();
  const params = decodeSearchParamsToString(searchParams);
  const modal = useModal();

  const { openBottomSheet } = useBottomSheetState();

  return (
    <>
      <ServiceAvailability />
      <SectionStyle>
        <BookingSearchContainer />

        <NavigatorStyle>
          <ThemeNavigator />
          <FilterBox>
            <Button text="" type="reset" variant="gray" icon={<img src="./img/icon-reset.svg" alt="필터 초기화" />} />
            <Filter text="인기순" />
            <Filter text="가격대" />
            <Filter text="매장정보" />
          </FilterBox>
          <div
            css={css`
              height: 6.6rem;
              background-color: white;
            `}
          >
            필터 영역
          </div>
        </NavigatorStyle>
        <div>
          <StudioList mode="filter" params={params} />
        </div>
      </SectionStyle>
      <LocalDateSelectionModal modalId={1} />
    </>
  );
};

const SectionStyle = styled.section`
  position: relative;
  padding-bottom: -4.8rem;
  margin-bottom: -4.8rem;
`;

const NavigatorStyle = styled.div`
  width: calc(100% + 2 * ${variables.layoutPadding});
  position: sticky;
  top: 0;
  margin-left: calc(-1 * ${variables.layoutPadding});
  z-index: 10;
`;

const FilterBox = styled.div`
  padding: 1.2rem 0rem 1.2rem 1.6rem;
  display: flex;
  gap: 0.6rem;
  box-shadow: 0 0 2px ${variables.colors.gray500};

  button:first-of-type {
    margin-right: 1rem;
  }
`;

export default Home;
