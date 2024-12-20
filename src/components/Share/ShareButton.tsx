/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import useBottomSheetState from '@store/useBottomSheetStateStore';
import BottomSheet from '@components/BottomSheet/BottomSheet';
import ShareOptions from '@components/Share/ShareOptions';

interface ShareProps {
  title: string;
  description: string;
  imageUrl: string;
  webUrl: string;
}

const ShareButton = ({ title, description, imageUrl, webUrl }: ShareProps) => {
  const { openBottomSheet } = useBottomSheetState();

  const handleOpenBottomSheet = () => {
    openBottomSheet(<ShareOptions title={title} description={description} imageUrl={imageUrl} webUrl={webUrl} />, '공유 옵션 선택');
  };

  return (
    <div css={containerStyle}>
      <button onClick={handleOpenBottomSheet}>
        <img src="/img/icon-share.svg" alt="공유하기" />
      </button>
      <BottomSheet />
    </div>
  );
};

export default ShareButton;

const containerStyle = css`
  display: inline-block;
  width: auto;
  height: auto;
`;
