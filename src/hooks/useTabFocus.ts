import { useEffect, useRef } from 'react';

const useTabFocus = (onClose: () => void) => {
  const modalRef = useRef<HTMLInputElement>(null);
  const prevActElRef = useRef<HTMLElement | null>(null);
  const focusableElSelector =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  useEffect(() => {
    if (!modalRef.current) return;
    prevActElRef.current = document.activeElement as HTMLElement;

    const focusableEls = modalRef.current.querySelectorAll(
      focusableElSelector,
    ) as NodeListOf<HTMLInputElement>;
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        // 요소가 하나일 경우, 탭 키를 눌러도 포커스가 이동하지 않도록 처리
        if (focusableEls.length === 1) event.preventDefault();
        // Shift + Tab: 첫 번째 요소로 포커스 이동
        else if (event.shiftKey && document.activeElement === firstEl) {
          lastEl.focus();
          event.preventDefault();
          // Tab: 마지막 요소로 포커스 이동
        } else if (!event.shiftKey && document.activeElement === lastEl) {
          firstEl.focus();
          event.preventDefault();
        }
      }

      if (event.key === 'Escape') onClose?.();
    };

    document.addEventListener('keydown', handleKeyDown);
    firstEl?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      prevActElRef.current?.focus();
    };
  }, [onClose]);

  return { modalRef };
};

export default useTabFocus;
