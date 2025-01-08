/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import LocalDateSelectionModal from '@pages/Home/components/LocalDateSelectionModal';
import { Hidden } from '@styles/Common';
import variables from '@styles/Variables';
import { useNavigate } from 'react-router-dom';

/** 메인 전체 지역 예약 날짜 선택 등  */
// button => 모달 오픈용  searchStyle => 검색용
const BookingSearchContainer = () => {
  const modal = useModal();
  const navigate = useNavigate();

  // user 정보 세션에서 가져오기
  const user = false;

  return (
    <BookingSearchContainerStyle>
      <div>
        <Button type="button" onClick={() => modal.open()}>
          <ButtonTitleStyle>전체지역</ButtonTitleStyle>{' '}
          <img src="/img/icon-select-arrow.svg" alt="전체 지역 탐색" />
        </Button>
        <ButtonTitleDes>예약 날짜와 시간을 선택해주세요.</ButtonTitleDes>
      </div>

      <ButtonStyle
        className="search"
        onClick={(e) => {
          e.stopPropagation();
          navigate('/search');
        }}
      >
        <span css={Hidden}>검색</span>
        <img src="/img/icon-search.svg" alt="상세 정보 검색" />
      </ButtonStyle>

      <ButtonStyle
        className="user"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/user/${user ? 'mypage' : 'auth'}`);
        }}
      >
        <span css={Hidden}>{user ? '마이페이지' : '로그인'}</span>
        <img src="/img/icon-user-black.svg" alt={user ? '마이페이지' : '로그인'} />
      </ButtonStyle>
      <LocalDateSelectionModal modalId={1} />
    </BookingSearchContainerStyle>
  );
};

const BookingSearchContainerStyle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.8rem;
`;

const Button = styled.button`
  color: ${variables.colors.black};
  border: none;
  cursor: pointer;
  display: flex;
  gap: 0.4rem;
`;

const ButtonStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
  width: 2.4rem;
  height: 2.4rem;

  &.search {
    margin-left: auto;

    & > img {
      width: 1.7rem;
    }
  }

  &.user {
    & > img {
      width: 1.6rem;
    }
  }
`;

const ButtonTitleStyle = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
`;

const ButtonTitleDes = styled.p`
  color: ${variables.colors.gray600};
`;

export default BookingSearchContainer;
