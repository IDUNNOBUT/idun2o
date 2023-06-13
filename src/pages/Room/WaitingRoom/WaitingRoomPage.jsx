import React from 'react';
import {ReactComponent as DotPattern} from "../../../assets/room-dotted-pattern.svg";
import {UserCard} from "../../../components/UserCard";
import './WaitingRoomPage.css'
import {Button} from "../../../components/Button";
import {ReactComponent as CardIcon} from "../../../assets/card-icon.svg";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {gameSlice} from "../../../store/reducers/GameSlice";

const WaitingRoomPage = () => {
    const {users, status} = useSelector((state) => state.gameReducer);
    const {isLoading} = useSelector((state) => state.formReducer);
    const {code, isHost, _id} = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const {initGame, deleteUser} = gameSlice.actions;
    if (status !== 'created' && status) {
        return (
            <Navigate to={`/room/${code}/game`}/>
        )
    }
    return (
        <main className={"room main__wrapper"}>
            <div className={"room__players"}>
                {users.map(user => <UserCard key={user.id} userId={user.id} name={user.name} imgURL={user.imgURL}
                                             isHost={user.isHost} canDelete={isHost && _id !== user.id}
                                             isMe={_id === user.id}
                                             deleteCallback={(userId) => {
                                                 dispatch(deleteUser(userId))
                                             }}/>)}
            </div>
            <div className={"room__control"}>
                <div className={"control__container"}>
                    <div className={"room__status"}>
                        <p className={"status__count"}>Игроков : {users.length} из 10</p>
                        <div className={"status__code-info"}>
                            <p>Код комнаты</p>
                            <h2 className={"status__code"}>{code}</h2>
                        </div>
                        {isHost && users.length > 1 ?
                            <Button type={'button'} styleName={"status__button"} callback={() => !isLoading && dispatch(initGame({}))}>
                                <span>Начать</span>
                                <div className={"status__button__icon svg-icon"}>
                                    <CardIcon/>
                                </div>
                            </Button> : null}
                    </div>
                    <div className={"bg-pattern"}><DotPattern/></div>
                </div>
            </div>
        </main>)
};

export default WaitingRoomPage;