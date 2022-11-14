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
        },
        setCart(state, action){
            state.cart = action.payload
        },
        addItemToCart(state, action){
            state.cart = {
                ...state.cart,
                [`${action.payload.id}-${action.payload.size}`]: action.payload
            }
        },
        setFavorited(state, action){
            state.favorited = {...state.favorited, ...action.payload}
        },
        setNewFavorited(state, action){
            state.favorited = action.payload
        },
        removeFavorited(state, action){
            const newArr = []
            for (let i = 0; i < state.favorited.length; i++) {
                if (state.favorited[i].id !== action.payload.id) {
                    newArr.push(action.payload)
                }
            }
            state.favorited = newArr
        }
        
    }
})

export const userActions = userSlice.actions

export default userSlice