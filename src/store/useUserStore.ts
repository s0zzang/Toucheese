import { IUser } from 'types/types';
import { create } from 'zustand';

interface UserState {
  user: IUser | {};
  setUser: (user: IUser) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: {},
  setUser: (user) =>
    set((state) => ({
      ...state,
      user,
    })),
  removeUser: () =>
    set((state) => ({
      ...state,
      user: {},
    })),
}));
