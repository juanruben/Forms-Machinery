import React from 'react';
import './TopBar.scss';

function TopBar(props) {
    const { children } = props;
    return (
        <div className="topbar-container">
            {children}
        </div>
    );
}

export default TopBar;
