import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";
import detailSlice from "./slices/detailSlice";
import citySlice from "./slices/citySlice";
export const store = configureStore({
  reducer: {
   counter:counterSlice,
   listing:citySlice,
   details:detailSlice
  },
});                                                   