import { configureStore } from "@reduxjs/toolkit";
import citySlice from "./slices/citySlice";
import detailSlice from "./slices/detailSlice";
import AuthSlice from "./slices/AuthSlice"
import utmSlice from "./slices/utmSlice"
export const store = configureStore({
    reducer: {
        listing: citySlice,
        details:detailSlice,
        auth: AuthSlice,
        utm: utmSlice,
    },
});