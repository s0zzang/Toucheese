/** @jsxImportSource @emotion/react */
import BookingSearchContainer from '@components/BookingSearchContainer/BookingSearchContainer';
import Button from '@components/Button/Button';
import Filter from '@components/Filter/Filter';
import ThemeNavigator from '@components/Navigator/ThemeNavigator';
import StudioList from '@components/Studio/StudioList';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { decodeSearchParamsToString } from '@utils/decodeSearchParams';
import { useSearchParams } from 'react-router-dom';
import LocalDateSelectionModal from './LocalDateSelectionModal';
import useBottomSheetState from '@store/useBottomSheetStateStroe';
import BottomSheet from '@components/BottomSheet/BottomSheet';
import FilterTextSelector from '@components/Filter/FilterTextSelector';

const Home = () => {
  const [searchParams] = useSearchParams();
  const params = decodeSearchParamsToString(searchParams);
  const { openBottomSheet } = useBottomSheetState();

  const handleFilterByPopularity = () => {
    console.log('인기순 바텀시트');
    openBottomSheet(<FilterTextSelector />, '정렬');
  };

  const handleFilterByPriceRange = () => {
    console.log('가격대');
    openBottomSheet(<Button text="컴포넌트 넣기" />, '가격');
  };

  const handleFilterByStoreInfo = () => {
    console.log('매장정보');
    openBottomSheet(<Button text="컴포넌트 넣기" />, '매장정보');
  };

  return (
    <>
      <SectionStyle>
        <BookingSearchContainer />

        <NavigatorStyle>
          <ThemeNavigator />
          <FilterBox>
            <Button text="" type="reset" variant="gray" icon={<img src="./img/icon-reset.svg" alt="필터 초기화" />} />
            <Filter text="인기순" event={handleFilterByPopularity} />
            <Filter text="가격대" event={handleFilterByPriceRange} />
            <Filter text="매장정보" event={handleFilterByStoreInfo} />
          </FilterBox>
        </NavigatorStyle>
        <div>
          <StudioList mode="filter" params={params} />
        </div>
      </SectionStyle>
      <LocalDateSelectionModal modalId={1} />
      <BottomSheet />
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
  background-color: ${variables.colors.white};

  button:first-of-type {
    margin-right: 1rem;
  }
`;

export default Home;
