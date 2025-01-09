import { create } from 'zustand';

export interface StudioInfo {
  studioId?: number;
  studioName?: string;
  menuName?: string;
}

export interface ReservationOption {
  option_id: number;
  optionPrice: number;
  optionName: string;
}

interface ReservationInfo extends StudioInfo {
  totalPrice: number;
  options: ReservationOption[];
}

interface ReservationInfoAction {
  setBasicReservation: (basicPrice: number, id: number) => void;
  addOptionPrice: (options: ReservationOption, isChecked: boolean) => void;
  saveReservationDetails: (saveData: ReservationInfo) => void;
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
  setBasicReservation: (basicPrice, id) =>
    set((state) => ({ ...state, totalPrice: basicPrice, studioId: id, options: [] })),
  addOptionPrice: (options, isChecked) =>
    set((state) => {
      const updatedOptions = isChecked
        ? [...state.options, options]
        : state.options.filter((opt) => opt.option_id !== options.option_id);

      const updatedPrice = isChecked
        ? state.totalPrice + options.optionPrice
        : state.totalPrice - options.optionPrice;

      return {
        options: updatedOptions,
        totalPrice: updatedPrice,
      };
    }),
  saveReservationDetails: (data) => set((state) => ({ ...state, ...data })),
}));

export default useReservationStore;
