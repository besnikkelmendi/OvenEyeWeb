import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "token",
    initialState: {
        userToken: null,
        user: null,
        userId: null,
    },
    reducers: {
        setUserToken: (state, action) => {
            state.userToken = action.payload;
        },

        resetUserToken: (state) => {
            state.userToken = null;
        },

        setUser: (state, action) => {
            state.user = action.payload;
        },

        resetUser: (state) => {
            state.user = null;
        },

        setUserId: (state, action) => {
            state.userId = action.payload;
        },

        resetUserId: (state) => {
            state.userId = null;
        },
    }, 
});

export const { setUserToken, resetUserToken, setUser, resetUser, setUserId, resetUserId } = userSlice.actions;

export const selectUserToken = (state) => state.user.userToken;

export const selectUser = (state) => state.user.user;

export const selectUserId = (state) => state.user.userId;

export default userSlice.reducer;