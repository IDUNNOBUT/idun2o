import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cards:[]
}
export const handSlice = createSlice({
    name: 'hand',
    initialState,
    reducers: {
        setHand(state,action){
            return {...state,...action.payload};
        },
        resetHand(){
            return {...initialState}
        },
        move(state,action){

        }
    }
})

export default handSlice.reducer;