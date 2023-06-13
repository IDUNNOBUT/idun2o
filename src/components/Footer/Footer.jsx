import React from 'react';
import {ReactComponent as PatternBack} from './../../assets/footer-pattern-back.svg';
import {ReactComponent as PatternFront} from './../../assets/footer-pattern-front.svg';
import "./Footer.css";

const Footer = () => {
    return (
        <footer className={"footer"}>
            <div className={"footer__pattern pattern_back"}><PatternBack/></div>
            <div className={"footer__pattern pattern_front"}><PatternFront/></div>
        </footer>
    );
};

export {Footer};