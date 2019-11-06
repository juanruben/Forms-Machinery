import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    const { onClick, disabled, text } = props;
    return (
        <button type="submit" className="main-button" onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    text: 'Button',
    disabled: false,
};

export default Button;
