import React from 'react';
import './Deck.css'
import {ReactComponent as DeckIcon} from "../../assets/deck.svg";
import {ReactComponent as DottedPattern} from "../../assets/home-dotted-pattern.svg";
const Deck = (props) => {
    const {quantity,callback} = props;
    return (
        <div className={['card', 'card-deck'].join(' ')} onClick={callback}>
            <div className={'deck__quantity'}>
                <span>{quantity}</span>
            </div>
            <div className={'deck__center card-center'}>
                <div className={'svg-icon'}><DeckIcon/></div>
            </div>
            <div className={'deck__bg-pattern bg-pattern'}><DottedPattern/></div>
        </div>
    );
};

export {Deck};