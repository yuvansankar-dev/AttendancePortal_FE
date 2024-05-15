import { createSlice } from "@reduxjs/toolkit";
const holidaySlice = createSlice({
    name: "Holiday",
    initialState: {},
    reducers: {
        assignHolidayInfo: function (state, action) {
            return action.payload
        },
    },
})
export const { assignHolidayInfo } = holidaySlice.actions;
export default holidaySlice.reducer; 