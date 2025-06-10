import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cityName : "",
    propertyName : "",
    destinationId : "",
    cityId : "",
    countryCodes : "",

}

const searchSlice = createSlice(
    {
        name: 'search',
        initialState,
        reducers: {
            setCityName(state, action) {
                state.cityName = action.payload
            },
            setPropertyName(state, action) {
                state.propertyName = action.payload
            },
            setDestinationId(state, action) {
                state.destinationId = action.payload
            },
            setCityId(state, action) {
                state.cityId = action.payload
            },
            setCountryCodes(state, action){
                state.countryCodes = action.payload
            }
           
        }
    }
)

export const {
setCityName,
setPropertyName,
setDestinationId,
setCityId,
setCountryCodes
} = searchSlice.actions

export default searchSlice.reducer