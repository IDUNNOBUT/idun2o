import React from 'react';
import './Switch.css'
const Switch = (props) => {
    const {name,value,style, onChange} = props;
    return (
        <input type="checkbox" name={name} checked={value} onChange={onChange} className={[style,'switch'].join(' ')}/>
    );
};

export {Switch};