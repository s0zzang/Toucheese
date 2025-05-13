/** @jsxImportSource @emotion/react */
import { useModalStore } from '@store/useModalStore';
import Modal from '@components/Modal/Modal';
import useModal from '@hooks/useModal';

const PasswordChangeSuccessModal = () => {
  const modalId = 5;
  const modal = useModal(modalId);
  const isOpen = useModalStore((state) => state.modals[5]);

  const successButtons = [
    {
      text: '확인',
      event: () => {
        modal.close();
      },
      variant: 'black' as 'black',
      width: 'max' as 'max',
      active: false,
    },
  ];

  if (!isOpen) return null;

  return (
    <Modal
      buttons={successButtons}
      modalId={modalId}
      title="비밀번호 변경 완료"
      isCloseBtn={false}
      type="default"
    >
      <p>비밀번호가 성공적으로 변경되었어요.</p>
    </Modal>
  );
};

export default PasswordChangeSuccessModal;
