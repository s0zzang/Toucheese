/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
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

/* 사용예시
<ShareButton
  title="공유할 스튜디오 이름"
  description="공유할 스튜디오 설명"
  imageUrl="https://i.imgur.com/BMDwLgQ.jpeg" //보여질 이미지
  webUrl="http://toucheese.store/search/results?keyword=그믐달" //이동url
/> 
*/
