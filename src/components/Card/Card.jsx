import React, {useRef} from 'react';
import './Card.css'
import {ReactComponent as Reverse} from "../../assets/reverse.svg";
import {ReactComponent as Take} from "../../assets/take.svg";
import {ReactComponent as Skip} from "../../assets/skip.svg";
import {ReactComponent as ChangeColor} from "../../assets/changeColor.svg";
import {ReactComponent as DottedPattern} from "../../assets/card-pattern.svg";
const cardDataTransform = (value, color) => {
    const cardColor = Array.isArray(color) ? 'game-card_black' : `game-card_${color}`;
    let cardTag;
    let cardValue;
    switch (value) {
        case ('reverse'): {
            cardValue = <div className={'svg-icon'}><Reverse/></div>
            cardTag = null;
            break;
        }
        case ('takeTwo'): {
            cardValue = <div className={'svg-icon'}><Take/></div>
            cardTag = '+2';
            break;
        }
        case ('skip'): {
            cardValue = <div className={'svg-icon'}><Skip/></div>
            cardTag = null;
            break;
        }
        case ('changeColorTakeFour'): {
            cardValue = <div className={'svg-icon'}><ChangeColor/></div>
            cardTag = '+4';
            break;
        }
        case ('changeColor'): {
            cardValue = <div className={'svg-icon'}><ChangeColor/></div>
            cardTag = null;
            break;
        }
        default: {
            cardValue = value;
            cardTag = value;
        }
    }
    return {cardColor, cardValue, cardTag}
}

const Card = (props) => {
    const {value, color,_id} = props.card;
    const {callback} = props;
    const {cardColor, cardValue, cardTag} = cardDataTransform(value, color);
    const ref = useRef();
    return (
        <div className={['card', 'game-card', cardColor, props.style].join(' ')}
             onClick={() => callback ? callback(props.card,ref) : undefined} key={_id} ref={ref}>
            <div className={'game-card__tag tag-top'}>{cardTag}</div>
            <div className={'game-card__value card-center'}> {cardValue}</div>
            <div className={'game-card__tag tag-bottom'}>{cardTag}</div>
            <div className={'game-card__bg-pattern bg-pattern'}><DottedPattern/></div>
        </div>
    );
};

export {Card};