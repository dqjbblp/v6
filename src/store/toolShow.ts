import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type PlaceType = "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight" | undefined;

export const tool = createSlice({
    name: 'tool',
    initialState: {
        toolShow:false,
        place:'topRight' as PlaceType,
        message:'',
        shotTimes:0
    },
    reducers:{
        open(state,action:PayloadAction<boolean>){
            state.toolShow = action.payload
        },
        setPlace(state,action:PayloadAction<PlaceType>){
            state.place = action.payload
        },
        setMessage(state,action){
            state.message = action.payload
        },
        setShowTimes(state){
            state.shotTimes += 1
        },
    }
})

export const {open,setMessage,setPlace,setShowTimes} = tool.actions

export default tool.reducer