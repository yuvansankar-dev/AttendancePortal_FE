import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getHoliday = createAsyncThunk("GetHoliday", async (jwtValue) => {
    const result = await axios.get("https://attendanceportal-be.onrender.com/holiday/list", { headers: { Authorization: "Bearer " + jwtValue } })
    return result.data;
})
const holidaySlice = createSlice({
    name: "Holiday",
    initialState: {},
    reducers: {
        assignHolidayInfo: function (state, action) {
            return action.payload
        },
    },
    extraReducers(builder) {
        builder.addCase(getHoliday.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})
export const { assignHolidayInfo } = holidaySlice.actions;
export default holidaySlice.reducer; 