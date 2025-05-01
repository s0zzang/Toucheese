import { useEffect, useRef, useState } from 'react';

const useModalObserver = () => {
  const [curModalLength, setCurModalLength] = useState(0);
  const prevModalLengthRef = useRef(0);

  useEffect(() => {
    const portal = document.querySelector('#modal-portal');
    if (!portal) return;

    const observer = new MutationObserver(() => {
      const newLength = portal.childElementCount;

      if (newLength !== curModalLength) {
        prevModalLengthRef.current = curModalLength;
        setCurModalLength(newLength);
      }
    });

    observer.observe(portal, { childList: true });
    prevModalLengthRef.current = portal.childElementCount;
    setCurModalLength(portal.childElementCount);

    return () => observer.disconnect();
  }, [prevModalLengthRef, curModalLength]);

  return {
    prevModalLength: prevModalLengthRef.current,
    curModalLength,
  };
};

export default useModalObserver;
