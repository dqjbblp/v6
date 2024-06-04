import { configureStore } from "@reduxjs/toolkit";
import tool from "./toolShow";
import dialog  from "./dialog";

const store = configureStore({
    reducer:{
        tool,
        dialog
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store