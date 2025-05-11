/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { Dispatch, SetStateAction } from 'react';

const ReservationNavigator = <T extends { statusKor: string; statusEng: string }>({
  STATUS,
  status,
  setStatus,
}: {
  STATUS: T[];
  status: T;
  setStatus: Dispatch<SetStateAction<T>>;
}) => {
  return (
    <nav>
      <UlStyle>
        {STATUS.map((item, index) => {
          const isActive = item.statusKor === status.statusKor;
          const length = STATUS.length;

          return (
            <ListStyle key={index} length={length}>
              <ButtonStyle className={isActive ? 'active' : ''} onClick={() => setStatus(item)}>
                <span css={TypoTitleXsM}>{item.statusKor}</span>
              </ButtonStyle>
            </ListStyle>
          );
        })}
      </UlStyle>
    </nav>
  );
};

const UlStyle = styled.ul`
  display: flex;
`;

const ListStyle = styled.li<{ length: number }>`
  width: calc(100% / length);
  flex-grow: 1;
  flex-shrink: 0;
`;

const ButtonStyle = styled.button`
  cursor: pointer;
  position: relative;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  box-sizing: border-box;
  color: ${variables.colors.gray600};

  & > span {
    display: inline-block;
    position: relative;
  }

  &::before {
    content: '';
    position: absolute;
    background-color: ${variables.colors.gray300};
    height: 1px;
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
    height: 2px;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &.active > span::after {
    content: '';
    position: absolute;
    right: -5.5px;
    top: 0rem;
    width: 0.6rem;
    height: 0.6rem;
    background: url('/img/icon-nav-badge.svg') no-repeat center / contain;
  }
`;

export default ReservationNavigator;
