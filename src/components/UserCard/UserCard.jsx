import React from 'react';
import './UserCard.css'
import {ReactComponent as Crown} from "../../assets/crown.svg";
import {ReactComponent as DeleteUser} from "../../assets/delete-user.svg";
import {ReactComponent as MeIcon} from "../../assets/me.svg";
const UserCard = (props) => {
    const {name,isHost,imgURL,canDelete,deleteCallback,userId,isMe,isCurrentUser,cardsCount} = props;
    return (
        <div className={isCurrentUser ? 'user-card current-user' : 'user-card'}>
            {cardsCount ? <div className={'user-card__cards-count'}>{cardsCount}</div> : null}
            {isHost ? <div className={'user-card__host svg-icon'}><Crown/></div> : null}
            <div className={'user-card__avatar'}>
                {canDelete ? <div className={'user-card__delete svg-icon'} onClick={()=>deleteCallback(userId)}><DeleteUser/></div> : null}
                <img src={imgURL} alt="user avatar"/>
            </div>
            <div className={'user-card__persona'}>
            <p className={'user-card__name'}>{name}</p>
                {isMe ? <div className={'user-card__me svg-icon'}><MeIcon/></div> : null}
            </div>
        </div>
    );
};

export {UserCard};