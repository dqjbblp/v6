import { ReactNode } from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";


export interface IToast {
  type?: 'success' | 'error';
  message: ReactNode;
}

type State = {
  desc?: IToast;
};

type Actions = {
  setDesc: (desc?: IToast) => void;
};

const useSelfTool = create<State & Actions>()(
  devtools(
    persist(
      immer((set) => ({
        setDesc: (desc) => {
          set((state) => {
            state.desc =  desc;
          });
        },
      })),
      {
        name: "self-tool",
      }
    ),
    {
      name: "useToolStore",
    }
  )
);

export default useSelfTool;
