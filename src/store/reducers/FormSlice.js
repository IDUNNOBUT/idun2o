import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setIsLoading(state,action){
            state.isLoading = action.payload;
        }
    }
})

export default formSlice.reducer;