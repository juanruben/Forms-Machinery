import React from 'react';
import './LayoutFullWidth.scss';

const LayoutFullWidth = ({ children }) => (
    <div className="full-width-container">
        <div className="full-width-container__box">
            {children}
        </div>
    </div>
);

export default LayoutFullWidth;
