import { useEffect, useRef, useState } from 'react';
import useFocusObserver from './useTabFocusObserver';

const useTabFocus = (onClose: () => void) => {
  const focusRef = useRef<HTMLDivElement>(null);
  const { prevFocusLength, curFocusLength } = useFocusObserver();
  const [prevActEl, setPrevActEl] = useState<HTMLElement | null>(null);

  const focusableSelector =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  useEffect(() => {
    if (!focusRef.current) return;

    const focusableEls = focusRef.current.querySelectorAll(
      focusableSelector,
    ) as NodeListOf<HTMLElement>;
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    // tab trap
    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'Tab') {
        if (focusableEls.length === 1) {
          e.preventDefault();
        } else if (e.shiftKey && document.activeElement === firstEl) {
          lastEl.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          firstEl.focus();
          e.preventDefault();
        }
      }
    };

    // focus
    const handleFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      if (!(e.target instanceof HTMLElement)) return;
      const { dataset, textContent } = e.target;

      if (textContent?.includes('적용하기') || textContent?.includes('초기화')) {
        firstEl?.focus();
      } else if (dataset.tab === 'focus') {
        firstEl?.focus();
        setPrevActEl(prevActEl || e.target);
      }
    };

    document.addEventListener('keydown', handleTabTrap);
    document.addEventListener('keyup', handleFocus);

    return () => {
      document.removeEventListener('keydown', handleTabTrap);
      document.removeEventListener('keyup', handleFocus);
      if (document.activeElement === document.body) prevActEl?.focus();
    };
  }, [prevFocusLength, curFocusLength]);

  return { focusRef };
};

export default useTabFocus;
