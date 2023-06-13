import {io} from "socket.io-client";
import {websocketSlice} from "../store/reducers/WebsocketSlice";
import {userSlice} from "../store/reducers/UserSlice";
import {gameSlice} from "../store/reducers/GameSlice";
import {handSlice} from "../store/reducers/HandSlice";
import {formSlice} from "../store/reducers/FormSlice";

let socket;
export const websocketMiddleware = store => next => action => {
    const {connected} = store.getState().websocketReducer;
    const {token, code} = store.getState().userReducer;
    const {setError} = userSlice.actions;
    const {setGameState,resetGame} = gameSlice.actions;
    const {setUserState} = userSlice.actions;
    const {setIsLoading} = formSlice.actions;
    const {setHand,resetHand} = handSlice.actions;
    const {forceDisconnect} = websocketSlice.actions;
    if (action.type === "websocket/connect" && !connected) {
        socket = io(process.env.REACT_APP_API_URL, {
            query: {
                token,
                code
            },
            reconnection: false,
        });
        socket.on('connect', () => console.log('connected'));

        socket.on('disconnect', () => {
            store.dispatch(forceDisconnect({}));
            store.dispatch(resetGame({}));
            store.dispatch(resetHand({}));
            store.dispatch(setIsLoading(false));
            console.log('disconnected');
        });

        socket.on('error', (message) => {
            store.dispatch(setError(message.data.message));
            store.dispatch(setIsLoading(false));
        });

        socket.on('game.state', (message) => {
            console.log(message);
            switch (message.event) {
                case "game.state.all": {
                    store.dispatch(setGameState(message.data.state));
                    break;
                }
                case "game.state.user": {
                    store.dispatch(setUserState(message.data.state.user));
                    store.dispatch(setHand({cards: message.data.state.cards}));
                    break;
                }
                default: {
                }
            }
            store.dispatch(setIsLoading(false));
        });
    }
    if (action.type === "websocket/disconnect" && connected) {
        try {
            socket.close();
            socket.removeAllListeners();
        }
        catch (e) {}
    }
    if (action.type === "game/initGame" && connected) {
        store.dispatch(setIsLoading(true));
        socket.emit('initGame', {})
    }
    if (action.type === "game/deleteUser" && connected) {
        store.dispatch(setIsLoading(true));
        socket.emit('deleteUser', {userId: action.payload});
    }
    if(action.type === "game/move" && connected) {
        store.dispatch(setIsLoading(true));
        socket.emit('move',action.payload);
    }
    next(action);
}