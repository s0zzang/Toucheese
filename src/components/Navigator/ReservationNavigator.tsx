/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { ResStatus } from '@pages/Reservation/ReservationList';
import { TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { Dispatch, SetStateAction } from 'react';

const STATUS: ResStatus[] = [
  { statusKor: '이용 예정', statusEng: 'DEFAULT' },
  { statusKor: '이용 완료', statusEng: 'COMPLETE' },
  { statusKor: '예약 취소', statusEng: 'CANCEL' },
];

const ReservationNavigator = ({
  status,
  setStatus,
}: {
  status: ResStatus;
  setStatus: Dispatch<SetStateAction<ResStatus>>;
}) => {
  return (
    <nav>
      <UlStyle>
        {STATUS.map((item, index) => {
          const isActive = item.statusKor === status.statusKor;
          const length = STATUS.length;

          return (
            <LiStyle
              key={index}
              className={isActive ? 'active' : ''}
              onClick={() => setStatus(item)}
              length={length}
            >
              <span css={TypoTitleXsM}>{item.statusKor}</span>
            </LiStyle>
          );
        })}
      </UlStyle>
    </nav>
  );
};

const UlStyle = styled.ul`
  display: flex;
`;

const LiStyle = styled.li<{ length: number }>`
  position: relative;
  width: calc(100% / length);
  flex-grow: 1;
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  box-sizing: border-box;
  color: ${variables.colors.gray600};

  & > span {
    position: relative;
  }

  &::before {
    content: '';
    position: absolute;
    background-color: ${variables.colors.gray300};
    height: 0.1rem;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &.active {
    color: ${variables.colors.black};
  }

  &.active::before {
    content: '';
    position: absolute;
    background-color: ${variables.colors.black};
    height: 0.2rem;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &.active > span::after {
    content: '';
    position: absolute;
    right: calc(-4 * sqrt(2) * 0.1rem);
    top: calc(-2 * sqrt(2) * 0.1rem);
    width: 0.4rem;
    height: 0.4rem;
    background-color: ${variables.colors.primary};
    transform: translateX(-25%) rotate(45deg);
  }
`;

export default ReservationNavigator;
