
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  source: "",
  medium: "",
  queryParam: ""
};

export const utmSlice = createSlice({
  name: "utm",
  initialState,
  reducers: {
    setUtm(state, action) {
      state.source = action.payload.utmSource;
      state.medium = action.payload.utmMedium;
      state.queryParam = `utm_source=${action.payload.utmSource}&utm_medium=${action.payload.utmMedium}`
    }
  }
});

export const { setUtm } = utmSlice.actions;
export default utmSlice.reducer;
