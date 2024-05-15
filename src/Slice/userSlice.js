import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "User",
    initialState: {},
    reducers: {
        assignUserInfo: function (state, action) {
            return action.payload
        },
        logout: function () {
            return {}
        }
    }
})
export const { assignUserInfo, logout } = userSlice.actions;
export default userSlice.reducer; 