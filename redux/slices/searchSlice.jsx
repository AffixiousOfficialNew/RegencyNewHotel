import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cityName : "",
    propertyName : "",
    destinationId : "",
    cityId : "",

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
           
        }
    }
)

export const {
setCityName,
setPropertyName,
setDestinationId,
setCityId
} = searchSlice.actions

export default searchSlice.reducer