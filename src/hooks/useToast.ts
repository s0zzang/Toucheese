import { ToastType, useToastStore } from '@store/useToastStore';

const useToast = () => {
  const { setToast, removeToast } = useToastStore();

  // 토스트 메시지를 3초 동안 실행
  const openToast = (content: string) => {
    const newToast: ToastType = {
      id: Date.now(),
      content,
    };

    setToast(newToast);

    const timer = setTimeout(() => {
      removeToast(newToast.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  };

  return openToast;
};

export default useToast;
