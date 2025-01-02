/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { TypoBodySmM } from '@styles/Common';
import variables from '@styles/Variables';
import { UseFormRegisterReturn } from 'react-hook-form';
import React, { useState } from 'react';

interface InputProps {
  labelName: string;
  type: string;
  placeholder: string;
  error?: string;
  register?: UseFormRegisterReturn;
}

const Input = ({ labelName, type, placeholder, error, register }: InputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    register?.onChange?.(e);
  };

  const handleClear = () => {
    setInputValue('');
    if (register?.onChange) {
      const event = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>;
      register.onChange(event);
    }
  };

  return (
    <label css={labelStyle}>
      {labelName}
      <div css={inputWrapperStyle}>
        <input
          css={[inputStyle(error)]}
          type={type}
          placeholder={placeholder}
          {...register}
          onChange={handleChange}
          value={inputValue}
        />
        {inputValue.length > 0 && (
          <button type="button" css={iconButtonStyle} onClick={handleClear}>
            <img src="/img/icon-cancel.svg" alt="입력 취소" css={iconStyle} />
          </button>
        )}
      </div>
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

const inputWrapperStyle = css`
  position: relative;
  width: 100%;
`;

const iconButtonStyle = css`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const iconStyle = css`
  width: 2rem;
  height: 2rem;
  object-fit: cover;
`;
