/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import variables from '@styles/Variables';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'gray' | 'black' | 'white';

interface ButtonProps {
  text: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  fixed?: boolean;
  width?: 'fit' | 'max';
  iconPosition?: 'non' | 'left' | 'right';
  icon?: React.ReactNode;
  iconSizeWidth?: string;
  iconSizeHeight?: string;
}

/** 버튼 옵션
 * icon => 아이콘 이미지 경로
 * iconSizeWidth, iconSizeHeight => 아이콘 가로 세로값
 * iconPosition => non: 아이콘 없는 버튼, left: 아이콘 왼쪽 적용 버튼, right: 아이콘 오른쪽 적용 버튼
 * width => 버튼 자체의 가로값 max: 100%, fit: content 크기만큼
 * size => 버튼 자체의 크기
 */

/**  버튼 컴포넌트 사용
 * <Button
    icon={<img src="./public/img/icon-close.svg" alt="닫기 아이콘" />} 아이콘이 필요한 경우 이렇게 불러오기
    iconSizeWidth="1rem" 아이콘 가로사이즈
    iconSizeHeight="1rem" 아이콘 세로사이즈
    iconPosition="right" 아이콘의 버튼 내부 위치 ( 아이콘 없으면 non )
    size="small" 버튼 자체의 사이즈
    text="small button" 버튼에 들어갈 텍스트
    width="fit" 버튼 자체의 가로값
    variant="white" 버튼 색상
    disabled={false} 
    type="button"
  /> */

const Button = ({
  icon,
  iconSizeWidth = '2rem',
  iconSizeHeight = '2rem',
  iconPosition = 'non',
  width = 'max',
  text,
  disabled = true,
  onClick,
  type = 'button',
  variant = 'primary',
  fixed = false,
  size = 'large',
}: ButtonProps) => {
  const widthStyles = {
    fit: css`
      width: fit-content;
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
    small: css`
      font-size: small;
      height: 3rem;
      padding: 0 1rem;
    `,
    medium: css`
      font-size: medium;
      height: 3.6rem;
      padding: 0 1rem;
    `,
    large: css`
      font-size: large;
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
    ${variant === 'black' && `background-color: ${variables.colors.black}`}
    ${variant === 'gray' &&
    `
      background-color: ${variables.colors.gray300};
      color:${variables.colors.gray800};
      `}
    ${variant === 'white' &&
    ` background-color: ${variables.colors.white}; 
      color:${variables.colors.gray900};
      border: solid${variables.colors.gray400};
    `}

${variant === 'white' &&
    disabled &&
    ` background-color: ${variables.colors.primary50}; 
      border: solid${variables.colors.primary500}; 
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
    border-radius: 20px;
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
