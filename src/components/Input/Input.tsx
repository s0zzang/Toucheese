/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { TypoBodySmM } from '@styles/Common';
import variables from '@styles/Variables';

const Input = ({ labelName, type, placeholder }: { labelName: string; type: string; placeholder: string }) => {
  return (
    <label css={labelStyle}>
      {labelName}
      <input css={inputStyle} type={type} name={type} placeholder={placeholder} />
    </label>
  );
};

export default Input;

const labelStyle = css`
  display: flex;
  flex-direction: column;
  color: ${variables.colors.black};
  ${TypoBodySmM}
`;

const inputStyle = css`
  && {
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    width: 100%;
    height: 6.4rem;
    box-sizing: border-box;
    padding: 1rem;
    border: 1px solid ${variables.colors.gray300};
    border-radius: 0.6rem;
  }
`;
