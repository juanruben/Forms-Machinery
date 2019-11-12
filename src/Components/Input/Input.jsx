import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = (props) => {
    const {
        icon, errors, type, name, value, onChange, placeholder,
    } = props;
    const warning = (errors.length > 0);
    return (
        <div className="input-bordered-container">
            {icon && <i className={icon} />}
            <input className={`input-bordered ${warning && 'border-error'}`} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
            {warning && <i className="fas fa-exclamation warning" />}
        </div>
    );
};

Input.propTypes = {
    icon: PropTypes.string,
    errors: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.node,
    placeholder: PropTypes.string,
};

Input.defaultProps = {
    icon: null,
    errors: '',
    type: 'text',
    value: '',
    placeholder: '',
};

export default Input;
