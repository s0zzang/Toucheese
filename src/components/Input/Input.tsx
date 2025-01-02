/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { TypoBodySmM } from '@styles/Common';
import variables from '@styles/Variables';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  labelName: string;
  type: string;
  placeholder: string;
  error?: string;
  register: UseFormRegisterReturn;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ labelName, type, placeholder, error, register }: InputProps) => {
  return (
    <label css={labelStyle}>
      {labelName}
      <input css={[inputStyle(error)]} type={type} placeholder={placeholder} {...register} />
      {error && (
        <div css={errorContainerStyle}>
          <img src="/img/icon-error.svg" alt="error" css={errorIconStyle} />
          <p css={errorStyle}>{error}</p>
        </div>
      )}
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

const inputStyle = (error?: string) => css`
  && {
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    width: 100%;
    height: 6.4rem;
    box-sizing: border-box;
    padding: 1rem;
    border: 1px solid ${error ? 'red' : variables.colors.gray300};
    border-radius: 0.6rem;
    background-color: ${variables.colors.white};
    font-size: 1.4rem;
  }
  &:focus {
    outline: 1px solid ${error ? 'red' : variables.colors.primary};
  }
`;

const errorContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const errorIconStyle = css`
  width: 1.6rem;
  height: 1.6rem;
`;

const errorStyle = css`
  color: red;
`;
