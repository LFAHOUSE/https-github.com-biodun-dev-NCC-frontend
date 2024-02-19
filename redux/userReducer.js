import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: [],
    },

    reducers: {
        setUser: (state, action) => {
            state.user.push(action.payload)
        },
        clearUser: (state) => {
            state = initialState;
          },
    }
})

export const {setUser, clearUser} = userSlice.actions
export const selectName = (state) => state.user.user.firstname
export default userSlice.reducer