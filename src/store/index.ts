import { configureStore } from "@reduxjs/toolkit";
import tool from "./toolShow";

const store = configureStore({
    reducer:{
        tool,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store