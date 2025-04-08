/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import useReservationStore from '@store/useReservationStore';
import { changeformatDateForUi, useSelectDateStore } from '@store/useSelectDateStore';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import { TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import {
  reservationBoxStyle,
  reservationHrStyle,
  reservationTitleAlignStyle,
} from '../ReservationCheck';

const ReservationInfo = () => {
  const { studioName, options, menuName, menuImage } = useReservationStore();
  const { time } = useSelectTimeStore();
  const { date } = useSelectDateStore();

  return (
    <>
      <section css={paddingTopStyle}>
        <h2 css={[reservationTitleAlignStyle, firstTitleAlignStyle]}>예약정보</h2>
        <div css={reservationBoxStyle}>
          <h4
            css={css`
              color: ${variables.colors.gray800};
              font-size: 1.2rem;
            `}
          >
            {studioName}
          </h4>
          <p css={TypoTitleXsM}>{changeformatDateForUi({ date, time })}</p>
          <hr css={reservationHrStyle} />
          <div css={flexRow}>
            <div>
              <p css={TypoTitleXsM}>{menuName}</p>
              <div css={textWrapperStyle}>
                {options.map((option) => (
                  <span key={option.option_id}>{option.optionName}</span>
                ))}
              </div>
            </div>
            <img src={menuImage} alt="포트폴리오 이미지" css={imgStyle} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ReservationInfo;

const paddingTopStyle = css`
  padding-top: ${variables.headerHeight};
`;

const firstTitleAlignStyle = css`
  margin-top: 0;
`;

const flexRow = css`
  display: flex;
`;

const imgStyle = css`
  width: 6rem;
  height: 7.2rem;
  margin-left: auto;
  object-fit: cover;
`;

const textWrapperStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.5rem;
  span {
    position: relative;
    color: ${variables.colors.gray900};
    font-size: 1.2rem;
  }
  span:not(:last-child)::after {
    content: '|';
    margin-left: 0.6rem;
    color: #ccc;
  }
`;
