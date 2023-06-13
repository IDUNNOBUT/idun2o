import React from 'react';
import './Input.css';
const Input = (props) => {
    const {style,name,value,onChange,placeholder} = props;
    return (
        <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} className={[style,"input"].join(' ')}/>
    );
};

export {Input};