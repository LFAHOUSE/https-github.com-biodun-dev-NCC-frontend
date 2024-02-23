import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        token: null,
        user: [],
    },

    reducers: {
        setUser: (state, action) => {
            state.user.push(action.payload)
        },
        setToken:(state,action) => {
            state.token = action.payload
        },
        clearUser: (state) => {
            state = initialState;
          },
    }
})

export const {setUser, setToken, clearUser} = userSlice.actions
export const selectName = (state) => state.user.user.firstname
export default userSlice.reducer