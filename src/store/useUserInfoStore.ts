import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { IUserInfo } from "../types/mine";
import { TOKEN_KEY } from "../common/localStorage";

type State = {
  userInfo?: IUserInfo;
  token: string | null;
};

type Actions = {
  setInfo: (desc?: IUserInfo) => void;
  setToken: (token?: string) => void;
};

const useUserInfoStore = create<State & Actions>()(
  immer((set) => ({
    token: localStorage.getItem(TOKEN_KEY),
    setInfo: (desc) => {
      set((state) => {
        state.userInfo = desc;
      });
    },
    setToken: (token) => {
      set((state) => {
        if (token) {
          localStorage.setItem(TOKEN_KEY, token);
          state.token = token;
        } else {
          localStorage.removeItem(TOKEN_KEY);
          state.token = null;
        }
      });
    },
  }))
);

export default useUserInfoStore;
