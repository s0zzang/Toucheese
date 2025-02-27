/** @jsxImportSource @emotion/react */

import SearchButton from '@components/SearchButton/SearchButton';
import UserButton from '@components/UserButton/UserButton';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import LocalDateSelectionModal from '@pages/Home/components/LocalDateSelectionModal';
import BookingButton from './BookingButton';

/** 메인 전체 지역 예약 날짜 선택 등  */
const BookingSearchContainer = ({ className }: { className: 'mo' }) => {
  return (
    <BookingSearchContainerStyle className={className}>
      <BookingButton type={className} />
      <div
        css={css`
          display: flex;
          margin-left: auto;
        `}
      >
        <SearchButton />
        <UserButton />
      </div>
      <LocalDateSelectionModal modalId={1} />
    </BookingSearchContainerStyle>
  );
};

const BookingSearchContainerStyle = styled.div`
  @media (max-width: 1023px) {
    display: flex;
    align-items: center;
    margin-bottom: 1.8rem;
  }
`;

export default BookingSearchContainer;
