import { useEffect, useRef, useState } from 'react';

const useFocusObserver = () => {
  const [curFocusLength, setCurFocusLength] = useState(0);
  const prevFocusLengthRef = useRef(0);

  useEffect(() => {
    const portal = document.querySelector('#modal-portal');
    if (!portal) return;

    const observer = new MutationObserver(() => {
      const newLength = portal.childElementCount;

      if (newLength !== curFocusLength) {
        prevFocusLengthRef.current = curFocusLength;
        setCurFocusLength(newLength);
      }
    });

    observer.observe(portal, { childList: true });
    prevFocusLengthRef.current = portal.childElementCount;
    setCurFocusLength(portal.childElementCount);

    return () => observer.disconnect();
  }, [prevFocusLengthRef, curFocusLength]);

  return {
    prevFocusLength: prevFocusLengthRef.current,
    curFocusLength,
  };
};

export default useFocusObserver;
