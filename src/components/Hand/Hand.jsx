import React from 'react';
import './Hand.css';
import {Swiper, SwiperSlide} from "swiper/react";
import {useSelector} from "react-redux";
import {Card} from "../Card";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper";
import {ReactComponent as ArrowRight} from "../../assets/arrow-right.svg";
const Hand = (props) => {
    const {callback} = props;
    const {cards} = useSelector((state) => state.handReducer);
    return (
        <div className={'hand__wrapper'}>
            <div className={'hand-button hand-button_left svg-icon'}><ArrowRight/></div>
            <Swiper className={'hand__swiper'} slidesPerView={1} spaceBetween={16} direction={'horizontal'}
                       navigation={{
                           nextEl: '.hand-button_right',
                           prevEl: '.hand-button_left',
                       }}
                       breakpoints={{
                           370: {slidesPerView: 2, spaceBetween: 4, centeredSlides: true},
                           500: {slidesPerView: 3, spaceBetween: 8,centeredSlides:false},
                           700: {slidesPerView: 4, spaceBetween: 16},
                           900: {slidesPerView: 5, spaceBetween: 16},
                           1100: {slidesPerView: 6, spaceBetween: 16},
                       }}
                       freeMode={true}
                       modules={[Navigation]}>
                {cards.map((card) =>
                    <SwiperSlide className={'hand__cards'} key={card._id}>
                        <Card callback={callback} card={card}/>
                    </SwiperSlide>
                )}
            </Swiper>
            <div className={'hand-button hand-button_right svg-icon'}><ArrowRight/></div>
        </div>
    );
};

export {Hand};