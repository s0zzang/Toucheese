/** @jsxImportSource @emotion/react */
import { useModalStore } from '@store/useModalStore';
import Modal from '@components/Modal/Modal';
import useModal from '@hooks/useModal';

const UserProfileChangeSuccessModal = () => {
  const modalId = 6;
  const modal = useModal(modalId);
  const isOpen = useModalStore((state) => state.modals[6]);

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
      title="개인정보 변경 완료"
      isCloseBtn={false}
      type="default"
    >
      <p>개인정보가 성공적으로 변경되었어요.</p>
    </Modal>
  );
};

export default UserProfileChangeSuccessModal;
