/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  buttonLabel?: string;
}

const CopyButton = ({ text, buttonLabel = '복사' }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <div css={containerStyle}>
      <span css={textStyle}>{text}</span>
      <div css={buttonRowStyle}>
        <button css={buttonStyle} onClick={handleCopy}>
          {buttonLabel}
        </button>
        {isCopied && <span css={feedbackStyle}>복사되었습니다! 🎉</span>}
      </div>
    </div>
  );
};

export default CopyButton;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const textStyle = css`
  font-size: 1.4rem
  color: ${variables.colors.gray800};
`;

const buttonRowStyle = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const buttonStyle = css`
  padding: 0.6rem 1.2rem;
  background-color: ${variables.colors.gray400};
  border-radius: 0.4rem;
  cursor: pointer;
  max-width: 5rem;
  width: 100%;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${variables.colors.gray500};
  }
`;

const feedbackStyle = css`
  font-size: 1.2rem;
  color: #${variables.colors.gray200};
`;
