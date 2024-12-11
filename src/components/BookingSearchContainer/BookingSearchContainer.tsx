import styled from '@emotion/styled';
import variables from '@styles/Variables';
import useModal from '@hooks/useModal';
import LocalDateSelectionModal from '@pages/Home/components/LocalDateSelectionModal';
import { useNavigate } from 'react-router-dom';

/** 메인 전체 지역 예약 날짜 선택 등  */
// button => 모달 오픈용  searchStyle => 검색용
const BookingSearchContainer = () => {
  const modal = useModal();
  const navigate = useNavigate();

  return (
    <BookingSearchContainerStyle>
      <Button type="button" onClick={() => modal.open()}>
        <ButtonTitleStyle>전체지역</ButtonTitleStyle> <img src="/img/icon-select-arrow.svg" alt="전체 지역 탐색" />
        <SearchStyle
          onClick={(e) => {
            e.stopPropagation();
            navigate('/search');
          }}
        >
          <img src="/img/icon-search.svg" alt="상세 정보 검색" />
        </SearchStyle>
      </Button>
      <ButtonTitleDes>예약 날짜와 시간을 선택해주세요.</ButtonTitleDes>
      <LocalDateSelectionModal modalId={1} />
    </BookingSearchContainerStyle>
  );
};

const BookingSearchContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.8rem;
`;

const Button = styled.button`
  color: ${variables.colors.black};
  border: none;
  cursor: pointer;
  display: flex;
  gap: 0.4rem;
`;

const SearchStyle = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonTitleStyle = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
`;
const ButtonTitleDes = styled.p`
  color: ${variables.colors.gray600};
`;

export default BookingSearchContainer;
