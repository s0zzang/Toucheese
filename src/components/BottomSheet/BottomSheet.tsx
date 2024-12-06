/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import useBottomSheetState from '@store/useBottomSheetStateStroe';
import { Hidden } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useRef, useState } from 'react';

const BottomSheet = () => {
  const { isOpen, children, title, closeBottomSheet } = useBottomSheetState();
  const [sheetHeight, setSheetHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const MAX_HEIGHT = 800;

  //바텀 시트 나오면 배경 스크롤 금지
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.body.style.position = isOpen ? 'fixed' : '';
    document.body.style.width = isOpen ? '100%' : '';
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.offsetHeight;
      const calculatedHeight = contentHeight + 68 + 32 + 30; // padding + gap + header height
      setSheetHeight(calculatedHeight > MAX_HEIGHT ? MAX_HEIGHT : calculatedHeight);
    }
  }, [children]);

  console.log(sheetHeight);

  return (
    isOpen && (
      <div css={DimStyle}>
        <div css={[SheetStyle(MAX_HEIGHT)]}>
          <div css={SheetHeadStyle}>
            <h4>{title}</h4>
            <button type="button" onClick={closeBottomSheet}>
              <span css={Hidden}>닫기</span>
            </button>
          </div>
          <div css={SheetContentStyle(sheetHeight)} ref={contentRef}>
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default BottomSheet;

const DimStyle = css`
  position: absolute;
  inset: 0;
  background-color: rgba(30, 30, 30, 0.5);
  z-index: 888;
`;

const SlideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const SheetStyle = (max: number) => css`
  position: fixed;
  z-index: 999;
  left: 0;
  bottom: 0;
  max-height: ${max}px; /* 최대 높이 제한 */
  width: 100%;
  border-radius: 2rem 2rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 2rem 1.6rem 4.8rem;
  box-sizing: border-box;
  background-color: ${variables.colors.white};
  animation: ${SlideUp} 0.3s ease-in-out forwards;
`;

const SheetHeadStyle = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  background-color: ${variables.colors.white};

  & h4 {
    font-size: 1.6rem;
  }

  & button {
    display: block;
    background-image: url('/img/icon-close.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 2rem;
    width: 2rem;
    height: 2rem;
  }
`;

const SheetContentStyle = (height: number) => css`
  width: 100%;
  height: ${height};
  overflow-y: auto;
`;
