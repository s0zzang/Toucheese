/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import { changeformatDateForUi } from '@store/useSelectDateStore';
import { TypoBodyMdR, TypoBodyMdSb, TypoCapSmM, TypoTitleSmS } from '@styles/Common';
import variables from '@styles/Variables';
import { useSearchParams } from 'react-router-dom';

interface IButtonType {
  windowType: 'mo' | 'pc';
}

const BookingButton = ({ type }: { type: 'mo' | 'pc' }) => {
  const modal = useModal();
  const [searchParams] = useSearchParams();
  const searchParamsDateTime = changeformatDateForUi({
    date: searchParams.get('date')!,
    time: searchParams.getAll('times'),
  });

  return (
    <div
      onClick={() => modal.open()}
      css={css`
        @media (min-width: 768px) {
          margin: 1.1rem 0 1.2rem;
        }
      `}
    >
      <ButtonStyle type="button" windowType={type}>
        <h1 css={type === 'mo' ? TypoTitleSmS : TypoBodyMdSb}>
          {searchParams.get('addressGu') || '서울전체'}
        </h1>
        <img
          src={`/img/icon-arrowdown-${type === 'mo' ? 'black' : 'white'}.svg`}
          alt="지역 및 날짜 선택"
        />
      </ButtonStyle>
      <ButtonTitleDes css={type === 'mo' ? TypoBodyMdR : TypoCapSmM}>
        {searchParamsDateTime || '예약 날짜와 시간을 선택해주세요.'}
      </ButtonTitleDes>
    </div>
  );
};

const ButtonStyle = styled.button<IButtonType>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: ${(props) =>
    props.windowType === 'mo' ? variables.colors.black : variables.colors.white};

  & > img {
    width: 1.6rem;
    height: 0.9rem;
  }
`;

const ButtonTitleDes = styled.p`
  color: ${variables.colors.gray600};
  cursor: pointer;
`;

export default BookingButton;
