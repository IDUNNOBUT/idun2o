import React, {useEffect} from 'react';
import './RoomPage.css'
import {Outlet, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {websocketSlice} from "../../store/reducers/WebsocketSlice";
import {userSlice} from "../../store/reducers/UserSlice";

const RoomPage = () => {
    const {code: paramCode} = useParams();
    const {code, error} = useSelector((state) => state.userReducer);
    const {connected} = useSelector((state) => state.websocketReducer);
    const {setCode} = userSlice.actions;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {connect, disconnect} = websocketSlice.actions;
    useEffect(() => {
        if (paramCode !== code) {
            dispatch(setCode(paramCode));
        } else {
            dispatch(connect({}));
        }
    }, [paramCode, code]);
    useEffect(() => () => {
        dispatch(disconnect({}));
    }, []);
    useEffect(() => {
        if (error && !connected) {
            navigate('/');
        }
    }, [error, connected]);
    return (<><Outlet/></>)
};

export default RoomPage;