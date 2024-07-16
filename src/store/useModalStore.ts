import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type state = {
  show:boolean
}

type Actions = {
  setShow: (show:boolean) => void
}

const useModalTool = create<state&Actions>()(
  immer((set)=>({
    show:false,
    setShow:(show)=>{
      set((state)=>{
        state.show = show
      })
    }
  }))
)

export default useModalTool