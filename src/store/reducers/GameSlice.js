import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    status: '',
    users: [],
    deck: 0,
    order: '',
    chosenColor: ''
}
export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameState(state,action){
            return {...state,...action.payload};
        },
        resetGame(){
          return {...initialState}
        },
        initGame(state,action){
        },
        deleteUser(state,action){
        },
        move(state,action){
        },
    }
})

export default gameSlice.reducer;