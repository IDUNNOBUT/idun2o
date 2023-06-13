import React, {useState} from 'react';
import './GameRoomPage.css';
import {useDispatch, useSelector} from "react-redux";
import {UsersContainer} from "./UsersContainer";
import {Card} from "../../../components/Card";
import {Deck} from "../../../components/Deck";
import {Hand} from "../../../components/Hand";
import {gameSlice} from "../../../store/reducers/GameSlice";
import {useAnimate} from "framer-motion";
import {UsersSlider} from "./UsersSlider";
import {Button} from "../../../components/Button";
import {UserCard} from "../../../components/UserCard";
import {useNavigate} from "react-router-dom";

const getUsersPositions = (users) => {
    let left, top, right;
    if (users.length === 2) {
        left = [users[0]];
        top = [users[1]];
        right = [];
    } else {
        let quantity = users.length / 3;
        left = users.splice(0, Math.floor(quantity));
        right = users.splice(-Math.floor(quantity),);
        top = users;
    }
    return {left, top, right};
}

const GameRoomPage = () => {
    const [colorModal, setColorModal] = useState({action: '', cardId: '', show: false});
    const {users, discard, deck, currentUser, chosenColor, order, status} = useSelector((state) => state.gameReducer);
    const {isLoading} = useSelector((state) => state.formReducer);
    const {_id} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const {left, top, right} = getUsersPositions([...users]);
    const {move} = gameSlice.actions;
    const navigate = useNavigate();
    let [scope, animate] = useAnimate()
    const playCard = (card, ref) => {
        if (_id !== currentUser)
            return;
        if (card.value === 'changeColor' || card.value === 'changeColorTakeFour') {
            setColorModal({...colorModal, action: card.value, cardId: card._id, show: true});
            return;
        }
        if (card.color === chosenColor || card.value === discard.value || card.color === discard.color) {
            scope = ref;
            animate(scope.current, {y: 300, opacity: 0})
            dispatch(move(card.type === 'common' ? {action: 'common', data: {cardId: card._id}} : {
                action: card.value,
                data: {cardId: card._id}
            }))
        }
    }

    const chooseColor = (color) => {
        dispatch(move({action: colorModal.action, data: {cardId: colorModal.cardId, chosenColor: color}}));
        setColorModal({action: '', cardId: '', show: false});
    }
    if (status === 'ended')
        return (<div className={'game-result__wrapper'}>
            <h2 className={'game-result__header'}>Игра окончена. <span>Победитель</span> определен</h2>
            {users.map((user) => user.id === currentUser ? <UserCard key={user.id} userId={user.id}
                                                                     name={user.name} imgURL={user.imgURL}
                                                                     isHost={user.isHost}
                                                                     canDelete={false}
                                                                     isCurrentUser={true}
                                                                     isMe={_id === user.id}
            /> : null)}
            <Button callback={()=>navigate('/')}>Вернуться</Button>
        </div>)
    return (
        <div className={"game-field__wrapper"}>
            <UsersSlider users={users} styleName={"game-field__users-slider"}/>
            <UsersContainer users={top} position={"game-field__container-top"}/>
            <UsersContainer users={left} position={"game-field__container-left"}/>
            <UsersContainer users={right} position={"game-field__container-right"}/>
            <div className={["game-field__content", order].join(' ')}>
                {discard ? <Card
                    card={discard.value === 'changeColor' || discard.value === 'changeColorTakeFour' ? {
                        ...discard,
                        color: chosenColor
                    } : discard} style={'discard'}/> : null}
                {deck ? <Deck quantity={deck}
                              callback={() => !isLoading && _id === currentUser && status === 'inProgress' ? dispatch(move({
                                  action: 'takeFromDeck',
                                  data: {}
                              })) : undefined}/> : null}
            </div>
            <Hand style={'game-field__hand'} callback={playCard}/>
            {colorModal.show ? <>
                <div className={'game-field__color-modal color-modal'}>
                    <h2 className={'color-modal__header'}>Выбери цвет</h2>
                    <div className="color color_red" onClick={() => chooseColor('red')}></div>
                    <div className="color color_blue" onClick={() => chooseColor('blue')}></div>
                    <div className="color color_yellow" onClick={() => chooseColor('yellow')}></div>
                    <div className="color color_green" onClick={() => chooseColor('green')}></div>
                </div>
                <div className={'color-modal__overlay'}></div>
            </> : null}
        </div>
    );
};

export default GameRoomPage;