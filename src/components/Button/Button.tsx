/** @jsxImportSource @emotion/react */

import { css, CSSObject } from '@emotion/react';
import { PCLayout, TypoBodyMdM, TypoBodyMdR, TypoBodySmM, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import React from 'react';

type ButtonVariant =
  | 'primary'
  | 'gray'
  | 'black'
  | 'white'
  | 'grayWithYellowOutline'
  | 'grayWithGrayOutline';

interface ButtonProps {
  text: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  fixed?: boolean;
  width?: 'fit' | 'max';
  iconPosition?: 'non' | 'left' | 'right';
  icon?: React.ReactNode;
  iconSizeWidth?: string;
  iconSizeHeight?: string;
  style?: CSSObject;
}

/**  버튼 컴포넌트 사용
 * 
    - iconPosition="right" 아이콘 필요시 버튼 내부 위치 ( 기본값은 none )
    - icon={이미지 태그로 경로 지정} 아이콘 추가
    - iconSizeWidth="1rem" 아이콘 가로사이즈
    - iconSizeHeight="1rem" 아이콘 세로사이즈
    - size="small" 버튼 자체의 높이 사이즈
    - text="버튼이름" 버튼에 들어갈 텍스트
    - width="fit" 버튼 자체의 가로값 max: 100%, fit: fit-content
    - variant="white" 버튼 색상
    - disabled={false} 활성화 여부
    - type="button"
 */

const Button = ({
  icon,
  iconSizeWidth = '2rem',
  iconSizeHeight = '2rem',
  iconPosition = 'non',
  width = 'max',
  text,
  disabled = false,
  active = false,
  onClick,
  type = 'button',
  variant = 'primary',
  fixed = false,
  size = 'large',
  style,
}: ButtonProps) => {
  const widthStyles = {
    fit: css`
      min-width: fit-content;
      max-width: fit-content;
    `,
    max: css`
      width: 100%;
      box-sizing: border-box;
      ${PCLayout}
    `,
  };

  const iconWrapperStyles = css`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    ${iconPosition === 'right' && `flex-direction: row-reverse;`}
    ${iconPosition === 'left' && ` flex-direction: row;`}
    ${icon && `img{width:${iconSizeWidth}; height:${iconSizeHeight}}`}
  `;

  const sizeStyles = {
    xsmall: css`
      ${TypoBodySmM};
      height: 3.2rem;
      padding: 0 1rem;
    `,

    small: css`
      ${TypoBodyMdR};
      height: 3.6rem;
      padding: 0 1rem;
    `,
    medium: css`
      ${TypoBodyMdM};
      height: 4rem;
      padding: 0 1rem;
    `,
    large: css`
      ${TypoTitleXsM};
      height: 4.8rem;
    `,
    xlarge: css`
      ${TypoBodyMdM}
      height: 4.8rem;
    `,
  };

  const styles = css`
    border: none;
    border-radius: 0.6rem;
    color: ${variables.colors.gray900};
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-sizing: border-box;

    ${sizeStyles[size]}
    ${widthStyles[width]}


    // 노란색 버튼
    ${variant === 'primary' &&
    css`
      background-color: ${variables.colors.primary50};
      border: 0.1rem solid ${variables.colors.primary};
    `}

      // 블랙 버튼
    ${variant === 'black' &&
    css`
      background-color: ${variables.colors.gray900};
      color: ${variables.colors.white};
    `}
    
    // 기본 회색 버튼
    ${variant === 'gray' &&
    css`
      background-color: ${variables.colors.gray400};
      color: ${variables.colors.white};
    `}


    ${variant === 'gray' &&
    active &&
    css`
      background-color: ${variables.colors.gray900};
      color: ${variables.colors.white};
      border: none;
    `}

    // 흰색 버튼
    ${variant === 'white' &&
    css`
      background-color: ${variables.colors.white};
      border: 0.1rem solid ${variables.colors.gray400};
    `}

    ${variant === 'white' &&
    active &&
    css`
      background-color: ${variables.colors.primary50};
      border: 0.1rem solid ${variables.colors.primary500};
    `}

    // 외곽선 노란색 회색 버튼
    ${variant === 'grayWithYellowOutline' &&
    css`
      background-color: ${variables.colors.gray300};
      border: 0.1rem solid ${variables.colors.primary50};
    `}

  ${variant === 'grayWithYellowOutline' &&
    active &&
    css`
      background-color: ${variables.colors.gray900};
      color: ${variables.colors.white};
      border: none;
    `}
  

    // 외곽선 진회색 회색버튼
    ${variant === 'grayWithGrayOutline' &&
    css`
      background-color: ${variables.colors.gray100};
      border: 0.1rem solid ${variables.colors.gray400};
      color: ${variables.colors.gray500};
    `}

  ${variant === 'grayWithGrayOutline' &&
    active &&
    css`
      background-color: ${variables.colors.primary50};
      border: 0.1rem solid ${variables.colors.primary500};
      color: ${variables.colors.gray900};
    `}



    ${fixed &&
    css`
      position: fixed;
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 2 * ${variables.layoutPadding});
      max-width: calc(500px - 2 * ${variables.layoutPadding});
      z-index: 1000;
    `}

${type === 'reset' &&
    css`
      width: 3rem;
      height: 3rem;
      border-radius: 2rem;
    `}


${width === 'fit' &&
    !(size === 'medium' || size === 'large') &&
    css`
      padding: 0 1.4rem;
    `}


    ${disabled &&
    css`
      background-color: ${variables.colors.gray400};
      color: ${variables.colors.white};
      border: none;
      cursor: not-allowed;
    `}
  `;

  return (
    <button type={type} css={[styles, style]} disabled={disabled} onClick={onClick}>
      <div css={iconWrapperStyles}>
        {icon}
        {text}
      </div>
    </button>
  );
};

export default Button;
