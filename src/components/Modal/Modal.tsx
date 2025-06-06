/** @jsxImportSource @emotion/react */

import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import useTabFocus from '@hooks/useTabFocus';
import { useModalStore } from '@store/useModalStore';
import { breakPoints, mqMax, mqMin } from '@styles/BreakPoint';
import { Hidden, TypoBodyMdR, TypoTitleSmS } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect } from 'react';

interface ModalProp {
  type: 'default' | 'dimmed' | 'fullscreen';
  isCloseBtn?: boolean;
  title?: string;
  children: JSX.Element | string;
  modalId?: number;
  withBtn?: boolean;
  buttons?: {
    text: string;
    event: () => void;
    variant?: 'black' | 'gray' | 'lightGray';
    active?: boolean;
    width?: 'max' | 'fit';
    type?: 'button' | 'submit';
  }[];
}

interface IModalStyle {
  type: 'default' | 'dimmed' | 'fullscreen';
}

interface ITitleStyle {
  type: 'dimmed' | 'fullscreen';
}

interface ICloseBtnStyle {
  mode: 'default' | 'dimmed' | 'fullscreen';
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
  isCloseBtn = false,
  title,
  children,
  withBtn = true,
  buttons = [],
}: ModalProp) => {
  const modals = useModalStore((state) => state.modals);
  const isOpen = modals[modalId];
  const isModalOpen = Object.values(modals).filter((boolean) => boolean).length;
  const { close } = useModal(modalId);
  const handleClose = () => close();

  const { modalRef } = useTabFocus(handleClose);

  const handleDimClick = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLElement;
    if (!eventTarget.classList.contains('modal-box')) return;
    close();
  };

  useEffect(() => {
    // 모달이 활성화되면 html에 생기는 전체 스크롤 방지
    const htmlStyle = window.document.documentElement.style;
    if (isModalOpen) htmlStyle.overflowY = 'hidden';
    else htmlStyle.overflowY = 'auto';
  }, [isOpen]);

  return (
    isOpen && (
      <ModalStyle
        type={type}
        className="modal-box"
        onClick={(e) => handleDimClick(e)}
        tabIndex={0}
        role="dialog"
        aria-modal="true"
        ref={modalRef}
      >
        <ModalInner type={type}>
          {/* default 모달 헤더 */}
          {type === 'default' && <TitleStyleDefault>{title}</TitleStyleDefault>}

          {/* FullScreen 모달 헤더 */}
          {type === 'fullscreen' && (
            <TitleStyle type="fullscreen">
              {isOpen}
              {title && <h2 css={TypoTitleSmS}>{title}</h2>}
            </TitleStyle>
          )}

          {/* Dim 처리 모달 헤더 */}
          {type === 'dimmed' && (
            <TitleStyle type="dimmed">{title && <h2 css={TypoBodyMdR}>{title}</h2>}</TitleStyle>
          )}

          {/* Content */}
          <ContentsStyle type={type}>{children}</ContentsStyle>

          {/* Buttons */}
          {withBtn && (
            <ButtonBoxStyle type={type}>
              {buttons?.map(
                ({
                  text,
                  variant = 'black',
                  event,
                  width = 'max',
                  active = true,
                  type = 'button',
                }) => (
                  <Button
                    key={text}
                    variant={variant}
                    onClick={event}
                    text={text}
                    disabled={false}
                    active={active}
                    width={width}
                    type={type}
                  />
                ),
              )}
            </ButtonBoxStyle>
          )}

          {/* close button */}
          {isCloseBtn ? (
            <CloseXBtnStyle type="button" onClick={handleClose}>
              <span css={Hidden}>모달 닫기</span>
            </CloseXBtnStyle>
          ) : (
            <CloseBtnStyle type="button" mode={type} onClick={handleClose}>
              <span css={Hidden}>모달 닫기</span>
            </CloseBtnStyle>
          )}
        </ModalInner>
      </ModalStyle>
    )
  );
};

export default Modal;

const ModalStyle = styled.section<IModalStyle>`
  position: fixed;
  z-index: 99;
  inset: 0;
  overflow: hidden auto;

  ${mqMax(breakPoints.moMax)} {
    background: ${(props) =>
      props.type === 'fullscreen' ? variables.colors.white : ' rgba(0, 0, 0, 0.85)'};
    padding: 0 ${variables.layoutPadding} 10rem;
    padding-top: ${(props) => props.type === 'dimmed' && variables.headerHeight};
    padding-bottom: ${(props) => props.type === 'dimmed' && '3rem'};
    overflow: ${(props) => props.type === 'dimmed' && 'visible'};
    display: flex;
    flex-direction: column;
    justify-content: ${(props) => (props.type !== 'fullscreen' ? '' : 'space-between')};
  }

  ${mqMin(breakPoints.pc)} {
    &:last-of-type {
      background: rgba(0, 0, 0, 0.5);
    }
  }
`;

const ModalInner = styled.div<IModalStyle>`
  ${(props) =>
    props.type === 'default' &&
    `
      width: calc(100% - 6rem);
      margin: auto;
      max-width: 30rem;
      min-height: 18rem;
      border-radius: 1.4rem;
      text-align: center;
      display: flex;
      flex-direction: column;
  `}
  ${(props) =>
    props.type === 'dimmed' &&
    `
      display: flex;
      flex-direction: column;
      overflow: auto auto;
  `}

  ${mqMax(breakPoints.moMax)} {
    background: ${(props) => props.type !== 'dimmed' && '#fff'};
    height: ${(props) => props.type !== 'default' && '100%'};
    padding: ${(props) => props.type === 'default' && '3rem 2rem 2rem'};
    gap: ${(props) => props.type === 'default' && '.6rem'};
  }

  ${mqMin(breakPoints.pc)} {
    background: ${(props) => (props.type !== 'dimmed' ? '#fff' : variables.colors.black)};
    overflow: ${(props) => props.type === 'dimmed' && 'visible'};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.type === 'default' && '.8rem'};
    padding: ${(props) => props.type === 'default' && '3.4rem 2.4rem 2.4rem'};
    width: ${(props) => (props.type !== 'dimmed' ? '100%' : '64vw')};
    max-width: ${(props) => (props.type === 'default' ? '42rem' : '54rem')};
    max-width: ${(props) => props.type === 'dimmed' && '81.2rem'};
    min-height: ${(props) => (props.type === 'default' ? '20rem' : '40rem')};
    max-height: calc(100vh - 8rem);
    border-radius: 2rem;
  }
`;

const TitleStyle = styled.div<ITitleStyle>`
  color: ${(props) => props.type === 'dimmed' && variables.colors.white};

  ${mqMax(breakPoints.moMax)} {
    position: ${(props) => (props.type === 'fullscreen' ? 'sticky' : 'fixed')};
    padding: ${(props) => (props.type === 'fullscreen' ? '1.4rem 0' : '2.8rem 0')};
    min-height: 5.2rem;
    left: 2rem;
    right: 2rem;
    top: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.type === 'fullscreen' && variables.colors.white};
  }

  ${mqMin(breakPoints.pc)} {
    padding: 2rem ${variables.layoutPadding};
    color: ${variables.colors.gray800};
    border-bottom: ${(props) => props.type !== 'dimmed' && `1px solid ${variables.colors.gray300}`};
    height: ${(props) => props.type === 'dimmed' && '7.2rem'};
    flex-shrink: 0;
  }
`;

const TitleStyleDefault = styled.h2`
  ${TypoTitleSmS};
`;

const CloseBtnStyle = styled.button<ICloseBtnStyle>`
  display: ${({ mode }) => mode === 'default' && 'none'};
  width: 2.4rem;
  aspect-ratio: 1/1;
  position: absolute;
  z-index: 9;

  ${mqMax(breakPoints.moMax)} {
    background: ${({ mode }) =>
      mode === 'fullscreen'
        ? 'url(/img/icon-arrowback.svg) no-repeat center / 1.1rem 1.9rem'
        : 'url(/img/icon-close-white.svg) no-repeat center / 1.2rem'};
    top: 1.4rem;
    left: ${({ mode }) => mode === 'fullscreen' && '2rem'};
    right: ${({ mode }) => mode === 'dimmed' && '2rem'};
  }

  ${mqMin(breakPoints.pc)} {
    background: url(/img/icon-close-gray800.svg) no-repeat center / 1.6rem;
    top: 2rem;
    right: ${variables.layoutPadding};
  }
`;

const CloseXBtnStyle = styled.button`
  width: 2.4rem;
  aspect-ratio: 1/1;
  background: url(/img/icon-close-gray800.svg) no-repeat center / 1.6rem;
  position: absolute;
  z-index: 9;
  top: 1.4rem;
  right: ${variables.layoutPadding};

  ${mqMin(breakPoints.pc)} {
    top: 2rem;
  }
`;

const ContentsStyle = styled.div<IContentStyle>`
  padding: ${(props) => props.type === 'fullscreen' && '1rem 0'};
  flex-grow: 1;

  ${(props) => props.type === 'default' && TypoBodyMdR}
  ${(props) => props.type === 'default' && `color: ${variables.colors.gray800}`}

  ${mqMin(breakPoints.pc)} {
    padding: ${variables.layoutPadding};
    padding-top: ${(props) => props.type === 'dimmed' && 0};
    overflow: ${(props) => (props.type === 'dimmed' ? 'auto auto' : 'hidden auto')};
  }
`;

const ButtonBoxStyle = styled.div<IModalStyle>`
  display: flex;

  ${(props) =>
    props.type === 'default' &&
    `
    gap: 1.6rem;
    margin-top: 1rem;
    `}

  ${mqMax(breakPoints.moMax)} {
    ${(props) =>
      props.type !== 'default' &&
      `
      padding: 2rem 1.6rem 3rem;
      justify-content: space-between;
      gap: 1.4rem;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;  
      background: #fff;
    `}
  }

  ${mqMin(breakPoints.pc)} {
    padding: ${(props) =>
      props.type === 'default' ? `1.8rem 0 0` : `1.8rem ${variables.layoutPadding} 3rem`};
    border-top: ${(props) => props.type !== 'default' && `1px solid ${variables.colors.gray300}`};
    gap: ${(props) => props.type !== 'default' && `.8rem`};
  }
`;
