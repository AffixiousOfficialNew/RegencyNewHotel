// features/counterSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";


const HOTEL_NEW_API_BASE_URL = process.env.NEXT_PUBLIC_NEW_HOTEL_API_BASE_URL;
const isBrowser = typeof window !== "undefined";

const initialState = {

  listingResult: [],
//   filterResult: [],
  listofHotel :[],
  currency:isBrowser ? localStorage.getItem('globalCurrency'):"INR",
  currIcon:isBrowser? localStorage.getItem('globalFlag'):'twemoji:flag-india',
//   resultCount:0,
//   pageNumber:1
};



export const getListOfHotel = createAsyncThunk(
  "list/hotel/listing",
  async (searchKey, thunkAPI) => {
      const API_URL = `${HOTEL_NEW_API_BASE_URL}hotelsearch//api/search/GetResponse?Key=${searchKey}`;
      const MAX_RETRIES = 10;
      let count = 0;
      while (count < MAX_RETRIES) {
        try {
          const response = await axios.get(API_URL);
          const data = response.data;

          const { ResultStatus } = data;

          if (ResultStatus === 2 || count === 15) {
            return data;
          }

          count++;
          await new Promise((resolve) => setTimeout(resolve, 1000)); 
        } catch (error) {
          return thunkAPI.rejectWithValue(
            error?.response?.data || "Failed to fetch hotel list"
          );
        }
      }

  return thunkAPI.rejectWithValue("Max retries reached without valid response");
  }
);



// Slice
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    resetListingResult(state) {
      state.listingResult = [];
    },
    setListofHotel(state,action){
      console.log("now action is start", action?.payload?.ListOfHotels)
      state.listofHotel = action.payload
    },
    setCurrencyInStore(state,action){
      console.log("currency dispacth", action.payload)
      state.currency = action.payload
    },
    setIconCurr(state,action){
      state.currIcon= action.payload
    },
    // setResultCount(state,action){
    //   state.resultCount = action.payload
    // },
    // setPageNumber(state,action){
    //   state.pageNumber= action.payload
    // }
    
  },
  extraReducers: (builder) => {
    builder.addCase(getListOfHotel.fulfilled, (state, action) => {
        if (action?.payload) {
          state.listingResult = [...state.listingResult, action.payload];
          state.listofHotel =[...state.listofHotel, ...(action.payload.ListOfHotels || [])];
        }
      })
      .addCase(getListOfHotel.rejected, (state, action) => {
        console.error("Failed to fetch hotel list:", action.payload);
      });
  },
});

// Export actions
export const { resetListingResult ,setListofHotel
    // ,setCurrencyInStore,setIconCurr,setResultCount,setPageNumber
} = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
