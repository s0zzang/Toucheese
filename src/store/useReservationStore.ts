import { create } from 'zustand';

export interface ReservationOption {
  option_id: number;
  optionPrice: number;
  optionName: string;
}

interface ReservationInfo {
  studioId: number;
  studioName: string;
  menuName: string;
  totalPrice: number;
  options: ReservationOption[];
}

interface ReservationInfoAction {
  setBasicPrice: (basicPrice: number) => void;
  addOptionPrice: (options: ReservationOption, isChecked: boolean) => void;
  saveReservationDetails: (data: ReservationInfo) => void;
}

const initialState: ReservationInfo = {
  studioId: 0,
  studioName: '',
  menuName: '',
  totalPrice: 0,
  options: [],
};

const useReservationStore = create<ReservationInfo & ReservationInfoAction>()((set) => ({
  ...initialState,
  setBasicPrice: (basicPrice) => set(() => ({ totalPrice: basicPrice })),
  addOptionPrice: (options, isChecked) =>
    set((state) => {
      const updatedOptions = isChecked ? [...state.options, options] : state.options.filter((opt) => opt.option_id !== options.option_id);

      const updatedPrice = isChecked ? state.totalPrice + options.optionPrice : state.totalPrice - options.optionPrice;

      return {
        options: updatedOptions,
        totalPrice: updatedPrice,
      };
    }),
  saveReservationDetails: (data) =>
    set((state) => ({
      ...state,
      data,
    })),
}));

export default useReservationStore;
