import { configureStore } from "@reduxjs/toolkit";
import citySlice from "./slices/citySlice";
import detailSlice from "./slices/detailSlice";
import searchSlice from "./slices/searchSlice";

export const store = configureStore({
    reducer: {
        listing: citySlice,
        details:detailSlice,
        search :searchSlice
    },
});