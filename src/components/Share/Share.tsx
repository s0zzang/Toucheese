/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import useBottomSheetState from '@store/useBottomSheetStateStore';
import BottomSheet from '@components/BottomSheet/BottomSheet';
import KakaoShareButton from '@components/Kakao/KakaoShare';

interface ShareProps {
  title: string;
  description: string;
  imageUrl: string;
  webUrl: string;
}

const Share = ({ title, description, imageUrl, webUrl }: ShareProps) => {
  const { openBottomSheet } = useBottomSheetState();

  const handleOpenKakaoShare = () => {
    openBottomSheet(
      <div css={shareOptionsStyle}>
        <div css={shareButtonStyle}>
          <KakaoShareButton title={title} description={description} imageUrl={imageUrl} webUrl={webUrl} />
        </div>
        <span css={textStyle}>카카오톡</span>
      </div>,
      '공유 옵션 선택',
    );
  };
  return (
    <div css={containerStyle}>
      <button onClick={handleOpenKakaoShare}>
        <img src="/img/icon-share.svg" alt="공유하기" />
      </button>
      <BottomSheet />
    </div>
  );
};

export default Share;

const containerStyle = css`
  display: inline-block;
  width: auto;
  height: auto;
`;

const shareOptionsStyle = css`
  display: flex;
  flex-direction: column;
  jusfify-content: center;
  align-items: center;
  margin-top: 0.5rem;
`;

const shareButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  width: 4.8rem;
  height: 4.8rem;
`;

const textStyle = css`
  font-size: 1.2rem;
`;

//사용예시
{
  /* <Share
title="공유할 제목"
description="공유할 설명"
imageUrl="https://example.com/image.png"
webUrl="https://example.com"
copyText="https://example.com"
/> */
}
