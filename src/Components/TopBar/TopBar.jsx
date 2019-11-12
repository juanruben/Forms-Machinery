import React from 'react';
import './TopBar.scss';

function TopBar(props) {
    const { children } = props;
    return (
        <div className="top-bar">
            {children}
        </div>
    );
}

export default TopBar;
