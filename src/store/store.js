import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import gameReducer from './reducers/GameSlice'
import formReducer from './reducers/FormSlice'
import handReducer from './reducers/HandSlice'
import websocketReducer from "./reducers/WebsocketSlice";
import {websocketMiddleware} from "../middleware/websocketMiddleware";

const rootReducer = combineReducers({
    userReducer,
    gameReducer,
    handReducer,
    formReducer,
    websocketReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(websocketMiddleware),
    })
}