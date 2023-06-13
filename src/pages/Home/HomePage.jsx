import React from "react";
import './HomePage.css';
import {ReactComponent as DotPattern} from './../../assets/home-dotted-pattern.svg';
import {Form} from "./Form";
import {useNavigate} from "react-router-dom";


const HomePage = () => {
    const navigate = useNavigate();
    const toWaitingRoom = (code) => navigate(`/room/${code}`);
    return (
        <main className={"home main__wrapper"}>
            <div className={"home__info"}>
                <div className={"home__logo"}>
                    <h2 className={"home__title logo"}>
                        ID:<span className={"logo__accent"}>UN</span><sup>2</sup><span
                        className={"logo__accent"}>O</span>
                    </h2>
                    <p className={"home__desc"}>
                        Не первый, не лучший, но определенно самый душевный online-опыт игры в uno
                    </p>
                </div>
                <p className={"info__text"}>
                    <span className={"text__accent"}>Создайте</span> свою комнату <br/>
                    Пригласите друзей по специальному <span className={"text__accent"}>коду</span>
                </p>
                <p className={"info__text"}>
                    Или <span className={"text__accent"}>присоединитесь</span> к уже существующей комнате!
                </p>
            </div>
            <div className={"home__form"}>
                <Form callback={toWaitingRoom}/>
                <div className={"form__bg-pattern bg-pattern"}><DotPattern/></div>
            </div>
        </main>)
}

export default HomePage;