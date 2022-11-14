import {createSlice} from "@reduxjs/toolkit"

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        language: "ru",
        theme: "white"
    },
    reducers: {
        
    }
})

export const uiActions = uiSlice.actions

export default uiSlice