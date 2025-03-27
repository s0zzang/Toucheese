import { breakPoints } from '@styles/BreakPoint';
import { useEffect, useState } from 'react';

const useIsMobile = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const breakPointPc = parseInt(breakPoints.pc);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width <= breakPointPc;
};

export default useIsMobile;
