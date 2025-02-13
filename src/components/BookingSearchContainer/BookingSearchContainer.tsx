/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import LocalDateSelectionModal from '@pages/Home/components/LocalDateSelectionModal';
import { changeformatDateForUi } from '@store/useSelectDateStore';
import { defaultUserState } from '@store/useUserStore';
import { Hidden, TypoBodyMdR, TypoTitleSmS } from '@styles/Common';
import variables from '@styles/Variables';
import { getLocalStorageItem } from '@utils/getLocalStorageItem';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IUser } from 'types/types';

/** 메인 전체 지역 예약 날짜 선택 등  */
// button => 모달 오픈용  searchStyle => 검색용
const BookingSearchContainer = () => {
  const modal = useModal();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const searchParamsDateTime = changeformatDateForUi({
    date: searchParams.get('date')!,
    time: searchParams.getAll('times'),
  });

  // user 정보 로컬스토리지에서 가져오기
  const { accessToken: user } = getLocalStorageItem<IUser>('userState', defaultUserState);

  return (
    <BookingSearchContainerStyle>
      <div onClick={() => modal.open()}>
        <Button type="button">
          <h1 css={TypoTitleSmS}>{searchParams.get('addressGu') || '서울전체'}</h1>{' '}
          <img src="/img/icon-select-arrow.svg" alt="전체 지역 탐색" />
        </Button>
        <ButtonTitleDes css={TypoBodyMdR}>
          {searchParamsDateTime || '예약 날짜와 시간을 선택해주세요.'}
        </ButtonTitleDes>
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
  margin-bottom: 2.4rem;
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

const ButtonTitleDes = styled.p`
  color: ${variables.colors.gray600};
  cursor: pointer;
`;

export default BookingSearchContainer;
