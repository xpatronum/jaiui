import { create } from "zustand";

interface UserState {
  username: string;
  password: string;
  isAuth: boolean;
}

interface UserActions {
  login: () => void;
  logout: () => void;
}

type UserStore = UserState & UserActions;

const initialState: UserState = {
  username: "",
  password: "",
  isAuth: false,
};
export const useUserStore = create<UserStore>()((set) => ({
  ...initialState,

  login: () =>
    set((state) => ({
      ...state,
      isAuth: true,
    })),
  logout: () =>
    set((state) => ({
      ...state,
      isAuth: false,
    })),
}));
