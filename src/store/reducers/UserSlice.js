import {createSlice} from "@reduxjs/toolkit";
import {roomApi} from "../../api/RoomApi";
import {formSlice} from "./FormSlice";

const initialState = {
    _id: '',
    name: '',
    imgURL: '',
    isHost: false,
    token: localStorage.getItem('token') || '',
    error: '',
    code: localStorage.getItem('code') || '',
}

export const fetchUserData = ({name,code,isHost},callback) => async (dispatch) => {
    dispatch(formSlice.actions.setIsLoading(true));
    try {
        const {data} = isHost ? await roomApi.createRoom(name) : await roomApi.connectToRoom(name,code);
        dispatch(userSlice.actions.setUserBaseData({name,isHost,code,error:'',...data}));
        callback( isHost ? data.code : code);
    }
    catch (e) {
        dispatch(userSlice.actions.setError(e.response?.data.message || e.message));
    }
    dispatch(formSlice.actions.setIsLoading(false));
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserBaseData(state,action) {
            localStorage.setItem("token",action.payload.token);
            localStorage.setItem("code",action.payload.code);
            return {...state,...action.payload};
        },
        setError(state,action) {
            state.error = action.payload;
        },
        setCode(state,action) {
            state.code = action.payload;
        },
        setUserState(state,action) {
            return {...state,...action.payload};
        }
    }
})

export default userSlice.reducer;