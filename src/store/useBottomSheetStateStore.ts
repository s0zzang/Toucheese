import { create } from 'zustand';
import { ReactNode } from 'react';

interface BottomSheetState {
  isOpen: boolean; // BottomSheet 열림 상태
  children: ReactNode | null; // 전달받은 컴포넌트 저장
  title: string; // 제목 저장
}

interface BottomSheetAction {
  openBottomSheet: (children: ReactNode, title: string) => void;
  closeBottomSheet: () => void;
}

const initialState: BottomSheetState = {
  isOpen: false,
  children: null,
  title: '',
};

const useBottomSheetState = create<BottomSheetState & BottomSheetAction>()((set) => ({
  ...initialState,
  openBottomSheet: (children, title) => set(() => ({ isOpen: true, children, title })),
  closeBottomSheet: () =>
    set(() => ({
      isOpen: false,
      children: null,
      title: '',
    })),
}));

export default useBottomSheetState;
