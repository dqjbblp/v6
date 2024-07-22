import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  userName: string;
  age: number;
  token?: string;
};

type Actions = {
  setName: (name: string) => void;
  setAge: (age: number) => void;
  setToken: (token: string) => void;
};

const userNameStore = create<State & Actions>()(
  devtools(
    persist(
      immer((set) => ({
        userName: "hy",
        age: 23,
        setName: (name) => {
          set((state) => {
            state.userName = name;
          });
        },
        setAge: (age) => {
          set((state) => {
            state.age = age;
          });
        },
        setToken: (token) => {
          set((state) => {
            state.token = token;
          });
        },
      })),
      {
        name: "x-store-wallet",
      }
    ),
    {
      name: "useNameStore",
    }
  )
);

export default userNameStore;
