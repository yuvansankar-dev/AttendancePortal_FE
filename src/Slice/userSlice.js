import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "User",
    initialState: {},
    reducers: {
        assignUserInfo: function (state, action) {
            return action.payload
        }
    }
})
export const { assignUserInfo } = userSlice.actions;
export default userSlice.reducer; 