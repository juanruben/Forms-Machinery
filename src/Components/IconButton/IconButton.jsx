import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.scss';

function IconButton(props) {
    const { icon, onClick } = props;
    return (
        <button onClick={onClick} type="button" className="icon-button">
            <i className={icon} />
        </button>
    );
}

IconButton.propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default IconButton;
