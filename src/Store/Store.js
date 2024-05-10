import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Slice/userSlice";
import holidaySlice from "../Slice/holidaySlice";

const store = configureStore({
    reducer: {
        userDetail: userSlice,
        holidayDetail: holidaySlice
    }
})
export default store;