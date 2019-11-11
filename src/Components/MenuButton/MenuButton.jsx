import React from 'react';
import PropTypes from 'prop-types';
import './MenuButton.scss';

function MenuButton(props) {
    const { onClick } = props;
    return (
        <button onClick={onClick} type="button" className="menu-icon">
            <i className="fas fa-bars" />
        </button>
    );
}

MenuButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default MenuButton;
