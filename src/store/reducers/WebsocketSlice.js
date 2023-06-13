import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    connected: false,
}



export const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        connect(state,action) {
            state.connected = true;
        },
        disconnect(state,action) {
        },
        forceDisconnect(state,action){
            state.connected = false;
        },
        send(state,action){}
    }
})

export default websocketSlice.reducer;