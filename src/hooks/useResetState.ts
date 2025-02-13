import { useCallback } from 'react';

const useResetState = (
  setStates: [React.Dispatch<React.SetStateAction<any>>, React.Dispatch<React.SetStateAction<any>>],
  initialStates: [any, any],
) => {
  const resetState = useCallback(() => {
    setStates[0](initialStates[0]);
    setStates[1](initialStates[1]);
  }, [setStates, initialStates]);

  return { resetState };
};

export default useResetState;
