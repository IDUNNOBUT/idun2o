import React from 'react';
import {ReactComponent as DarkMode} from './../../assets/dark-mode.svg';
import {ReactComponent as LightMode} from './../../assets/light-mode.svg';
import "./Header.css";
import {useNavigate} from "react-router-dom";

const Header = (props) => {
    const {mode, changeMode} = props;
    const navigate = useNavigate();
    return (
        <header className={"header"}>
            <div className="header__container">
                <div className="header__logo logo" onClick={()=>navigate('')}>
                    ID:<span className={"logo__accent"}>UN</span><sup>2</sup><span className={"logo__accent"}>O</span>
                </div>
                <div className={"header__mode svg-icon"} onClick={()=>changeMode()}>{mode === 'dark' ? <DarkMode/> :
                    <LightMode/>}</div>
            </div>
        </header>
    );
};

export {Header};