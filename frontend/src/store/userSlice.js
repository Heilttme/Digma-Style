import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedin: false,
        username: "",
        email: "",
        cart: {},
        favorited: {},
    },
    reducers: {
        setLoggedIn(state){
            state.isLoggedin = true
        },
        setUsername(state, action){
            state.username = action.payload
        },
        setEmail(state, action){
            state.email = action.payload
        },
        logout(state){
            state.isLoggedin = false
            state.username = ""
        }
    }
})

export const userActions = userSlice.actions

export default userSlice