import { createSlice,PayloadAction } from "@reduxjs/toolkit";
type Dialog = {
  title:string,
  desc:string
}

export const dialog = createSlice({
  name: 'dialog',
    initialState: {
      dialogShow:false,
      title:'',
      desc:''
    },
    reducers:{
      closeDia(state){
        state.dialogShow=false
      },
      openDia(state,action:PayloadAction<Dialog>){
        state.title = action.payload.title
        state.desc = action.payload.desc
        state.dialogShow = true
      }
    }
})

export const {closeDia,openDia} = dialog.actions

export default dialog.reducer