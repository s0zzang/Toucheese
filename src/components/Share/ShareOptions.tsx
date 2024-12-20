/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import KakaoShareButton from '@components/Kakao/KakaoShare';
import variables from '@styles/Variables';
import { useState } from 'react';
import { createPortal } from 'react-dom';

interface ShareProps {
  title: string;
  description: string;
  imageUrl: string;
  webUrl: string;
}

const ShareOptions = ({ title, description, imageUrl, webUrl }: ShareProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(webUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <div css={shareOptionsStyle}>
      <div css={iconWithLabel}>
        <div css={shareButtonStyle}>
          <KakaoShareButton title={title} description={description} imageUrl={imageUrl} webUrl={webUrl} />
        </div>
        <span css={textStyle}>카카오톡</span>
      </div>

      <div css={iconWithLabel}>
        <div css={shareButtonStyle} onClick={copyToClipboard}>
          <img src="/img/icon-copy-link.svg" alt="링크 복사" />
        </div>
        <span css={textStyle}>링크복사</span>
        {/* 피드백 메시지를 포털을 통해 바텀시트 외부로 렌더링 */}
        {isCopied &&
          createPortal(
            <div css={feedbackStyle}>Copied! 🎉</div>,
            document.body, // 바텀시트 밖에 메시지를 렌더링
          )}
      </div>
    </div>
  );
};

export default ShareOptions;

const shareOptionsStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  gap: 2rem;
`;

const iconWithLabel = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const shareButtonStyle = css`
  cursor: pointer;
  width: 4.8rem;
  height: 4.8rem;

  img {
    width: 100%;
    height: 100%;
  }
`;

const textStyle = css`
  font-size: 1.2rem;
`;

const feedbackStyle = css`
  font-size: 1.2rem;
  color: ${variables.colors.gray800};
  position: fixed;
  background-color: ${variables.colors.gray800};
  color: ${variables.colors.white};
  border-radius: 0.5rem;
  padding: 0.3rem 0.5rem;
  bottom: 2rem;
  z-index: 1000;
  left: 18.5rem;
`;
