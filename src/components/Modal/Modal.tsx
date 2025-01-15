/** @jsxImportSource @emotion/react */

import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import { useModalStore } from '@store/useModalStore';
import { Hidden, TypoBodyMdR, TypoTitleSmS } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect } from 'react';

interface ModalProp {
  type: 'default' | 'dimmed' | 'fullscreen';
  title?: string;
  children: JSX.Element | string;
  modalId?: number;
  withBtn?: boolean;
  buttons?: {
    text: string;
    event: () => void;
    variant?: 'black' | 'gray';
    width?: 'max' | 'fit';
  }[];
}

interface IModalStyle {
  type: 'default' | 'dimmed' | 'fullscreen';
}

interface ITitleStyle {
  type: 'dimmed' | 'fullscreen';
}

interface ICloseBtnStyle {
  mode: 'dimmed' | 'fullscreen';
}

interface IContentStyle {
  type: 'default' | 'dimmed' | 'fullscreen';
}

/**
 * * 모달 사용 방법
 * 1. import `useModal` : `const modal = useModal()`
 * 2. import `<Modal></Modal>` :
 *  - 텍스트만 전달 : `<Modal modalId={1} title="모달1" buttons={buttons}> 모달1 </Modal>`
 *  - 태그 전달 : `<Modal title="모달2" buttons={buttons}> <p>모달2</p> </Modal>`
 *  - 모달 내 버튼 : {text: string, event: MouseEventHandler<HTMLButtonElement>}[]
 */
const Modal = ({
  modalId = 1,
  type = 'default',
  title,
  children,
  withBtn = true,
  buttons = [],
}: ModalProp) => {
  const modals = useModalStore((state) => state.modals);
  const isOpen = modals[modalId];
  const { close } = useModal(modalId);
  const handleClose = () => close();

  useEffect(() => {
    // 모달이 활성화되면 html에 생기는 전체 스크롤 방지
    const htmlStyle = window.document.documentElement.style;
    if (isOpen) htmlStyle.overflow = 'hidden';
    else htmlStyle.overflow = 'auto';
  }, [isOpen]);

  return (
    isOpen && (
      <ModalStyle type={type}>
        {/* FullScreen 모달 헤더 */}
        {type === 'fullscreen' && (
          <TitleStyle type="fullscreen">
            {isOpen}
            <CloseBtnStyle type="button" mode="fullscreen" onClick={handleClose}>
              <span css={Hidden}>모달 닫기</span>
            </CloseBtnStyle>
            {title && <h2 css={TypoTitleSmS}>{title}</h2>}
          </TitleStyle>
        )}
        {/* Dim 처리 모달 헤더 */}
        {type === 'dimmed' && (
          <TitleStyle type="dimmed">
            {title && <h2 css={TypoBodyMdR}>{title}</h2>}
            <CloseBtnStyle type="button" mode="dimmed" onClick={handleClose}>
              <span css={Hidden}>모달 닫기</span>
            </CloseBtnStyle>
          </TitleStyle>
        )}
        <ContentsStyle type={type}>{children}</ContentsStyle>

        {withBtn && (
          <ButtonBoxStyle>
            {buttons?.map(({ text, variant = 'black', event, width = 'max' }) => (
              <Button
                key={text}
                variant={variant}
                onClick={event}
                text={text}
                disabled={false}
                width={width}
              />
            ))}
          </ButtonBoxStyle>
        )}
      </ModalStyle>
    )
  );
};

export default Modal;

const ModalStyle = styled.section<IModalStyle>`
  position: fixed;
  z-index: 99;
  inset: 0;
  background: ${(props) =>
    props.type !== 'fullscreen' ? 'rgba(0,0,0,0.85)' : variables.colors.white};
  padding: 5.2rem 2rem 10rem;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.type !== 'fullscreen' ? '' : 'space-between')};
  overflow: hidden auto;
`;

const TitleStyle = styled.div<ITitleStyle>`
  padding: ${(props) => (props.type === 'fullscreen' ? '1.4rem 0' : '2.8rem 0')};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.type === 'fullscreen' && variables.colors.white};
  color: ${(props) => props.type === 'dimmed' && variables.colors.white};
  min-height: 5.2rem;
  position: fixed;
  top: 0;
  left: 2rem;
  right: 2rem;
  z-index: 1;
`;

const CloseBtnStyle = styled.button<ICloseBtnStyle>`
  width: 2.4rem;
  aspect-ratio: 1/1;
  background: ${(props) =>
    props.mode === 'fullscreen'
      ? 'url(/img/icon-arrow-gray800.svg) no-repeat center / 1.1rem 1.9rem'
      : 'url(/img/icon-close-white.svg) no-repeat center / 1.2rem'};
  position: absolute;
  left: ${(props) => props.mode === 'fullscreen' && 0};
  right: ${(props) => props.mode === 'dimmed' && 0};
  z-index: 9;
`;

const ContentsStyle = styled.div<IContentStyle>`
  padding: ${(props) => props.type === 'fullscreen' && '1rem 0'};
  flex-grow: 1;
`;

const ButtonBoxStyle = styled.div`
  padding: 1rem 1.6rem 4rem;
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;
