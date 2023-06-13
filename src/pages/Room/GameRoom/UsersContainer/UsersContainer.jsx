import React from 'react';
import {UserCard} from "../../../../components/UserCard";
import {useDispatch, useSelector} from "react-redux";
import {gameSlice} from "../../../../store/reducers/GameSlice";
import "./UsersContainer.css"

const UsersContainer = (props) => {
    const {users, position} = props;
    const {isHost, _id} = useSelector((state) => state.userReducer);
    const {currentUser} = useSelector((state) => state.gameReducer);
    const {deleteUser} = gameSlice.actions;
    const dispatch = useDispatch();
    return (
        <div className={["game-field__users", position].join(' ')}>
            {users.map(user => <UserCard key={user.id} userId={user.id}
                                         name={user.name} imgURL={user.imgURL}
                                         isHost={user.isHost}
                                         canDelete={isHost && _id !== user.id}
                                         isCurrentUser = {user.id === currentUser}
                                         isMe={_id === user.id}
                                         cardsCount = {user.cardsCount}
                                         deleteCallback={(userId) => {
                                             dispatch(deleteUser(userId))
                                         }}/>)}
        </div>
    );
};

export {UsersContainer};