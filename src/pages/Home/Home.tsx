import ThemeNavigator from '@components/Navigator/ThemeNavigator';
import StudioList from '@components/Studio/StudioList';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { useSearchParams } from 'react-router-dom';
import useModal from '@hooks/useModal';
import LocalDateSelectionModal from './LocalDateSelectionModal';
import BookingSearchContainer from '@components/BookingSearchContainer/BookingSearchContainer';

const Home = () => {
  const [searchParams] = useSearchParams();
  const modal = useModal();

  return (
    <>
      <section>
        <BookingSearchContainer />
        <NavigatorStyle>
          <ThemeNavigator />
          <div>필터 영역</div>
        </NavigatorStyle>

        <StudioList />
      </section>
      <LocalDateSelectionModal modalId={1} />
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
