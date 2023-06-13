import React from 'react';
import './Button.css'
const Button = (props) => {
    const {styleName,children,type,callback,disabled} = props;
    return (
        <button type={type} className={[styleName,'button'].join(' ')} onClick={callback} disabled={disabled}>
            {children}
        </button>
    );
};

export {Button};