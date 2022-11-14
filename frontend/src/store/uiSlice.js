import {createSlice} from "@reduxjs/toolkit"

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        theme: "light"
    },
    reducers: {
        changeTheme(state, action) {
            state.theme = action.payload
            localStorage.setItem("theme", action.payload)
        }
    }
})

export const uiActions = uiSlice.actions

export default uiSlice