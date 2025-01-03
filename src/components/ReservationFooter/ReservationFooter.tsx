/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import Button from '@components/Button/Button';
import { TypoCapSmR, TypoTitleSmS } from '@styles/Common';
import useReservationStore from '@store/useReservationStore';

interface IReservationButton {
  text: string;
  type: 'button' | 'submit';
  onClick: () => void;
  disabled?: boolean;
}

const ReservationFooter = ({ text, type, onClick, disabled }: IReservationButton) => {
  const totalPrice = useReservationStore((state) => state.totalPrice);

  return (
    <div css={FixedBtnBoxStyle}>
      <div className="totalPrice">
        <span>총 결제금액</span>
        <p>{totalPrice?.toLocaleString('ko-KR')}원</p>
      </div>

      <Button text={text} variant="black" type={type} onClick={onClick} disabled={disabled} />
    </div>
  );
};

export default ReservationFooter;

const FixedBtnBoxStyle = css`
  display: flex;
  gap: 2rem;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${variables.colors.white};
  padding: 1.6rem;
  border-top: 0.1rem solid ${variables.colors.gray300};
  z-index: 30;

  .totalPrice {
    display: flex;
    flex-direction: column;
    min-width: 10rem;

    & span {
      ${TypoCapSmR}
      color:  ${variables.colors.gray600};
      margin-bottom: 0.2rem;
    }

    & p {
      ${TypoTitleSmS}
    }
  }
`;
