import { useModalStore } from '@store/useModalStore';

const useModal = (modalId = 1) => {
  const setOpen = useModalStore((state) => state.setOpen);
  const open = () => setOpen(modalId, true);
  const close = () => setOpen(modalId, false);

  return { open, close };
};

export default useModal;
