/** @jsxImportSource @emotion/react */

import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import { TypoBodyMdSb, TypoBodySmR } from '@styles/Common';
import variables from '@styles/Variables';

/** PC 버전 가격 필터링 기능  */
const FilterPriceSlidePC = () => {
  return (
    <div>
      <h2
        css={css`
          ${TypoBodyMdSb}
          color: ${variables.colors.gray800};
          margin-bottom: 0.8rem;
        `}
      >
        가격
      </h2>
      <div
        css={css`
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <Input
          labelName="최소가격"
          type="money"
          placeholder="10,000"
          inputWidth="14rem"
          borderRadius=".8rem"
        />
        <span
          css={css`
            ${TypoBodySmR}
            min-width: 4.5rem;
            margin-top: 2rem;
            color: ${variables.colors.gray900};
          `}
        >
          원 부터
        </span>
      </div>

      <div
        css={css`
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <Input
          labelName="최대가격"
          type="money"
          placeholder="200,000"
          inputWidth="14rem"
          borderRadius=".8rem"
        />
        <span
          css={css`
            ${TypoBodySmR}
            min-width: 4.5rem;
            margin-top: 2rem;
            color: ${variables.colors.gray900};
          `}
        >
          원 까지
        </span>
      </div>
    </div>
  );
};

export default FilterPriceSlidePC;
