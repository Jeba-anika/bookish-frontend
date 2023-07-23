import React from 'react';

const Button = ({children, classes, onclickFunction}) => {
    return (
        <div>
            <button onClick={onclickFunction} className={`btn  bg-gradient-to-r from-accent to-primary ${classes}`}>{children}</button>
        </div>
    );
};

export default Button;