import ThemeNavigator from '@components/Navigator/ThemeNavigator';
import StudioList from '@components/Studio/StudioList';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { useSearchParams } from 'react-router-dom';
import useModal from '@hooks/useModal';
import LocalDateSelectionModal from './LocalDateSelectionModal';
import Filter from '@components/Filter/Filter';
import Button from '@components/Button/Button';

const Home = () => {
  const [searchParams] = useSearchParams();
  const modal = useModal();

  return (
    <>
      <section>
        <button onClick={() => modal.open()}>지역 날짜 선택 모달 열기</button>

        <NavigatorStyle>
          <ThemeNavigator />
          <FilterBox>
            <Button text="" type="reset" variant="gray" icon={<img src="./img/icon-reset.svg" alt="필터 초기화" />} />
            <Filter text="인기순" />
            <Filter text="가격대" />
            <Filter text="매장정보" />
          </FilterBox>
        </NavigatorStyle>

        <StudioList />
      </section>
      <LocalDateSelectionModal modalId={1} />
    </>
  );
};

const NavigatorStyle = styled.div`
  width: calc(100% + 2 * ${variables.layoutPadding});
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  margin-left: calc(-1 * ${variables.layoutPadding});
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
