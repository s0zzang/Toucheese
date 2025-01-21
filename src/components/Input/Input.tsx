/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { TypoBodySmM } from '@styles/Common';
import variables from '@styles/Variables';
import { UseFormRegisterReturn } from 'react-hook-form';
import React, { useState } from 'react';

interface InputProps {
  labelName: string;
  type: string;
  value?: string;
  placeholder: string;
  error?: string;
  register?: UseFormRegisterReturn;
  hasCheckButton?: boolean;
  onCheck?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkButtonText?: string;
  inputWidth?: string;
  isValid?: boolean;
}

const Input = ({
  labelName,
  type: initialType,
  placeholder,
  error,
  register,
  hasCheckButton,
  onCheck,
  checkButtonText = '중복확인',
  inputWidth = '100%',
  isValid,
}: InputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isActive, setIsActive] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const type = initialType === 'password' ? (showPassword ? 'text' : 'password') : initialType;

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <div css={containerStyle}>
      <label css={[labelStyle, { width: inputWidth }]}>
        {labelName}
        <div css={inputContainerStyle}>
          <div css={inputWrapperStyle}>
            <input
              css={inputStyle(error, isValid)}
              type={type}
              placeholder={placeholder}
              {...register}
              onChange={handleChange}
              value={inputValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <div css={buttonGroupStyle}>
              {inputValue.length > 1 && (
                <button type="button" css={iconButtonStyle} onClick={handleClear}>
                  <img src="/img/icon-cancel.svg" alt="입력 취소" css={iconStyle} />
                </button>
              )}
              {initialType === 'password' && (
                <button type="button" css={iconButtonStyle} onClick={togglePasswordVisibility}>
                  <img
                    src={showPassword ? '/img/icon-eye-off.svg' : '/img/icon-eye.svg'}
                    alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                    css={iconStyle}
                  />
                </button>
              )}
            </div>
          </div>
          {hasCheckButton && (
            <button css={isActive ? buttonActive : buttonUnActive} onClick={onCheck}>
              {checkButtonText}
            </button>
          )}
        </div>
        {isValid && (
          <div css={errorContainerStyle}>
            <img src="/img/icon-valid.svg" alt="유효성 검사 통과" css={errorIconStyle} />
            <p css={errorStyle(error, isValid)}>유효성 검사 통과</p>
          </div>
        )}
        {error && (
          <div css={errorContainerStyle}>
            <img src="/img/icon-error.svg" alt="검증 실패 " css={errorIconStyle} />
            <p css={errorStyle(error, isValid)}>{error}</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default Input;

const labelStyle = css`
  display: flex;
  flex-direction: column;
  color: ${variables.colors.black};
  ${TypoBodySmM}
`;

const inputStyle = (error?: string, isValid?: boolean) => css`
  && {
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    width: 100%;
    height: 5.6rem;
    box-sizing: border-box;
    padding: 1rem;
    border: 1px solid ${error ? 'red' : isValid ? 'green' : variables.colors.gray300};
    border-radius: 0.6rem;
    background-color: ${variables.colors.white};
    font-size: 1.6rem;

    ${error && `animation: shake 0.3s ease-in-out 2;`}
  }
  &:focus {
    outline: 1px solid ${error ? 'red' : isValid ? 'green' : variables.colors.primary};
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    45% {
      transform: translateX(-2px);
    }
    75% {
      transform: translateX(2px);
    }
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
const errorStyle = (error?: string, isValid?: boolean) => css`
  color: ${error ? 'red' : isValid ? 'green' : variables.colors.gray600};
`;

const inputWrapperStyle = css`
  position: relative;
  width: 100%;
`;

const buttonGroupStyle = css`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 0.8rem;
`;

const iconButtonStyle = css`
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

const inputContainerStyle = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  width: 100%;
`;

const containerStyle = css`
  width: 100%;
`;

const buttonUnActive = css`
  height: 5.6rem;
  background-color: ${variables.colors.gray200};
  border: solid 0.1rem ${variables.colors.gray400};
  border-radius: 0.6rem;
  padding: 0 1.6rem 0 1.6rem;
  color: ${variables.colors.gray600};
  ${TypoBodySmM}
  box-sizing: border-box;
`;

const buttonActive = css`
  height: 5.6rem;
  background-color: ${variables.colors.primary50};
  border: solid 0.1rem ${variables.colors.primary500};
  border-radius: 0.6rem;
  padding: 0 1.6rem 0 1.6rem;
  color: ${variables.colors.gray900};
  ${TypoBodySmM}
  box-sizing: border-box;
`;
