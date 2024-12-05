import { useModalStore } from '@store/useModalStore';

const useModal = (modalId = 1) => {
  const { modals, setOpen } = useModalStore((state) => state);
  const isOpen = modals[modalId] || false;
  const openModal = () => setOpen(modalId, true);
  const closeModal = () => setOpen(modalId, false);

  return { isOpen, openModal, closeModal };
};

export default useModal;
