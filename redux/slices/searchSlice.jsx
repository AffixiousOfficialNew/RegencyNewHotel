import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cityName : "",
    propertyName : "",

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
           
        }
    }
)

export const {
setCityName,
setPropertyName
} = searchSlice.actions

export default searchSlice.reducer