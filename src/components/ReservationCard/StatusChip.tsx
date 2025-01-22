/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TypoCapXsR } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';

type ChipType = {
  state: 'confirmed' | 'pending' | 'completed' | 'canceled';
  //예약 확정 | 예약 확인 중 | 이용 완료 | 예약 취소
};

const StatusChip = ({ state = 'pending' }: ChipType) => {
  let stateText = '';

  switch (state) {
    case 'pending':
      stateText = '예약확인중';
      break;
    case 'confirmed':
      stateText = '예약확정';
      break;
    case 'completed':
      stateText = '이용완료';
      break;
    case 'canceled':
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

  ${state === 'confirmed' && `background-color: ${variables.colors.primary200};`}
  ${state === 'pending' && `background-color: ${variables.colors.gray300};`}
  ${state === 'completed' &&
  `background-color: ${variables.colors.gray300}; color: ${variables.colors.gray700}`}
  ${state === 'canceled' && `background-color: #FFE1E1; color:#E00100`}
`;
