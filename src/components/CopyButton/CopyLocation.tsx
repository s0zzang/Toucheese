/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  buttonLabel?: string;
}

const CopyLocation = ({ text, buttonLabel }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <div css={containerStyle}>
      <div css={contentRowStyle}>
        <img src="/img/icon-location.svg" alt="주소 아이콘" css={iconStyle} />
        <span css={textStyle}>{text}</span>
      </div>
      <div css={buttonRowStyle}>
        <button css={buttonStyle} onClick={copyToClipboard}>
          <img src="/img/icon-content_copy.svg" alt="주소 복사 아이콘" css={iconStyle} />
          {buttonLabel}
        </button>
        {isCopied && <span css={feedbackStyle}>Copied! 🎉</span>}
      </div>
    </div>
  );
};

export default CopyLocation;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 1rem;
  margin-top: 1rem;
`;

const contentRowStyle = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const buttonRowStyle = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const iconStyle = css`
  width: 1.6rem;
  height: 1.6rem;
`;

const textStyle = css`
  font-size: 1.4rem
  color: ${variables.colors.gray800};
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  line-height: 1;
  font-size: 1.2rem;
  padding: 0.7rem;
  gap: 0.5rem;
  background-color: ${variables.colors.gray400};
  border-radius: 2rem;
  cursor: pointer;
  max-width: 7rem;
  width: 100%;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${variables.colors.gray500};
  }
`;

const feedbackStyle = css`
  font-size: 1.2rem;
  color: ${variables.colors.gray800};
`;
