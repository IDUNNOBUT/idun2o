import React, {useEffect, useRef} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {UserCard} from "../../../../components/UserCard";
import {useDispatch, useSelector} from "react-redux";
import {gameSlice} from "../../../../store/reducers/GameSlice";
import './UsersSlider.css';
import {ReactComponent as ArrowRight} from "../../../../assets/arrow-right.svg";
import {Navigation} from "swiper";

const UsersSlider = (props) => {
    const {users, styleName} = props;
    const {isHost, _id} = useSelector((state) => state.userReducer);
    const {currentUser} = useSelector((state) => state.gameReducer);
    const {deleteUser} = gameSlice.actions;
    const dispatch = useDispatch();
    const swiperRef = useRef();
    useEffect(()=>{
        swiperRef.current.slideTo(users.findIndex((user)=>user.id === currentUser)||0);
    },[currentUser,swiperRef, users]);
    return (
        <div className={[styleName, "users-slider"].join(' ')}>
            <div className={'users-slider-button users-slider-button_left svg-icon'}><ArrowRight/></div>
            <Swiper slidesPerView={"auto"} spaceBetween={16} direction={'horizontal'} centeredSlides={true}
                    navigation={{
                        nextEl: '.users-slider-button_right',
                        prevEl: '.users-slider-button_left',
                    }}
                    observeSlideChildren={true}
                    freeMode={true}
                    modules={[Navigation]} onSwiper={(swiper) => {
                swiperRef.current = swiper;
            }}>
                {users.map(user =>
                    <SwiperSlide key={user.id}>
                        <UserCard key={user.id} userId={user.id}
                                  name={user.name} imgURL={user.imgURL}
                                  isHost={user.isHost}
                                  canDelete={isHost && _id !== user.id}
                                  isCurrentUser={user.id === currentUser}
                                  isMe={_id === user.id}
                                  cardsCount = {user.cardsCount}
                                  deleteCallback={(userId) => {
                                      dispatch(deleteUser(userId))
                                  }}/>
                    </SwiperSlide>)}
            </Swiper>
            <div className={'users-slider-button users-slider-button_right svg-icon'}><ArrowRight/></div>
        </div>
    );
};

export {UsersSlider};