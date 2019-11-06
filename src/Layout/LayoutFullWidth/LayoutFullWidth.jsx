import React from 'react';
import './LayoutFullWidth.scss';

const LayoutFullWidth = ({ children }) => (
    <div className="full-width-container">
        {children}
    </div>
);

export default LayoutFullWidth;
