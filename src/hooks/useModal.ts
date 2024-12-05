import { useModalStore } from '@store/useModalStore';

const useModal = (modalId = 1) => {
  const { modals, setOpen } = useModalStore((state) => state);
  const isOpen = modals[modalId] || false;
  const open = () => setOpen(modalId, true);
  const close = () => setOpen(modalId, false);

  return { isOpen, open, close };
};

export default useModal;
