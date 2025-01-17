/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import StatusChip from './StatusChip';

const ReservationCard = () => {
  return (
    <>
      카드
      <StatusChip state="confirmed" />;
    </>
  );
};

export default ReservationCard;
