import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = (props) => {
    const { onClick, disabled, text, className } = props;
    return (
        <button type="submit" className={className ? "button-main " + className : "button-main" } onClick={onClick} disabled={disabled}>
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
