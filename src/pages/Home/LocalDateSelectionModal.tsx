/** @jsxImportSource @emotion/react */

import Modal from '@components/Modal/Modal';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import variables from '@styles/Variables';

const LocalDateSelectionModal = ({ modalId }: { modalId: number }) => {
  const handleOpenLocation = () => {};
  const handleOpenDate = () => {};

  const modal = useModal(modalId);
  const buttons = [
    {
      text: '적용하기',
      event: () => {
        modal.close();
      },
    },
  ];

  return (
    <>
      <Modal title="지역, 날짜 선택" buttons={buttons} size="full">
        <InputBoxStyled>
          <input type="text" disabled value="지역 선택" onClick={handleOpenLocation} />
          <input type="text" disabled value="예약 날짜 선택" onClick={handleOpenDate} />
        </InputBoxStyled>
      </Modal>
    </>
  );
};

export default LocalDateSelectionModal;

const InputBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    background: ${variables.colors.gray200} url() no-repeat center left 1.4rem / 1.6rem;
    border-color: transparent;
    padding-left: 4rem;
    color: ${variables.colors.gray800};
    cursor: pointer;

    &:nth-child(1) {
      background-image: url(/img/icon-location.svg);
    }
    &:nth-child(2) {
      background-image: url(/img/icon-calendar.svg);
    }
  }
`;
