import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import uiSlice from "./uiSlice"

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        ui: uiSlice.reducer
    }
})

export default store