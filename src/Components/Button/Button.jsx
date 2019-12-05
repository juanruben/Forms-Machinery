import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = (props) => {
    const {
        onClick, disabled, text, className,
    } = props;
    return (
        <button className={`button-main ${className}`} onClick={onClick} disabled={disabled} type="button">
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

Button.defaultProps = {
    text: 'Button',
    disabled: false,
    className: '',
};

export default Button;
