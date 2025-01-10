import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface StudioInfo {
  studioId?: number;
  studioName?: string;
  menuName?: string;
  basicPrice?: number;
  menuImage?: string;
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
  setBasicReservation: (price: number, id: number) => void;
  addOptionPrice: (options: ReservationOption, isChecked: boolean) => void;
  saveReservationDetails: (saveData: ReservationInfo) => void;
  clearLocalStorage: () => void;
}

const initialState: ReservationInfo = {
  studioId: 0,
  studioName: '',
  menuName: '',
  basicPrice: 0,
  totalPrice: 0,
  options: [],
  menuImage: '',
};

const useReservationStore = create(
  persist<ReservationInfo & ReservationInfoAction>(
    (set) => ({
      ...initialState,
      setBasicReservation: (price, id) =>
        set((state) => ({ ...state, totalPrice: price, studioId: id, options: [] })),
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
      clearLocalStorage: () => {
        sessionStorage.removeItem('reservation-storage');
      },
    }),
    {
      name: 'reservation-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useReservationStore;
