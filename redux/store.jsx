import { configureStore } from "@reduxjs/toolkit";
import citySlice from "./slices/citySlice";
import detailSlice from "./slices/detailSlice";

export const store = configureStore({
    reducer: {
        listing: citySlice,
        details:detailSlice
    },
});