/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import variables from '@styles/Variables';

type ButtonVariant = 'primary' | 'secondary' | 'non' | 'gray' | 'black' | 'white';

interface ButtonProps {
  text: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  fixed?: boolean;
}

const Button = ({ text, disabled = true, onClick, type = 'button', variant = 'primary', fixed = false, size = 'large' }: ButtonProps) => {
  const sizeStyles = {
    small: css`
      font-size: small;
      height: 4.2rem;
    `,
    medium: css`
      font-size: medium;
      height: 4.2rem;
    `,
    large: css`
      font-size: large;
      height: 4.2rem;
    `,
  };

  const styles = css`
    border: none;
    border-radius: 1rem;
    color: white;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    ${sizeStyles[size]}

    ${disabled &&
    `background-color: ${variables.colors.gray500}
    cursor: not-allowed`}
    ${variant === 'primary' && `background-color: ${variables.colors.primary}`}
    /* secondary 임시 지정 */
    ${variant === 'secondary' && `background-color: ${variables.colors.primary500}`}
    ${variant === 'non' && ``}
    ${variant === 'black' && `background-color: ${variables.colors.black}`}
    ${variant === 'white' && `background-color: ${variables.colors.white}`}

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
  `;

  return (
    <button css={styles} disabled={disabled} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
