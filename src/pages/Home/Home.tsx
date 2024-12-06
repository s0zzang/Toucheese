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
import BookingSearchContainer from '@components/BookingSearchContainer/BookingSearchContainer';

const Home = () => {
  const [searchParams] = useSearchParams();
  const params = decodeSearchParamsToString(searchParams);
  const modal = useModal();

  return (
    <>
      <SectionStyle>
        <BookingSearchContainer />

        <NavigatorStyle>
          <ThemeNavigator />
          {/* 필터버튼 추가하면 제거! */}
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

export default Home;
