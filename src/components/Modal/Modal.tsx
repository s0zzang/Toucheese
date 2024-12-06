/** @jsxImportSource @emotion/react */

import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import { Hidden, Title3 } from '@styles/Common';
import variables from '@styles/Variables';
import { MouseEventHandler } from 'react';

interface ModalProp {
  title: string;
  children: JSX.Element | string;
  modalId?: number;
  size?: string;
  withBtn?: boolean;
  buttons?: { text: string; event: () => void }[];
}

/**
 * * 모달 사용 방법
 * 1. import `useModal` : `const modal = useModal()`
 * 2. import `<Modal></Modal>` :
 *  - 텍스트만 전달 : `<Modal modalId={1} title="모달1" buttons={buttons}> 모달1 </Modal>`
 *  - 태그 전달 : `<Modal title="모달2" buttons={buttons}> <p>모달2</p> </Modal>`
 *  - 모달 내 버튼 : {text: string, event: MouseEventHandler<HTMLButtonElement>}[]
 */
const Modal = ({ modalId = 1, size = 'default', title, children, withBtn = true, buttons = [] }: ModalProp) => {
  const { isOpen, close } = useModal(modalId);
  const handleClose = () => close();

  return (
    isOpen && (
      <ModalStyled>
        <TitleStyled>
          {isOpen}
          <CloseBtnStyled type="button" onClick={handleClose}>
            <span css={Hidden}>닫기</span>
          </CloseBtnStyled>
          <h2 css={Title3}>{title}</h2>
        </TitleStyled>

        <ContentsStyled>{children}</ContentsStyled>

        {withBtn && <ButtonBoxStyled>{buttons?.map((btn) => <Button key={btn.text} variant="black" onClick={btn.event} text={btn.text} disabled={false} />)}</ButtonBoxStyled>}
      </ModalStyled>
    )
  );
};

export default Modal;

const ModalStyled = styled.section`
  position: fixed;
  z-index: 99;
  inset: 0;
  background: ${variables.colors.white};
  padding: 0 2rem 4.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleStyled = styled.div`
  padding: 1.4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CloseBtnStyled = styled.button`
  width: 2.4rem;
  aspect-ratio: 1/1;
  background: url(/img/icon-arrow-gray800.svg) no-repeat center / 1.1rem 1.9rem;
  position: absolute;
  left: 0;
`;

const ContentsStyled = styled.div`
  padding: 1rem 0;
  flex-grow: 1;
  overflow-y: auto;
`;

const ButtonBoxStyled = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
`;
