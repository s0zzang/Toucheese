/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TypoCapXsR } from '@styles/Common';
import variables from '@styles/Variables';

type ChipType = {
  state: 'WAITING' | 'RESERVED' | 'COMPLETE' | 'CANCEL';
  //예약 확정 | 예약 확인 중 | 이용 완료 | 예약 취소
};

const StatusChip = ({ state = 'WAITING' }: ChipType) => {
  let stateText = '';

  switch (state) {
    case 'WAITING':
      stateText = '예약확인중';
      break;
    case 'RESERVED':
      stateText = '예약확정';
      break;
    case 'COMPLETE':
      stateText = '이용완료';
      break;
    case 'CANCEL':
      stateText = '예약취소';
      break;
  }

  return <div css={ChipStyle(state)}>{stateText}</div>;
};

export default StatusChip;

const ChipStyle = (state: string) => css`
  display: inline-block;
  padding: 0.4rem;
  border-radius: 0.4rem;
  text-align: center;
  ${TypoCapXsR}

  ${state === 'RESERVED' && `background-color: ${variables.colors.primary200};`}
  ${state === 'WAITING' && `background-color: ${variables.colors.gray300};`}
  ${state === 'COMPLETE' &&
  `background-color: ${variables.colors.gray300}; color: ${variables.colors.gray700}`}
  ${state === 'CANCEL' && `background-color: #FFE1E1; color:#E00100`}
`;
