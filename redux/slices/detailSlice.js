import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const HOTEL_NEW_API_BASE_URL = process.env.NEXT_PUBLIC_NEW_HOTEL_API_BASE_URL;
const AUTHORIZATION_TOKEN = process.env.NEXT_PUBLIC_AUTHORIZATION_TOKEN;

const initialState = {
    detailResult:[],
    roomResult:[],
    selectedRooms: [],
    totalRooms: 1,
    newRooms: []
}
export const getInfo = createAsyncThunk(
    "list/hotel/details",
    async (hotelId, thunkAPI) => {
        const apiUrl = `${HOTEL_NEW_API_BASE_URL}/api/search/Info?propertyId=${hotelId}&cultureId=en-GB&Affiliate=0`;
    try {
      const resp =  await axios.get(apiUrl);
        return resp.data;
    } catch (error) {
      const status = error.response ? error.response.status : 'No response';
      logApiError(apiUrl, status, error.message);
      return thunkAPI.rejectWithValue(error?.response?.data || "Failed to fetch hotel details Info");
    }
    }
);
export const getRoomDetails = createAsyncThunk(
    'list/hote/details',
    async({search,hotelId},thunkAPI) =>{
        const apiUrl = `${HOTEL_NEW_API_BASE_URL}/api/search/GetRoomResponse?Key=${search}&HotelId=${hotelId}`;
        const MAX_RETRIES = 10; 
        let count = 0;
    
        while (count < MAX_RETRIES) {
          try {
            const response = await axios.get(apiUrl, {
              headers: { Token: AUTHORIZATION_TOKEN }
            });
    
            const data = response.data;
            const { ResultStatus } = data;
    
            if (ResultStatus === 2 || count === 40) {
              return data;
            }
    
            count++;
            await new Promise(resolve => setTimeout(resolve, 1000)); 
    
          } catch (error) {
            const status = error.response ? error.response.status : 'No response';
            logApiError(apiUrl, status, error.message);
            return thunkAPI.rejectWithValue(error?.response?.data || "Failed to fetch hotel details Info");
          }
        }
    
        return thunkAPI.rejectWithValue("Max retries reached without valid response");
    }
)

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
      resetdetailResult(state) {
        state.detailResult = [];
      },
      resetdetailResult(state){
        state.roomResult=[];
      },
      setTotalRooms: (state, action) => {
        state.totalRooms = action.payload;
      },
      addSelectedRoom: (state, action) => {
        state.selectedRooms.push(action.payload); // payload: { roomId, rateId, etc. }
      },
      addNewRooms: (state, action) => {
        state.newRooms.push(action.payload)
      },
      resetSelectedRooms: (state) => {
        state.selectedRooms = [];
      },
    },
    extraReducers: (builder) => {
      builder.addCase(getInfo.fulfilled, (state, action) => {
          if (action?.payload) {
            state.detailResult = [...state.detailResult, action.payload];
          }
        })
        .addCase(getInfo.rejected, (state, action) => {
          console.error("Failed to fetch hotel detailinfo:", action.payload);
        });
        builder.addCase(getRoomDetails.fulfilled,(state,action) =>{
          console.log("action perfome here",action.payload)
            if(action?.payload){
                state.roomResult = [...state.roomResult, action.payload];
            }
        })
        .addCase(getRoomDetails.rejected,(state,action)=>{
            console.error("Failed to fetch room list", action.payload);
        })
    },
  });
  
  // Export actions
  export const { resetdetailResult, addSelectedRoom, setTotalRooms, resetSelectedRooms, addNewRooms } = counterSlice.actions;
  
  // Export reducer
  export default counterSlice.reducer;