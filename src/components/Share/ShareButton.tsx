/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import useBottomSheetState from '@store/useBottomSheetStateStore';
import BottomSheet from '@components/BottomSheet/BottomSheet';
import ShareOptions from '@components/Share/ShareOptions';
import variables from '@styles/Variables';

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
      <p>공유</p>
      <BottomSheet />
    </div>
  );
};

export default ShareButton;

const containerStyle = css`
  button {
    all: unset;
    margin-top: -0.35rem;
    img {
      width: 2.7rem;
      height: 2.7rem;
    }
  }
  p {
    font-size: 0.9rem;
    color: ${variables.colors.gray600};
    text-align: center;
    margin-top: -0.05rem;
  }
`;
