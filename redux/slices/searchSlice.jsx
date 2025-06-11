import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cityName : "",
    propertyNames : "",
    destinationId : "",
    cityId : "",
    countryCodes : "",
    hotelId : ""
 
}

const searchSlice = createSlice(
    {
        name: 'search',
        initialState,
        reducers: {
            setCityName(state, action) {
                state.cityName = action.payload
            },
            setPropertyNames(state, action) {
                state.propertyNames = action.payload
            },
            setDestinationId(state, action) {
                state.destinationId = action.payload
            },
            setCityId(state, action) {
                state.cityId = action.payload
            },
            setCountryCodes(state, action){
                state.countryCodes = action.payload
            },
            setHotelId(state, action){
                state.hotelId = action.payload
            }
           
        }
    }
)

export const {
setCityName,
setPropertyNames,
setDestinationId,
setCityId,
setCountryCodes,
setHotelId
} = searchSlice.actions

export default searchSlice.reducer