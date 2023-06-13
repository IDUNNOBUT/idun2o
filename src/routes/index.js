import {Navigate} from 'react-router-dom';
import {lazy} from "react";

const HomePage = lazy(()=>import('../pages/Home/HomePage'));
const RoomPage = lazy(()=>import('../pages/Room/RoomPage'));
const GameRoomPage = lazy(()=>import('../pages/Room/GameRoom/GameRoomPage'));
const WaitingRoomPage = lazy(()=>import('../pages/Room/WaitingRoom/WaitingRoomPage'));
const ROUTES = [
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: '/room/:code',
        element: <RoomPage/>,
        children: [
            {
                index:true,
                element: <WaitingRoomPage/>
            },
            {
                path: '/room/:code/game',
                element: <GameRoomPage/>,
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/"/>
    },

]
export {ROUTES}