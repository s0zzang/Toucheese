import BottomSheet from '@components/BottomSheet/BottomSheet';
import ShareOptions from '@components/Share/ShareOptions';
import styled from '@emotion/styled';
import useBottomSheetState from '@store/useBottomSheetStateStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoBodySmR, TypoCapXsR } from '@styles/Common';
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
    openBottomSheet(
      <ShareOptions title={title} description={description} imageUrl={imageUrl} webUrl={webUrl} />,
      '공유 옵션 선택',
    );
  };

  return (
    <ShareButtonStyle>
      <button onClick={handleOpenBottomSheet}>
        <img src="/img/icon-share.svg" alt="공유하기" />
      </button>
      <p>공유</p>
      <BottomSheet />
    </ShareButtonStyle>
  );
};

export default ShareButton;

const ShareButtonStyle = styled.div`
  & > button {
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.2rem;

    & > img {
      width: 1.6rem;
      height: 2.2rem;
    }
  }

  & > p {
    color: ${variables.colors.gray600};
    margin: 0 auto;
    text-align: center;

    ${TypoCapXsR}
  }

  ${mqMin(breakPoints.pc)} {
    & > p {
      ${TypoBodySmR}
    }
  }
`;

/*
& > button {
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    & > img {
      width: 2rem;
      height: 1.8rem;
    }
  }

  & > p {
    color: ${variables.colors.gray600};
    margin: 0 auto;
    text-align: center;

    ${TypoCapXsR}
  }

  ${mqMin(breakPoints.pc)} {
    & > p {
      ${TypoBodySmR}
    }
  }
*/
