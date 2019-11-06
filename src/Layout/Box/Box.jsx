import React from 'react';
import './Box.scss';

const Box = (props) => {
    const { children } = props;
    return (
        <div className="box-container">
            {children}
        </div>
    );
};

export default Box;
