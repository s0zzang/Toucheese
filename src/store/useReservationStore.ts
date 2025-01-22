import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface StudioInfo {
  menuId?: number;
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

interface VisitorInfo {
  name: string | null;
  contact: string | null;
}

interface ReservationInfo extends StudioInfo {
  totalPrice: number;
  options: ReservationOption[];
  visitorInfo?: VisitorInfo | null; // 방문자 정보 (다를 경우만 저장)
  requests?: string; // 요청사항
  paymentMethod?: string; // 결제수단
}

interface ReservationInfoAction {
  setBasicReservation: (price: number, id: number) => void;
  addOptionPrice: (options: ReservationOption, isChecked: boolean) => void;
  saveReservationDetails: (saveData: ReservationInfo) => void;
  clearReservationInfo: () => void;
}

const initialState: ReservationInfo = {
  menuId: 0,
  studioName: '',
  menuName: '',
  basicPrice: 0,
  totalPrice: 0,
  options: [],
  menuImage: '',
  visitorInfo: null, // 기본값: null (방문자가 다른 경우에만 설정)
  requests: '',
  paymentMethod: '',
};

const useReservationStore = create(
  persist<ReservationInfo & ReservationInfoAction>(
    (set) => ({
      ...initialState,
      setBasicReservation: (price, id) =>
        set((state) => ({ ...state, totalPrice: price, menuId: id, options: [] })),
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
      setVisitorInfo: (visitorInfo: VisitorInfo) => set(() => ({ visitorInfo })),
      setRequests: (requests: string) => set(() => ({ requests })),
      setPaymentMethod: (method: string) => set(() => ({ paymentMethod: method })),
      clearReservationInfo: () => {
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
