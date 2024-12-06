/** @jsxImportSource @emotion/react */

import BottomSheet from '@components/BottomSheet/BottomSheet';
import Modal from '@components/Modal/Modal';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import useBottomSheetState from '@store/useBottomSheetStateStroe';
import variables from '@styles/Variables';
import LocalDateBottomSheet from './DateBottomSheet';

const LocalDateSelectionModal = ({ modalId }: { modalId: number }) => {
  const { openBottomSheet } = useBottomSheetState();
  const modal = useModal(modalId);
  const buttons = [
    {
      text: '적용하기',
      event: () => {
        modal.close();
      },
    },
  ];

  const handleOpenLocation = () => {};
  const handleOpenDate = () => openBottomSheet(<LocalDateBottomSheet />, '');

  return (
    <>
      <Modal title="지역, 날짜 선택" buttons={buttons} size="full">
        <>
          <InputBoxStyled>
            <button type="button" onClick={handleOpenLocation}>
              지역 선택
            </button>
            <button type="button" onClick={handleOpenDate}>
              예약 날짜 선택
            </button>
          </InputBoxStyled>
          <BottomSheet />
        </>
      </Modal>
    </>
  );
};

export default LocalDateSelectionModal;

const InputBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    height: 4.4rem;
    border-radius: 1rem;
    background: ${variables.colors.gray200} url() no-repeat center left 1.4rem / 1.6rem;
    padding-left: 4rem;
    color: ${variables.colors.gray800};
    cursor: pointer;

    &:nth-of-type(1) {
      background-image: url(/img/icon-location.svg);
    }
    &:nth-of-type(2) {
      background-image: url(/img/icon-calendar.svg);
    }
  }
`;
