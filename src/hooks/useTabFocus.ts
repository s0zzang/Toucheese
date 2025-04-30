import { useEffect, useRef, useState } from 'react';

const useTabFocus = (onClose: () => void) => {
  const modalRef = useRef<HTMLInputElement>(null);
  const [prevActEl, setPrevActEl] = useState<EventTarget | null>(null);
  const focusableElSelector =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  useEffect(() => {
    if (!modalRef.current) return;

    const focusableEls = modalRef.current.querySelectorAll(
      focusableElSelector,
    ) as NodeListOf<HTMLInputElement>;
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose?.();
      if (event.key === 'Tab') {
        if (focusableEls.length === 1) event.preventDefault();
        else if (event.shiftKey && document.activeElement === firstEl) {
          lastEl.focus();
          event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === lastEl) {
          firstEl.focus();
          event.preventDefault();
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const button = event.target;

      if (event.key === 'Enter' && button instanceof HTMLElement) {
        if (button.dataset.tab === 'focus') {
          firstEl?.focus();
          setPrevActEl(button);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      if (prevActEl instanceof HTMLElement) prevActEl?.focus();
    };
  }, [document.activeElement]);

  return { modalRef };
};

export default useTabFocus;
