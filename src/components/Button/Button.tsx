/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { TypoBodyMdM, TypoCapSmM, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'gray' | 'black' | 'white' | 'deepGray';

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
}

/**  버튼 컴포넌트 사용
 * 
    - iconPosition="right" 아이콘 필요시 버튼 내부 위치 ( 기본값은 non )
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
}: ButtonProps) => {
  const widthStyles = {
    fit: css`
      min-width: fit-content;
      max-width: fit-content;
    `,
    max: css`
      width: 100%;
      box-sizing: border-box;
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
      font-size: ${TypoCapSmM};
      height: 2.8rem;
      padding: 0 1rem;
    `,

    small: css`
      font-size: ${TypoBodyMdM};
      height: 2.8rem;
      padding: 0 1rem;
    `,
    medium: css`
      font-size: ${TypoBodyMdM};
      height: 3.4rem;
      padding: 0 1rem;
    `,
    large: css`
      font-size: ${TypoTitleXsM};
      height: 4.8rem;
    `,
  };

  const styles = css`
    border: none;
    border-radius: 0.6rem;
    color: white;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    ${sizeStyles[size]}
    ${widthStyles[width]}


    ${variant === 'primary' && `background-color: ${variables.colors.primary}`}
    ${variant === 'secondary' && `background-color: ${variables.colors.primary500}`}
    ${variant === 'black' && `background-color: ${variables.colors.gray900}`}
    ${variant === 'gray' &&
    `
      background-color: ${variables.colors.gray300};
      color:${variables.colors.gray800};
      `}

    ${variant === 'deepGray' &&
    `
      background-color: ${variables.colors.gray500};
      color:${variables.colors.white};
      `}

    ${variant === 'deepGray' &&
    active &&
    `
      background-color: ${variables.colors.black};
      color:${variables.colors.white};
      `}

    ${variant === 'white' &&
    ` background-color: ${variables.colors.white}; 
      color:${variables.colors.gray900};
      border: 0.1rem solid${variables.colors.gray400};
    `}

  ${variant === 'white' &&
    active &&
    ` background-color: ${variables.colors.primary50}; 
      border: 0.1rem solid${variables.colors.primary500}; 
      color:${variables.colors.gray900};
    `}



    ${fixed &&
    `
      position: fixed;
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 2 * ${variables.layoutPadding});
      max-width: calc(500px - 2 * ${variables.layoutPadding});
      z-index: 1000;
    `}

${type === 'reset' &&
    `
    width: 3rem;
    height: 3rem;
    border-radius: 2rem;
    `}


${width === 'fit' &&
    (size === 'medium' || size === 'large') &&
    `
      padding: 0 1.4rem;
    `}
  `;

  return (
    <button type={type} css={styles} disabled={disabled} onClick={onClick}>
      <div css={iconWrapperStyles}>
        {icon}
        {text}
      </div>
    </button>
  );
};

export default Button;
