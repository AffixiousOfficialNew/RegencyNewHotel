import { configureStore } from "@reduxjs/toolkit";
import citySlice from "./slices/citySlice";
import detailSlice from "./slices/detailSlice";
import searchSlice from "./slices/searchSlice";

import AuthSlice from "./slices/AuthSlice"
import utmSlice from "./slices/utmSlice"
export const store = configureStore({
    reducer: {
        listing: citySlice,
        details:detailSlice,
        search :searchSlice,
        auth: AuthSlice,
        utm: utmSlice,
    },
});