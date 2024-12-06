import { useCallback } from 'react';

const useResetState = (setState: React.Dispatch<React.SetStateAction<any>>, initialState: any) => {
  const resetState = useCallback(() => {
    setState(initialState as number);
  }, [setState, initialState]);

  return { resetState };
};

export default useResetState;
