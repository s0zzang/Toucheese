import { IUser, IUserRes } from 'types/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface UserAction {
  setUser: (user: IUserRes) => void;
  resetUser: () => void;
}

export const defaultUserState = {
  accessToken: null,
  email: null,
  phone: null,
  registration: null,
  user_id: null,
  username: null,
};

export const useUserStore = create(
  persist<IUser & UserAction>(
    (set) => ({
      ...defaultUserState,
      setUser: ({ accessToken, email, phone, registration, user_id, username }) =>
        set(() => ({
          accessToken,
          email,
          phone,
          registration,
          user_id,
          username,
        })),
      resetUser: () => {
        localStorage.removeItem('userState');
      },
    }),
    {
      name: 'userState',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
